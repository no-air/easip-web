import { Controller } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import type { GetPostHomeResponse } from "../../apis/dtos/posts";
import { formatDate } from "../../util/date";

interface BodySwiperProps {
  setBodySwiper: (swiper: SwiperType) => void;
  imageSwiper: SwiperType | null;
  page: GetPostHomeResponse;
}

const BodySwiper = ({ setBodySwiper, imageSwiper, page }: BodySwiperProps) => {
  return (
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
                    <span className="px-2 rounded bg-[#2F82F4]" key={content}>
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
  );
};

export default BodySwiper;
