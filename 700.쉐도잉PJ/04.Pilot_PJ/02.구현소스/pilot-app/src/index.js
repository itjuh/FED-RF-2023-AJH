// 메인 페이지 JS - index.js
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { TopArea } from "./layout/TopArea";
import { MainArea } from "./layout/MainArea";
import { FooterArea } from "./layout/Footer";
// 제이쿼리
import $ from 'jquery';
import 'jquery-ui-dist/jquery-ui';

// 페이지 공통 CSS
import "./css/common.css";
import { useEffect } from "react";
// 컨텍스트 API
import { pCon } from './modules/PliotContext'

// 최상위 Root 컴포넌트 ////////////
function App() {
  // 페이지 변경용 후크 상태변수 설정
  const [pageName, setPageName] = useState("main");

  // 후크변수 변경함수
  const chgPgName = (x) => setPageName(x);

  // 랜더링 후 실행구역
  useEffect(()=>{
    // 햄버거버튼 클릭 시 
    $('.ham').click(e=>{
      // 1. 전체메뉴 보이기 / 숨기기
      $('.mbox').fadeToggle(400);
      // 2. 햄버거 버튼 on 주기 / 빼기
      // e.target 누른 요소(span) e.currentTaget 버블링 된 요소(ham)
      $(e.currentTarget).toggleClass('on');
      // 3. 비디오 재생 / 멈춤
      // 대상 .bgm
      // get(0) 비디오 컬렉션 0은 해당비디오 -> 제이쿼리용
      const vid = $('.bgm').get(0);
      // 멈춤상태 확인해서 플레이 또는 멈춤
      vid.paused? vid.play():vid.pause();
      // console.log(vid.paused);

      // paused 속성 : 동영상 멈춤 일때 true 리턴
      // play() 메서드 : 동영상 재생 메서드
      // pause() 메서드 : 동영상 정지 메서드
    })
    // 랜더링구역 한번만 실행
  },[]); ////////// useEffect ////////////////

  // 리턴코드구역
  return (
    <pCon.Provider value={{chgPgName}}>
      <TopArea cat={pageName} />
      <MainArea page={pageName} />
      <FooterArea />
    </pCon.Provider>
  );
} ///////// App 컴포넌트 /////////////

const root = createRoot(document.querySelector("#root"));
root.render(<App />);

// 버튼 구역

{
  /* <button onClick={()=>chgPgName('main')}>
메인페이지
</button>
<button onClick={()=>chgPgName('men')}>
남성페이지
</button>
<button onClick={()=>chgPgName('women')}>
여성페이지
</button>
<button onClick={()=>chgPgName('style')}>
스타일페이지
</button> */
}
