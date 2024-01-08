// 하단 토글 변환 컴포넌트
// 제이쿼리 + 제이쿼리 ui
import $ from "jquery";
import "jquery-ui-dist/jquery-ui";
import { useContext } from "react";
import { LeoCon } from "../modules/LeopoldContext";

export function Toggle() {
  const myCon = useContext(LeoCon);

  // 토글 변경 함수 : 위치를 분기하여 값을 적용한다.
  const swToggle = (e) => {
    // 토글이 아웃된 곳 클릭시 target과 currentTarget 동일함
    if(e.target===e.currentTarget){
      $('.toggle-btn-box').toggleClass('on');
    }
    // on으로 바뀐경우 switch로 이동
    if($('.toggle-btn-box').hasClass('on')){
      myCon.chgTog("SWITCH");
    }else{
      // 아닌 경우 메인으로 이동 
      myCon.chgTog("MAIN");
    }
  };

  return (
      <aside
        className="toggle-btn-box"
        onClick={(e) => {
          swToggle(e);
        }}
      >
        <div className="tg-cir"></div>
        <div className="tg-keyboard tg-btn">keyboard</div>
        <div className="tg-switch tg-btn">switch</div>
      </aside>
  );
}
