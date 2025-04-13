import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  user: null | {
    email: string;
    name?: string;
    title?: string;
    bio?: string;
    phone?: string;
    location?: string;
    company?: string;
    summary?: string;
    picture?: string;
    skills?: string[];
    connections?: number;
    followers?: number;
    following?: number;
    availability?: 'actively-looking' | 'open' | 'not-looking';
    experience?: Array<{
      id: string;
      title: string;
      company: string;
      startDate: string;
      endDate?: string;
      description: string;
    }>;
    education?: Array<{
      id: string;
      degree: string;
      school: string;
      startYear: string;
      endYear: string;
      field: string;
    }>;
    certifications?: Array<{
      id: string;
      name: string;
      issuer: string;
      issueDate: string;
      expiryDate?: string;
    }>;
    privacySettings?: {
      hideJobSearch: boolean;
      profileVisibility: 'public' | 'connections' | 'private';
      activityVisibility: 'public' | 'connections' | 'private';
    };
  };
  setUser: (user: AuthState['user']) => void;
  updateProfile: (data: Partial<AuthState['user']>) => void;
  updatePrivacySettings: (settings: { hideJobSearch: boolean }) => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  updateProfile: (data) => set((state) => ({
    user: state.user ? { ...state.user, ...data } : null
  })),
  updatePrivacySettings: (settings) => set((state) => ({
    user: state.user ? {
      ...state.user,
      privacySettings: {
        ...state.user.privacySettings,
        ...settings
      }
    } : null
  })),
  signOut: () => set({ user: null, isAuthenticated: false }),
}));