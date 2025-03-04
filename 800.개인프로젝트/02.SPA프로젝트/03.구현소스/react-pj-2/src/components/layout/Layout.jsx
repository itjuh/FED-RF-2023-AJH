import { TopArea } from "./TopArea";
import { MainArea } from "./MainArea";
import { FooterArea } from "./FooterArea";
// 컨텍스트
import { useCallback, useState } from "react";
import { LeoCon } from "../modules/LeopoldContext";
import { useNavigate } from "react-router-dom";
// 링크데이터
import { link } from "../data/link";

// 레이아웃 구성 컴포넌트
export function Layout() {
  console.log('레이아웃페이지');
  // 라우터 이동함수
  const goNav = useNavigate();
  /**
   * 토글용 : toggleVal
   * 서브페이지용 : sub
   * 로그인용 : loginSts
   * 장바구니 수량 : wishCnt
  */
 const [toggleVal, setToggleVal] = useState("MAIN");
 const [sub, setSub] = useState(null);
  const [loginSts, setLoginSts] = useState(sessionStorage.getItem("loginMem"));
  let datacnt = JSON.parse(localStorage.getItem('wish'));
  if(datacnt == null) datacnt = 0;
  else datacnt = JSON.parse(localStorage.getItem('wish')).length;
  const [wishCnt, setWishCnt] = useState(datacnt);
  // 장바구니 수량 업데이트
  const wishUpdate = useCallback(()=>{
    setWishCnt(JSON.parse(localStorage.getItem('wish')).length);
  },[]);
  // 페이지 이동
  const goPage = useCallback((value,param)=>{
    let golink = link.find((v) => {
      // console.log(v.txt == value);
      if (v.txt == value) return true;
    });
    console.log('gopage',golink['link'], param);
    if(golink['link']) goNav(golink['link'],param);
    else{
      alert('페이지 이동 에러, 메인으로 이동합니다.');
      goNav('/',{state:{val:"11"}});
    } 
  },[]);
  // 토글 업데이트 함수
  const chgTog = useCallback((val) => {
    // 토글 후크 업데이트
    setToggleVal(val);
    // 페이지 이동
    let golink = link.find((v) => {
      if (v.txt == val) return true;
    });
    console.log('토글',golink['link']);
    goNav(golink.link,{state:{val:"11"}});
  }, []);
  // 서브페이지 변경함수
  const chgSub = (txt) => setSub(txt);

  /********************************** 
   [컨텍스트 API 공유값 설정]
   1. toggleVal - 토글 값
   2. chgTog - 토글 변경
   3. sub - 서브페이지용 데이터
   4. chgSub - 서브페이지용 데이터 업데이트
   5. goPage - 페이지 이동 useNavigate
   6. setLoginSts - 로그인 설정용(로그인페이지에서 세팅)
   7. wishUpdate - 장바구니 설정용(장바구니페이지에서 세팅)
   8. loginSts - 로그인 상태(로그인,회원가입,찾기 페이지 접근금지)
   **********************************/
  return (
    <LeoCon.Provider value={{ toggleVal, chgTog, sub, chgSub, goPage, setLoginSts, wishUpdate, loginSts}}>
      <TopArea loginSts={loginSts} goPage={goPage} wishCnt={wishCnt} setLoginSts={setLoginSts}/>
      <MainArea />
      <FooterArea />
    </LeoCon.Provider>
  );
}; ////////// Layout 컴포넌트 ////////////
