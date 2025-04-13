import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Building, Briefcase, Clock, TrendingUp, X } from 'lucide-react';

interface SearchSuggestion {
  id: string;
  text: string;
  type: 'recent' | 'trending' | 'job' | 'company';
}

const trendingSearches: SearchSuggestion[] = [
  { id: '1', text: 'Software Engineer', type: 'trending' },
  { id: '2', text: 'Product Manager', type: 'trending' },
  { id: '3', text: 'Data Scientist', type: 'trending' },
  { id: '4', text: 'UX Designer', type: 'trending' }
];

const popularLocations = [
  'San Francisco, CA',
  'New York, NY',
  'Remote',
  'London, UK',
  'Berlin, DE'
];

export default function EnhancedSearchBar() {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<SearchSuggestion[]>([]);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const newSearch: SearchSuggestion = {
        id: Date.now().toString(),
        text: query,
        type: 'recent'
      };
      setRecentSearches(prev => [newSearch, ...prev.slice(0, 4)]);
      setShowSuggestions(false);
      // Implement actual search logic here
    }
  };

  return (
    <div 
      ref={searchContainerRef}
      className="relative w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
    >
      <form onSubmit={handleSearch} className="relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4">
          {/* Job Search Input */}
          <div className="md:col-span-7 relative">
            <div className="relative">
              <Briefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-600" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Job title, keywords, or company"
                className="w-full pl-12 pr-10 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Location Input */}
          <div className="md:col-span-3 relative">
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-600" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                className="w-full pl-12 pr-10 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {location && (
                <button
                  type="button"
                  onClick={() => setLocation('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Search Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl
                       font-medium hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105
                       transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                       flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* Search Suggestions */}
        {showSuggestions && (
          <div className="absolute z-50 left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-4">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Recent Searches</h3>
                  <div className="space-y-2">
                    {recentSearches.map(search => (
                      <button
                        key={search.id}
                        onClick={() => setQuery(search.text)}
                        className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{search.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Trending Searches */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Trending Searches</h3>
                <div className="space-y-2">
                  {trendingSearches.map(trend => (
                    <button
                      key={trend.id}
                      onClick={() => setQuery(trend.text)}
                      className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-700">{trend.text}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Locations */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Popular Locations</h3>
                <div className="flex flex-wrap gap-2">
                  {popularLocations.map((loc, index) => (
                    <button
                      key={index}
                      onClick={() => setLocation(loc)}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}