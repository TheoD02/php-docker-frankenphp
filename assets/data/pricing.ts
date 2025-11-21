export interface PricingPlan {
  name: string;
  price: number | string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
  badge?: string;
}

export interface PricingCategory {
  category: string;
  subtitle: string;
  plans: PricingPlan[];
}

// Plan gratuit pour les candidats
export const candidatPlan: PricingPlan = {
  name: 'Candidat Locataire',
  price: 0,
  period: 'Toujours gratuit',
  description: 'Le candidat ne paie jamais. Jamais.',
  badge: '100% Gratuit',
  features: [
    'Création illimitée de dossiers',
    'Stockage sécurisé des documents',
    'Génération de liens sécurisés',
    'Paramètres avancés (durée, permissions)',
    'Journalisation complète des accès',
    'Regénération de lien à tout moment',
    'Expiration automatique conforme CNIL',
    'Export du dossier en PDF',
  ],
  cta: 'Créer mon dossier gratuitement',
};

// Plans propriétaires
export const proprietairePlans: PricingPlan[] = [
  {
    name: 'Proprio Solo',
    price: 0,
    period: 'Gratuit',
    description: 'Pour tester la plateforme sans engagement',
    features: [
      '1 locataire actif gratuit',
      'Consultation des dossiers',
      'Journalisation des accès',
      'Pas de durée limite',
      'Support email 48h',
    ],
    cta: 'Commencer gratuitement',
  },
  {
    name: 'Proprio Plus',
    price: 12,
    period: 'an / locataire',
    description: 'Idéal si vous louez un ou plusieurs biens',
    highlighted: true,
    badge: 'Le plus populaire',
    features: [
      'Jusqu\'à 5 locataires actifs',
      'Accès illimité aux dossiers',
      'Export PDF final',
      'Notes personnelles sur chaque locataire',
      'Support prioritaire (24h)',
    ],
    cta: 'Souscrire',
  },
  {
    name: 'Proprio Premium',
    price: 2,
    period: 'mois / locataire',
    description: 'Adapté aux propriétaires multi-biens',
    features: [
      'Locataires illimités',
      'Téléchargements auto après signature bail',
      'Archivage prolongé (CNIL + 5 ans)',
      'Gestion automatique des relances',
      'Partage interne (co-propriétaire)',
      'Support prioritaire (<12h)',
    ],
    cta: 'Souscrire',
  },
];

// Plans agences
export const agencePlans: PricingPlan[] = [
  {
    name: 'Agence Start',
    price: 29,
    period: 'mois',
    description: 'Pour démarrer avec votre agence',
    features: [
      'Jusqu\'à 20 dossiers actifs',
      'Tableau multi-biens',
      'Documents consultables par l\'équipe',
      '2 collaborateurs inclus',
      'Notes internes',
      'Archivage standard (bail + 3 ans)',
    ],
    cta: 'Démarrer',
  },
  {
    name: 'Agence Pro',
    price: 79,
    period: 'mois',
    description: 'Pour petites agences (2–5 agents)',
    highlighted: true,
    badge: 'Recommandé',
    features: [
      '100 dossiers actifs',
      '10 collaborateurs',
      'Signatures électroniques (option)',
      'Rapports mensuels',
      'Accès API (v2)',
      'Branding léger (couleurs + logo)',
    ],
    cta: 'Démarrer',
  },
  {
    name: 'Agence Enterprise',
    price: 'Sur devis',
    period: '',
    description: 'Pour grands réseaux et gestionnaires',
    features: [
      'Dossiers illimités',
      'Collaborateurs illimités',
      'SLA 99,9%',
      'Support prioritaire dédié',
      'Audit sécurité annuel',
      'Import/export CSV/CRM',
      'Intégration API avancée',
      'Hébergement dédié (option)',
    ],
    cta: 'Contactez-nous',
  },
];

// Options additionnelles
export interface AdditionalOption {
  name: string;
  price: string;
  description: string;
  features: string[];
}

export const additionalOptions: AdditionalOption[] = [
  {
    name: 'Signature électronique certifiée',
    price: '6€/mois ou 60€/an',
    description: 'eSign / eIDAS compliant',
    features: ['Bail', 'État des lieux', 'Avenants', 'Attestations'],
  },
  {
    name: 'Archivage longue durée',
    price: '3€/mois/dossier',
    description: 'CNIL + 10 ans',
    features: [
      'Pour obligations légales longues',
      'Garants et litiges',
      'Backup sécurisé',
    ],
  },
  {
    name: 'Assistance premium',
    price: '4€/mois',
    description: 'Support ultra-rapide',
    features: ['Réponse < 2h', 'Disponible week-end', 'Support prioritaire'],
  },
  {
    name: 'API Developer Access',
    price: '29€/mois',
    description: 'Intégrations avancées',
    features: ['Connexion CRM/ERP', 'Portails immobiliers', 'Documentation complète'],
  },
];
