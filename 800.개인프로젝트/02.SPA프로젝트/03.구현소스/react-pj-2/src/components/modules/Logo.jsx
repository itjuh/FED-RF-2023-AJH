// LEOPOLD 로고 넣기 컴포넌트
import { useContext } from "react";
import { LeoCon } from "./LeopoldContext";
import { initToggle } from "../func/init_toggle";

export function Logo() {
  // 컨텍스트
  const myCon = useContext(LeoCon);

  function goMain() {
    // 메인 이동 시 토글 초기화
    if (myCon.toggleVal !== "MAIN") {
      initToggle();
    } 
    myCon.chgTog("MAIN");
  } ////// 메인이동함수 //////////
  return (
    <>
      <h1 className="header__logo" onClick={() => goMain()}>
        <img src="./images/logo_bk1.png" alt="레오폴드 로고" />
        <span className="ir">레오폴드 로고</span>
      </h1>
    </>
  );
} ///////// Logo컴포넌트 ///////////////////
