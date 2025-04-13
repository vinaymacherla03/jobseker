import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import {
  User, MapPin, Mail, Phone, Camera, Edit2, Link as LinkIcon, ThumbsUp,
  Share2, MessageSquare, UserPlus, Plus, X, Trophy, TrendingUp, Users, Target, Medal, Award,
  Loader2, Building, GraduationCap
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import EditProfileDialog from '../components/EditProfileDialog';
import ProfileIcon3D from '../components/ProfileIcon3D';
import ExperienceForm from '../components/ExperienceForm';
import EducationForm from '../components/EducationForm';
import { Achievement, Skill, Certification } from '../types/profile';
import AchievementForm from '../components/AchievementForm';
import SkillsForm from '../components/SkillsForm';
import CertificationForm from '../components/CertificationForm';
import WorkExperienceManager from '../components/WorkExperienceManager';
import EducationManager from '../components/EducationManager';

export default function Profile() {
  const { user, isAuthenticated, updateProfile } = useAuthStore();
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [showEducationForm, setShowEducationForm] = useState(false);
  const [experiences, setExperiences] = useState<WorkExperience[]>([{
    id: '1',
    title: '',
    company: '',
    startDate: '',
    current: false,
    description: '',
    location: ''
  }]);
  const [educations, setEducations] = useState<Education[]>([{
    id: '1',
    degree: '',
    school: '',
    field: '',
    startYear: '',
    endYear: '',
    description: ''
  }]);
  const [showAchievementForm, setShowAchievementForm] = useState(false);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [savingAchievement, setSavingAchievement] = useState(false);
  const [showSkillsForm, setShowSkillsForm] = useState(false);
  const [showCertificationForm, setShowCertificationForm] = useState(false);
  const [skills, setSkills] = useState<Skill[]>([{
    id: '1',
    name: '',
    category: '',
    endorsements: 0
  }]);
  const [certifications, setCertifications] = useState<Certification[]>([]);

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  const handleSaveEducation = async (education: Education) => {
    setEducations(prev => [...prev, education]);
  };

  const handleDeleteEducation = (educationId: string) => {
    setEducations(prev => prev.filter(edu => edu.id !== educationId));
  };

  const handleSaveExperience = async (experience: WorkExperience) => {
    setExperiences(prev => [...prev, experience]);
  };

  const handleDeleteExperience = (experienceId: string) => {
    setExperiences(prev => prev.filter(exp => exp.id !== experienceId));
  };

  const handleSaveAchievement = async (achievement: Achievement) => {
    setSavingAchievement(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAchievements(prev => [...prev, achievement]);
    } finally {
      setSavingAchievement(false);
    }
  };

  const handleEndorse = async (achievementId: string) => {
    setAchievements(prev =>
      prev.map(achievement =>
        achievement.id === achievementId
          ? { ...achievement, endorsements: achievement.endorsements + 1 }
          : achievement
      )
    );
  };

  const handleSaveProfile = (data: any) => {
    updateProfile({
      name: data.name,
      title: data.title,
      email: data.email,
      phone: data.phone,
      location: data.location,
      summary: data.summary
    });
    setShowEditDialog(false);
  };

  const handleSaveSkill = async (skill: Skill) => {
    setSkills(prev => [...prev, skill]);
  };

  const handleDeleteSkill = (skillId: string) => {
    setSkills(prev => prev.filter(skill => skill.id !== skillId));
  };

  const handleSaveCertification = async (certification: Certification) => {
    setCertifications(prev => [...prev, certification]);
  };

  const handleDeleteCertification = (certificationId: string) => {
    setCertifications(prev => prev.filter(cert => cert.id !== certificationId));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <EditProfileDialog 
        isOpen={showEditDialog}
        onClose={() => setShowEditDialog(false)}
        onSave={handleSaveProfile}
        initialData={{
          name: user?.name || '',
          title: user?.title || '',
          email: user?.email || '',
          phone: user?.phone || '',
          location: user?.location || '',
          summary: user?.summary || ''
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-600 px-8 py-12 relative">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Profile Photo */}
              <div className="relative group">
                <div className="w-40 h-40 rounded-full bg-white/10 border-4 border-white/20 
                            flex items-center justify-center overflow-hidden backdrop-blur-sm
                            shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                  {user?.picture ? (
                    <img 
                      src={user.picture} 
                      alt={user.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <User className="w-20 h-20 text-white/70" />
                  )}
                </div>
                <button 
                  className="absolute bottom-2 right-2 bg-white rounded-full p-3 shadow-lg 
                           hover:shadow-xl transition-all hover:scale-110"
                  aria-label="Change profile photo"
                >
                  <Camera className="w-5 h-5 text-indigo-600" />
                </button>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h1 className="text-4xl font-bold text-white">
                      {user?.name || 'Add Your Name'}
                    </h1>
                    <p className="text-xl text-white/90 mt-1">{user?.title || 'Add Your Title'}</p>
                    <div className="flex flex-wrap items-center gap-4 mt-3 text-white/80">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{user?.location || 'Add location'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        <span>{user?.email || 'Add email'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        <span>{user?.phone || 'Add phone'}</span>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center gap-4">
                      <button
                        onClick={() => setShowEditDialog(true)}
                        className="btn-primary flex items-center gap-2"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit Profile
                      </button>
                      <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 
                                     rounded-lg transition-colors flex items-center gap-2">
                        <Share2 className="w-4 h-4" />
                        Share Profile
                      </button>
                    </div>
                  </div>
                  
                  {/* Profile Stats */}
                  <div className="flex items-center gap-6 bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-1">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">500+</div>
                        <div className="text-sm text-white/80">Connections</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">2.5k</div>
                        <div className="text-sm text-white/80">Profile views</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">150+</div>
                        <div className="text-sm text-white/80">Posts</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors">
                    <MessageSquare className="w-5 h-5" />
                    Message
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors">
                    <UserPlus className="w-5 h-5" />
                    Connect
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors">
                    <LinkIcon className="w-5 h-5" />
                    Copy Profile Link
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
            <div className="md:col-span-3 space-y-6">
              {/* About Section */}
              <section className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">About</h2>
                  <button
                    onClick={() => setShowEditDialog(true)}
                    className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span className="text-sm">Edit</span>
                  </button>
                </div>
                <div className="prose prose-indigo max-w-none">
                  <p className="text-gray-600 leading-relaxed">
                    {user?.summary || 'Add a summary to tell others about yourself...'}
                  </p>
                </div>
              </section>

              {/* Experience Section */}
              <section className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <ProfileIcon3D type="experience" size={40} />
                    Experience
                  </h2>
                  <button
                    onClick={() => setShowExperienceForm(true)}
                    className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 p-2 rounded-lg transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="group flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                      {exp.logo ? (
                        <img src={exp.logo} alt={exp.company} className="w-12 h-12 object-contain" />
                      ) : (
                        <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                          <Building className="w-6 h-6 text-indigo-600" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{exp.title}</h3>
                        <p className="text-gray-600">{exp.company}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span>{new Date(exp.startDate).toLocaleDateString()} - {exp.current ? 'Present' : new Date(exp.endDate!).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>{exp.location}</span>
                        </div>
                        <p className="mt-2 text-gray-600">{exp.description}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteExperience(exp.id)}
                        className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* Education Section */}
              <section className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow mb-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <ProfileIcon3D type="education" size={40} />
                    Education
                  </h2>
                  <button
                    onClick={() => setShowEducationForm(true)}
                    className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 p-2 rounded-lg transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  {educations.map((edu) => (
                    <div key={edu.id} className="group flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                      {edu.logo ? (
                        <img src={edu.logo} alt={edu.school} className="w-12 h-12 object-contain" />
                      ) : (
                        <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                          <GraduationCap className="w-6 h-6 text-emerald-600" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{edu.degree} in {edu.field}</h3>
                        <p className="text-gray-600">{edu.school}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span>{edu.startYear} - {edu.endYear}</span>
                          {edu.location && (
                            <>
                              <span>•</span>
                              <span>{edu.location}</span>
                            </>
                          )}
                          {edu.gpa && (
                            <>
                              <span>•</span>
                              <span>GPA: {edu.gpa}</span>
                            </>
                          )}
                        </div>
                        {edu.description && (
                          <p className="mt-2 text-gray-600">{edu.description}</p>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteEducation(edu.id)}
                        className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-emerald-600 rounded-lg hover:bg-emerald-50 transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* Skills Section */}
              <section className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow mb-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <ProfileIcon3D type="skills" size={40} />
                    Skills & Expertise
                  </h2>
                  <button
                    onClick={() => setShowSkillsForm(true)}
                    className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 p-2 rounded-lg transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="group relative px-4 py-2 bg-indigo-50 text-indigo-600 
                               rounded-lg text-sm hover:bg-indigo-100 transition-colors cursor-pointer
                               flex items-center gap-2"
                    >
                      <span>{skill.name}</span>
                      <button
                        onClick={() => handleDeleteSkill(skill.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4 hover:text-indigo-800" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="relative mt-6">
                  <input
                    type="text"
                    placeholder="Add a skill (e.g. JavaScript, Project Management, etc.)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                             focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 
                                 text-gray-400 hover:text-indigo-600 p-1 hover:bg-indigo-50 rounded-full">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </section>

              {/* Certifications Section */}
              <section className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow mb-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <ProfileIcon3D type="certifications" size={40} />
                    Certifications & Licenses
                  </h2>
                  <button
                    onClick={() => setShowCertificationForm(true)}
                    className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 p-2 rounded-lg transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  {certifications.map((cert, index) => (
                    <div key={cert.id} className="group flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                      <img src={cert.logo} alt={cert.name} className="w-12 h-12 object-contain" />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{cert.name}</h3>
                        <p className="text-gray-600">{cert.issuer}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span>Issued {new Date(cert.issueDate).toLocaleDateString()}</span>
                          <span>•</span>
                          {cert.expiryDate && (
                            <span>Expires {new Date(cert.expiryDate).toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteCertification(cert.id)}
                        className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 
                                     hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all">
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* Featured Achievements */}
              <section className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between p-6">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <Trophy className="w-8 h-8 text-yellow-500" />
                    Featured Achievements
                    <span className="ml-2 text-sm font-normal text-gray-500">
                      ({achievements.length})
                    </span>
                  </h2>
                  <button
                    onClick={() => setShowAchievementForm(true)}
                    className="btn-primary flex items-center gap-2 text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Add Achievement
                  </button>
                </div>
              
                <div className="divide-y divide-gray-100">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="p-6 hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl text-white">
                          {achievement.type === 'performance' && <TrendingUp className="w-6 h-6" />}
                          {achievement.type === 'leadership' && <Users className="w-6 h-6" />}
                          {achievement.type === 'award' && <Medal className="w-6 h-6" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium text-gray-900">{achievement.title}</h3>
                              {achievement.metric && (
                                <p className="text-3xl font-bold text-indigo-600 mt-2">
                                  {achievement.metric}
                                </p>
                              )}
                              <p className="text-gray-600 mt-2">{achievement.description}</p>
                            </div>
                            <button className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-white transition-all">
                              <Edit2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="mt-4 flex items-center gap-4">
                            <button
                              onClick={() => handleEndorse(achievement.id)}
                              className="flex items-center gap-1 text-gray-500 hover:text-indigo-600 transition-colors"
                            >
                              <ThumbsUp className="w-4 h-4" />
                              <span className="text-sm">{achievement.endorsements} endorsements</span>
                            </button>
                            <span className="text-gray-300">•</span>
                            {achievement.verifiedBy ? (
                              <span className="text-sm text-gray-500">
                                Verified by {achievement.verifiedBy}
                              </span>
                            ) : (
                              <span className="text-sm text-gray-500">
                                Added on {new Date(achievement.date).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {achievements.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                      <Trophy className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <p className="text-lg font-medium mb-2">No achievements yet</p>
                      <p className="mb-4">Start adding your professional accomplishments</p>
                      <button
                        onClick={() => setShowAchievementForm(true)}
                        className="btn-primary inline-flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add Your First Achievement
                      </button>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      <AchievementForm
        isOpen={showAchievementForm}
        onClose={() => setShowAchievementForm(false)}
        onSave={handleSaveAchievement}
      />
      <SkillsForm
        isOpen={showSkillsForm}
        onClose={() => setShowSkillsForm(false)}
        onSave={handleSaveSkill}
        existingSkills={skills}
      />
      <CertificationForm
        isOpen={showCertificationForm}
        onClose={() => setShowCertificationForm(false)}
        onSave={handleSaveCertification}
      />
      <ExperienceForm
        isOpen={showExperienceForm}
        onClose={() => setShowExperienceForm(false)}
        onSave={handleSaveExperience}
      />
      <EducationForm
        isOpen={showEducationForm}
        onClose={() => setShowEducationForm(false)}
        onSave={handleSaveEducation}
      />
    </div>
  );
}