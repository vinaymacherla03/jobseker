import { useState, useEffect, useCallback } from 'react';
import { jobApi } from '../services/jobApi';
import { JobListing, JobFilter, SearchResponse } from '../types/jobs';
import { useDebounce } from './useDebounce';

interface UseJobSearchResult {
  jobs: JobListing[];
  loading: boolean;
  error: Error | null;
  facets: SearchResponse['facets'];
  total: number;
  search: (newFilters: Partial<JobFilter>) => void;
  loadMore: () => void;
}

export function useJobSearch(initialFilters: JobFilter): UseJobSearchResult {
  const [filters, setFilters] = useState<JobFilter>(initialFilters);
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [facets, setFacets] = useState<SearchResponse['facets']>({
    companies: [],
    locations: [],
    jobTypes: [],
    experienceLevels: [],
    industries: []
  });
  const [total, setTotal] = useState(0);

  const debouncedFilters = useDebounce(filters, 300);

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await jobApi.searchJobs(debouncedFilters);
      setJobs(response.jobs);
      setFacets(response.facets);
      setTotal(response.total);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch jobs'));
    } finally {
      setLoading(false);
    }
  }, [debouncedFilters]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const search = useCallback((newFilters: Partial<JobFilter>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      page: 1 // Reset pagination when filters change
    }));
  }, []);

  const loadMore = useCallback(() => {
    setFilters(prev => ({
      ...prev,
      page: (prev.page || 1) + 1
    }));
  }, []);

  return {
    jobs,
    loading,
    error,
    facets,
    total,
    search,
    loadMore
  };
}