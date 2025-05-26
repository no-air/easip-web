import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { usePostHomeQuery } from "../hooks/query/posts";
import "swiper/swiper-bundle.css";
import { formatDate } from "../util/date";
import { Fragment, useState } from "react";
import { Controller } from "swiper/modules";

const HomePage = () => {
  const { data } = usePostHomeQuery();
  const [imageSwiper, setImageSwiper] = useState<SwiperType | null>(null);
  const [bodySwiper, setBodySwiper] = useState<SwiperType | null>(null);

  return (
    <div>
      <h1 className="text-base font-semibold text-center border-b border-[#CFCFCF]">
        오늘의 추천 공고
      </h1>
      {data.pages.map((page, index) => (
        <Fragment key={index}>
          <Swiper
            key={index}
            slidesPerView={1.2}
            spaceBetween={10}
            centeredSlides
            onSwiper={setImageSwiper}
            modules={[Controller]}
            controller={{ control: bodySwiper }}
          >
            {page.results.map(({ postId, title, houseSummaryResponses }) => (
              <SwiperSlide className="flex flex-col gap-4" key={postId}>
                <h2 className="text-center text-lg">{title}</h2>
                <img
                  className="my-4 w-full aspect-square object-cover rounded-lg bg-gray-100 shadow-[0_4px_15px_rgba(0,0,0,0.12)]"
                  src={houseSummaryResponses[0].houseThumbnailUrl}
                  alt={houseSummaryResponses[0].houseName}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            className="text-[#1C1C1C] mt-4"
            centeredSlides
            onSwiper={setBodySwiper}
            modules={[Controller]}
            controller={{ control: imageSwiper }}
          >
            {page.results.map(
              ({
                postId,
                applicationConditionDtos,
                houseSummaryResponses,
                scheduleDtos,
              }) => (
                <SwiperSlide
                  className="flex flex-col gap-4 px-[calc(20px+5vw)]"
                  key={postId}
                >
                  <div className="flex gap-2 text-xs text-white">
                    {applicationConditionDtos.map(
                      ({ content, isApplicable }) =>
                        isApplicable && (
                          <span
                            className="px-2 rounded bg-[#2F82F4]"
                            key={content}
                          >
                            {content}
                          </span>
                        )
                    )}
                  </div>
                  <h2 className="font-semibold mb-4">
                    {houseSummaryResponses[0].houseName}
                  </h2>
                  <div className="[&>div]:flex [&>div]:gap-2 [&>div]:items-center [&_span]:w-12 [&_span]:text-xs [&_span]:text-[#A0A0A0] text-sm flex flex-col gap-3">
                    <div>
                      <span>상태</span>
                      <div className="px-2 rounded bg-[#2F82F4] text-white text-xs">
                        {houseSummaryResponses[0].subscriptionState}
                      </div>
                    </div>
                    <div>
                      <span>지역</span>
                      <div className="px-2 rounded bg-[#2F82F4] text-white text-xs">
                        {houseSummaryResponses[0].districtName}
                      </div>
                    </div>
                    <div>
                      <span>게시일</span>
                      <div>{formatDate(scheduleDtos[0].start)}</div>
                    </div>
                    <div>
                      <span>마감일</span>
                      <div>{formatDate(scheduleDtos[1].end)}</div>
                    </div>
                  </div>
                </SwiperSlide>
              )
            )}
          </Swiper>
        </Fragment>
      ))}
    </div>
  );
};

export default HomePage;
