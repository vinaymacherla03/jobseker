export interface Skill {
  id: string;
  name: string;
  category: string;
  endorsements: number;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  logo?: string;
}

export interface Achievement {
  id: string;
  title: string;
  type: 'performance' | 'leadership' | 'award';
  metric?: string;
  description: string;
  date: string;
  endorsements: number;
  verifiedBy?: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  logo?: string;
  startYear: string;
  endYear: string;
  field: string;
  description?: string;
  location?: string;
  gpa?: string;
}

export interface WorkExperience {
  id: string;
  title: string;
  company: string;
  logo?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  location: string;
}