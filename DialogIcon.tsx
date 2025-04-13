import React from 'react';
import { MessageSquare } from 'lucide-react';

interface DialogIconProps {
  variant?: 'light' | 'dark';
  size?: number;
  className?: string;
}

export default function DialogIcon({ 
  variant = 'light', 
  size = 40,
  className = ''
}: DialogIconProps) {
  const baseClasses = `
    relative group cursor-pointer transform-gpu transition-all duration-300
    hover:scale-105 active:scale-95
  `;

  const variantClasses = {
    light: {
      outer: 'bg-gradient-to-br from-white to-gray-100 shadow-lg hover:shadow-xl',
      inner: 'bg-gradient-to-br from-blue-500 to-indigo-600',
      icon: 'text-white',
      glow: 'from-blue-500/20 to-indigo-500/20'
    },
    dark: {
      outer: 'bg-gradient-to-br from-gray-900 to-gray-800 shadow-lg hover:shadow-xl',
      inner: 'bg-gradient-to-br from-blue-400 to-indigo-500',
      icon: 'text-white',
      glow: 'from-blue-400/20 to-indigo-400/20'
    }
  };

  const classes = variantClasses[variant];

  return (
    <div 
      className={`
        ${baseClasses}
        ${classes.outer}
        rounded-2xl
        ${className}
      `}
      style={{ 
        width: size,
        height: size
      }}
    >
      {/* Glow Effect */}
      <div 
        className={`
          absolute -inset-2 bg-gradient-to-r ${classes.glow}
          blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
          rounded-[28px]
        `}
      />

      {/* Main Container */}
      <div className="relative h-full w-full p-2">
        {/* Dialog Box Shape */}
        <div 
          className={`
            ${classes.inner}
            h-full w-full rounded-lg
            flex items-center justify-center
            transform transition-transform duration-300
            group-hover:scale-105
          `}
        >
          <MessageSquare 
            className={`
              ${classes.icon}
              w-1/2 h-1/2
              transform transition-all duration-300
              group-hover:scale-110 group-active:scale-95
            `}
          />
        </div>

        {/* Subtle Inner Shadow */}
        <div 
          className="
            absolute inset-0 rounded-lg
            shadow-inner pointer-events-none
            bg-black/5
          "
        />
      </div>

      {/* Interactive Ripple Effect */}
      <div 
        className="
          absolute inset-0 rounded-2xl overflow-hidden
          pointer-events-none
        "
      >
        <div 
          className="
            absolute inset-0 
            radial-gradient-ripple
            opacity-0 group-active:opacity-20
            transform scale-0 group-active:scale-[2.5]
            transition-all duration-500
          "
        />
      </div>
    </div>
  );
}