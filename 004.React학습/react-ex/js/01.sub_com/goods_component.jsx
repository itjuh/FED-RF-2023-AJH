// 제품등록 컴포넌트  - goods_component JSX

import myData from "./data.js";
import myData2 from "./data2.js";

// 두개의 데이터를 배열로 구성
const twoData = [myData, myData2];

/******************************************************
  서브컴포넌트1 : GoodsComponent
  상품 html 코드구성 컴포넌트 
******************************************************/
// 서브 컴포넌트(자식컴포넌트 -> 부모컴포넌트로부터 데이터를 프롭스로 전달받는다)
function GoodsComponent(props) {
  // 선택데이터
  const selData = twoData[props.idx];

  return selData.map((v) => (
    /* props.chgFn(뷰상태,상품고유번호) */
    <a href="#" onClick={() => props.chgFn(1, v.idx)}>
      <ol class="glist">
        <li>
          <img
            src={props.idx ? "./images/gallery/" + v.idx + ".jpg" : "./images/vans/vans_" + v.idx + ".jpg"}
            alt={props.idx ? "드레스" : "신발"}
          />
        </li>
        <li>{v.gname}</li>
        <li>가격: {v.gprice}원</li>
      </ol>
    </a>
  ));
} //////////// GoodsComponent 컴포넌트 ////////////////////

// 내보내기
export {GoodsComponent};