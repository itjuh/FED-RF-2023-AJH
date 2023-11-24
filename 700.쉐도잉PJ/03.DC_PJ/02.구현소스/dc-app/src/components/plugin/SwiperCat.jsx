/* DC PJ 캐릭터 리스트용 스와이퍼 플러그인 컴포넌트 */

import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import catListData
import { catListData } from '../data/swiper_cat';
import { Link } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import './css/swiper_cat.css';

// import required modules
// 사용할 스와이퍼 모듈을 불러온다 (네비게이션-좌우, 키보드 이동, 자동넘김)
import { Navigation, Keyboard } from 'swiper/modules';

export function SwiperCat() {
  // 선택 데이터
  const selData = catListData;
  
  return (
    <>
      <Swiper
        slidesPerView={7}
        spaceBetween={20}
        navigation={{
          clickable: true,
        }}
        keyboard={true}
        // 스와이퍼 사이즈별 슬라이드수 변경!
        breakpoints={{
          200: {
              slidesPerView: 4,
          },
          700: {
              slidesPerView: 5,
          },
          1000: {
              slidesPerView: 6,
          },
          1200: {
              slidesPerView: 7,
          },
        }}
        // 사용 할 모듈을 여기에 적용시킨다
        modules={[Navigation, Keyboard]}
        className="mySwiper2"
      >
        {
          selData.map((v,i)=> 
          // 고유번호 7번 이하만 출력
          Number(v.idx) <= 7 &&
            <SwiperSlide key={i}>
              {/* 라우터 데이터 전달은 state속성에 객체로 보낸다 */}
              <Link to='/detail' state={{cname:v.cname,cdesc:v.cdesc,facts:v.facts,}}>
                <section className="sw-inbox2">
                  {/* 캐릭터 이미지 영역 */}
                  <div className="cat-img2">
                    <img src={v.tmsrc} alt={v.cname}/>
                  </div>
                  {/* 캐릭터 타이틀 영역 */}
                  <div className="cat-tit2"><h3>{v.cname}</h3></div>
                </section>
              </Link>
            </SwiperSlide>)
        }
      </Swiper>
    </>
  );
} ////////// SwiperCat 컴포넌트 ///////////

