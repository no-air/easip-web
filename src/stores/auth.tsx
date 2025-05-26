import { create } from "zustand";

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  isTemporaryToken: boolean;
};

interface AuthActions {
  actions: {
    initStore: (state: AuthState) => void;
    setAccessToken: (token: string | null) => void;
    setRefreshToken: (token: string | null) => void;
  };
}

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  accessToken: null,
  refreshToken: null,
  isTemporaryToken: false,

  actions: {
    initStore: (state) => set(() => state),
    setAccessToken: (token) => set(() => ({ accessToken: token })),
    setRefreshToken: (token) => set(() => ({ refreshToken: token })),
  },
}));
