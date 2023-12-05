// 상단영역 컴포넌트
// 폰트어썸 아이콘
import { Fragment, memo, useEffect } from "react";
import { gnbData } from "../data/gnbData";
import { Logo } from "../modules/Logo";
import { TopTitle } from "../modules/TopTitle";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LeoCon } from "../modules/LeopoldContext";
import { link } from "../data/link";

// 제이쿼리 + 제이쿼리 ui
import $ from "jquery";
import "jquery-ui-dist/jquery-ui";

export const TopArea = memo(({ sts, tit }) => {
  // props.tit : 상단타이틀
  // props.sts : 1-메뉴열림 0-닫힘

  // 링크 데이터
  let linkData = link;
  // 타이틀 변경용
  const myCon = useContext(LeoCon);
  // 페이지 이동용
  const nav = useNavigate();
  const goNav = (txt, e) => {
    e.preventDefault();
    linkData = link.find((v) => {
      if (v["txt"] == txt) return true;
    });
    console.log(linkData);
    // 페이지 이동
    nav(linkData.link);
    // 타이틀 변경
    myCon.chgTit(linkData.tit);
  };

  // 클래스 생성 함수
  const addOn = function (e) {
    $(e.currentTarget).toggleClass("on");
  };
  // gnb메뉴 생성 함수
  const makeGnb = () => {
    return gnbData.map((v, i) => (
      <Fragment key={i}>
        {/* 검색버튼 */}
        {v.txt === "SEARCH" && (
          <a href="#" title={v.txt} onClick={(e)=>addOn(e)}>
            <span className="ir">{v.txt}</span>
            <input type="text" className="search-area" />
            {v.com}
          </a>
        )}
        {/* 그외 아이콘 */}
        {v.txt !== "SEARCH" && (
          <a
            href="#"
            title={v.txt}
            onClick={(e) => {
              goNav(v.txt, e);
            }}
          >
            <span className="ir">{v.txt}</span>
            {v.com}
          </a>
        )}
      </Fragment>
    ));
  };
  return (
    <>
      {/* 1. 상단영역 */}
      <div id="header">
        <header className="header in-box row-2 flex-box">
          {/* 1-1. 로고영역 */}
          <Logo />
          {/* 1-2. 타이틀영역 */}
          <div className="part-box col-6">
            <div className="top-title">{sts.current == 0 && <TopTitle tit={tit} />}</div>
          </div>
          {/* 1-3. GNB메뉴 */}
          <div className="part-box col-3 flex-box gnb-area">{makeGnb()}</div>
        </header>
      </div>
    </>
  );
}); ////////// TopArea 컴포넌트 //////////
