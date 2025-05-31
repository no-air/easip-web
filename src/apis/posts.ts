import { accessToken } from ".";
import { API_URL } from "../constants/api";
import type { GetPostDetailResponse, GetPostHomeResponse } from "./dtos/posts";

export const getPostsHome = async (page = 1, size = 10) => {
  const params = new URLSearchParams({
    page: String(page),
    size: String(size),
  });

  return fetch(`${API_URL}/v1/posts/home?${params}`, {
    headers: {
      "X-AUTH-TOKEN": await accessToken(),
    },
    method: "GET",
  }).then((response) => response.json() as Promise<GetPostHomeResponse>);
};

export const getPostById = async (postId: string) => {
  return fetch(`${API_URL}/v1/posts/${postId}`, {
    headers: {
      "X-AUTH-TOKEN": await accessToken(),
    },
    method: "GET",
  }).then((response) => response.json()) as Promise<GetPostDetailResponse>;
};
