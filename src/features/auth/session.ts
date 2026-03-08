import { type User } from "./types";

const SESSION_KEY = "roselle-auth-session";
export const SESSION_DURATION_MS = 5 * 60 * 1000;

type SessionData = {
  user: User;
  expiresAt: number;
};

function canUseStorage() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function createAuthSession(user: User) {
  if (!canUseStorage()) {
    return null;
  }

  const session: SessionData = {
    user,
    expiresAt: Date.now() + SESSION_DURATION_MS,
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));

  return session;
}

export function clearAuthSession() {
  if (!canUseStorage()) {
    return;
  }

  localStorage.removeItem(SESSION_KEY);
}

export function getAuthSession(): SessionData | null {
  if (!canUseStorage()) {
    return null;
  }

  const raw = localStorage.getItem(SESSION_KEY);

  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as SessionData;

    if (!parsed?.user || !parsed?.expiresAt || Date.now() >= parsed.expiresAt) {
      clearAuthSession();
      return null;
    }

    return parsed;
  } catch {
    clearAuthSession();
    return null;
  }
}
