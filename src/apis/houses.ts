import { API_URL } from "../constants/api";
import http from "../utils/https";
import type { HouseResponse } from "./dtos/houses";

export const getHouseById = async (houseId: string) => {
  return http
    .get(`${API_URL}/v1/houses/${houseId}`)
    .then((response) => response.json()) as Promise<HouseResponse>;
};

export const getIsHouseBookmarked = async (houseId: string) => {
  return http
    .get(`${API_URL}/v1/houses/${houseId}/bookmark`)
    .then((response) => response.json()) as Promise<boolean>;
};

export const putToggleHouseBookmark = async (houseId: string) => {
  return http
    .put(`${API_URL}/v1/houses/${houseId}/bookmark`, undefined)
    .then((response) => response.json()) as Promise<boolean>;
};
