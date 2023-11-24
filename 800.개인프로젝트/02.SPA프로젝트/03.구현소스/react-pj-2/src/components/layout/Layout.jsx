import { TopArea } from "./TopArea";
import { MainArea } from "./MainArea";
import { FooterArea } from "./FooterArea";
// 컨텍스트
import { memo, useState } from "react";
import { LeoCon } from "../modules/LeopoldContext";
import { useNavigate } from "react-router-dom";
// 링크데이터
import { link } from "../data/link";

// 레이아웃 구성 컴포넌트
export const Layout = memo(()=>{
  // 링크 데이터
  let selData = link;
  
  // 페이지 이동용
  const goNav = useNavigate();
  // 필터용 후크변수 설정
  const [selNum, setSelNum] = useState(0);
  // 토글용 후크변수
  const [toggleVal, setToggleVal] = useState("main");
  // 상단 타이틀용 후크변수
  const [titVal, setTitVal] = useState("Keyboard List");
  // 상단 타이틀 함수
  const chgTit = (txt) => setTitVal(txt);
  // 필터 업데이트 함수
  const chgSel = (num) => setSelNum(num);
  // 토글 업데이트 함수
  const chgTog = (txt) => {
    setToggleVal(txt);
    link.forEach((ele, idx) => {
      if (ele.txt == txt) selData = link[idx];
    });
    // console.log('토글바뀜 ->',txt,'selData임->',selData);
    goNav(selData.link);
    chgTit(selData.tit);
  };
  // 클릭한 필터를 옵션 세부옵션에 적용하기
  // 세부 옵션을 제품리스트에 적용하기
  // -> selNum으로 세팅

  return (
    <LeoCon.Provider value={{ selNum, chgSel, toggleVal, chgTog, titVal, chgTit }}>
      <TopArea />
      <MainArea />
      <FooterArea />
    </LeoCon.Provider>
  );
}) ////////// Layout 컴포넌트 ////////////
