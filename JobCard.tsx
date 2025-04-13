import React from 'react';
import { MapPin, DollarSign, Building, Clock, Briefcase, ChevronRight } from 'lucide-react';
import { JobListing } from '../types/jobs';

interface JobCardProps {
  job: JobListing;
}

export default function JobCard({ job }: JobCardProps) {
  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return 'Salary not specified';
    if (!max) return `$${min.toLocaleString()}+`;
    if (!min) return `Up to $${max.toLocaleString()}`;
    return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
  };

  const formatDate = (date: string) => {
    const days = Math.floor((Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return `${Math.floor(days / 30)} months ago`;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 hover:border-indigo-200 hover:shadow-lg transition-all duration-200 group">
      <div className="p-6">
        <div className="flex items-start gap-4">
          {job.logo ? (
            <img
              src={job.logo}
              alt={`${job.company} logo`}
              className="w-12 h-12 rounded-lg object-contain bg-gray-50"
            />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
              <Building className="w-6 h-6 text-gray-400" />
            </div>
          )}
          
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {job.title}
                </h3>
                <p className="text-gray-600">{job.company}</p>
              </div>
              <a
                href={job.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm"
              >
                Apply Now
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{job.remote ? 'Remote' : job.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                <span>{formatSalary(job.salaryMin, job.salaryMax)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                <span>{job.type}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{formatDate(job.postedAt)}</span>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-gray-600 line-clamp-2">{job.description}</p>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {job.skills.slice(0, 5).map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm"
                >
                  {skill}
                </span>
              ))}
              {job.skills.length > 5 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm">
                  +{job.skills.length - 5} more
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}