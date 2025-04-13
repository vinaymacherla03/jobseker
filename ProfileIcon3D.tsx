import React from 'react';
import { Briefcase, GraduationCap, Settings, Award } from 'lucide-react';

interface ProfileIcon3DProps {
  type: 'experience' | 'education' | 'skills' | 'certifications';
  size?: number;
  className?: string;
}

export default function ProfileIcon3D({ type, size = 48, className = '' }: ProfileIcon3DProps) {
  const getIconConfig = () => {
    switch (type) {
      case 'experience':
        return {
          Icon: Briefcase,
          bgColor: 'bg-blue-500',
          shadowColor: 'rgba(37, 99, 235, 0.4)',
          hoverColor: 'bg-blue-600',
        };
      case 'education':
        return {
          Icon: GraduationCap,
          bgColor: 'bg-emerald-500',
          shadowColor: 'rgba(5, 150, 105, 0.4)',
          hoverColor: 'bg-emerald-600',
        };
      case 'skills':
        return {
          Icon: Settings,
          bgColor: 'bg-orange-500',
          shadowColor: 'rgba(234, 88, 12, 0.4)',
          hoverColor: 'bg-orange-600',
        };
      case 'certifications':
        return {
          Icon: Award,
          bgColor: 'bg-purple-500',
          shadowColor: 'rgba(124, 58, 237, 0.4)',
          hoverColor: 'bg-purple-600',
        };
    }
  };

  const { Icon, bgColor, shadowColor, hoverColor } = getIconConfig();

  return (
    <div
      className={`relative group ${className}`}
      style={{
        width: size,
        height: size,
        perspective: '1000px',
      }}
    >
      <div
        className={`
          absolute inset-0 rounded-xl ${bgColor} ${hoverColor} transition-all duration-300
          transform-gpu group-hover:rotate-y-15 group-hover:rotate-x-15 group-hover:scale-110
          group-active:scale-95 cursor-pointer
        `}
        style={{
          transformStyle: 'preserve-3d',
          boxShadow: `0 0 20px ${shadowColor}`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <Icon
            size={size * 0.5}
            className="transform group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        
        {/* 3D effect layers */}
        <div
          className={`absolute inset-0 rounded-xl ${bgColor} opacity-50`}
          style={{
            transform: 'translateZ(-8px)',
            filter: 'blur(2px)',
          }}
        />
        
        {/* Click ripple effect */}
        <div className="absolute inset-0 rounded-xl overflow-hidden">
          <div
            className={`
              absolute inset-0 opacity-0 group-active:opacity-20
              radial-gradient-ripple bg-white transform scale-0
              group-active:scale-[2.5] transition-all duration-500
            `}
          />
        </div>
      </div>
    </div>
  );
}