// 공통패션 서브페이지 컨텐츠 컴포넌트 jsx - Fashion.jsx

import { useEffect, useLayoutEffect } from "react";
// 컨텍스트 API
import { pCon } from "../modules/PliotContext";
import { useContext } from "react";
// 공통 서브 CSS 불러오기
import "../css/fashion.css";
import { SwiperApp } from "../plugin/SwiperApp";
import $ from "jquery";
import { NewProdList } from "../modules/NewProdList";
import { useState } from "react";
import { ItemDetail } from "../modules/ItemDetail";
// 부드러운 스크롤
import { scrolled, setPos } from "../func/smoothscroll24";

export function Fashion() {
  // 컨텍스트 API
  const myCon = useContext(pCon);
  let pg = myCon.pageName;
  console.log('서브카테고리명',pg);
  // props.cat 서브 카테고리명
  useEffect(() => {
    // 위치 초기화
    setPos(0);
    // 부드러운 스크롤 호출
    // startSS();-> 이대로 이벤트 연결 시 부드러운 스크롤과 자동스크롤이 중복 됨 : 개별 이벤트 등록

    // 이벤트 설정 시 passive:false 설정의 이유는 기본 설정값은 true이고,
    // window, document, body 이 세가지에 preventDefault() 기본작동막기 할 경우 사용할 수 없도록 설정 된 값이 true이다.
    // 그래서 passive: false를 해야 휠 이벤트에 대한 막기가 가능하다.
    document.addEventListener("mousewheel", scrolled, {
      passive: false,
    });
    // 이전 파이어폭스 브라우저 이벤트 처리
    document.addEventListener("DOMMouseScroll", scrolled, {
      passive: false,
    });
    // 스크롤 바 생성하기
    $("body, html").css({ overflow: "visible" });
    // 로고 클릭 시 페이지 이동 : pageName 변경 -> chgPgName
    $("#logo a").click(() => myCon.chgPgName("main"));
    return () => {
      // 소멸자 구역
      $("body, html").css({
        overflow: "visible",
        overflowX: "hidden",
      });
      // 부드러운 스크롤 삭제
      // 위치 초기화
      setPos(0);
      document.removeEventListener("mousewheel", scrolled, {
        passive: false,
      });
      document.removeEventListener("DOMMouseScroll", scrolled, {
        passive: false,
      });
    };
  }, []);

  // 후크 상태변수
  const [item, setItem] = useState("m4");
  // 신상컴포넌트에서 상세컴포넌트로 값을 전달하기 위한
  // 상태변수를 셋팅하여 함수로 이것을 변경하게 해준다
  // 프롭스 펑션 다운~
  const chgItem = (v) => {
    console.log("상품정보 : ", v);
    // 상세박스 업데이트
    setItem(v);
    // 상세박스 슬라이드 애니로 보이기
    $("#bgbx").slideDown(400);
  }; /////////// chgItem /////////
  useLayoutEffect(()=>{
    // 위치 초기화
    setPos(0);
  },[pg]);

  /////// 리턴코드 ////////////
  return (
    <>
      {/* 1. 배너영역 */}
      <section id="ban" className="page">
        <SwiperApp />
      </section>
      {/* 2. 신상품영역 */}
      <section id="c1" className={"cont c1 " + pg}>
        <NewProdList pageName={pg} cat={pg} chgItemFn={chgItem} />
      </section>
      {/* 상세보기박스 */}
      <div id="bgbx">
        <ItemDetail goods={item} cat={pg} chgItemFn={chgItem} />
      </div>
      {/* 3. 패럴렉스영역 */}
      <section id="c2" className={"cont c2 " + pg}></section>
      {/* 4. 단일상품영역 */}
      <section id="c3" className="cont c3"></section>
      {/* 5. 스타일상품영역 */}
      <section id="c4" className="cont c4"></section>
    </>
  );
} /////// MenSub 컴포넌트 /////////
