import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function SwiperSlider({ images }) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={1}
        className="rounded-2xl shadow-lg swiper-pagination-bottom"
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <div className="w-full h-80 bg-black rounded-xl overflow-hidden flex items-center justify-center">
              <img
                src={img}
                alt={`Imagen ${i + 1}`}
                className="object-cover w-full h-full"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
