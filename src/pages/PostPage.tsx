import { useParams } from "react-router";
import { usePostDetailQuery } from "../hooks/query/posts";
import { useFlutterStore } from "../stores/flutter";
import Header from "../components/common/Header";
import ImageSwiper from "../components/post/ImageSwiper";
import BodySwiper from "../components/post/BodySwiper";
import type { Swiper as SwiperType } from "swiper";
import { useState } from "react";
import PostNoticeBell from "../components/post/Bell";

const PostPage = () => {
  const { postId } = useParams();
  if (!postId) {
    throw new Error("Post ID is required");
  }
  const { data } = usePostDetailQuery(postId);
  const { goToFlutterMove } = useFlutterStore((state) => state.actions);
  const [imageSwiper, setImageSwiper] = useState<SwiperType | null>(null);
  const [bodySwiper, setBodySwiper] = useState<SwiperType | null>(null);
  return (
    <main className="flex flex-col min-h-screen relative">
      <Header
        title={data.postTitle}
        tags={data.tags}
        rightHeader={<PostNoticeBell />}
      />
      <div className="relative">
        <ImageSwiper
          page={data}
          bodySwiper={bodySwiper}
          setImageSwiper={setImageSwiper}
        />
        <BodySwiper
          setBodySwiper={setBodySwiper}
          imageSwiper={imageSwiper}
          page={data}
        />
      </div>
      <div className="h-24" />
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
    </main>
  );
};

export default PostPage;
