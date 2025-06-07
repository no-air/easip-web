import {
  useMutation,
  useQueryClient,
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  getPostById,
  getPostPush,
  getPostsHome,
  putPostPush,
} from "../../apis/posts";
import { HttpError } from "../../utils/https";
import { toast } from "sonner";

export const usePostHomeQuery = () => {
  return useSuspenseInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => getPostsHome(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length;
      return lastPage.hasNext ? nextPage : undefined;
    },
    retry: false,
  });
};

export const usePostDetailQuery = (postId: string) => {
  return useSuspenseQuery({
    queryKey: ["posts", postId],
    queryFn: () => getPostById(postId),
    retry: false,
  });
};

export const usePostPushQuery = (postId: string) => {
  return useSuspenseQuery({
    queryKey: ["posts", postId, "push"],
    queryFn: () => getPostPush(postId),
    retry: false,
  });
};

export const usePostPushMutation = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ scheduleId }: { scheduleId: string }) =>
      putPostPush(postId, scheduleId),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts", postId, "push"],
      });
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
