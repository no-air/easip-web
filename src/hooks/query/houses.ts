import { useSuspenseQuery } from "@tanstack/react-query";
import { getHouseById } from "../../apis/houses";

export const useHouseDetailQuery = (houseId: string) => {
  return useSuspenseQuery({
    queryKey: ["houseDetail", houseId],
    queryFn: () => getHouseById(houseId),
  });
};
