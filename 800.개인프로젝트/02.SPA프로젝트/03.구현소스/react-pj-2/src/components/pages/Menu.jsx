import "../../css/menu.css";
import { insertText, resetTyping, typingKey } from "../func/typing";
import $ from "jquery";
// 데이터 가져오기
import { menuData } from "../data/menuData";
import { MakeKey } from "../modules/MakeKey";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LeoCon } from "../modules/LeopoldContext";
import { link } from "../data/link";

export function Menu(props) {
  // props.chgFn(useRef 변경 함수)
  // props.sts 메뉴상태

  // 링크 데이터
  let linkData = link;
  // 타이틀 변경용
  const myCon = useContext(LeoCon);
  // 페이지 이동용
  const nav = useNavigate();
  const goNav = (num) => {
    linkData = link[num];
    // console.log(linkData);
    // 페이지 이동
    nav(linkData.link);
    // 타이틀 변경
    myCon.chgTit(linkData.tit);
    // 메뉴닫기
    props.chgFn(0);
  };

  let sts;
  const keyinput = (e) => {
    // 키보드 타이핑 초기화
    resetTyping();
    // 해당 타이핑 영역
    let target = $(e.currentTarget).find(".typing-area");
    let seq = $(e.currentTarget).attr("data-seq");
    // $(e.currentTarget).find(".typing-area").text("");
    clearTimeout(sts);
    // 타임아웃 함수
    sts = setTimeout(() => {
      // 글자입력 함수
      insertText(menuData[seq], target);
    }, 40);
    // 키보드 타이핑 함수 호출
    typingKey(menuData[seq]);
  };
  const clear = (e) => {
    // 전체박스 타이핑영역 초기화
    $(".typing-area").text("");
    $(e.currentTarget).find(".typing-area").text("");
  };

  ////// 리턴구역 ////////////////////
  return (
    <>
      <div className="part-box row-12">
        {/* 2-1. 메뉴영역 */}
        <ul className="gnb-menu-box">
          {menuData.map((v, i) => (
            <li key={i}  data-seq={i}
            onMouseEnter={keyinput} onMouseLeave={clear}
            onClick={()=>goNav(i)}>
              {/* <a href="#"> */}
              <span>{v}</span>
              <b className="typing-area"></b>
              <div className="text-cursor"></div>
              {/* </a> */}
            </li>
          ))}
        </ul>
        <div className="close-btn" onClick={() => props.chgFn(0)}>
          ×
        </div>
      </div>
      {/* 2-2. 키보드 메뉴 영역 */}
      <div className="part-box col-16 row-4 menu-footer row-s-0 col-s-0">
        <div className="keyboard-menu">
          {/* 키보드 구역 */}
          <div className="wrap">
            <div className="key-box">
              <MakeKey />
            </div>
          </div>
        </div>
      </div>
    </>
  );
} ////////// Menu 컴포넌트  ////////////
