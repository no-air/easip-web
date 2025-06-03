import { Swiper, SwiperSlide } from "swiper/react";

interface HouseImageSwiperProps {
  images: {
    url: string;
    alt: string;
  }[];
}

const HouseImageSwiper = ({ images }: HouseImageSwiperProps) => {
  return (
    <Swiper spaceBetween={10} slidesPerView={1.2} centeredSlides={true}>
      {images.map(({ url, alt }, index) => (
        <SwiperSlide key={index}>
          <img src={url} alt={alt} className="w-full h-auto" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default HouseImageSwiper;
