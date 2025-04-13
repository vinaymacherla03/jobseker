export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salaryMin?: number;
  salaryMax?: number;
  type: string;
  experienceLevel: string;
  industry: string;
  remote: boolean;
  postedAt: string;
  relevanceScore: number;
  requirements: string[];
  benefits: string[];
  skills: string[];
  source: string;
  applicationUrl: string;
  logo?: string;
}

export interface JobFilter {
  keyword?: string;
  location?: string;
  salary?: {
    min: number;
    max: number;
  };
  experienceLevel?: string;
  jobType?: string;
  remote?: boolean;
  industry?: string;
  companySize?: string;
  postedWithin?: string;
  sortBy?: string;
  page?: number;
  limit?: number;
}

export interface SearchResponse {
  jobs: JobListing[];
  total: number;
  facets: {
    companies: Array<{ value: string; count: number }>;
    locations: Array<{ value: string; count: number }>;
    jobTypes: Array<{ value: string; count: number }>;
    experienceLevels: Array<{ value: string; count: number }>;
    industries: Array<{ value: string; count: number }>;
  };
}

export interface JobAlert {
  id: string;
  userId: string;
  filters: JobFilter;
  frequency: 'daily' | 'weekly';
  active: boolean;
  createdAt: string;
}