import React, { useState } from 'react';
import { Search, MapPin, ChevronDown } from 'lucide-react';

interface JobSearchProps {
  onSearch: (query: string, location: string) => void;
}

export default function JobSearch({ onSearch }: JobSearchProps) {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, location);
  };

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-8 px-4 sm:px-6 lg:px-8 rounded-xl shadow-lg">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Job title, keywords, or company"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white/50"
              />
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white/50"
              />
            </div>
          </div>
          <div className="md:col-span-2 flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="bg-white/10 text-white p-3 rounded-lg hover:bg-white/20 transition-colors"
            >
              <ChevronDown className={`w-5 h-5 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="bg-white/10 rounded-lg p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-white text-sm mb-1">Job Type</label>
              <select className="w-full rounded-lg border-0 focus:ring-2 focus:ring-white/50">
                <option value="">Any type</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
              </select>
            </div>
            <div>
              <label className="block text-white text-sm mb-1">Experience Level</label>
              <select className="w-full rounded-lg border-0 focus:ring-2 focus:ring-white/50">
                <option value="">Any experience</option>
                <option value="entry">Entry Level</option>
                <option value="mid">Mid Level</option>
                <option value="senior">Senior Level</option>
              </select>
            </div>
            <div>
              <label className="block text-white text-sm mb-1">Salary Range</label>
              <select className="w-full rounded-lg border-0 focus:ring-2 focus:ring-white/50">
                <option value="">Any salary</option>
                <option value="0-50">$0 - $50,000</option>
                <option value="50-100">$50,000 - $100,000</option>
                <option value="100+">$100,000+</option>
              </select>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}