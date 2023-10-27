// 서브뷰 컴포넌트  - sub_view_code JSX

import myData from "./data.js";
import myData2 from "./data2.js";

// 두개의 데이터를 배열로 구성
const twoData = [myData, myData2];

/******************************************************
  서브컴포넌트2 : SubViewCode
  상품상세보기 html 코드구성 컴포넌트 
******************************************************/
function SubViewCode(props) {
  // props.idx - 페이지 순번 0-공유, 1-효진
  // props.chgFn() 함수로 사용 가능 -> chgSubView()함수 호출
  // props.itemNum - 선택 데이터 고유번호
  // 선택 전체 데이터
  const selData = twoData[props.idx];

  // 선택 개별 데이터 : 전체 리스트 중 상세보기 누른 값의 순번
  // 배열.find(v=>{if(조건)return true})
  // 전달 된 itemNum과 같은 idx를 가지는 배열데이터 하나를 리턴
  const selItem = selData.find((v) => {
    if (v.idx == props.itemNum) return true;
  }); /////// selItem /////////////

  console.log(props.idx);
  // 코드리턴
  return (
    <ol style={{ display: "flex", listStyle: "none" }}>
      <li>
        <img
          src={props.idx ? "./images/gallery/" + selItem.idx + ".jpg" : "./images/vans/vans_" + selItem.idx + ".jpg"}
          alt={props.idx ? "드레스" : "신발"}
        />
      </li>
      <li style={{ lineHeight: "8", padding: "10px" }}>
        상품명 : {selItem.gname} <br />
        가격 : {selItem.gprice}원 <br />
        <button onClick={() => props.chgFn(0, -1)}>리스트로가기</button>
      </li>
    </ol>
  );
} //////////// SubViewCode 컴포넌트 /////////////

// 내보내기
export {SubViewCode};
