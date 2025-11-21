import {
  IconLock,
  IconShieldCheck,
  IconFileCheck,
  IconClock,
  IconServer,
  IconCertificate,
} from '@tabler/icons-react';

export interface SecurityFeature {
  icon: typeof IconLock;
  title: string;
  description: string;
  details: string[];
}

export const securityFeatures: SecurityFeature[] = [
  {
    icon: IconLock,
    title: 'Chiffrement de bout en bout',
    description:
      'Vos données sont protégées par un chiffrement AES-256, le standard militaire et bancaire.',
    details: [
      'Chiffrement AES-256 sur tous vos fichiers',
      'Clés de chiffrement uniques par utilisateur',
      'Chiffrement côté client avant envoi',
      'Aucun accès possible sans votre mot de passe',
      'Algorithme PBKDF2 pour dérivation des clés',
    ],
  },
  {
    icon: IconShieldCheck,
    title: 'Authentification à deux facteurs (2FA)',
    description:
      'Renforcez la sécurité de votre compte avec une double authentification.',
    details: [
      'Support TOTP (Google Authenticator, Authy)',
      'Codes de récupération sécurisés',
      'Authentification par SMS (optionnel)',
      'Clés de sécurité matérielles (YubiKey)',
      'Historique des connexions',
    ],
  },
  {
    icon: IconFileCheck,
    title: 'Journalisation et audit',
    description:
      'Toutes les actions sur vos documents sont tracées et consultables.',
    details: [
      'Logs détaillés de toutes les actions',
      'Historique complet des accès',
      'Alertes en cas d\'activité suspecte',
      'Export des journaux pour audit',
      'Conservation des logs pendant 3 ans',
    ],
  },
  {
    icon: IconClock,
    title: 'Expiration et suppression CNIL',
    description:
      'Conformité totale avec les exigences CNIL sur la conservation des données.',
    details: [
      'Définition de dates d\'expiration par document',
      'Suppression automatique après expiration',
      'Suppression sécurisée (écrasement multiple)',
      'Droit à l\'effacement (RGPD)',
      'Notification avant suppression automatique',
    ],
  },
  {
    icon: IconServer,
    title: 'Hébergement sécurisé',
    description:
      'Infrastructure hébergée en France avec les plus hauts standards de sécurité.',
    details: [
      'Datacenters certifiés ISO 27001',
      'Hébergement en France (Paris)',
      'Redondance multi-zones',
      'Sauvegardes chiffrées quotidiennes',
      'Plan de reprise d\'activité (PRA)',
    ],
  },
  {
    icon: IconCertificate,
    title: 'Conformité RGPD',
    description:
      'Respect total du règlement européen sur la protection des données.',
    details: [
      'DPO (Data Protection Officer) dédié',
      'Registre des traitements RGPD',
      'Analyse d\'impact (PIA) réalisée',
      'Contrats de sous-traitance conformes',
      'Droit d\'accès, rectification, portabilité',
    ],
  },
];

export interface Certification {
  name: string;
  description: string;
  year: string;
}

export const certifications: Certification[] = [
  {
    name: 'ISO 27001',
    description: 'Management de la sécurité de l\'information',
    year: '2023',
  },
  {
    name: 'HDS',
    description: 'Hébergement de Données de Santé',
    year: '2023',
  },
  {
    name: 'RGPD',
    description: 'Conformité au règlement européen',
    year: '2022',
  },
  {
    name: 'SOC 2 Type II',
    description: 'Sécurité, disponibilité, confidentialité',
    year: '2024',
  },
];
