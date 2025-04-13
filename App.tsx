import React from 'react';
import {
  Brain,
  FileSearch,
  LineChart,
  Clock,
  Target,
  Rocket,
  CheckCircle,
  ArrowRight,
  Menu,
} from 'lucide-react';
import SearchBarWithResume from './components/SearchBarWithResume';

const stats = [
  { label: 'Job Matches Made', value: '150K+' },
  { label: 'Success Rate', value: '94%' },
  { label: 'Time Saved', value: '75%' },
  { label: 'Active Companies', value: '10K+' },
];

const features = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: 'AI-Powered Matching',
    description: 'Advanced algorithms that understand your unique skills and career goals',
  },
  {
    icon: <FileSearch className="w-6 h-6" />,
    title: 'Smart Resume Parsing',
    description: 'Intelligent analysis of your experience and qualifications',
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Personalized Recommendations',
    description: 'Tailored job suggestions based on your profile and preferences',
  },
  {
    icon: <LineChart className="w-6 h-6" />,
    title: 'Market Insights',
    description: 'Real-time data on industry trends and salary benchmarks',
  },
];

const benefits = [
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Save Time',
    description: 'Cut your job search time by 75% with AI-powered matching that instantly connects you with relevant opportunities.',
    stats: '75% faster',
    highlight: 'Average time to first interview: 5 days'
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: 'Higher Match Accuracy',
    description: 'Our AI understands your unique skills and experience to deliver precisely matched job opportunities.',
    stats: '94% accuracy',
    highlight: '9 out of 10 matches lead to interviews'
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    title: 'Career Growth',
    description: 'Receive personalized career path recommendations and skill development insights to accelerate your growth.',
    stats: '3x faster',
    highlight: 'Career progression rate vs. traditional methods'
  },
];

const companies = [];

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="relative">
                <Brain className="h-8 w-8 text-blue-600 group-hover:scale-110 transition-transform duration-200" />
                <div className="absolute -inset-2 bg-blue-100 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-200"></div>
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:opacity-80 transition-opacity duration-200">
                CareerAI
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="nav-link group">
                Features
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-indigo-600"></span>
              </a>
              <a href="#benefits" className="nav-link group">
                Benefits
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-indigo-600"></span>
              </a>
              <a href="/signin" className="nav-link group">
                Sign In
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-indigo-600"></span>
              </a>
              <a href="/signup" className="btn-primary flex items-center gap-2 group">
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            <div className="md:hidden">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <Menu className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-[85vh] overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563eb' fill-opacity='0.07'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex-1 max-w-2xl">
              <div className="animate-fade-in">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm mb-6">
                  <Brain className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-800">AI-Powered Job Matching</span>
                </div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
                  Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 animate-gradient">Dream Job</span> With AI
                </h1>
                <p className="mt-6 text-xl text-gray-600 leading-relaxed max-w-xl">
                  Let our intelligent platform match you with the perfect opportunities. Experience personalized job recommendations powered by advanced AI.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <a href="/signup" className="btn-primary group flex items-center justify-center text-lg px-8 py-4">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a href="#features" className="btn-secondary flex items-center justify-center text-lg">
                    Watch Demo
                  </a>
                </div>
                <div className="mt-12">
                  <SearchBarWithResume
                    onSearch={(query) => console.log('Searching:', query)}
                    onFileUpload={async (file) => {
                      // Simulate file upload
                      await new Promise(resolve => setTimeout(resolve, 1500));
                      console.log('Uploaded file:', file.name);
                    }}
                  />
                </div>
                <div className="mt-12 flex items-center gap-8">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-indigo-100 flex items-center justify-center">
                        <span className="text-xs font-medium text-indigo-600">★</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">Join 150,000+</span> professionals who found their dream jobs
                  </p>
                </div>
              </div>
            </div>
            <div className="flex-1 relative w-full max-w-2xl">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300 animate-float-slow">
                <img
                  className="w-full h-full object-cover"
                  src="https://img.freepik.com/free-vector/hand-drawn-flat-design-rpa-illustration_23-2149277643.jpg?t=st=1741544080~exp=1741547680~hmac=ad4ea6e4499bc1536eff8e490e321cf23daf9fca06d5bee5d12f42902bebcdf3&w=1060"
                  alt="AI-powered career advancement"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              <div className="absolute -z-10 -inset-4 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-20 blur-3xl rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-card text-center">
                <div className="text-3xl font-extrabold text-blue-600">{stat.value}</div>
                <div className="mt-2 text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Powered by Advanced Technology
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Our AI-driven platform makes job searching smarter and more efficient
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <div key={feature.title} className="feature-card flex flex-col items-center text-center px-6 py-8">
                  <div className="flex items-center justify-center p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg mb-6">
                    {React.cloneElement(feature.icon, { className: 'h-7 w-7 text-white' })}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div id="benefits" className="bg-gradient-to-b from-gray-50 to-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563eb' fill-opacity='0.07'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block px-4 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-4">
              Why Choose CareerAI
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Benefits That Make a Difference
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience a smarter way to advance your career
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="feature-card overflow-hidden p-8 group"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white transform transition-transform group-hover:scale-110 mb-6">
                      {benefit.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {benefit.title}
                    </h3>
                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
                      {benefit.stats}
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {benefit.description}
                    </p>
                    <div className="mt-auto">
                      <div className="inline-block px-4 py-2 rounded-lg bg-indigo-50 text-sm text-indigo-700">
                        {benefit.highlight}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <button className="btn-primary inline-flex items-center">
                Start Your Career Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-gray-800 pt-16 pb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Newsletter Section */}
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Stay Updated with CareerAI</h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Get the latest job opportunities and career insights delivered to your inbox
            </p>
            <form className="max-w-md mx-auto flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>

          {/* Main Footer Content */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Brain className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold text-white">CareerAI</span>
              </div>
              <p className="text-gray-400 mb-6">
                Empowering careers through AI-driven job matching and professional growth.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-blue-400 tracking-wider uppercase mb-4">
                Company
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white hover:translate-x-1 inline-flex items-center transition-all duration-200">
                    About
                    <ArrowRight className="ml-1 h-4 w-4 opacity-0 group-hover:opacity-100" />
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-blue-400 tracking-wider uppercase mb-4">
                Resources
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    Guides
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-blue-400 tracking-wider uppercase mb-4">
                Legal
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-blue-400 tracking-wider uppercase mb-4">
                Social
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white inline-flex items-center group">
                    Twitter
                    <ArrowRight className="ml-1 h-4 w-4 opacity-0 group-hover:opacity-100 transition-all" />
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2025 CareerAI. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;