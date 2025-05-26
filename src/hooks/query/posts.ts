import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getPostsHome } from "../../apis/posts";

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
