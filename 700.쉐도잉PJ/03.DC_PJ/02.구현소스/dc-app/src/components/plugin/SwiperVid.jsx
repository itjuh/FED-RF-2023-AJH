// 비디오스와이프 하위 스와이프 컴포넌트 - SwiperVid

import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// 제이쿼리 넣기
import $ from "jquery";
// SwiperVid 사용 데이터 가져오기
import { swVidData } from "../data/swiper_vid";
// 폰트어썸 - 플레이버튼
import { faCirclePlay } from "@fortawesome/free-regular-svg-icons";
// 컴포넌트 형태의 폰트어썸 사용
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./css/swiper_vid.css";

// import required modules
// 사용할 스와이퍼 모듈을 불러온다 (페이지네이션-불릿, 네비게이션-좌우, 키보드 이동, 자동넘김)
import { Navigation, Keyboard } from "swiper/modules";

export function SwiperVid(props) {
  // props.cat - 데이터 선택을 위한 객체속성명

  // 선택 데이터
  const selData = swVidData[props.cat];
  // 비디오 보이기 함수 ///
  const showVid = (src,tit)=>{
    // src - 비디오 경로, tit - 비디오 제목
    console.log(src, tit);
    // 1. 대상선정
    // 1-1. 아이프레임 : .play-vid iframe
    const ifr = $('.play-vid iframe');
    // 1-2. 전체 박스 : .vid-bx
    const vbx = $('.vid-bx');
    // 1-3. 타이틀 박스 : .ifr-tit
    const itit = $('.ifr-tit');
    // 1-4. 닫기버튼 : .cbtn
    const cbtn = $('.cbtn');
    // 2. 변경하기
    // 2-1. 아이프레임 경로넣기
    ifr.attr('src',src);
    // 2-2. 비디오 타이틀 넣기
    itit.text(tit);
    // 2-3. 전체박스 나타나기
    vbx.fadeIn(300);
    // 2-4. 닫기버튼 세팅
    cbtn.click(()=>{
        // 전체박스 사라지기
        vbx.fadeOut(300);
        // 기존 동영상 플레이 멈추기
        ifr.attr('src','');
    });
  }; //////////// showVid함수 ///////////

  // 리턴구역 //////////////////////////
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={20}
        navigation={true}
        keyboard={true}
        // 사용 할 모듈을 여기에 적용시킨다
        modules={[Navigation, Keyboard]}
        className="mySwiper"
        // 스와이퍼 사이즈별 슬라이드수 변경!
        breakpoints={{
            200: {
                slidesPerView: 1,
            },
            700: {
                slidesPerView: 2,
            },
            1000: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 4,
            },
        }}
      >
        {selData.map((v, i) => (
          <SwiperSlide key={i}>
            <section className="sw-inbox" 
            //비디오 보이기 함수
            onClick={()=>showVid(v.vsrc,v.tit)}>
              {/* 동영상 이미지 박스 */}
              <div className="vid-img">
                <img src={v.isrc} alt={v.tit} />
                {/* 플레이 아이콘 - 폰트어썸 */}
                <FontAwesomeIcon
                  icon={faCirclePlay}
                  style={{ position: "absolute", bottom: "55%", left: "10%", color: "#fff", fontSize: "50px" }}
                />
              </div>
              {/* 동영상 타이틀 박스 */}
              <div className="vid-tit">
                <h4>{v.cat}</h4>
                <h5>{v.tit}</h5>
              </div>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
} ////////// SwiperApp 컴포넌트 ///////////
