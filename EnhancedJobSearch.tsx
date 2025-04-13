import React, { useState, useEffect } from 'react';
import { Search, MapPin, ChevronDown, X, Building, Briefcase, Bell, Filter, Globe } from 'lucide-react';

interface JobSuggestion {
  id: string;
  title: string;
  type: 'job' | 'company' | 'recent';
}

interface LocationSuggestion {
  id: string;
  name: string;
  type: 'city' | 'remote';
}

const popularCategories = [
  'Software Development',
  'Data Science',
  'Product Management',
  'Design',
  'Marketing',
  'Sales',
];

const featuredJobs = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$150k - $200k',
    posted: '2d ago',
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'InnovateCo',
    location: 'Remote',
    type: 'Full-time',
    salary: '$130k - $180k',
    posted: '3d ago',
  },
  {
    id: '3',
    title: 'UX Designer',
    company: 'DesignHub',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$120k - $160k',
    posted: '1d ago',
  },
];

const commonJobTitles = [
  'Software Engineer',
  'Product Manager',
  'Data Scientist',
  'UX Designer',
  'Marketing Manager',
  'Sales Representative',
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'DevOps Engineer',
];

const commonLocations = [
  { id: '1', name: 'Remote', type: 'remote' },
  { id: '2', name: 'San Francisco, CA', type: 'city' },
  { id: '3', name: 'New York, NY', type: 'city' },
  { id: '4', name: 'Seattle, WA', type: 'city' },
  { id: '5', name: 'Austin, TX', type: 'city' },
];

export default function EnhancedJobSearch() {
  const [jobQuery, setJobQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showJobSuggestions, setShowJobSuggestions] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [jobSuggestions, setJobSuggestions] = useState<JobSuggestion[]>([]);
  const [locationSuggestions, setLocationSuggestions] = useState<LocationSuggestion[]>(commonLocations);
  const [selectedFilters, setSelectedFilters] = useState({
    jobType: '',
    experience: '',
    industry: '',
  });

  useEffect(() => {
    if (jobQuery.length >= 2) {
      const filtered = commonJobTitles
        .filter(title => title.toLowerCase().includes(jobQuery.toLowerCase()))
        .map(title => ({
          id: title.toLowerCase().replace(/\s+/g, '-'),
          title,
          type: 'job' as const
        }));
      setJobSuggestions(filtered);
      setShowJobSuggestions(true);
    } else {
      setShowJobSuggestions(false);
    }
  }, [jobQuery]);

  useEffect(() => {
    if (locationQuery.length >= 2) {
      const filtered = commonLocations
        .filter(loc => loc.name.toLowerCase().includes(locationQuery.toLowerCase()));
      setLocationSuggestions(filtered);
      setShowLocationSuggestions(true);
    } else {
      setShowLocationSuggestions(false);
    }
  }, [locationQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (jobQuery.trim() || locationQuery.trim()) {
      console.log('Searching for:', { jobQuery, locationQuery });
      // Implement actual search logic here
    }
  };

  const handleJobSuggestionClick = (suggestion: JobSuggestion) => {
    setJobQuery(suggestion.title);
    setShowJobSuggestions(false);
  };

  const handleLocationSuggestionClick = (suggestion: LocationSuggestion) => {
    setLocationQuery(suggestion.name);
    setShowLocationSuggestions(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:shadow-2xl transition-all duration-300">
      <form onSubmit={handleSearch} className="relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Job Search Input */}
          <div className="md:col-span-7 relative">
            <div className="relative">
              <Briefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-600" />
              <input
                type="text"
                value={jobQuery}
                onChange={(e) => setJobQuery(e.target.value)}
                placeholder="Job title, keywords, or company"
                className="w-full pl-12 pr-10 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              {jobQuery && (
                <button
                  type="button"
                  onClick={() => setJobQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            
            {/* Job Suggestions */}
            {showJobSuggestions && jobSuggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white rounded-xl shadow-lg border border-gray-200">
                {jobSuggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    type="button"
                    onClick={() => handleJobSuggestionClick(suggestion)}
                    className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-indigo-50 transition-colors"
                  >
                    <Briefcase className="w-4 h-4 text-indigo-600" />
                    <span>{suggestion.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Location Input */}
          <div className="md:col-span-3 relative">
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-600" />
              <input
                type="text"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                placeholder="Location"
                className="w-full pl-12 pr-10 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              {locationQuery && (
                <button
                  type="button"
                  onClick={() => setLocationQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Location Suggestions */}
            {showLocationSuggestions && locationSuggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white rounded-xl shadow-lg border border-gray-200">
                {locationSuggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    type="button"
                    onClick={() => handleLocationSuggestionClick(suggestion)}
                    className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-indigo-50 transition-colors"
                  >
                    {suggestion.type === 'remote' ? (
                      <Globe className="w-4 h-4 text-indigo-600" />
                    ) : (
                      <MapPin className="w-4 h-4 text-indigo-600" />
                    )}
                    <span>{suggestion.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search and Filter Buttons */}
          <div className="md:col-span-2 flex gap-2">
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="p-4 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors"
            >
              <Filter className="w-5 h-5" />
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl
                       font-medium hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105
                       transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                       flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
              <select
                value={selectedFilters.jobType}
                onChange={(e) => setSelectedFilters({ ...selectedFilters, jobType: e.target.value })}
                className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Any Type</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
              <select
                value={selectedFilters.experience}
                onChange={(e) => setSelectedFilters({ ...selectedFilters, experience: e.target.value })}
                className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Any Level</option>
                <option value="entry">Entry Level</option>
                <option value="mid">Mid Level</option>
                <option value="senior">Senior Level</option>
                <option value="executive">Executive</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
              <select
                value={selectedFilters.industry}
                onChange={(e) => setSelectedFilters({ ...selectedFilters, industry: e.target.value })}
                className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Any Industry</option>
                <option value="tech">Technology</option>
                <option value="finance">Finance</option>
                <option value="healthcare">Healthcare</option>
                <option value="education">Education</option>
              </select>
            </div>
          </div>
        )}
      </form>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2">
        {popularCategories.map((category) => (
          <button
            key={category}
            className="px-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow
                     text-gray-700 hover:text-indigo-600 text-sm font-medium"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Featured Jobs */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Featured Jobs</h2>
          <a href="#" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
            View All Jobs
          </a>
        </div>
        <div className="space-y-4">
          {featuredJobs.map((job) => (
            <div
              key={job.id}
              className="p-4 border border-gray-100 rounded-xl hover:border-indigo-100 hover:bg-indigo-50/30
                       transition-all duration-200 group cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-indigo-600">
                    {job.title}
                  </h3>
                  <p className="text-gray-600">{job.company}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      {job.location.toLowerCase().includes('remote') ? (
                        <Globe className="w-4 h-4" />
                      ) : (
                        <MapPin className="w-4 h-4" />
                      )}
                      {job.location}
                    </span>
                    <span>{job.type}</span>
                    <span>{job.salary}</span>
                  </div>
                </div>
                <span className="text-sm text-gray-400">{job.posted}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}