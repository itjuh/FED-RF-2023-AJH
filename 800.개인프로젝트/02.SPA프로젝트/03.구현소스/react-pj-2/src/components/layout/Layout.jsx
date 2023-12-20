import { TopArea } from "./TopArea";
import { MainArea } from "./MainArea";
import { FooterArea } from "./FooterArea";
// 컨텍스트
import { useCallback, useEffect, useState } from "react";
import { LeoCon } from "../modules/LeopoldContext";
import { useNavigate } from "react-router-dom";
// 링크데이터
import { link } from "../data/link";

// 레이아웃 구성 컴포넌트
export function Layout() {
  // 링크 데이터
  let linkData = link;
  // 라우터 이동함수
  const goNav = useNavigate();
  /**
   * 토글용 : toggleVal
   * 서브페이지용 : sub
   * 로그인용 : loginSts
   */
  const [toggleVal, setToggleVal] = useState("main");
  const [sub, setSub] = useState(null);
  const [loginSts, setLoginSts] = useState(sessionStorage.getItem("loginMem"));

  // 로그인 업데이트
  const logOutFn = useCallback(()=>{
    sessionStorage.removeItem("loginMem");
    setLoginSts(null);
  },[]);
  // 페이지 이동
  const goPage = useCallback((txt,param)=>{
    linkData = link.find((v) => {
      if (v["txt"] == txt) return true;
    });
    console.log(linkData.link, param);
    goNav(linkData.link,param);
  },[]);
  // 필터 업데이트 함수
  // const chgSel = (num) => setSelNum(num);
  // 토글 업데이트 함수
  const chgTog = useCallback((val) => {
    // 토글 후크 업데이트
    setToggleVal(val);
    // 페이지 이동
    goPage(val,'');
  }, []);
  // 서브페이지 변경함수
  const chgSub = (txt) => setSub(txt);
  // console.log(toggleVal, "토글상태 변수.. 새로고침하면 왜 바뀔까...", sts, "하단메뉴용 이것도 바뀌나...");

  /********************************** 
   [컨텍스트 API 공유값 설정]
   1. toggleVal - 토글 값
   2. chgTog - 토글 변경
   3. sub - 서브페이지용 데이터
   4. chgSub - 서브페이지용 데이터 업데이트
   5. goPage - 페이지 이동 useNavigate
   6. 
   **********************************/
  return (
    <LeoCon.Provider value={{ toggleVal, chgTog, sub, chgSub, goPage, setLoginSts}}>
      <TopArea loginSts={loginSts} logOutFn={logOutFn} goPage={goPage} />
      <MainArea />
      <FooterArea />
    </LeoCon.Provider>
  );
}; ////////// Layout 컴포넌트 ////////////
