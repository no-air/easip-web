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

export const usePostHomeQuery = () => {
  return useSuspenseInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => getPostsHome(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length;
      return lastPage.hasNext ? nextPage : undefined;
    },
  });
};

export const usePostDetailQuery = (postId: string) => {
  return useSuspenseQuery({
    queryKey: ["posts", postId],
    queryFn: () => getPostById(postId),
  });
};

export const usePostPushQuery = (postId: string) => {
  return useSuspenseQuery({
    queryKey: ["posts", postId, "push"],
    queryFn: () => getPostPush(postId),
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
  });
};
