// 하단영역 컴포넌트

import { memo, useRef } from "react";
import { Toggle } from "../modules/Toggle";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faKeyboard } from "@fortawesome/free-solid-svg-icons";

export const FooterArea = memo(() => {
  // console.log('하단 불러옴');
  const nav = useNavigate();
  // useRef
  const sts = useRef(1);
  // 네비게이션 설정 함수
  function goNav() {
    sts.current = 1;
    onOff(sts.current);
  }
  const onOff = (num) => {
    if (num) {
      $(".basic-footer").animate(
        {
          opacity: "0",
          height: "0",
        },
        300,
        "easeInCirc",
        ()=>{
          nav("/menu");
        }
      );
    }
  };

  return (
    <>
      {/* 3. 하단영역 */}
      <div id="footer">
        <footer className="footer in-box row-2">
          <div className="basic-footer flex-box">
            <div className="part-box col-6"></div>
            {/* 3-1. 하단메뉴 아이콘 */}
            <div className="part-box col-4 menu-area">
              <a className='flex-box' href="#" title="메뉴열기" onClick={goNav}>
                <FontAwesomeIcon icon={faChevronUp} className="menu-icon"/>
                <span className="ir">위쪽방향화살표</span>
                <FontAwesomeIcon icon={faKeyboard} className="menu-icon"/>
                <span className="ir">메뉴</span>
              </a>
            </div>
            {/* 3-2. 토글버튼 영역 */}
            <Toggle />
          </div>
        </footer>
      </div>
    </>
  ); //////// return //////////
}); ///////// FooterArea 컴포넌트 ////////////
