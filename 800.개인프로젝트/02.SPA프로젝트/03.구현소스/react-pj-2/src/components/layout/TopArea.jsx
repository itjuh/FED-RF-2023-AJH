// 상단영역 컴포넌트
// 폰트어썸 아이콘
import { Fragment, memo, useEffect, useLayoutEffect } from "react";
import { gnbData } from "../data/gnbData";
import { Logo } from "../modules/Logo";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LeoCon } from "../modules/LeopoldContext";
import { link } from "../data/link";

// 제이쿼리 + 제이쿼리 ui
import $ from "jquery";
import "jquery-ui-dist/jquery-ui";

export const TopArea = memo(({ sts }) => {
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
    // console.log(linkData);
    // 페이지 이동
    nav(linkData.link);
  };

  // 클래스 생성 함수
  const addOn = function () {
    $(".gnb-icon").first().addClass("on");
  }; ///////// addOn ///////////
  const removeOn = function (e) {
    // 이벤트/ 버블링 막기
    e.preventDefault();
    e.stopPropagation();
    $(e.currentTarget).parents(".gnb-icon").removeClass("on");
  };
  // 로그아웃 함수
  const logOutFn = function () {
    sessionStorage.removeItem("loginMem");
  }; //////// logOutFn /////////////
  // gnb메뉴 생성 함수
  const makeGnb = () => {
    console.log("makeGnb");
    return gnbData.map((v, i) => (
      <Fragment key={i}>
        {/* 검색버튼 */}
        {v.txt === "SEARCH" && (
          <>
            <a href="#" title={v.txt} onClick={addOn} className="gnb-icon">
              <span className="ir">{v.txt}</span>
              {v.com}
              <div className="search-area">
                <label>Search</label>
                <div className="search-box">
                  {v.com}
                  <input type="text" placeholder="Filter by keyword" />
                </div>
                <button className="close-btn" onClick={(e) => removeOn(e)}>
                  ×
                </button>
              </div>
            </a>
          </>
        )}
        {/* 로그아웃 */}
        {v.txt === "LOGOUT" && (
          <a href="#" title={v.txt} style={{ color: "cornflowerblue" }} className="gnb-icon" onClick={logOutFn}>
            <span className="ir">{v.txt}</span>
            {v.com}
          </a>
        )}
        {/* 그외 아이콘 */}
        {v.txt !== "SEARCH" && v.txt !== "LOGOUT" && (
          <a
            href="#"
            title={v.txt}
            onClick={(e) => {
              goNav(v.txt, e);
            }}
            className="gnb-icon"
          >
            <span className="ir">{v.txt}</span>
            {v.com}
          </a>
        )}
      </Fragment>
    ));
  };
  //useLayoutEffect
  useLayoutEffect(() => {
    const icons = $(".gnb-icon");
    if (sessionStorage.getItem("loginMem") == null) {
      // 비로그인 상태
      $(".welcome-tit").text("");
      icons.eq(1).show();
      icons.eq(2).hide();
    } else {
      let memName = JSON.parse(sessionStorage.getItem("loginMem"));
      // 로그인 상태
      $(".welcome-tit")
        .css({
          fontFamily: "KOFIHDrLEEJWTTF-L",
          fontSize: ".8rem",
        })
        .text("Welcome🎉" + memName + "😊");
      icons.eq(2).show();
      icons.eq(1).hide();
    }
  });
  return (
    <>
      {/* 1. 상단영역 */}
      <div id="header">
        <header className="header in-box row-2 flex-box row-s-1">
          {/* 1-1. 토글영역 */}
          <div className="part-box col-3 flex-box row-s-1 col-s-0">
          </div>
          {/* 1-2. 로고영역 */}
          <div className="part-box col-6 col-s-8">
            {/* <div className="top-title">{sts.current == 0 && <TopTitle tit={tit} />}</div> */}
            <div className="top-title">
              <Logo />
            </div>
          </div>
          {/* 1-3. GNB메뉴 */}
          <div className="part-box col-3 flex-box gnb-zone col-s-7">
            <div className="welcome-tit"></div>
            <div className="gnb-area flex-box col-s-12">{makeGnb()}</div>
            
          </div>
        </header>
      </div>
    </>
  );
}); ////////// TopArea 컴포넌트 //////////
