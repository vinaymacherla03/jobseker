import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Briefcase, Filter, X, ChevronDown, Star, Clock, Building, DollarSign, MessageSquare, UserPlus, Brain } from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  title: string;
  location: string;
  experience: string;
  skills: string[];
  availability: string;
  matchScore: number;
  photo?: string;
  company?: string;
}

export default function TalentSearchBox() {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filters, setFilters] = useState({
    experienceLevel: '',
    availability: '',
    skills: [] as string[],
    salary: { min: '', max: '' }
  });
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Mock data for demonstration
  const mockCandidates: Candidate[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      title: 'Senior Software Engineer',
      location: 'San Francisco, CA',
      experience: '8 years',
      skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
      availability: 'Immediately',
      matchScore: 95,
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces'
    },
    {
      id: '2',
      name: 'Michael Chen',
      title: 'Product Manager',
      location: 'New York, NY',
      experience: '6 years',
      skills: ['Product Strategy', 'Agile', 'User Research'],
      availability: '2 weeks',
      matchScore: 88,
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces'
    }
  ];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCandidates(mockCandidates);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6" ref={searchContainerRef}>
      {/* Search Interface */}
      <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Role/Skills Input */}
            <div className="md:col-span-5 relative">
              <div className="relative">
                <Briefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-600" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Job title, skills, or keywords"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Location Input */}
            <div className="md:col-span-4 relative">
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-600" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location or 'Remote'"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="md:col-span-3 flex gap-2">
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl 
                         hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <Filter className="w-5 h-5" />
                <span>Filters</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white rounded-xl hover:bg-blue-700 
                         transition-colors flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                <span>Search</span>
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-xl">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
                <select
                  value={filters.experienceLevel}
                  onChange={(e) => setFilters({ ...filters, experienceLevel: e.target.value })}
                  className="w-full rounded-lg border-gray-200 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Any Level</option>
                  <option value="entry">Entry Level (0-2 years)</option>
                  <option value="mid">Mid Level (3-5 years)</option>
                  <option value="senior">Senior Level (5+ years)</option>
                  <option value="lead">Lead/Manager (8+ years)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                <select
                  value={filters.availability}
                  onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
                  className="w-full rounded-lg border-gray-200 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Any Availability</option>
                  <option value="immediate">Immediate</option>
                  <option value="2weeks">Within 2 weeks</option>
                  <option value="month">Within a month</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.salary.min}
                      onChange={(e) => setFilters({
                        ...filters,
                        salary: { ...filters.salary, min: e.target.value }
                      })}
                      className="w-full pl-8 pr-4 py-2 rounded-lg border-gray-200 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <span className="text-gray-500">-</span>
                  <div className="relative flex-1">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.salary.max}
                      onChange={(e) => setFilters({
                        ...filters,
                        salary: { ...filters.salary, max: e.target.value }
                      })}
                      className="w-full pl-8 pr-4 py-2 rounded-lg border-gray-200 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Search Results */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Searching for candidates...</p>
        </div>
      ) : candidates.length > 0 ? (
        <div className="space-y-4">
          {candidates.map((candidate) => (
            <div
              key={candidate.id}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-start gap-4">
                {candidate.photo ? (
                  <img
                    src={candidate.photo}
                    alt={candidate.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                    <UserPlus className="w-8 h-8 text-blue-600" />
                  </div>
                )}
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
                      <p className="text-gray-600">{candidate.title}</p>
                      
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {candidate.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {candidate.experience}
                        </span>
                        <span className="flex items-center gap-1">
                          <Brain className="w-4 h-4" />
                          {candidate.availability}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-500">Match Score</div>
                        <div className="text-2xl font-bold text-blue-600">{candidate.matchScore}%</div>
                      </div>
                      <Star className="w-6 h-6 text-yellow-400 fill-current" />
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-4">
                    <button className="btn-primary flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Contact
                    </button>
                    <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 
                                   transition-colors flex items-center gap-2 text-gray-700">
                      <UserPlus className="w-4 h-4" />
                      Shortlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : query && (
        <div className="text-center py-12 text-gray-500">
          No candidates found matching your criteria
        </div>
      )}
    </div>
  );
}