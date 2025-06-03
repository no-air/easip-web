import type { Swiper as SwiperType } from "swiper";
import { Controller } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { GetPostDetailResponse } from "../../apis/dtos/posts";

interface ImageSwiperProps {
  setImageSwiper: (swiper: SwiperType) => void;
  bodySwiper: SwiperType | null;
  page: GetPostDetailResponse;
}

const ImageSwiper = ({
  setImageSwiper,
  bodySwiper,
  page,
}: ImageSwiperProps) => {
  return (
    <Swiper
      slidesPerView={1.2}
      spaceBetween={10}
      centeredSlides
      onSwiper={setImageSwiper}
      modules={[Controller]}
      controller={{ control: bodySwiper }}
    >
      {page.postPerHouseDetailResponses.map(
        ({ houseThumbnailUrl, houseName }) => (
          <SwiperSlide className="flex flex-col gap-4" key={houseThumbnailUrl}>
            <img
              className="mt-8 w-full aspect-square object-cover rounded-lg bg-gray-100 shadow-[0_4px_15px_rgba(0,0,0,0.12)]"
              src={houseThumbnailUrl}
              alt={houseName}
            />
          </SwiperSlide>
        )
      )}
    </Swiper>
  );
};

export default ImageSwiper;
