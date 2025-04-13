import React, { useState, useRef } from 'react';
import { Search, FileText, Upload, X, Loader2, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Props {
  onSearch: (query: string) => void;
  onFileUpload: (file: File) => void;
}

export default function SearchBarWithResume({ onSearch, onFileUpload }: Props) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validate file type
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(selectedFile.type)) {
      setError('Please upload a PDF or DOC file');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      await onFileUpload(selectedFile);
      setFile(selectedFile);
      setUploadSuccess(true);
      // Navigate to resume builder after successful upload
      navigate('/resume-builder');
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (err) {
      setError('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center gap-2">
          {/* File Upload Button */}
          <div className="relative">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={triggerFileUpload}
              className="p-3 bg-white rounded-xl border border-gray-200 hover:border-blue-400 
                       hover:bg-blue-50 transition-all duration-200 group relative"
              title="Upload your resume"
            >
              <FileText className="w-6 h-6 text-gray-500 group-hover:text-blue-600" />
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-200
                            whitespace-nowrap bg-gray-900 text-white text-sm px-3 py-1 rounded-lg">
                Upload your resume
              </div>
            </button>
          </div>

          {/* Search Input */}
          <div className="flex-1 relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search jobs or upload your resume"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
              />
            </div>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white 
                     rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 
                     transform hover:scale-105 transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                     flex items-center gap-2"
          >
            <Search className="w-5 h-5" />
            Search
          </button>
        </div>

        {/* File Upload Status */}
        {(file || uploading || error) && (
          <div className="absolute top-full left-0 right-0 mt-2">
            <div className={`p-3 rounded-lg flex items-center gap-3 ${
              error ? 'bg-red-50 text-red-600' :
              uploadSuccess ? 'bg-green-50 text-green-600' :
              'bg-blue-50 text-blue-600'
            }`}>
              {uploading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Uploading resume...</span>
                </>
              ) : error ? (
                <>
                  <X className="w-5 h-5" />
                  <span>{error}</span>
                </>
              ) : file && (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span className="flex-1">{file.name}</span>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="p-1 hover:bg-blue-100 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}