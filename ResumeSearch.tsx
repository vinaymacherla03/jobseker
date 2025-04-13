import React, { useState, useCallback } from 'react';
import { Upload, Search, FileText, AlertCircle, Loader2, X, CheckCircle } from 'lucide-react';
import { ResumeParser } from '../services/resumeParser';
import { ParsedResume } from '../types/resume';
import ResumeParseResult from './ResumeParseResult';

interface ResumeSearchResult {
  id: string;
  name: string;
  email: string;
  skills: string[];
  experience: string[];
  education: string[];
  matchScore: number;
  highlights: string[];
}

export default function ResumeSearch() {
  const [files, setFiles] = useState<File[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<ResumeSearchResult[]>([]);
  const [parsedResumes, setParsedResumes] = useState<ParsedResume[]>([]);
  const [filters, setFilters] = useState({
    experienceLevel: '',
    skills: [] as string[],
    education: '',
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const validFiles = acceptedFiles.filter(file => {
      const isValid = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
        .includes(file.type);
      if (!isValid) {
        setError(`Invalid file type: ${file.name}. Only PDF and DOC files are allowed.`);
      }
      return isValid;
    });

    setFiles(prev => [...prev, ...validFiles]);
    setError(null);
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('border-blue-500', 'bg-blue-50');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
    const droppedFiles = Array.from(e.dataTransfer.files);
    onDrop(droppedFiles);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!files.length) {
      setError('Please upload at least one resume');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const parser = ResumeParser.getInstance();
      const parsedResults = await Promise.all(
        files.map(file => parser.parseResume(file))
      );
      setParsedResumes(parsedResults);

      // Mock results
      const mockResults: ResumeSearchResult[] = files.map(file => ({
        id: crypto.randomUUID(),
        name: 'John Doe',
        email: 'john@example.com',
        skills: ['React', 'TypeScript', 'Node.js'],
        experience: ['Senior Software Engineer', '5 years'],
        education: ['BS Computer Science'],
        matchScore: 85,
        highlights: ['Strong frontend experience', 'Team leadership'],
      }));

      setResults(mockResults);
    } catch (err) {
      setError('Failed to analyze resumes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Upload Section */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center transition-colors duration-200"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 bg-blue-100 rounded-full">
            <Upload className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Upload Resumes</h3>
            <p className="text-gray-600 mt-1">Drag and drop your resumes here or click to browse</p>
            <p className="text-sm text-gray-500 mt-1">Supported formats: PDF, DOC, DOCX</p>
          </div>
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx"
            onChange={(e) => e.target.files && onDrop(Array.from(e.target.files))}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="btn-primary cursor-pointer"
          >
            Browse Files
          </label>
        </div>
      </div>

      {/* Uploaded Files */}
      {files.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Uploaded Files</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200"
              >
                <FileText className="w-8 h-8 text-blue-600" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                  <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Parsed Resume Results */}
      {parsedResumes.length > 0 && (
        <div className="mt-8 space-y-8">
          <h2 className="text-2xl font-semibold text-gray-900">Parsed Resume Results</h2>
          {parsedResumes.map((result, index) => (
            <ResumeParseResult key={index} result={result} />
          ))}
        </div>
      )}

      {/* Search Controls */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search Keywords
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search skills, experience, or qualifications"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Experience Level
              </label>
              <select
                value={filters.experienceLevel}
                onChange={(e) => setFilters(prev => ({ ...prev, experienceLevel: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Any Experience</option>
                <option value="entry">Entry Level (0-2 years)</option>
                <option value="mid">Mid Level (3-5 years)</option>
                <option value="senior">Senior Level (5+ years)</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading || !files.length}
              className="btn-primary disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing Resumes...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Search Resumes
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Search Results</h3>
          <div className="grid grid-cols-1 gap-4">
            {results.map((result) => (
              <div
                key={result.id}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900">{result.name}</h4>
                    <p className="text-gray-600">{result.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Match Score:</span>
                    <span className="text-lg font-bold text-blue-600">{result.matchScore}%</span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Skills</h5>
                    <div className="flex flex-wrap gap-2">
                      {result.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Experience</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {result.experience.map((exp, i) => (
                        <li key={i}>{exp}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Education</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {result.education.map((edu, i) => (
                        <li key={i}>{edu}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Highlights</h5>
                  <ul className="space-y-2">
                    {result.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}