import { Controller } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import type { GetPostHomeResponse } from "../../apis/dtos/posts";
import { formatDate } from "../../utils/date";
import { cn } from "../../utils/lib";

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
        ({ tags, postId, title, houseSummaryResponses, scheduleDtos }) => (
          <SwiperSlide
            className="flex flex-col gap-4 px-[calc(20px+5vw)]"
            key={postId}
          >
            <div className="flex gap-2 flex-wrap">
              {tags.map((tag) => (
                <span
                  className="px-2 rounded bg-[#2F82F4] text-white text-xs"
                  key={tag}
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
            <h2 className="text-lg">{title}</h2>
            {/* placeholder image */}
            <div className="w-full aspect-square bg-gray100 rounded-lg my-6"></div>
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
            <ConditionsRow houseSummaryResponses={houseSummaryResponses} />
          </SwiperSlide>
        )
      )}
    </Swiper>
  );
};

interface ConditionsRowProps {
  houseSummaryResponses: GetPostHomeResponse["results"][number]["houseSummaryResponses"];
}

const ConditionsRow = ({ houseSummaryResponses }: ConditionsRowProps) => {
  return (
    <div className="flex flex-col mt-5 gap-2">
      <div className="flex gap-4 items-baseline">
        <span>지원조건</span>
        <span className="text-sm before:w-2 before:h-2 before:bg-[#2F82F4] before:inline-block before:mr-1">
          해당
        </span>
        <span className="text-sm before:w-2 before:h-2 before:bg-[#E2E2E2] before:inline-block before:mr-1">
          비해당
        </span>
      </div>
      <div className="flex gap-2 flex-wrap">
        {houseSummaryResponses[0].applicationConditionDtos
          .sort((a, b) => (a.isApplicable ? -1 : b.isApplicable ? 1 : 0))
          .map(({ content, isApplicable }) => (
            <div
              className={cn(
                "px-4 py-1.5 rounded text-xs",
                isApplicable
                  ? "bg-[#2F82F4] text-white"
                  : "bg-[#E2E2E2] text-[#868686]"
              )}
              key={content}
            >
              {content}
            </div>
          ))}
      </div>
    </div>
  );
};

export default BodySwiper;
