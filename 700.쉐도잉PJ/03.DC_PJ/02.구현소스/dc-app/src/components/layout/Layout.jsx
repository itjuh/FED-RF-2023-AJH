import { TopArea } from "./TopArea";
import { MainArea } from "./MainArea";
import { FooterArea } from "./FooterArea";
import { useNavigate } from "react-router-dom";
// Context API 불러오기
import { dcCon } from "../modules/dcContext";
import { useLayoutEffect } from "react";

// 레이아웃 구성 컴포넌트
export function Layout() {

  // 랜더링 후(화면보이기전) 실행구역 //////////
  useLayoutEffect(() => {
    // 페이지 이동시 스크롤위치 상단이동
    window.scrollTo(0, 0);
  }); /////////// useEffect ///////////

  // 라우터 이동함수
  const goNav = useNavigate();
  // 라우터 이동함수
  const chgPg = (txt,param) => goNav(txt,param);

  /********************************** 
   [컨텍스트 API 공유값 설정]
   1. chgPage 함수 : 라우터 이동기능   
   **********************************/
  return (
    <dcCon.Provider value={{ chgPg }}>
      <TopArea />
      <MainArea />
      <FooterArea />
    </dcCon.Provider>
  );
} ////////// Layout 컴포넌트 ////////////
