import React, { useState } from 'react';
import {
  Brain,
  FileText,
  Target,
  LineChart,
  Calendar,
  Users,
  MapPin,
  Bell,
  ChevronRight,
  CheckCircle,
  BookOpen,
  BriefcaseIcon,
  Building,
  DollarSign,
  MessageSquare,
} from 'lucide-react';

interface Step {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

export default function WelcomeDialog({ onClose }: { onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    jobTitle: '',
    experience: '',
    location: '',
    workType: 'hybrid',
    salary: '',
    skills: [] as string[],
  });

  const steps: Step[] = [
    {
      id: 'profile',
      title: 'Complete Your Profile',
      description: 'Let\'s start by understanding your career goals',
      icon: <Brain className="w-6 h-6" />,
      component: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Desired Job Title
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. Senior Software Engineer"
              value={formData.jobTitle}
              onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Years of Experience
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            >
              <option value="">Select experience</option>
              <option value="0-2">0-2 years</option>
              <option value="3-5">3-5 years</option>
              <option value="5-10">5-10 years</option>
              <option value="10+">10+ years</option>
            </select>
          </div>
        </div>
      ),
    },
    {
      id: 'preferences',
      title: 'Work Preferences',
      description: 'Help us find the perfect work environment for you',
      icon: <Target className="w-6 h-6" />,
      component: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Location
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. San Francisco, CA"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Work Type
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['remote', 'hybrid', 'onsite'].map((type) => (
                <button
                  key={type}
                  className={`px-4 py-2 rounded-lg border ${
                    formData.workType === type
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 hover:border-indigo-300'
                  } capitalize`}
                  onClick={() => setFormData({ ...formData, workType: type })}
                  type="button"
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'skills',
      title: 'Skills & Expertise',
      description: 'Let\'s highlight your key skills',
      icon: <BookOpen className="w-6 h-6" />,
      component: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Key Skills
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm flex items-center"
                >
                  {skill}
                  <button
                    onClick={() => setFormData({
                      ...formData,
                      skills: formData.skills.filter((s) => s !== skill),
                    })}
                    className="ml-2 hover:text-indigo-900"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Type a skill and press Enter"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.currentTarget.value) {
                  e.preventDefault();
                  setFormData({
                    ...formData,
                    skills: [...formData.skills, e.currentTarget.value],
                  });
                  e.currentTarget.value = '';
                }
              }}
            />
          </div>
        </div>
      ),
    },
  ];

  const features = [
    {
      icon: <FileText className="w-5 h-5" />,
      title: 'Resume Analysis',
      description: 'AI-powered resume parsing and optimization',
    },
    {
      icon: <LineChart className="w-5 h-5" />,
      title: 'Market Insights',
      description: 'Real-time salary data and industry trends',
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      title: 'Interview Prep',
      description: 'Smart scheduling and preparation tools',
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: 'Network Growth',
      description: 'Connect with industry professionals',
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Progress Bar */}
        <div className="bg-gray-50 px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold text-gray-900">
              {steps[currentStep].title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              Skip
            </button>
          </div>
          <div className="flex gap-2">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`h-1 flex-1 rounded-full ${
                  index <= currentStep ? 'bg-indigo-600' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-5 divide-x divide-gray-200">
          {/* Left Panel */}
          <div className="md:col-span-3 p-6">
            <p className="text-gray-600 mb-6">{steps[currentStep].description}</p>
            {steps[currentStep].component}
          </div>

          {/* Right Panel */}
          <div className="md:col-span-2 p-6 bg-gray-50">
            <h3 className="font-semibold text-gray-900 mb-4">
              Features You'll Love
            </h3>
            <div className="space-y-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex items-start gap-3 group"
                >
                  <div className="p-2 rounded-lg bg-white shadow-sm group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 flex justify-between items-center bg-white">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            className="text-gray-600 hover:text-gray-900"
            disabled={currentStep === 0}
          >
            Back
          </button>
          <button
            onClick={() => {
              if (currentStep < steps.length - 1) {
                setCurrentStep((prev) => prev + 1);
              } else {
                onClose();
              }
            }}
            className="btn-primary"
          >
            {currentStep === steps.length - 1 ? 'Get Started' : 'Continue'}
            <ChevronRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}