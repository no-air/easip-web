import { Swiper, SwiperSlide } from "swiper/react";

interface HouseImageSwiperProps {
  images: {
    src: string;
    alt: string;
  }[];
}

const HouseImageSwiper = ({ images }: HouseImageSwiperProps) => {
  return (
    <Swiper spaceBetween={10} slidesPerView={1.2} centeredSlides>
      {images.map(({ src, alt }, index) => (
        <SwiperSlide key={index}>
          <img
            src={src}
            alt={alt}
            className="mt-4 w-full aspect-square object-cover rounded-lg bg-gray-100 shadow-[0_4px_15px_rgba(0,0,0,0.12)]"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default HouseImageSwiper;
