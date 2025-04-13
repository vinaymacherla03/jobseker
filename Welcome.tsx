import React, { useEffect, useRef } from 'react';
import { Navigate, Link } from 'react-router-dom';
import {
  Building,
  DollarSign, 
  Star,
  TrendingUp,
  MapPin,
  BriefcaseIcon,
  Clock,
  ChevronRight,
  Bell, 
  User,
  Menu,
  FileText,
  Check,
  Sparkles,
  Zap,
  BarChart,
  Rocket,
  ArrowUpRight,
  X,
  Filter,
  Briefcase,
  Globe,
  Bookmark,
  Share2,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';

// Intersection Observer for animations
function useIntersectionObserver(options = {}) {
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1, ...options });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return elementRef;
}

const recommendedJobs = [
  {
    title: 'Senior Software Engineer',
    company: 'Google',
    location: 'Mountain View, CA',
    salary: '$150K - $220K',
    posted: '2d ago',
    logo: 'https://www.google.com/favicon.ico',
    match: '95%',
    skills: ['React', 'TypeScript', 'Node.js'],
    applicants: 45
  },
  {
    title: 'Product Manager',
    company: 'Microsoft',
    location: 'Redmond, WA',
    salary: '$140K - $180K',
    posted: '3d ago',
    logo: 'https://www.microsoft.com/favicon.ico',
    match: '88%',
    skills: ['Product Strategy', 'Agile', 'Data Analysis'],
    applicants: 32
  },
  {
    title: 'UX Designer',
    company: 'Apple',
    location: 'Cupertino, CA',
    salary: '$130K - $170K',
    posted: '1d ago',
    logo: 'https://www.apple.com/favicon.ico',
    match: '92%',
    skills: ['Figma', 'User Research', 'Design Systems'],
    applicants: 28
  }
];

const salaryInsights = [
  {
    role: 'Software Engineer',
    avgSalary: '$120,000',
    range: '$90K - $150K',
    trend: '+5%'
  },
  {
    role: 'Product Manager',
    avgSalary: '$130,000',
    range: '$100K - $160K',
    trend: '+8%'
  },
  {
    role: 'Data Scientist',
    avgSalary: '$115,000',
    range: '$85K - $145K',
    trend: '+10%'
  }
];

const companyReviews = [
  {
    company: 'Google',
    rating: 4.5,
    reviews: 12500,
    logo: 'https://www.google.com/favicon.ico',
    pros: 'Great benefits, work-life balance',
    cons: 'Large company, slow decision making'
  },
  {
    company: 'Microsoft',
    rating: 4.3,
    reviews: 8900,
    logo: 'https://www.microsoft.com/favicon.ico',
    pros: 'Strong leadership, good compensation',
    cons: 'Complex organizational structure'
  },
  {
    company: 'Apple',
    rating: 4.4,
    reviews: 10200,
    logo: 'https://www.apple.com/favicon.ico',
    pros: 'Innovative environment, great products',
    cons: 'High pressure, demanding pace'
  }
];

export default function Welcome() {
  const { user, isAuthenticated } = useAuthStore();
  const heroRef = useIntersectionObserver();
  const statsRef = useIntersectionObserver();
  const jobsRef = useIntersectionObserver();
  const reviewsRef = useIntersectionObserver();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-lg sticky top-0 z-50 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-8">
              <Link to="/" className="group flex items-center gap-2 text-xl font-bold">
                <div className="relative">
                  <Sparkles className="w-8 h-8 text-indigo-600 group-hover:scale-110 transition-transform duration-200" />
                  <div className="absolute -inset-2 bg-indigo-100 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-200"></div>
                </div>
                CareerAI
              </Link>
              <div className="hidden md:flex items-center gap-6">
                <Link to="/jobs" className="nav-link group flex items-center gap-1">
                  <BriefcaseIcon className="w-4 h-4" />
                  <span>Jobs</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <Link to="/companies" className="nav-link group flex items-center gap-1">
                  <Building className="w-4 h-4" />
                  <span>Companies</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <Link to="/salaries" className="nav-link group flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  <span>Salaries</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-600 group">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full group-hover:animate-ping"></span>
              </button>
              <Link
                to="/profile"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-gray-900 transition-all duration-200"
              >
                <User className="w-5 h-5" />
                <span className="hidden md:inline">{user?.name || 'Profile'}</span>
              </Link>
              <button className="md:hidden">
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Featured Jobs */}
        <div ref={jobsRef} className="bg-white rounded-2xl shadow-lg p-8 transform opacity-0 translate-y-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Featured Jobs</h2>
              <p className="text-gray-600">Curated opportunities for you</p>
            </div>
            <Link to="/jobs" className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
              View all jobs
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedJobs.map((job, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-xl border border-gray-200 p-6 hover:border-indigo-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="w-12 h-12 rounded-xl"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-gray-600">{job.company}</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{job.posted}</span>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {job.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-medium text-gray-900">{job.match} Match</span>
                  </div>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Company Reviews */}
        <div ref={reviewsRef} className="bg-white rounded-2xl shadow-lg p-8 transform opacity-0 translate-y-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Top Companies</h2>
              <p className="text-gray-600">Discover great places to work</p>
            </div>
            <Link to="/companies" className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
              View all companies
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {companyReviews.map((company, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:border-indigo-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={company.logo}
                    alt={company.company}
                    className="w-12 h-12 rounded-xl"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{company.company}</h3>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-medium">{company.rating}</span>
                      <span className="text-gray-500">({company.reviews.toLocaleString()} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Pros</h4>
                    <p className="text-sm text-gray-600">{company.pros}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Cons</h4>
                    <p className="text-sm text-gray-600">{company.cons}</p>
                  </div>
                </div>

                <button className="mt-4 w-full px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors text-sm">
                  View Company Profile
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Salary Insights */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Salary Insights</h2>
              <p className="text-gray-600">Latest compensation trends</p>
            </div>
            <Link to="/salaries" className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
              View all insights
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {salaryInsights.map((insight, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:border-indigo-200 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="font-medium text-gray-900 mb-4">{insight.role}</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-500">Average Salary</div>
                    <div className="text-2xl font-semibold text-indigo-600">{insight.avgSalary}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Range</div>
                    <div className="text-gray-900">{insight.range}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-green-600">{insight.trend} YoY</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}