import { TopArea } from "./TopArea";
import { MainArea } from "./MainArea";
import { FooterArea } from "./FooterArea";
// 컨텍스트
import { memo, useCallback, useRef, useState } from "react";
import { LeoCon } from "../modules/LeopoldContext";
import { useNavigate } from "react-router-dom";
// 링크데이터
import { link } from "../data/link";

// 레이아웃 구성 컴포넌트
export const Layout = memo(() => {
  // 링크 데이터
  let linkData = link;

  // 페이지 이동용
  const goNav = useNavigate();
  // 필터용 후크변수 설정
  const [selNum, setSelNum] = useState(0);
  // 토글용 후크변수
  const [toggleVal, setToggleVal] = useState("main");
  // 하단 메뉴용 useRef 변수   1-메뉴열림 0-닫힘
  const sts = useRef(0);
  // 서브페이지 후크변수
  const [sub, setSub] = useState(null);

  // 필터 업데이트 함수
  const chgSel = (num) => setSelNum(num);
  // 토글 업데이트 함수
  const chgTog = useCallback((val) => {
    // 토글 후크 업데이트
    setToggleVal(val);
    // 링크데이터 가져오기
    linkData = link.find((v) => {
      if (v["txt"] == val) return true;
    });
    // 페이지 이동
    goNav(linkData.link);
    // 타이틀 변경
  }, []);
  // useRef 변경 함수
  const chgsts = (num) => (sts.current = num);
  // 서브페이지 변경함수
  const chgSub = (txt) => setSub(txt);
  // console.log(toggleVal, "토글상태 변수.. 새로고침하면 왜 바뀔까...", sts, "하단메뉴용 이것도 바뀌나...");

  return (
    <LeoCon.Provider value={{ selNum, chgSel, toggleVal, chgTog, sub, chgSub }}>
      <TopArea sts={sts} />
      <MainArea />
      <FooterArea chgsts={chgsts} sts={sts} />
    </LeoCon.Provider>
  );
}); ////////// Layout 컴포넌트 ////////////
