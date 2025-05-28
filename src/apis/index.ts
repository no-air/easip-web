import { useAuthStore } from "../stores/auth";
import { postFakeToken } from "./auth";

export const accessToken = async () => {
  const accessToken = useAuthStore.getState().accessToken;
  if (!accessToken) {
    if (import.meta.env.DEV) {
      console.warn("Access token is not available. Please log in.");
      const token = await postFakeToken();
      useAuthStore.setState({
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        isTemporaryToken: token.isTemporaryToken,
      });
      return token.accessToken;
    }
    throw new Error("Access token is not available");
  }
  return accessToken;
};
