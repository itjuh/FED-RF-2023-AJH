import "../../css/menu.css";
import { insertText, resetTyping, typingKey } from "../func/typing";
import $ from "jquery";
// 데이터 가져오기
import { menuData } from "../data/menuData";
import { MakeKey } from "../modules/MakeKey";

export function Menu(props) {
  // props.chgFn(useRef 변경 함수)
  // props.sts 메뉴상태

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
            <li key={i} onMouseEnter={keyinput} onMouseLeave={clear} data-seq={i}>
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
      <div className="part-box col-16 row-4 menu-footer">
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
