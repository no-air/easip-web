import { create } from "zustand";

type AuthState = {
  accessToken: string | null;
};

interface AuthActions {
  actions: {
    setAccessToken: (token: string | null) => void;
  };
}

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  accessToken: null,

  actions: {
    setAccessToken: (token) => set(() => ({ accessToken: token })),
  },
}));
