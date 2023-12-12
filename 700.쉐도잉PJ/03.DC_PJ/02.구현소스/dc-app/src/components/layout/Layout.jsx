import { TopArea } from "./TopArea";
import { MainArea } from "./MainArea";
import { FooterArea } from "./FooterArea";
import { useNavigate } from "react-router-dom";
// Context API 불러오기
import { dcCon } from "../modules/dcContext";
import { useLayoutEffect, useCallback, useState } from "react";

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
  /**
   * 1. 로그인 상태 관리 변수 logSts
   * 2. 환영메세지 logMsg
   */
  const [logSts, setLogSts] = useState(localStorage.getItem("minfo"));
  const [logMsg, setLogMsg] = useState(null);
  /* 
   메모이제이션 되는 TopArea 컴포넌트에 제공하는 함수가
   useCallback을 사용한 메모이제이션 처리되어야 
   변경 없는 것을 체크하여 함수가 업데이트 하지 않음
   useCallback(기존 익명함수,[의존성])
   -> 의존성 변수가 없을 때 비워놓아도 효과 있음(단, 형식을 맞출 것)
  */
  const chgPg = useCallback((txt, param) => goNav(txt, param), []);
  const logOut = useCallback(() => {
    /** 로컬스 삭제
     *  로그인 상태값 업데이트
     *  로그인 메세지 업데이트
     */
    localStorage.removeItem('minfo');
    setLogMsg(null);
    setLogSts(null);
  }, []);

  /********************************** 
   [컨텍스트 API 공유값 설정]
   1. chgPage 함수 : 라우터 이동기능
   2. setLogSts : 로그인 상태값 업데이트
   **********************************/
  return (
    <dcCon.Provider value={{ chgPg, setLogSts, setLogMsg }}>
      {/* 메모이제이션 관리를 위해 함수를 컨텍스트 방식이 아닌 속성으로 직접 보냄 */}
      <TopArea chgPgFn={chgPg} logSts={logSts} logMsg={logMsg} logOutFn={logOut}/>
      <MainArea />
      <FooterArea />
    </dcCon.Provider>
  );
} ////////// Layout 컴포넌트 ////////////
