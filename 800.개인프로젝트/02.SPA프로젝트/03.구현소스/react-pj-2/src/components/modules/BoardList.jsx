// LEOPOLD Keyboard List만들기 컴포넌트
// 키보드 제품 데이터
// import { boardData } from "../data/boardData";
// 제이쿼리 가져오기
import $ from "jquery";
import { setNum } from "../func/prod_list";
import { boardData } from '../data/boardData';
window.jQuery = $;
require("jquery-ui-dist/jquery-ui");
require("jquery-ui-touch-punch/jquery.ui.touch-punch");

export function BoardList() {
  // 이미지 출력 할 랜덤이미지 번호 생성
  const setImgNum = setNum();
  const makeList = (data) => {
    return data.map((v, i) => 
      <li key={i}>
        <div
          className="prod-item"
          style={{backgroundImage:'url(../images/image_prod2/keyboard'+{v}+'.png)'}}
          data-seq={v}
        >
          {/* 더보기 */}
          <div className="prod-detail-view">view</div>
        </div>
        <h3 className="prod-item-title">{boardData[v][0]}</h3>
        <h3 className="prod-item-title">{boardData[v][1]}</h3>
        {/* 위시리스트 버튼 */}
        <div className="add-wish">add to wishlist ＞</div>
      </li>
    );
  };
  return (
    <ol>
        {makeList(setImgNum)}
    </ol>
  );
} /////////// BoardList 컴포넌트 ////////////
