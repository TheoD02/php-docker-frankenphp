export interface UserJourneyStep {
  step: number;
  title: string;
  description: string;
}

export interface UserJourney {
  userType: string;
  title: string;
  subtitle: string;
  color: string;
  steps: UserJourneyStep[];
}

export const userJourneys: UserJourney[] = [
  {
    userType: 'Candidat',
    title: 'Parcours Candidat',
    subtitle: 'Constituez et partagez votre dossier de candidature en quelques clics',
    color: 'blue',
    steps: [
      {
        step: 1,
        title: 'Créez votre dossier',
        description:
          'Inscrivez-vous gratuitement et créez votre profil. Uploadez vos documents : pièce d\'identité, justificatifs de revenus, avis d\'imposition, RIB, etc.',
      },
      {
        step: 2,
        title: 'Organisez vos pièces',
        description:
          'Nos catégories pré-définies vous guident : état civil, revenus, situation professionnelle. Vos documents sont automatiquement vérifiés et validés.',
      },
      {
        step: 3,
        title: 'Partagez en un clic',
        description:
          'Générez un lien sécurisé de votre dossier complet. Partagez-le avec les propriétaires ou agences. Contrôlez qui accède à quoi et pour combien de temps.',
      },
    ],
  },
  {
    userType: 'Propriétaire',
    title: 'Parcours Propriétaire',
    subtitle: 'Recevez et analysez les dossiers de vos candidats locataires en toute sécurité',
    color: 'green',
    steps: [
      {
        step: 1,
        title: 'Recevez les dossiers',
        description:
          'Les candidats vous envoient leur dossier SafeDossier. Tous les documents sont au même endroit, déjà organisés et vérifiés. Fini les emails avec 20 pièces jointes.',
      },
      {
        step: 2,
        title: 'Analysez en toute confiance',
        description:
          'Consultez les pièces authentifiées et à jour. Vérifiez l\'exhaustivité du dossier grâce à notre checklist. Comparez plusieurs candidats facilement.',
      },
      {
        step: 3,
        title: 'Décidez sereinement',
        description:
          'Accès sécurisé pendant toute la durée nécessaire. Partagez le dossier avec votre garant ou votre conseiller. Les données sont automatiquement supprimées après expiration.',
      },
    ],
  },
  {
    userType: 'Agence',
    title: 'Parcours Agence',
    subtitle: 'Gérez tous vos dossiers locataires avec un outil professionnel et conforme',
    color: 'violet',
    steps: [
      {
        step: 1,
        title: 'Centralisez vos dossiers',
        description:
          'Créez votre espace agence. Invitez vos collaborateurs avec des rôles personnalisés. Tous vos dossiers candidats au même endroit, organisés par bien.',
      },
      {
        step: 2,
        title: 'Automatisez la vérification',
        description:
          'Notre IA vérifie automatiquement la complétude et la cohérence des dossiers. Détectez les anomalies et les documents manquants. Gagnez un temps précieux.',
      },
      {
        step: 3,
        title: 'Restez conforme RGPD',
        description:
          'Journalisation complète de tous les accès. Suppression automatique après la période légale. Exports pour vos audits. Sérénité garantie face à la CNIL.',
      },
    ],
  },
];
