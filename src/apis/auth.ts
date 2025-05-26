import { API_URL } from "../constants/api";

export const postFakeToken = () => {
  const query = new URLSearchParams({ memberId: "testuser" });

  return fetch(`${API_URL}/v1/auth/fake-token?${query.toString()}`, {
    method: "POST",
  }).then(
    (response) =>
      response.json() as Promise<{
        accessToken: string;
        refreshToken: string;
        isTemporaryToken: boolean;
      }>
  );
};
