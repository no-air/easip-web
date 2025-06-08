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
import { HttpError } from "../../utils/https";
import { toast } from "sonner";

export const useHouseDetailQuery = (houseId: string) => {
  return useSuspenseQuery({
    queryKey: ["houseDetail", houseId],
    queryFn: () => getHouseById(houseId),
    retry: false,
  });
};

export const useIsHouseBookmarkedQuery = (houseId: string) => {
  return useSuspenseQuery({
    queryKey: ["isHouseBookmarked", houseId],
    queryFn: () => getIsHouseBookmarked(houseId),
    retry: false,
  });
};

export const useToggleHouseBookmarkMutate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putToggleHouseBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["isHouseBookmarked"] });
    },
    onError: (error) => {
      if (error instanceof HttpError) {
        if (error.error?.type === "ALERT") {
          alert(error.error.message);
        } else if (error.error?.type === "TOAST") {
          toast.error(error.error.message);
        }
      }
    },
  });
};
