'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { UserProfile } from '@/lib/workflows/types';

const STORAGE_KEY = 'aies-user-profile';

interface UserProfileContextValue {
  profile: UserProfile | null;
  isLoaded: boolean;
  saveProfile: (profile: UserProfile) => void;
  clearProfile: () => void;
}

const UserProfileContext = createContext<UserProfileContextValue | null>(null);

function readProfile(): UserProfile | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<UserProfile>;
    // Sprint B: require model + dataClass — force re-onboarding for older profiles
    if (!parsed.model || !parsed.dataClass || !parsed.stack || !parsed.ide) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed as UserProfile;
  } catch {
    return null;
  }
}

export function UserProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setProfile(readProfile());
    setIsLoaded(true);
  }, []);

  const saveProfile = useCallback((next: UserProfile) => {
    const withTimestamp = { ...next, completedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(withTimestamp));
    setProfile(withTimestamp);
  }, []);

  const clearProfile = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setProfile(null);
  }, []);

  const value = useMemo(
    () => ({ profile, isLoaded, saveProfile, clearProfile }),
    [profile, isLoaded, saveProfile, clearProfile],
  );

  return <UserProfileContext.Provider value={value}>{children}</UserProfileContext.Provider>;
}

export function useUserProfile() {
  const ctx = useContext(UserProfileContext);
  if (!ctx) {
    throw new Error('useUserProfile must be used within UserProfileProvider');
  }
  return ctx;
}

export function useUserProfileOptional() {
  return useContext(UserProfileContext);
}
