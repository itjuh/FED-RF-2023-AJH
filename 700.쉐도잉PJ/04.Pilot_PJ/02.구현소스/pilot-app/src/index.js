// 메인 페이지 JS - index.js
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { TopArea } from "./layout/TopArea";
import { MainArea } from "./layout/MainArea";
import { FooterArea } from "./layout/Footer";
import { CartList } from "./modules/CartList";
// 제이쿼리
import $ from "jquery";
import "jquery-ui-dist/jquery-ui";

// 페이지 공통 CSS
import "./css/common.css";
import { useEffect } from "react";
// 컨텍스트 API
import { pCon } from "./modules/PliotContext";
import { useLayoutEffect, useRef } from "react";

// 최상위 Root 컴포넌트 ////////////
function App() {
  // 페이지 변경용 후크 상태변수 설정
  const [pageName, setPageName] = useState("main");
  // 후크변수 변경함수
  const chgPgName = (x) => setPageName(x);

  // 카트리스트 컴포넌트 변경체크 변수(리랜더링 시 상태 변경 없음)
  /** flag true 새로추가 false 내부변경 */
  const flag = useRef(true);
  let stsVal = 0;
  let transVal = null;
  if (localStorage.getItem("cart")) {
    transVal = JSON.parse(localStorage.getItem("cart"));
    if (transVal.length !== 0) stsVal = 1;
  }
  // 초기 카트 사용여부 로컬스토리지 cart가 있으면 1 없으면 0
  const [cartSts, setCartSts] = useState(stsVal);
  // 변환값 변수
  let [transData, setTransData] = useState(transVal);

  // 랜더링 후 한 번만 실행구역
  useEffect(() => {
    // 햄버거버튼 클릭 시
    $(".ham").click((e) => {
      // 1. 전체메뉴 보이기 / 숨기기
      $(".mbox").fadeToggle(400);
      // 2. 햄버거 버튼 on 주기 / 빼기
      // e.target 누른 요소(span) e.currentTaget 버블링 된 요소(ham)
      $(e.currentTarget).toggleClass("on");
      // 3. 비디오 재생 / 멈춤
      // 대상 .bgm
      // get(0) 비디오 컬렉션 0은 해당비디오 -> 제이쿼리용
      const vid = $(".bgm").get(0);
      // 멈춤상태 확인해서 플레이 또는 멈춤
      vid.paused ? vid.play() : vid.pause();
      // console.log(vid.paused);

      // paused 속성 : 동영상 멈춤 일때 true 리턴
      // play() 메서드 : 동영상 재생 메서드
      // pause() 메서드 : 동영상 정지 메서드
    });
    // 카트가 생성 된 경우 버튼보이기
    // 쇼핑카트 버튼 초기화
    if (cartSts === 1) {
      //로딩구역
      $(() => {
        $("#bgbx").show();
        $("#mycart").addClass("on");
      });
    }
  }, []); ////////// useEffect ////////////////

  // 처음 로딩 시 스크롤 상단이동
  useLayoutEffect(() => {
    // initPos();
    window.scrollTo(0, 0);
  },[]); ///////// useLayoutEffect ///////////

  /**
   * [ context API ]
   * 1. pgName - 페이지이름
   * 2. chgPgName - 페이지이름 업데이트함수
   * 3. flag - 카트데이터 변경여부
   * 4. setCartSts - 로컬스토리지 카트 상태 업데이트
   * 5. transData - 카트 사용데이터
   * 6. setTransData - 카트 사용데이터 업데이트
   */
  // 리턴코드구역
  return (
    <pCon.Provider value={{ pageName, chgPgName, flag, setCartSts, transData, setTransData }}>
      <TopArea cat={pageName} />
      <MainArea page={pageName} />
      <FooterArea />
      {/* 카트 리스트 */}
      {cartSts && <CartList data={transData} flag={flag} />}
    </pCon.Provider>
  );
} ///////// App 컴포넌트 /////////////

const root = createRoot(document.querySelector("#root"));
root.render(<App />);
