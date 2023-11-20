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

// 최상위 Root 컴포넌트 ////////////
function App() {
  // 페이지 변경용 후크 상태변수 설정
  const [pageName, setPageName] = useState("main");

  // 후크변수 변경함수
  const chgPgName = (x) => setPageName(x);

  // 랜더링 후 실행구역
  useEffect(()=>{
    $('.gnb li, .indic li').click(function(){
      // 순번변수 
      let idx = $(this).index();
      console.log('app start',idx);

      // 페이지 이동
      $('html,body').animate({
        scrollTop:($(window).height()*idx)+'px'
      },800,'easeInOutQuint');////////// animate /////////////

      // 클릭 된 메뉴에 클래스 on 넣기
      $('.gnb li').eq(idx).addClass('on').siblings().removeClass('on');
      $('.indic li').eq(idx).addClass('on').siblings().removeClass('on');
    }); /////////// click //////////////
    
  }); ////////// useEffect ////////////////

  // 리턴코드구역
  return (
    <>
      <TopArea cat={pageName} />
      <MainArea page={pageName} />
      <FooterArea />
    </>
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
