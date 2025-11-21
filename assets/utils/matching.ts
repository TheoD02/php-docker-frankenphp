import type {
  Housing,
  CandidateProfile,
  MatchResult,
  MatchCriterion,
  SeniorityRequirement,
} from '@/types/housing';

/**
 * Algorithme de matching candidat ↔ logement
 * Compare le profil d'un candidat avec les exigences d'un logement
 * Retourne un score de matching et des détails par critère
 */
export function matchCandidateToHousing(
  candidate: CandidateProfile,
  housing: Housing
): MatchResult {
  const criteria: MatchCriterion[] = [];
  let totalScore = 0;
  let totalWeight = 0;

  // 1. Vérification des revenus (poids: 40%)
  const incomeCheck = checkIncome(candidate, housing);
  criteria.push(...incomeCheck.criteria);
  totalScore += incomeCheck.score * 0.4;
  totalWeight += 0.4;

  // 2. Vérification de l'emploi (poids: 30%)
  const employmentCheck = checkEmployment(candidate, housing);
  criteria.push(...employmentCheck.criteria);
  totalScore += employmentCheck.score * 0.3;
  totalWeight += 0.3;

  // 3. Vérification du garant (poids: 20%)
  const guarantorCheck = checkGuarantor(candidate, housing);
  criteria.push(...guarantorCheck.criteria);
  totalScore += guarantorCheck.score * 0.2;
  totalWeight += 0.2;

  // 4. Critères additionnels (poids: 10%)
  const additionalCheck = checkAdditionalCriteria(candidate, housing);
  criteria.push(...additionalCheck.criteria);
  totalScore += additionalCheck.score * 0.1;
  totalWeight += 0.1;

  // Score global sur 100
  const overallScore = Math.round((totalScore / totalWeight) * 100);

  // Déterminer le statut global
  let status: MatchResult['status'];
  if (overallScore >= 85) status = 'excellent';
  else if (overallScore >= 70) status = 'good';
  else if (overallScore >= 50) status = 'average';
  else if (overallScore >= 30) status = 'poor';
  else status = 'rejected';

  return {
    housingId: housing.id,
    candidateId: candidate.id,
    matchedAt: new Date(),
    overallScore,
    status,
    details: criteria,
  };
}

/**
 * Vérification des revenus
 */
function checkIncome(
  candidate: CandidateProfile,
  housing: Housing
): { criteria: MatchCriterion[]; score: number } {
  const criteria: MatchCriterion[] = [];
  const req = housing.requirements.income;
  let score = 0;
  let maxScore = 0;

  // Vérification du revenu minimum
  const candidateIncome = candidate.income.monthly;
  const requiredIncome = req.minimumMonthly;
  const incomeRatio = candidateIncome / requiredIncome;

  maxScore += 100;
  if (incomeRatio >= 1) {
    score += 100;
    criteria.push({
      category: 'income',
      criterion: 'Revenus mensuels minimum',
      required: true,
      status: 'pass',
      message: `${candidateIncome}€ (requis: ${requiredIncome}€)`,
      weight: 50,
      candidateValue: candidateIncome,
      requiredValue: requiredIncome,
    });
  } else if (incomeRatio >= 0.9) {
    score += 70;
    criteria.push({
      category: 'income',
      criterion: 'Revenus mensuels minimum',
      required: true,
      status: 'warning',
      message: `${candidateIncome}€ légèrement inférieur au requis (${requiredIncome}€)`,
      weight: 50,
      candidateValue: candidateIncome,
      requiredValue: requiredIncome,
    });
  } else {
    score += 0;
    criteria.push({
      category: 'income',
      criterion: 'Revenus mensuels minimum',
      required: true,
      status: 'fail',
      message: `${candidateIncome}€ insuffisant (requis: ${requiredIncome}€)`,
      weight: 50,
      candidateValue: candidateIncome,
      requiredValue: requiredIncome,
    });
  }

  return { criteria, score: (score / maxScore) * 100 };
}

/**
 * Vérification de l'emploi
 */
function checkEmployment(
  candidate: CandidateProfile,
  housing: Housing
): { criteria: MatchCriterion[]; score: number } {
  const criteria: MatchCriterion[] = [];
  const req = housing.requirements.employment;
  let score = 0;
  let maxScore = 0;

  // Type d'emploi accepté
  maxScore += 100;
  const employmentTypeAccepted = req.acceptedTypes.includes(
    candidate.employment.type
  );

  if (employmentTypeAccepted) {
    score += 100;
    criteria.push({
      category: 'employment',
      criterion: "Type d'emploi",
      required: true,
      status: 'pass',
      message: `${getEmploymentTypeLabel(candidate.employment.type)} accepté`,
      weight: 60,
      candidateValue: candidate.employment.type,
      requiredValue: req.acceptedTypes.join(', '),
    });
  } else {
    score += 0;
    criteria.push({
      category: 'employment',
      criterion: "Type d'emploi",
      required: true,
      status: 'fail',
      message: `${getEmploymentTypeLabel(candidate.employment.type)} non accepté`,
      weight: 60,
      candidateValue: candidate.employment.type,
      requiredValue: req.acceptedTypes.join(', '),
    });
  }

  // Ancienneté
  maxScore += 100;
  const requiredMonths = getSeniorityInMonths(req.minimumSeniority);
  const candidateSeniority = candidate.employment.seniority;

  if (candidateSeniority >= requiredMonths) {
    score += 100;
    criteria.push({
      category: 'employment',
      criterion: 'Ancienneté minimum',
      required: true,
      status: 'pass',
      message: `${candidateSeniority} mois (requis: ${requiredMonths} mois)`,
      weight: 40,
      candidateValue: candidateSeniority,
      requiredValue: requiredMonths,
    });
  } else {
    score += 50;
    criteria.push({
      category: 'employment',
      criterion: 'Ancienneté minimum',
      required: true,
      status: 'warning',
      message: `${candidateSeniority} mois (requis: ${requiredMonths} mois)`,
      weight: 40,
      candidateValue: candidateSeniority,
      requiredValue: requiredMonths,
    });
  }

  return { criteria, score: (score / maxScore) * 100 };
}

/**
 * Vérification du garant
 */
function checkGuarantor(
  candidate: CandidateProfile,
  housing: Housing
): { criteria: MatchCriterion[]; score: number } {
  const criteria: MatchCriterion[] = [];
  const req = housing.requirements.income;
  let score = 0;

  if (req.guarantorRequired) {
    if (candidate.income.hasGuarantor) {
      // Vérifier les revenus du garant
      const guarantorIncome = candidate.income.guarantorIncome || 0;
      const requiredGuarantorIncome =
        housing.rent * (req.guarantorIncomeMultiplier || 3);

      if (guarantorIncome >= requiredGuarantorIncome) {
        score = 100;
        criteria.push({
          category: 'guarantor',
          criterion: 'Garant obligatoire',
          required: true,
          status: 'pass',
          message: `Présent avec revenus suffisants (${guarantorIncome}€)`,
          weight: 100,
          candidateValue: guarantorIncome,
          requiredValue: requiredGuarantorIncome,
        });
      } else {
        score = 50;
        criteria.push({
          category: 'guarantor',
          criterion: 'Garant obligatoire',
          required: true,
          status: 'warning',
          message: `Présent mais revenus limités (${guarantorIncome}€ vs ${requiredGuarantorIncome}€ requis)`,
          weight: 100,
          candidateValue: guarantorIncome,
          requiredValue: requiredGuarantorIncome,
        });
      }
    } else {
      score = 0;
      criteria.push({
        category: 'guarantor',
        criterion: 'Garant obligatoire',
        required: true,
        status: 'fail',
        message: 'Garant absent',
        weight: 100,
      });
    }
  } else {
    score = 100;
    criteria.push({
      category: 'guarantor',
      criterion: 'Garant',
      required: false,
      status: 'pass',
      message: 'Non obligatoire',
      weight: 0,
    });
  }

  return { criteria, score };
}

/**
 * Vérification des critères additionnels
 */
function checkAdditionalCriteria(
  candidate: CandidateProfile,
  housing: Housing
): { criteria: MatchCriterion[]; score: number } {
  const criteria: MatchCriterion[] = [];
  const additional = housing.requirements.additional;
  let score = 0;
  let criteriaCount = 0;

  if (!additional) {
    return { criteria: [], score: 100 };
  }

  // Non-fumeur
  if (additional.nonSmoker !== undefined && candidate.additionalInfo?.isSmoker !== undefined) {
    criteriaCount++;
    const isSmokerMatch = !additional.nonSmoker || !candidate.additionalInfo.isSmoker;

    if (isSmokerMatch) {
      score += 100;
      criteria.push({
        category: 'additional',
        criterion: 'Non-fumeur',
        required: false,
        status: 'pass',
        message: additional.nonSmoker ? 'Candidat non-fumeur' : 'Pas de restriction',
        weight: 20,
      });
    } else {
      criteria.push({
        category: 'additional',
        criterion: 'Non-fumeur',
        required: false,
        status: 'warning',
        message: 'Candidat fumeur (propriétaire préfère non-fumeur)',
        weight: 20,
      });
    }
  }

  // Animaux
  if (additional.petsAllowed !== undefined && candidate.additionalInfo?.hasPets !== undefined) {
    criteriaCount++;
    const petsMatch = additional.petsAllowed || !candidate.additionalInfo.hasPets;

    if (petsMatch) {
      score += 100;
      criteria.push({
        category: 'additional',
        criterion: 'Animaux',
        required: false,
        status: 'pass',
        message: additional.petsAllowed ? 'Animaux acceptés' : 'Candidat sans animaux',
        weight: 30,
      });
    } else {
      criteria.push({
        category: 'additional',
        criterion: 'Animaux',
        required: false,
        status: 'fail',
        message: 'Candidat avec animaux (non acceptés)',
        weight: 30,
      });
    }
  }

  // Nombre d'occupants
  if (additional.maxOccupants && candidate.additionalInfo?.occupants) {
    criteriaCount++;
    const occupantsMatch =
      candidate.additionalInfo.occupants <= additional.maxOccupants;

    if (occupantsMatch) {
      score += 100;
      criteria.push({
        category: 'additional',
        criterion: "Nombre d'occupants",
        required: false,
        status: 'pass',
        message: `${candidate.additionalInfo.occupants} occupant(s) (max: ${additional.maxOccupants})`,
        weight: 50,
        candidateValue: candidate.additionalInfo.occupants,
        requiredValue: additional.maxOccupants,
      });
    } else {
      criteria.push({
        category: 'additional',
        criterion: "Nombre d'occupants",
        required: false,
        status: 'fail',
        message: `${candidate.additionalInfo.occupants} occupants (max: ${additional.maxOccupants})`,
        weight: 50,
        candidateValue: candidate.additionalInfo.occupants,
        requiredValue: additional.maxOccupants,
      });
    }
  }

  const finalScore = criteriaCount > 0 ? score / criteriaCount : 100;
  return { criteria, score: finalScore };
}

/**
 * Helpers
 */
function getSeniorityInMonths(requirement: SeniorityRequirement): number {
  switch (requirement) {
    case 'none':
      return 0;
    case '3_months':
      return 3;
    case '6_months':
      return 6;
    case '1_year':
      return 12;
    default:
      return 0;
  }
}

function getEmploymentTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    cdi: 'CDI',
    cdd: 'CDD',
    interim: 'Intérim',
    etudiant: 'Étudiant',
    freelance: 'Freelance',
    auto_entrepreneur: 'Auto-entrepreneur',
    retraite: 'Retraité',
    chomage: 'Chômage',
    rsa: 'RSA',
    profession_liberale: 'Profession libérale',
    fonctionnaire: 'Fonctionnaire',
  };
  return labels[type] || type;
}

/**
 * Fonction utilitaire pour obtenir tous les matchings d'un candidat
 */
export function getCandidateMatchings(
  candidate: CandidateProfile,
  housings: Housing[]
): MatchResult[] {
  return housings
    .filter((h) => h.status === 'active')
    .map((housing) => matchCandidateToHousing(candidate, housing))
    .sort((a, b) => b.overallScore - a.overallScore);
}

/**
 * Fonction utilitaire pour obtenir tous les candidats matchés avec un logement
 */
export function getHousingMatches(
  housing: Housing,
  candidates: CandidateProfile[]
): MatchResult[] {
  return candidates
    .map((candidate) => matchCandidateToHousing(candidate, housing))
    .sort((a, b) => b.overallScore - a.overallScore);
}
