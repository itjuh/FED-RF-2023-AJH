// 스와이퍼 플러그인 컴포넌트

import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './css/swiper.css';

// import required modules
// 사용할 스와이퍼 모듈을 불러온다 (페이지네이션-불릿, 네비게이션-좌우, 키보드 이동, 자동넘김)
import { Pagination, Navigation, Keyboard, Autoplay } from 'swiper/modules';

export function SwiperApp() {

  const imgArr = [
    "dcm28",
    "dcm29",
    "dcm30",
    "dcm31",
    "dcm32",
    "dcm10",
    "dcm11",
    "dcm12",
  ];

  return (
    <>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        navigation={{
          clickable: true,
        }}
        keyboard={true}
        loop={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        // 사용 할 모듈을 여기에 적용시킨다
        modules={[Pagination, Navigation, Keyboard, Autoplay]}
        className="mySwiper"
      >
        {
          imgArr.map((v,i)=><SwiperSlide key={i}><img src={'./images/'+v+'.jpg'} alt='images'/></SwiperSlide>)
        }
      </Swiper>
    </>
  );
} ////////// SwiperApp 컴포넌트 ///////////

