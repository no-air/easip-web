import { useParams } from "react-router";
import { usePostDetailQuery } from "../hooks/query/posts";
import { useFlutterStore } from "../stores/flutter";
import PostHeader from "../components/post/Header";

const PostPage = () => {
  const { postId } = useParams();
  if (!postId) {
    throw new Error("Post ID is required");
  }
  const { data } = usePostDetailQuery(postId);
  const { goToFlutterMove } = useFlutterStore((state) => state.actions);

  return (
    <div className="flex flex-col min-h-screen relative">
      <PostHeader postTitle={data.postTitle} tags={data.tags} />
      <div className="fixed z-10 bottom-0 left-0 right-0 flex justify-center bg-white p-3 border-t border-gray-300">
        <button
          className="py-2.5 px-20 w-full rounded bg-[#EC4C24] font-bold text-xs text-white"
          onClick={() =>
            goToFlutterMove(data.postPerHouseDetailResponses[0].houseApplyUrl)
          }
        >
          지원하기
        </button>
      </div>
    </div>
  );
};

export default PostPage;
