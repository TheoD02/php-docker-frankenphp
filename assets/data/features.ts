import {
  IconLock,
  IconCloud,
  IconSearch,
  IconUsers,
  IconShield,
  IconChartBar,
} from '@tabler/icons-react';

export interface Feature {
  icon: typeof IconLock;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    icon: IconLock,
    title: 'Sécurité maximale',
    description:
      'Vos documents sont chiffrés de bout en bout avec les standards bancaires (AES-256). Personne, pas même nous, ne peut accéder à vos données.',
  },
  {
    icon: IconCloud,
    title: 'Gestion de logements',
    description:
      'Propriétaires et agences : ajoutez vos logements avec tous les détails (loyer, surface, critères). Définissez vos exigences et gérez vos candidatures.',
  },
  {
    icon: IconSearch,
    title: 'Matching automatique',
    description:
      'Notre algorithme compare automatiquement les profils candidats avec vos critères : revenus, emploi, garant. Gagnez du temps avec un scoring intelligent.',
  },
  {
    icon: IconUsers,
    title: 'Partage sécurisé',
    description:
      'Partagez vos dossiers avec des liens sécurisés paramétrables : durée, nombre d\'ouvertures, permissions (lecture, téléchargement, impression).',
  },
  {
    icon: IconShield,
    title: 'Conformité RGPD',
    description:
      'Hébergement en France, conformité totale RGPD. Expiration automatique des dossiers, journalisation complète, suppression sécurisée.',
  },
  {
    icon: IconChartBar,
    title: 'Tableau de bord complet',
    description:
      'Visualisez vos logements, candidatures, matchings. Statistiques détaillées : vues, taux de conversion, profils les plus compatibles.',
  },
];

export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
}

export const howItWorksSteps: HowItWorksStep[] = [
  {
    step: 1,
    title: 'Créez votre compte',
    description:
      'Inscrivez-vous en 2 minutes et choisissez le plan qui vous convient.',
  },
  {
    step: 2,
    title: 'Uploadez vos documents',
    description:
      'Glissez-déposez vos fichiers ou scannez-les directement depuis votre smartphone.',
  },
  {
    step: 3,
    title: 'Organisez et partagez',
    description:
      'Créez des dossiers, ajoutez des tags et partagez en toute sécurité avec qui vous voulez.',
  },
];
