import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Filter, X, ChevronDown, Briefcase, Building, DollarSign } from 'lucide-react';
import { JobFilter, JobListing } from '../types/jobs';
import { useJobSearch } from '../hooks/useJobSearch';
import JobCard from './JobCard';

const initialFilters: JobFilter = {
  keyword: '',
  location: '',
  page: 1,
  limit: 20,
  sortBy: 'relevance'
};

export default function JobSearchInterface() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<JobFilter>(initialFilters);
  const filtersRef = useRef<HTMLDivElement>(null);
  
  const {
    jobs,
    loading,
    error,
    facets,
    total,
    search,
    loadMore
  } = useJobSearch(selectedFilters);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filtersRef.current && !filtersRef.current.contains(event.target as Node)) {
        setShowFilters(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    search(selectedFilters);
  };

  const handleFilterChange = (key: keyof JobFilter, value: any) => {
    setSelectedFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilter = (key: keyof JobFilter) => {
    setSelectedFilters(prev => ({ ...prev, [key]: undefined }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative mb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-5 relative">
            <Briefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={selectedFilters.keyword}
              onChange={(e) => handleFilterChange('keyword', e.target.value)}
              placeholder="Job title, keywords, or company"
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="md:col-span-4 relative">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={selectedFilters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              placeholder="City, state, or remote"
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="md:col-span-3 flex gap-2">
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div
            ref={filtersRef}
            className="absolute z-20 top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 p-6 animate-fadeIn"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                <select
                  value={selectedFilters.experienceLevel}
                  onChange={(e) => handleFilterChange('experienceLevel', e.target.value)}
                  className="w-full rounded-lg border-gray-200 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Any Level</option>
                  <option value="entry">Entry Level</option>
                  <option value="mid">Mid Level</option>
                  <option value="senior">Senior Level</option>
                  <option value="executive">Executive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                <select
                  value={selectedFilters.jobType}
                  onChange={(e) => handleFilterChange('jobType', e.target.value)}
                  className="w-full rounded-lg border-gray-200 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Any Type</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Posted Within</label>
                <select
                  value={selectedFilters.postedWithin}
                  onChange={(e) => handleFilterChange('postedWithin', e.target.value)}
                  className="w-full rounded-lg border-gray-200 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Any Time</option>
                  <option value="24h">Last 24 hours</option>
                  <option value="3d">Last 3 days</option>
                  <option value="7d">Last 7 days</option>
                  <option value="14d">Last 14 days</option>
                  <option value="30d">Last 30 days</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={selectedFilters.salary?.min || ''}
                    onChange={(e) => handleFilterChange('salary', {
                      ...selectedFilters.salary,
                      min: parseInt(e.target.value)
                    })}
                    className="w-full rounded-lg border-gray-200 focus:ring-2 focus:ring-indigo-500"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={selectedFilters.salary?.max || ''}
                    onChange={(e) => handleFilterChange('salary', {
                      ...selectedFilters.salary,
                      max: parseInt(e.target.value)
                    })}
                    className="w-full rounded-lg border-gray-200 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                <select
                  value={selectedFilters.industry}
                  onChange={(e) => handleFilterChange('industry', e.target.value)}
                  className="w-full rounded-lg border-gray-200 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Any Industry</option>
                  {facets.industries.map(({ value }) => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
                <select
                  value={selectedFilters.companySize}
                  onChange={(e) => handleFilterChange('companySize', e.target.value)}
                  className="w-full rounded-lg border-gray-200 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Any Size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="501-1000">501-1000 employees</option>
                  <option value="1001+">1001+ employees</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  setSelectedFilters(initialFilters);
                  setShowFilters(false);
                }}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Clear all filters
              </button>
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                onClick={() => setShowFilters(false)}
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </form>

      {/* Active Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.entries(selectedFilters).map(([key, value]) => {
          if (!value || key === 'page' || key === 'limit' || key === 'sortBy') return null;
          return (
            <button
              key={key}
              onClick={() => clearFilter(key as keyof JobFilter)}
              className="flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm hover:bg-indigo-100"
            >
              <span>{key}: {value.toString()}</span>
              <X className="w-4 h-4" />
            </button>
          );
        })}
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600">
          Showing <span className="font-medium text-gray-900">{jobs.length}</span> of{' '}
          <span className="font-medium text-gray-900">{total}</span> jobs
        </p>
        <select
          value={selectedFilters.sortBy}
          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          className="rounded-lg border-gray-200 focus:ring-2 focus:ring-indigo-500"
        >
          <option value="relevance">Most Relevant</option>
          <option value="date">Most Recent</option>
          <option value="salary">Highest Salary</option>
        </select>
      </div>

      {/* Job Results */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading jobs...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600">{error.message}</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No jobs found matching your criteria</p>
          </div>
        ) : (
          <>
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
            {jobs.length < total && (
              <button
                onClick={loadMore}
                className="w-full py-3 text-indigo-600 hover:text-indigo-700 font-medium border-2 border-indigo-100 hover:border-indigo-200 rounded-xl transition-colors"
              >
                Load More Jobs
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}