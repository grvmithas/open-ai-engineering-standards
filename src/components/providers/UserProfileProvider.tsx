'use client';

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from 'react';
import { normalizeUserIde } from '@/lib/workflows/catalog';
import type { UserProfile } from '@/lib/workflows/types';

const STORAGE_KEY = 'aies-user-profile';

interface UserProfileContextValue {
  profile: UserProfile | null;
  isLoaded: boolean;
  saveProfile: (profile: UserProfile) => void;
  clearProfile: () => void;
}

const UserProfileContext = createContext<UserProfileContextValue | null>(null);
const profileListeners = new Set<() => void>();

function subscribeProfile(callback: () => void) {
  profileListeners.add(callback);
  window.addEventListener('storage', callback);
  return () => {
    profileListeners.delete(callback);
    window.removeEventListener('storage', callback);
  };
}

function notifyProfile() {
  profileListeners.forEach(listener => listener());
}

function readRawProfile() {
  return localStorage.getItem(STORAGE_KEY);
}

function subscribeNoop() {
  return () => {};
}

function parseProfile(raw: string | null): UserProfile | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<UserProfile>;
    const ide = normalizeUserIde(parsed.ide);
    // Sprint B: require model + dataClass — older profiles re-onboard
    if (!parsed.model || !parsed.dataClass || !parsed.stack || !ide) return null;
    return { ...parsed, ide } as UserProfile;
  } catch {
    return null;
  }
}

export function UserProfileProvider({ children }: { children: React.ReactNode }) {
  const raw = useSyncExternalStore(subscribeProfile, readRawProfile, () => null);
  const isLoaded = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const profile = useMemo(() => parseProfile(raw), [raw]);

  const saveProfile = useCallback((next: UserProfile) => {
    const withTimestamp = { ...next, completedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(withTimestamp));
    notifyProfile();
  }, []);

  const clearProfile = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    notifyProfile();
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
