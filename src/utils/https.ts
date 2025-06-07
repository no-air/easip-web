import { postFakeToken } from "../apis/auth";
import type { APICommonError } from "../apis/dtos";
import { useAuthStore } from "../stores/auth";

export const accessToken = async () => {
  const accessToken = window.accessToken;

  if (!accessToken) {
    if (import.meta.env.DEV) {
      console.warn("Access token is not available. Please log in.");
      const token = await postFakeToken();
      useAuthStore.setState({
        accessToken: token.accessToken,
      });
      return token.accessToken;
    }
    throw new Error("Access token is not available");
  }
  return accessToken;
};

export class HttpError extends Error {
  error: APICommonError | null = null;
  constructor(error: APICommonError | null) {
    super(error?.message || "An error occurred during the HTTP request");
    this.error = error;
    this.name = "HttpError";
  }
}

const fetcher = async (url: string, options?: RequestInit) => {
  if (!url) {
    throw new Error("URL is required for fetcher");
  }
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      "X-AUTH-TOKEN": await accessToken(),
    },
  });
  if (!response.ok) {
    return response.json().then((error: APICommonError) => {
      throw new HttpError(error);
    });
  }
  return response;
};

const http = {
  get: (url: string, options?: RequestInit): Promise<Response> => {
    return fetcher(url, { method: "GET", ...options });
  },

  post: (
    url: string,
    body: unknown,
    options?: RequestInit
  ): Promise<Response> => {
    return fetcher(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...options?.headers },
      body: JSON.stringify(body),
      ...options,
    });
  },

  put: (
    url: string,
    body: unknown,
    options?: RequestInit
  ): Promise<Response> => {
    return fetcher(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...options?.headers },
      body: JSON.stringify(body),
      ...options,
    });
  },

  delete: (url: string, options?: RequestInit): Promise<Response> => {
    return fetcher(url, { method: "DELETE", ...options });
  },
};

export default http;
