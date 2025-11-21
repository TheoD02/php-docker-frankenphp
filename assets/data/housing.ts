import type { Housing, CandidateProfile } from '@/types/housing';

// Mock de logements
export const mockHousings: Housing[] = [
  {
    id: 'housing-1',
    status: 'active',
    ownerId: 'owner-1',
    createdAt: new Date('2025-01-10'),
    updatedAt: new Date('2025-01-12'),
    title: 'Studio 25m² – Lyon 3e – Proche Part-Dieu',
    propertyType: 'studio',
    surface: 25,
    address: {
      street: '12 rue de la République',
      city: 'Lyon',
      postalCode: '69003',
      coordinates: {
        lat: 45.7578137,
        lng: 4.8320114,
      },
    },
    rent: 650,
    charges: 50,
    deposit: 650,
    leaseType: 'meuble',
    availableFrom: new Date('2025-02-01'),
    description:
      'Charmant studio meublé de 25m² en plein cœur du 3e arrondissement de Lyon. Proche de toutes commodités, métro Part-Dieu à 5 min à pied. Cuisine équipée, salle d\'eau avec douche. Idéal étudiant ou jeune actif.',
    externalLinks: {
      leboncoin: 'https://leboncoin.fr/annonce-exemple',
      seloger: 'https://seloger.com/annonce-exemple',
      googleMaps: 'https://maps.google.com/?q=Lyon+3e',
      photosUrl: 'https://drive.google.com/photos-exemple',
    },
    photos: [
      'https://placehold.co/600x400/1976d2/white?text=Studio+Lyon',
      'https://placehold.co/600x400/64b5f6/white?text=Cuisine',
    ],
    requirements: {
      income: {
        minimumMonthly: 1950, // 3x le loyer
        multiplier: 3,
        combinedIncomeAccepted: false,
        guarantorRequired: true,
        acceptedGuarantorTypes: ['physique', 'visale', 'garantme'],
        guarantorIncomeMultiplier: 3,
      },
      employment: {
        acceptedTypes: ['cdi', 'etudiant', 'fonctionnaire'],
        minimumSeniority: '3_months',
        acceptRetirement: false,
        acceptUnemployment: false,
        acceptRSA: false,
        acceptSelfEmployed: false,
      },
      additional: {
        nonSmoker: true,
        petsAllowed: false,
        colivingAccepted: false,
        maxOccupants: 1,
        requireInsurance: false,
      },
    },
    stats: {
      views: 142,
      applications: 8,
      matches: 3,
    },
  },
  {
    id: 'housing-2',
    status: 'active',
    ownerId: 'owner-2',
    createdAt: new Date('2025-01-08'),
    updatedAt: new Date('2025-01-08'),
    title: 'T2 55m² – Lille Centre – Parking inclus',
    propertyType: 't2',
    surface: 55,
    address: {
      city: 'Lille',
      postalCode: '59000',
    },
    rent: 850,
    charges: 100,
    deposit: 850,
    leaseType: 'non_meuble',
    availableFrom: new Date('2025-03-01'),
    description:
      'Bel appartement T2 de 55m² en centre-ville de Lille. 1 chambre, salon spacieux, cuisine séparée, salle de bain. Parking privatif inclus. Quartier calme et commerçant.',
    externalLinks: {
      seloger: 'https://seloger.com/annonce-t2-lille',
    },
    requirements: {
      income: {
        minimumMonthly: 2850, // 3x le loyer + charges
        multiplier: 3,
        combinedIncomeAccepted: true,
        guarantorRequired: true,
        acceptedGuarantorTypes: ['physique', 'visale', 'garantme', 'entreprise'],
        guarantorIncomeMultiplier: 3,
      },
      employment: {
        acceptedTypes: ['cdi', 'cdd', 'fonctionnaire', 'freelance'],
        minimumSeniority: '6_months',
        acceptRetirement: true,
        acceptUnemployment: false,
        acceptRSA: false,
        acceptSelfEmployed: true,
      },
      additional: {
        petsAllowed: true,
        colivingAccepted: true,
        maxOccupants: 2,
        requireInsurance: true,
      },
    },
    stats: {
      views: 98,
      applications: 12,
      matches: 5,
    },
  },
  {
    id: 'housing-3',
    status: 'active',
    ownerId: 'agency-1',
    createdAt: new Date('2025-01-05'),
    updatedAt: new Date('2025-01-11'),
    title: 'T3 75m² – Paris 15e – Balcon + Cave',
    propertyType: 't3',
    surface: 75,
    address: {
      street: '45 avenue Émile Zola',
      city: 'Paris',
      postalCode: '75015',
      coordinates: {
        lat: 48.8467,
        lng: 2.2964,
      },
    },
    rent: 1800,
    charges: 200,
    deposit: 3600,
    leaseType: 'non_meuble',
    availableFrom: new Date('2025-02-15'),
    description:
      'Magnifique T3 de 75m² avec balcon et cave dans le 15e arrondissement. 2 chambres, grand salon, cuisine équipée, salle de bain + WC séparés. Immeuble année 1970, ascenseur, gardien. Métro Commerce à 3 min.',
    externalLinks: {
      agencyWebsite: 'https://agence-exemple.fr/annonce-t3-paris',
      seloger: 'https://seloger.com/paris-15e-t3',
      googleMaps: 'https://maps.google.com/?q=Paris+15e',
    },
    photos: [
      'https://placehold.co/600x400/1976d2/white?text=T3+Paris',
      'https://placehold.co/600x400/64b5f6/white?text=Salon',
      'https://placehold.co/600x400/42a5f5/white?text=Balcon',
    ],
    requirements: {
      income: {
        minimumMonthly: 6000, // 3x le loyer
        multiplier: 3,
        combinedIncomeAccepted: true,
        guarantorRequired: true,
        acceptedGuarantorTypes: ['physique', 'entreprise', 'gli'],
        guarantorIncomeMultiplier: 3.5,
      },
      employment: {
        acceptedTypes: ['cdi', 'fonctionnaire', 'profession_liberale'],
        minimumSeniority: '1_year',
        acceptRetirement: true,
        acceptUnemployment: false,
        acceptRSA: false,
        acceptSelfEmployed: true,
      },
      additional: {
        nonSmoker: false,
        petsAllowed: false,
        colivingAccepted: false,
        maxOccupants: 3,
        requireInsurance: true,
        minimumCreditScore: 650,
      },
    },
    stats: {
      views: 287,
      applications: 24,
      matches: 8,
    },
  },
  {
    id: 'housing-4',
    status: 'active',
    ownerId: 'owner-3',
    createdAt: new Date('2025-01-12'),
    updatedAt: new Date('2025-01-12'),
    title: 'Colocation T4 – Toulouse – 4 chambres',
    propertyType: 'colocation',
    surface: 90,
    address: {
      city: 'Toulouse',
      postalCode: '31000',
    },
    rent: 1600,
    charges: 150,
    deposit: 1600,
    leaseType: 'meuble',
    availableFrom: new Date('2025-02-01'),
    description:
      'Colocation de 4 chambres dans un T4 de 90m². Chaque chambre meublée, cuisine et salon commun, 2 salles de bain. Proche université et transports. Loyer par chambre : 400€/mois charges comprises.',
    requirements: {
      income: {
        minimumMonthly: 1200, // Par colocataire
        multiplier: 3,
        combinedIncomeAccepted: true,
        guarantorRequired: true,
        acceptedGuarantorTypes: ['physique', 'visale', 'garantme'],
        guarantorIncomeMultiplier: 2.5,
      },
      employment: {
        acceptedTypes: ['etudiant', 'cdi', 'cdd', 'interim'],
        minimumSeniority: 'none',
        acceptRetirement: false,
        acceptUnemployment: false,
        acceptRSA: false,
        acceptSelfEmployed: true,
      },
      additional: {
        nonSmoker: true,
        petsAllowed: false,
        colivingAccepted: true,
        maxOccupants: 4,
        requireInsurance: false,
      },
    },
    stats: {
      views: 213,
      applications: 31,
      matches: 12,
    },
  },
];

// Mock de profils candidats
export const mockCandidateProfiles: CandidateProfile[] = [
  {
    id: 'candidate-1',
    income: {
      monthly: 2500,
      type: 'net',
      hasGuarantor: true,
      guarantorIncome: 3500,
    },
    employment: {
      type: 'cdi',
      seniority: 8, // 8 mois
      companyName: 'Tech Corp',
    },
    additionalInfo: {
      isSmoker: false,
      hasPets: false,
      occupants: 1,
    },
  },
  {
    id: 'candidate-2',
    income: {
      monthly: 1800,
      type: 'net',
      hasGuarantor: true,
      guarantorIncome: 4200,
    },
    employment: {
      type: 'etudiant',
      seniority: 12,
      companyName: 'Université Lyon 1',
    },
    additionalInfo: {
      isSmoker: false,
      hasPets: false,
      occupants: 1,
    },
  },
  {
    id: 'candidate-3',
    income: {
      monthly: 3200,
      type: 'net',
      hasGuarantor: false,
    },
    employment: {
      type: 'freelance',
      seniority: 24,
      companyName: 'Indépendant',
    },
    additionalInfo: {
      isSmoker: false,
      hasPets: true,
      occupants: 1,
    },
  },
  {
    id: 'candidate-4',
    income: {
      monthly: 5500,
      type: 'net',
      hasGuarantor: true,
      guarantorIncome: 6000,
    },
    employment: {
      type: 'cdi',
      seniority: 36,
      companyName: 'Consulting International',
    },
    additionalInfo: {
      isSmoker: false,
      hasPets: false,
      occupants: 2,
    },
  },
];
