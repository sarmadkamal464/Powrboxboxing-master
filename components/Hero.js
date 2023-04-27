import Image from "next/image";
import HeroImage from "../assets/images/hero.jpg";
import Bags from "../assets/images/bags.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";

export default function Hero() {
  SwiperCore.use([Navigation, Pagination, Autoplay]);

  return (
    <div className="text-center h-full">
      <Swiper
        style={{
          "--swiper-navigation-color": "#000",
          "--swiper-pagination-color": "#000",
        }}
        spaceBetween={30}
        centeredSlides={true}
        navigation={false}
        pagination={{ clickable: true }}
        className="h-screen mySwiper"
        loop="true"
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <Image src={HeroImage} alt="Logo" layout="fill" objectFit="cover" />
        </SwiperSlide>

        <SwiperSlide>
          <Image src={Bags} alt="Logo" layout="fill" objectFit="cover" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
