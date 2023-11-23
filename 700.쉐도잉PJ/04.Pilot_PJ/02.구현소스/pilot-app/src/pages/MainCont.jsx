// 메인 페이지 컨텐츠 컴포넌트 jsx - MainCont.jsx
import { useEffect } from "react";
import { Banner } from "../modules/Banner";

// 페이지별 자동 스크롤 js 가져오기
// import { autoScroll } from "../func/jquery-autoScroll";
import { wheelFn, evtFn, initSet, zeroPno, initPos } from "../func/jquery-autoScroll";
// 드래그 배너 js불러오기
import { dragBanner } from "../func/drag_banner";
import { FashionIntro } from "../modules/FashionIntro";
import $ from 'jquery';

export function MainCont() {
  // 메인 페이지일때만 자동 스크롤 기능 적용 함
  useEffect(() => {
    //랜더링 후 한 번만 적용!
    console.log("랜더링완료");

    // ((중요!!))
    // 특정이벤트를 설정 해제하고자 할 때
    // 반드시 그 이벤트 설정은 js파일 내부에서 하지말고 
    // 리액트 함수에서 js함수를 호출하는 형태로 해야
    // 해제 메서드인 removeEventListener가 유효함!!

    // 새로고침 위치 초기화
    initPos();
    // 자동스크롤 호출
    window.addEventListener('wheel',wheelFn);
    // 메뉴 + 인디케이터 이벤트 기능설정 함수호출 //////
    evtFn();
    // 이미지 초기세팅 함수 호출
    initSet();
    // 페이지 번호 초기화 함수 호출
    zeroPno();
    // autoScroll();
    // 드래그 배너 호출
    dragBanner();
    // 컴포넌트 소멸자 : 이 컴포넌트가 삭제 될 때 호출
    return(()=>{
      console.log('난 소멸했어~~');
      // 자동스크롤 해제
      window.removeEventListener('wheel',wheelFn);
      // 메인페이지에만 사용되는 로고 클릭 시 상단이동 이벤트 해제
      // 제이쿼리 이벤트 해제 off(이벤트명)
      $("#logo a").off('click');
      $('.gnb li').off('click').removeClass('on');
      $(document).off('keydown');
    })
  }, []); //////// useEffect ///////////////

  return (
    <>
      {/* 1. 배너페이지 */}
      <section id="ban" className="page none-sel" style={{ background: "lightblue" }}>
        <Banner />
      </section>
      {/* 2. 남성패션 페이지 */}
      <section className="page">
        <FashionIntro cat="men" />
      </section>
      {/* 3. 여성패션 페이지 */}
      <section className="page">
        <FashionIntro cat="women" />
      </section>
      {/* 4. 스타일패션 페이지 */}
      <section className="page">
        <FashionIntro cat="style" />
      </section>
      {/* 메인에만 나오는 사이드 인디케이터 */}
      <nav className="indic">
        <ul>
          <li className="on">
            <a href="#ban">
              <span>배너</span>
            </a>
          </li>
          <li>
            <a href="#men">
              <span>남성의류</span>
            </a>
          </li>
          <li>
            <a href="#women">
              <span>여성의류</span>
            </a>
          </li>
          <li>
            <a href="#style">
              <span>스타일</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
} /////// MainCont 컴포넌트 /////////
