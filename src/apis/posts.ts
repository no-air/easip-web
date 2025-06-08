import { API_URL } from "../constants/api";
import http from "../utils/https";
import type {
  GetPostDetailResponse,
  GetPostHomeResponse,
  PostPushResponse,
} from "./dtos/posts";

export const getPostsHome = async (page = 1, size = 10) => {
  const params = new URLSearchParams({
    page: String(page),
    size: String(size),
  });

  return http
    .get(`${API_URL}/v1/posts/home?${params}`, {})
    .then((response) => response.json() as Promise<GetPostHomeResponse>);
};

export const getPostById = async (postId: string) => {
  return http
    .get(`${API_URL}/v1/posts/${postId}`, {
      method: "GET",
    })
    .then((response) => response.json()) as Promise<GetPostDetailResponse>;
};

export const getPostPush = async (postId: string) => {
  return http
    .get(`${API_URL}/v1/posts/${postId}/push/schedules`)
    .then((response) => response.json() as Promise<PostPushResponse>);
};

export const putPostPush = async (postId: string, scheduleId: string) => {
  return http
    .put(
      `${API_URL}/v1/posts/${postId}/push/schedules/${scheduleId}`,
      undefined
    )
    .then((response) => {
      return response.json() as Promise<{ success: boolean }>;
    });
};
