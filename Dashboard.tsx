import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import {
  Search,
  MapPin,
  Building, 
  Bell,
  User,
  Menu,
  Briefcase,
  Brain,
  ChevronRight,
  Star,
  Clock,
  FileText,
  MessageSquare,
  TrendingUp,
  BookOpen, 
  CheckCircle,
  AlertCircle,
  Settings,
  Sun,
  Moon,
  ChevronDown,
  Filter,
  Bookmark,
  Share2,
  DollarSign, 
  Bot,
  BarChart,
  Sparkles,
  Zap,
  Globe,
  Calendar,
  History,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';

// Mock data for demonstration
const recommendedJobs = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    company: 'Google',
    location: 'Mountain View, CA',
    salary: '$150K - $220K',
    posted: '2d ago',
    logo: 'https://www.google.com/favicon.ico',
    match: 95,
    skills: ['React', 'TypeScript', 'Node.js'],
    remote: true,
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'Microsoft',
    location: 'Redmond, WA',
    salary: '$140K - $180K',
    posted: '3d ago',
    logo: 'https://www.microsoft.com/favicon.ico',
    match: 88,
    skills: ['Product Strategy', 'Agile', 'Data Analysis'],
    remote: false,
  },
  {
    id: '3',
    title: 'UX Designer',
    company: 'Apple',
    location: 'Cupertino, CA',
    salary: '$130K - $170K',
    posted: '1d ago',
    logo: 'https://www.apple.com/favicon.ico',
    match: 92,
    skills: ['Figma', 'User Research', 'Design Systems'],
    remote: true,
  },
];

const applicationStats = [
  { label: 'Applied', count: 12, icon: FileText, color: 'blue' },
  { label: 'Interviews', count: 3, icon: MessageSquare, color: 'green' },
  { label: 'Shortlisted', count: 5, icon: Star, color: 'yellow' },
  { label: 'Offers', count: 1, icon: CheckCircle, color: 'purple' },
];

const userActivity = {
  lastApplied: 'Software Engineer at Google',
  lastAppliedDate: '1 day ago',
  savedJobs: 15,
  newMatches: 8,
};

const jobAlerts = [
  {
    id: '1',
    role: 'Software Engineer',
    newJobs: 5,
    location: 'San Francisco',
  },
  {
    id: '2',
    role: 'Product Manager',
    newJobs: 3,
    location: 'Remote',
  },
];

const marketInsights = [
  {
    title: 'Software Engineering',
    trend: '+15% YoY',
    avgSalary: '$135,000',
    demand: 'High',
  },
  {
    title: 'Product Management',
    trend: '+12% YoY',
    avgSalary: '$145,000',
    demand: 'Very High',
  },
];

const trendingSkills = [
  'Artificial Intelligence',
  'React.js',
  'Cloud Computing',
  'Data Science',
  'Cybersecurity',
];

export default function Dashboard() {
  const { user, isAuthenticated } = useAuthStore();
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [workType, setWorkType] = useState('all');
  const [showChatbot, setShowChatbot] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    return 'evening';
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${darkMode ? 'dark' : ''}`}>
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2">
                <Brain className="h-8 w-8 text-indigo-600" />
                <span className="text-xl font-bold">CareerAI</span>
              </Link>
              <div className="hidden md:flex items-center gap-6">
                <Link to="/jobs" className="nav-link">Jobs</Link>
                <Link to="/companies" className="nav-link">Companies</Link>
                <Link to="/messages" className="nav-link">Messages</Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button className="relative p-2 text-gray-500 hover:text-gray-700">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <Link
                to="/profile"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100"
              >
                {user?.picture ? (
                  <img 
                    src={user.picture} 
                    alt={user.name} 
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <User className="w-5 h-5" />
                )}
                <span className="hidden md:inline">{user?.name}</span>
              </Link>
              <button className="md:hidden">
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Good {getTimeOfDay()}, {user?.name?.split(' ')[0]}! 👋
            <span className="block text-lg font-normal text-gray-600 mt-2">
              Last activity: Applied to {userActivity.lastApplied} {userActivity.lastAppliedDate}
            </span>
          </h1>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-2 text-indigo-600">
              <Sparkles className="w-5 h-5" />
              <span>{userActivity.newMatches} new job matches</span>
            </div>
            <div className="flex items-center gap-2 text-purple-600">
              <Bookmark className="w-5 h-5" />
              <span>{userActivity.savedJobs} saved jobs</span>
            </div>
          </div>
        </div>

        {/* Job Alerts */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 mb-8 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bell className="w-6 h-6" />
              <h2 className="text-xl font-semibold">Job Alerts</h2>
            </div>
            <button className="text-white/80 hover:text-white flex items-center gap-1">
              Manage Alerts
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobAlerts.map(alert => (
              <div key={alert.id} className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{alert.role}</h3>
                    <p className="text-white/80 text-sm">{alert.location}</p>
                  </div>
                  <div className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    {alert.newJobs} new jobs
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-5 relative">
              <Briefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Job title, keywords, or company"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div className="md:col-span-4 relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location or 'Remote'"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div className="md:col-span-3 flex gap-2">
              <button className="flex-1 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <Filter className="w-5 h-5" />
                <span>Filters</span>
              </button>
              <button className="flex-1 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                <Search className="w-5 h-5" />
                <span>Search</span>
              </button>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <span className="text-sm text-gray-500">Work Type:</span>
            {['All', 'Remote', 'Hybrid', 'On-site'].map((type) => (
              <button
                key={type}
                onClick={() => setWorkType(type.toLowerCase())}
                className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                  workType === type.toLowerCase()
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Application Progress */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {applicationStats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
                </div>
                <div className={`p-3 bg-${stat.color}-100 rounded-xl`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Recommendations */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Recommended for You</h2>
              <p className="text-gray-500">Based on your profile and preferences</p>
            </div>
            <button className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
              View all
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedJobs.map((job) => (
              <div
                key={job.id}
                className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all relative group"
              >
                <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50">
                    <Bookmark className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="w-12 h-12 rounded-xl"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{job.title}</h3>
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
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-medium text-gray-900">{job.match}% Match</span>
                  </div>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Insights */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BarChart className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-semibold text-gray-900">Market Insights</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {marketInsights.map((insight, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-4">
                <h3 className="font-medium text-gray-900">{insight.title}</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Growth</span>
                    <span className="text-green-600">{insight.trend}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Avg. Salary</span>
                    <span className="text-gray-900">{insight.avgSalary}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Demand</span>
                    <span className="text-indigo-600">{insight.demand}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Profile Completion & Trending Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Complete Your Profile</h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Profile Strength</span>
                  <span className="text-sm font-medium text-indigo-600">80%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-green-700">Basic Info</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                    <span className="text-yellow-700">Add Your Experience</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-yellow-500" />
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-red-500" />
                    <span className="text-red-700">Skills Assessment Pending</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-red-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Trending Skills</h2>
            <div className="space-y-4">
              {trendingSkills.map((skill, index) => (
                <div
                  key={skill}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-indigo-500" />
                    <span className="text-gray-700">{skill}</span>
                  </div>
                  <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                    Learn More
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Assistant Button */}
        <button
          onClick={() => setShowChatbot(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group"
        >
          <Bot className="w-6 h-6" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">
            Ask AI Assistant
          </span>
        </button>

        {/* AI Chatbot Dialog */}
        {showChatbot && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot className="w-6 h-6 text-indigo-600" />
                  <h2 className="text-xl font-semibold">AI Career Assistant</h2>
                </div>
                <button
                  onClick={() => setShowChatbot(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <button className="w-full p-4 bg-indigo-50 rounded-xl text-left hover:bg-indigo-100 transition-colors">
                    🎯 Optimize my resume for Software Engineer roles
                  </button>
                  <button className="w-full p-4 bg-indigo-50 rounded-xl text-left hover:bg-indigo-100 transition-colors">
                    💡 Prepare for upcoming interviews
                  </button>
                  <button className="w-full p-4 bg-indigo-50 rounded-xl text-left hover:bg-indigo-100 transition-colors">
                    📊 Show me salary insights for my role
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}