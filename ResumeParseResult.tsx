import React from 'react';
import { ParsedResume } from '../types/resume';
import { Briefcase, GraduationCap, Code, Award, Languages, AlignCenterVertical as Certificate, Trophy, Heart } from 'lucide-react';

interface ResumeParseResultProps {
  result: ParsedResume;
}

export default function ResumeParseResult({ result }: ResumeParseResultProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-8">
      {/* Professional Experience */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Briefcase className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Professional Experience</h2>
        </div>
        <div className="space-y-6">
          {result.professionalExperience.map((exp, index) => (
            <div key={index} className="border-l-2 border-blue-200 pl-4">
              <h3 className="text-lg font-medium text-gray-900">{exp.jobTitle}</h3>
              <p className="text-gray-600">{exp.company}</p>
              <p className="text-sm text-gray-500">{exp.dates}</p>
              
              {exp.responsibilities.length > 0 && (
                <div className="mt-2">
                  <h4 className="text-sm font-medium text-gray-700">Key Responsibilities:</h4>
                  <ul className="mt-1 space-y-1">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="text-sm text-gray-600">• {resp}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {exp.achievements.length > 0 && (
                <div className="mt-2">
                  <h4 className="text-sm font-medium text-gray-700">Achievements:</h4>
                  <ul className="mt-1 space-y-1">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="text-sm text-gray-600">• {achievement}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <GraduationCap className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Education</h2>
        </div>
        <div className="space-y-4">
          {result.education.map((edu, index) => (
            <div key={index} className="border-l-2 border-blue-200 pl-4">
              <h3 className="text-lg font-medium text-gray-900">{edu.degree}</h3>
              <p className="text-gray-600">{edu.institution}</p>
              <p className="text-sm text-gray-500">{edu.graduationDate}</p>
              
              {edu.achievements.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {edu.achievements.map((achievement, i) => (
                    <li key={i} className="text-sm text-gray-600">• {achievement}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Technical Skills */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Code className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Technical Skills</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {result.technicalSkills.map((category, index) => (
            <div key={index} className="border-l-2 border-blue-200 pl-4">
              <h3 className="text-lg font-medium text-gray-900">{category.category}</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Qualifications */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Additional Qualifications</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Languages */}
          {result.additionalQualifications.languages.length > 0 && (
            <div className="border-l-2 border-blue-200 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <Languages className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-medium text-gray-900">Languages</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {result.additionalQualifications.languages.map((lang, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {result.additionalQualifications.certifications.length > 0 && (
            <div className="border-l-2 border-blue-200 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <Certificate className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-medium text-gray-900">Certifications</h3>
              </div>
              <ul className="space-y-1">
                {result.additionalQualifications.certifications.map((cert, i) => (
                  <li key={i} className="text-sm text-gray-600">• {cert}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Awards */}
          {result.additionalQualifications.awards.length > 0 && (
            <div className="border-l-2 border-blue-200 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-medium text-gray-900">Awards</h3>
              </div>
              <ul className="space-y-1">
                {result.additionalQualifications.awards.map((award, i) => (
                  <li key={i} className="text-sm text-gray-600">• {award}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Volunteer Work */}
          {result.additionalQualifications.volunteerWork.length > 0 && (
            <div className="border-l-2 border-blue-200 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-medium text-gray-900">Volunteer Work</h3>
              </div>
              <ul className="space-y-1">
                {result.additionalQualifications.volunteerWork.map((work, i) => (
                  <li key={i} className="text-sm text-gray-600">• {work}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}