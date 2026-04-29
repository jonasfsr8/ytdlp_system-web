import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AUTH_STORAGE_KEY } from "../../shared/utils/storage";

export interface AuthUser {
  id?: string;
  name?: string;
  email?: string;
}

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  setAuth: (payload: { token: string; user?: AuthUser | null }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuth: ({ token, user = null }) => set({ token, user }),
      logout: () => set({ token: null, user: null }),
    }),
    {
      name: AUTH_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
    },
  ),
);
