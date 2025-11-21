export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: 'Marie Dubois',
    role: 'CEO & Co-fondatrice',
    bio: 'Ancienne avocate spécialisée en droit numérique, Marie a créé SafeDossier après avoir constaté les difficultés de ses clients à organiser leurs documents importants.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marie',
  },
  {
    name: 'Thomas Petit',
    role: 'CTO & Co-fondateur',
    bio: 'Expert en cybersécurité avec 15 ans d\'expérience, Thomas a travaillé pour de grandes institutions bancaires avant de co-fonder SafeDossier.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas',
  },
  {
    name: 'Sophie Martin',
    role: 'Head of Product',
    bio: 'Passionnée par l\'UX et l\'accessibilité, Sophie s\'assure que SafeDossier reste simple et intuitif pour tous, quel que soit le niveau technique.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie',
  },
  {
    name: 'Lucas Bernard',
    role: 'Lead Developer',
    bio: 'Full-stack developer spécialisé dans les architectures cloud sécurisées, Lucas construit l\'infrastructure robuste de SafeDossier.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas',
  },
];

export interface CompanyValue {
  title: string;
  description: string;
}

export const companyValues: CompanyValue[] = [
  {
    title: 'Sécurité avant tout',
    description:
      'La protection de vos données est notre priorité absolue. Nous appliquons les standards de sécurité les plus stricts.',
  },
  {
    title: 'Transparence',
    description:
      'Nous sommes transparents sur nos pratiques, notre code source est audité régulièrement par des experts indépendants.',
  },
  {
    title: 'Respect de la vie privée',
    description:
      'Vos données vous appartiennent. Nous ne les vendons jamais et ne les exploitons pas à des fins commerciales.',
  },
  {
    title: 'Simplicité',
    description:
      'La sécurité ne doit pas être compliquée. Nous créons des outils puissants mais accessibles à tous.',
  },
];
