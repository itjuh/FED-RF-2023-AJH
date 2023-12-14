// 스와이퍼 플러그인 컴포넌트

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./css/swiper.css";

// import required modules
// 사용할 스와이퍼 모듈을 불러온다 (페이지네이션-불릿, 네비게이션-좌우, 키보드 이동, 자동넘김)
import { Pagination, Keyboard, Autoplay, EffectCreative } from "swiper/modules";

export function SwiperApp() {
  const imgArr = [
    "keyboard1",
    "keyboard2",
    "keyboard3",
    "keyboard4",
    "keyboard5",
    "keyboard6",
    "keyboard7",
    "keyboard8",
  ];

  return (
    <>
      <Swiper
        slidesPerView={2}
        grabCursor={true}
        effect={"creative"}
        creativeEffect={{
          prev: {
            scale: 0.8,
            translate: [0, 0, 0],
          },
          next: {
            translate: [0,"90%", 0],
          },
        }}
        direction={"vertical"}
        modules={[EffectCreative]}
        className="mySwiper row-s-6"
        // slidesPerView={5}
        // spaceBetween={30}
        // pagination={{
        //   clickable: true,
        // }}
        // direction={"vertical"}
        // // 사용 할 모듈을 여기에 적용시킨다
        // modules={[Pagination, Keyboard, Autoplay]}
        // className="mySwiper"
      >
        {imgArr.map((v, i) => (
          <SwiperSlide key={i}>
            <img src={"./images/image_prod2/" + v + ".png"} alt="images" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
} ////////// SwiperApp 컴포넌트 ///////////
