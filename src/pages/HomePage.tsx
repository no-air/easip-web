import type { Swiper as SwiperType } from "swiper";
import { usePostHomeQuery } from "../hooks/query/posts";
import "swiper/swiper-bundle.css";
import { Fragment, useState } from "react";
import ImageSwiper from "../components/home/ImageSwiper";
import BodySwiper from "../components/home/BodySwiper";

const HomePage = () => {
  const { data } = usePostHomeQuery();
  const [imageSwiper, setImageSwiper] = useState<SwiperType | null>(null);
  const [bodySwiper, setBodySwiper] = useState<SwiperType | null>(null);

  return (
    <main className="min-h-screen relative">
      <h1 className="text-base font-semibold text-center border-b mb-4 border-[#CFCFCF]">
        오늘의 추천 공고
      </h1>
      {data.pages.map((page, index) => (
        <Fragment key={index}>
          <ImageSwiper
            setImageSwiper={setImageSwiper}
            bodySwiper={bodySwiper}
            page={page}
          />
          <BodySwiper
            setBodySwiper={setBodySwiper}
            imageSwiper={imageSwiper}
            page={page}
          />
        </Fragment>
      ))}
      <div className="h-24" />
      <div className="fixed z-10 bottom-0 left-0 right-0 flex justify-center bg-white p-3">
        <button className="py-2.5 px-20 rounded bg-[#E2E2E2] font-bold text-xs">
          자세히 보기
        </button>
      </div>
    </main>
  );
};

export default HomePage;
