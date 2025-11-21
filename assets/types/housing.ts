// Types de biens
export type PropertyType =
  | 'studio'
  | 't1'
  | 't2'
  | 't3'
  | 't4'
  | 't5+'
  | 'maison'
  | 'colocation'
  | 'parking'
  | 'autre';

// Type de bail
export type LeaseType =
  | 'meuble'
  | 'non_meuble'
  | 'etudiant'
  | 'saisonnier'
  | 'mobilite';

// Type d'emploi
export type EmploymentType =
  | 'cdi'
  | 'cdd'
  | 'interim'
  | 'etudiant'
  | 'freelance'
  | 'auto_entrepreneur'
  | 'retraite'
  | 'chomage'
  | 'rsa'
  | 'profession_liberale'
  | 'fonctionnaire';

// Type de garant
export type GuarantorType =
  | 'physique' // Personne physique (parents, famille)
  | 'garantme' // Service GarantMe
  | 'visale' // Action Logement Visale
  | 'entreprise' // Garantie entreprise
  | 'gli' // Garantie Loyers Impayés (assurance)
  | 'aucun';

// Ancienneté minimum
export type SeniorityRequirement = 'none' | '3_months' | '6_months' | '1_year';

// Statut du logement
export type HousingStatus =
  | 'draft' // Brouillon
  | 'active' // Actif et visible
  | 'rented' // Loué
  | 'archived'; // Archivé

// Interface principale du logement
export interface Housing {
  id: string;
  status: HousingStatus;
  ownerId: string; // ID du propriétaire ou agence
  createdAt: Date;
  updatedAt: Date;

  // Informations principales
  title: string;
  propertyType: PropertyType;
  surface: number; // en m²
  address: {
    street?: string;
    city: string;
    postalCode: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  rent: number; // Loyer charges comprises
  charges: number;
  deposit: number; // Dépôt de garantie
  leaseType: LeaseType;
  availableFrom: Date;
  description: string;

  // Liens externes
  externalLinks?: {
    leboncoin?: string;
    seloger?: string;
    agencyWebsite?: string;
    googleMaps?: string;
    photosUrl?: string; // Drive, Dropbox, etc.
  };

  // Photos (URLs)
  photos?: string[];

  // Critères et exigences
  requirements: HousingRequirements;

  // Statistiques
  stats?: {
    views: number;
    applications: number;
    matches: number;
  };
}

// Critères et exigences du bailleur
export interface HousingRequirements {
  // Critères revenus
  income: {
    minimumMonthly: number; // Revenus mensuels minimum
    multiplier: number; // Ex: 3 pour "3x le loyer"
    combinedIncomeAccepted: boolean; // Couple, coloc
    guarantorRequired: boolean;
    acceptedGuarantorTypes: GuarantorType[];
    guarantorIncomeMultiplier?: number; // Ex: 3x le loyer aussi
  };

  // Critères contractuels
  employment: {
    acceptedTypes: EmploymentType[];
    minimumSeniority: SeniorityRequirement;
    acceptRetirement: boolean;
    acceptUnemployment: boolean;
    acceptRSA: boolean;
    acceptSelfEmployed: boolean;
  };

  // Critères additionnels
  additional?: {
    nonSmoker?: boolean; // null = pas de préférence
    petsAllowed?: boolean;
    colivingAccepted?: boolean;
    maxOccupants?: number;
    requireInsurance?: boolean; // GLI ou autre
    minimumCreditScore?: number; // Pour futur algorithme
  };
}

// Résultat du matching
export interface MatchResult {
  housingId: string;
  candidateId: string;
  matchedAt: Date;
  overallScore: number; // 0-100
  status: 'excellent' | 'good' | 'average' | 'poor' | 'rejected';
  details: MatchCriterion[];
}

// Détail d'un critère de matching
export interface MatchCriterion {
  category: 'income' | 'employment' | 'guarantor' | 'additional';
  criterion: string;
  required: boolean;
  status: 'pass' | 'warning' | 'fail';
  message: string;
  weight: number; // Poids dans le score global (0-100)
  candidateValue?: string | number;
  requiredValue?: string | number;
}

// Profil candidat simplifié (pour le matching)
export interface CandidateProfile {
  id: string;
  income: {
    monthly: number;
    type: 'net' | 'gross';
    hasGuarantor: boolean;
    guarantorIncome?: number;
  };
  employment: {
    type: EmploymentType;
    seniority: number; // en mois
    companyName?: string;
  };
  additionalInfo?: {
    isSmoker?: boolean;
    hasPets?: boolean;
    occupants: number;
  };
}
