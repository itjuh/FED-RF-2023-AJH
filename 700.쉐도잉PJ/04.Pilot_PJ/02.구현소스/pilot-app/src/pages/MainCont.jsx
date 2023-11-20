// 메인 페이지 컨텐츠 컴포넌트 jsx - MainCont.jsx
import { useEffect } from "react";
import { Banner } from "../modules/Banner";

// 페이지별 자동 스크롤 js 가져오기
import { autoScroll } from "../func/jquery-autoScroll";
// 드래그 배너 js불러오기
import { dragBanner } from "../func/drag_banner";

export function MainCont() {
  // 메인 페이지일때만 자동 스크롤 기능 적용 함
  useEffect(() => {
    //랜더링 후 한 번만 적용!
    console.log("랜더링완료");
    // 자동스크롤 호출
    autoScroll();
    // 드래그 배너 호출
    dragBanner();
  }, []); //////// useEffect ///////////////

  return (
    <>
      {/* 1. 배너페이지 */}
      <section id="ban" className="page none-sel" style={{ background: "lightblue" }}>
        <Banner />
      </section>
      <section className="page" style={{ background: "lightcoral" }}></section>
      <section className="page" style={{ background: "lightgreen" }}></section>
      {/* 4. 스타일패션 페이지 */}
      <section className="page" style={{ background: "lightseagreen" }}></section>
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
