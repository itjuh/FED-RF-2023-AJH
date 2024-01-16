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
// 미디어쿼리 CSS (max-width:800px)
import "./css/media.css";
import { useEffect } from "react";
// 컨텍스트 API
import { pCon } from "./modules/PliotContext";
import {  useRef } from "react";

// 최상위 Root 컴포넌트 ////////////
function App() {
  // 페이지 변경용 후크 상태변수 설정
  const [pageName, setPageName] = useState("main");
  // 후크변수 변경함수
  const chgPgName = (x) => setPageName(x);

  // 카트리스트 컴포넌트 변경체크 변수(리랜더링 시 상태 변경 없음)
  /** flag true 새로추가 false 내부변경 */
  const flag = useRef(true);
  let stsVal = false;
  let transVal = null;
  if (localStorage.getItem("cart")) {
    transVal = JSON.parse(localStorage.getItem("cart"));
    if (transVal.length !== 0) stsVal = true;
  }
  // 초기 카트 사용여부 로컬스토리지 cart가 있으면 ture 없으면 false
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

  // glist 페이지 filterMode 변경용 변수
  const [glistMode, setGlistMode] = useState('F');
  // F - Filter List P - Paging List M - MoreList
  // 전체 리스트 페이지에서 초기화 상태변수를 참조변수로 생성
  const gInit = useRef(false);

  /**
   * [ context API ]
   * 1. pgName - 페이지이름
   * 2. chgPgName - 페이지이름 업데이트함수
   * 3. flag - 카트데이터 변경여부
   * 4. setCartSts - 로컬스토리지 카트 상태 업데이트
   * 5. transData - 카트 사용데이터
   * 6. setTransData - 카트 사용데이터 업데이트
   * 7. glistMode,setGlistMode - 전체리스트 페이지 뷰모드 구분
   * 8. gInit - 초기화 여부 구분
   */
  // 리턴코드구역
  return (
    <pCon.Provider value={{ pageName, chgPgName, flag, setCartSts, transData, setTransData, glistMode, setGlistMode, gInit }}>
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
