"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "@/lib/types";

const USER_KEY = "store-user";

interface AuthCtx {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const Ctx = createContext<AuthCtx | null>(null);

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth fuera de AuthProvider");
  return ctx;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(USER_KEY);
      if (saved) setUser(JSON.parse(saved));
    } catch {}
  }, []);

  const login = (u: User) => {
    setUser(u);
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(u));
    } catch {}
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(USER_KEY);
    } catch {}
  };

  return <Ctx.Provider value={{ user, login, logout }}>{children}</Ctx.Provider>;
}
