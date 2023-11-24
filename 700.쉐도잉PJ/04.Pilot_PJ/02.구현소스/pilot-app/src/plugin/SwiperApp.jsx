// 스와이퍼 플러그인 컴포넌트

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./css/swiper.css";

// import required modules
// 사용할 스와이퍼 모듈을 불러온다
// (여기서는 페이지네이션,네비게이션,자동넘김)
import { Pagination, Navigation, Autoplay, Keyboard } from "swiper/modules";
import { useContext } from "react";
import { pCon } from "../modules/PliotContext";

export function SwiperApp() {
  // 컨텍스트
  const myCon = useContext(pCon);
  let pg = myCon.pageName;
  // console.log(pg);

  // 리스트 만들기 함수 /////
  const makeList = (num) =>{
    let temp = [];
    for(let i=0; i<num; i++) {
      temp[i] = <SwiperSlide>
        <img src={"./images/sub/"+pg+"/banner/ban"+(i+1)+".png"} alt={"배너"+i+1} />
      </SwiperSlide>
    }; ///////// for ///////////
    return temp;
  }

  // 리턴코드 ///////////////////
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        keyboard={true}
        loop={true}
        navigation={true}
        /* 사용할 모듈을 여기에 적용시킨다 */
        modules={[Pagination, Navigation, Autoplay, Keyboard]}
        className="mySwiper"
      >
        { makeList(pg=='style'?5:3)}
      </Swiper>
    </>
  );
} /////////// SwiperApp 컴포넌트 ///////////
