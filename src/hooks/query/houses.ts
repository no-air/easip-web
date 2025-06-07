import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  getHouseById,
  getIsHouseBookmarked,
  putToggleHouseBookmark,
} from "../../apis/houses";

export const useHouseDetailQuery = (houseId: string) => {
  return useSuspenseQuery({
    queryKey: ["houseDetail", houseId],
    queryFn: () => getHouseById(houseId),
  });
};

export const useIsHouseBookmarkedQuery = (houseId: string) => {
  return useSuspenseQuery({
    queryKey: ["isHouseBookmarked", houseId],
    queryFn: () => getIsHouseBookmarked(houseId),
  });
};

export const useToggleHouseBookmarkMutate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putToggleHouseBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["isHouseBookmarked"] });
    },
  });
};
