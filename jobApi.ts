import { JobListing, JobFilter, SearchResponse } from '../types/jobs';

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const cache = new Map<string, { data: any; timestamp: number }>();

class JobAPI {
  private static instance: JobAPI;
  private rateLimiter: Map<string, number> = new Map();
  private readonly MAX_REQUESTS = 100;
  private readonly TIME_WINDOW = 60 * 1000; // 1 minute

  private constructor() {}

  static getInstance(): JobAPI {
    if (!this.instance) {
      this.instance = new JobAPI();
    }
    return this.instance;
  }

  private checkRateLimit(source: string): boolean {
    const now = Date.now();
    const requests = this.rateLimiter.get(source) || 0;
    
    if (requests >= this.MAX_REQUESTS) {
      return false;
    }
    
    this.rateLimiter.set(source, requests + 1);
    setTimeout(() => {
      this.rateLimiter.set(source, (this.rateLimiter.get(source) || 1) - 1);
    }, this.TIME_WINDOW);
    
    return true;
  }

  private getCacheKey(filters: JobFilter): string {
    return JSON.stringify(filters);
  }

  private async fetchFromSource(source: string, filters: JobFilter): Promise<JobListing[]> {
    if (!this.checkRateLimit(source)) {
      throw new Error(`Rate limit exceeded for ${source}`);
    }

    // Implement actual API calls here
    const apis = {
      indeed: async () => {
        // Indeed API implementation
        return [];
      },
      linkedin: async () => {
        // LinkedIn API implementation
        return [];
      },
      glassdoor: async () => {
        // Glassdoor API implementation
        return [];
      }
    };

    return apis[source as keyof typeof apis]?.() || [];
  }

  async searchJobs(filters: JobFilter): Promise<SearchResponse> {
    const cacheKey = this.getCacheKey(filters);
    const cached = cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }

    try {
      const sources = ['indeed', 'linkedin', 'glassdoor'];
      const results = await Promise.allSettled(
        sources.map(source => this.fetchFromSource(source, filters))
      );

      const jobs = results
        .filter((result): result is PromiseFulfilledResult<JobListing[]> => 
          result.status === 'fulfilled'
        )
        .flatMap(result => result.value);

      const response: SearchResponse = {
        jobs: this.processResults(jobs, filters),
        total: jobs.length,
        facets: this.generateFacets(jobs)
      };

      cache.set(cacheKey, {
        data: response,
        timestamp: Date.now()
      });

      return response;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
  }

  private processResults(jobs: JobListing[], filters: JobFilter): JobListing[] {
    return jobs
      .filter(job => this.applyFilters(job, filters))
      .sort((a, b) => this.sortJobs(a, b, filters.sortBy));
  }

  private applyFilters(job: JobListing, filters: JobFilter): boolean {
    const matchesKeyword = !filters.keyword || 
      job.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
      job.description.toLowerCase().includes(filters.keyword.toLowerCase());

    const matchesLocation = !filters.location ||
      job.location.toLowerCase().includes(filters.location.toLowerCase()) ||
      (job.remote && filters.location.toLowerCase() === 'remote');

    const matchesSalary = !filters.salary ||
      (job.salaryMin && job.salaryMax &&
       job.salaryMin <= filters.salary.max &&
       job.salaryMax >= filters.salary.min);

    const matchesExperience = !filters.experienceLevel ||
      job.experienceLevel === filters.experienceLevel;

    const matchesJobType = !filters.jobType ||
      job.type === filters.jobType;

    return matchesKeyword && matchesLocation && matchesSalary && 
           matchesExperience && matchesJobType;
  }

  private sortJobs(a: JobListing, b: JobListing, sortBy?: string): number {
    switch (sortBy) {
      case 'date':
        return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
      case 'salary':
        return (b.salaryMax || 0) - (a.salaryMax || 0);
      case 'relevance':
      default:
        return b.relevanceScore - a.relevanceScore;
    }
  }

  private generateFacets(jobs: JobListing[]) {
    const facets = {
      companies: new Map<string, number>(),
      locations: new Map<string, number>(),
      jobTypes: new Map<string, number>(),
      experienceLevels: new Map<string, number>(),
      industries: new Map<string, number>()
    };

    jobs.forEach(job => {
      this.incrementMapCount(facets.companies, job.company);
      this.incrementMapCount(facets.locations, job.location);
      this.incrementMapCount(facets.jobTypes, job.type);
      this.incrementMapCount(facets.experienceLevels, job.experienceLevel);
      this.incrementMapCount(facets.industries, job.industry);
    });

    return {
      companies: this.mapToSortedArray(facets.companies),
      locations: this.mapToSortedArray(facets.locations),
      jobTypes: this.mapToSortedArray(facets.jobTypes),
      experienceLevels: this.mapToSortedArray(facets.experienceLevels),
      industries: this.mapToSortedArray(facets.industries)
    };
  }

  private incrementMapCount(map: Map<string, number>, value: string) {
    map.set(value, (map.get(value) || 0) + 1);
  }

  private mapToSortedArray(map: Map<string, number>) {
    return Array.from(map.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([value, count]) => ({ value, count }));
  }
}

export const jobApi = JobAPI.getInstance();