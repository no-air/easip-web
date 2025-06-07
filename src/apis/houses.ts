import { accessToken } from ".";
import { API_URL } from "../constants/api";
import type { HouseResponse } from "./dtos/houses";

export const getHouseById = async (houseId: string) => {
  return fetch(`${API_URL}/v1/houses/${houseId}`, {
    headers: {
      "X-AUTH-TOKEN": await accessToken(),
    },
    method: "GET",
  }).then((response) => response.json()) as Promise<HouseResponse>;
};

export const getIsHouseBookmarked = async (houseId: string) => {
  return fetch(`${API_URL}/v1/houses/${houseId}/bookmark`, {
    headers: {
      "X-AUTH-TOKEN": await accessToken(),
    },
    method: "GET",
  }).then((response) => response.json()) as Promise<boolean>;
};

export const putToggleHouseBookmark = async (houseId: string) => {
  return fetch(`${API_URL}/v1/houses/${houseId}/bookmark`, {
    headers: {
      "X-AUTH-TOKEN": await accessToken(),
    },
    method: "PUT",
  }).then((response) => response.json()) as Promise<boolean>;
};
