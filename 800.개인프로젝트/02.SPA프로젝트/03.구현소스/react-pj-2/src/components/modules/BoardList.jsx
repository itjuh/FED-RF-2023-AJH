// LEOPOLD Keyboard List만들기 컴포넌트
// 키보드 제품 데이터
// import { boardData } from "../data/boardData";
import { boardData } from "../data/boardData";
import { useLayoutEffect } from "react";

// 제이쿼리 가져오기
import $ from "jquery";
import { useNavigate } from "react-router-dom";
window.jQuery = $;
require("jquery-ui-dist/jquery-ui");
require("jquery-ui-touch-punch/jquery.ui.touch-punch");

export function BoardList() {
  const nav = useNavigate();
  // 네비게이션 설정 함수
  function goNav(seq) {
    nav("/subboard", { state: { name: "keyboard" + seq } });
  }
  useLayoutEffect(() => {
    // 랜더링되기 전 이미지 넣기
    $(".prod-item").each((i, v) => {
      // console.log($(v).data('seq'));
      let num = $(v).data("seq");
      $(v).css({
        backgroundImage: "url(../images/image_prod2/keyboard" + num + ".png)",
      });
    });
  }, []); /////////// useEffect ///////

  return (
    <ol>
      {
        boardData.map((v,i)=>
        i < 10 &&
        <li key={i} onClick={() => goNav(i+1)}>
          <div className="prod-item" data-seq={(i+1)}>
            {/* 더보기 */}
            <div className="prod-detail-view">view</div>
          </div>
          <h3 className="prod-item-title">{boardData[i][0]}</h3>
          <h3 className="prod-item-title">{boardData[i][1]}</h3>
          {/* 위시리스트 버튼 */}
          <div className="add-wish">add to wishlist ＞</div>
        </li>
        )
      }
    </ol>
  );
} /////////// BoardList 컴포넌트 ////////////
