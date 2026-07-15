export interface GeneralInfo {
  name: string;
  title: string;
  studioName: string;
  logoUrl: string;
  profileImage: string;
  bio: string[];
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  instagram: string;
  linkedin: string;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  year: string;
  location: string;
  description: string;
  tags: string[];
  images: string[];
}

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  photo: string;
  bio: string;
  active: boolean;
}

export interface PortfolioData {
  general: GeneralInfo;
  contact: ContactInfo;
  projects: Project[];
  team: TeamMember[];
}
export type ProjectCategory = 'residential' | 'interior' | 'urban';
export const CATEGORY_LABELS: Record<string, string> = {
  residential: 'residential',
  interior: 'interior | ephemeral | design',
  urban: 'urban | public'
};
