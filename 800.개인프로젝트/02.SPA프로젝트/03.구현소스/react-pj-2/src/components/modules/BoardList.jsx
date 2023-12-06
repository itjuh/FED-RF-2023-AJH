// LEOPOLD Keyboard List만들기 컴포넌트
// 키보드 제품 데이터
import { boardData, filterBoardData } from "../data/boardData";
import { memo, useState } from "react";

// 제이쿼리 가져오기
import $ from "jquery";
import { useNavigate } from "react-router-dom";
window.jQuery = $;
require("jquery-ui-dist/jquery-ui");
require("jquery-ui-touch-punch/jquery.ui.touch-punch");

export const BoardList = memo(({ data }) =>{
  // 받은 데이터 리스트 - data [값이 배열형]
  // console.log("전달받음", data);
  const nav = useNavigate();
  // 네비게이션 설정 함수
  function goNav(seq) {
    nav("/subboard", { state: { name: "keyboard" + seq } });
  }
  // 위시 상태 관리 변수
  // const [wishSts, setWishSts] = useState(0);
  // 위시 상태 업데이트 변수
  const inputWish = (e) => {
    // 1. 상품 불러오기
    let prodCode = 'keyboard'+$(e.currentTarget).attr('data-seq');
    let selData = filterBoardData.find(v=>{
      if(v['src']===prodCode) return true;
    });
    // 수량항목 추가
    selData.count = 1;
    // 2. 상품 로컬에 담기
    if(!localStorage.getItem('wish')){
      // 로컬이 빈 경우
      let arr = [];
      arr.push(selData);
      localStorage.setItem('wish',JSON.stringify(arr));
    }
    else{
      // 기존 카트 있는 경우
      let localData = localStorage.getItem('wish');
      // 객체변환
      localData = JSON.parse(localData);
      // 동일상품 존재여부
      let exist = 1; // 0-있는상품, 1-없는상품
      localData.forEach(v => {
        if(v.src===selData.src){ 
          // 동일상품 존재
          exist = 0;
          // 수량만 증가
          v.count += 1;
        }
      });
      // 동일상품 없는경우만 push;
      if(exist) localData.push(selData);
      
      // 다시 문자 형 변환하여 넣기
      localStorage.setItem('wish',JSON.stringify(localData));
    }
    // 3. 위시상태 바꾸기
    // setWishSts(1);
  }; /////// inputWish 함수 ///////////

  // 리스트 만들기 함수
  const makeList = (data) => {
    let temp = [];
    data.map((v, i) => {
      if(i > 9) return; // 10개만 넣기
      temp[i] = (
        <li key={i}>
          <div
            className="prod-item"
            data-seq={v}
            onClick={() => goNav(v)}
            style={{ backgroundImage: "url(../images/image_prod2/keyboard" + v + ".png)" }}
          >
            {/* 더보기 */}
            <div className="prod-detail-view">view</div>
          </div>
          <h3 className="prod-item-title">{boardData[v - 1][0]}</h3>
          <h3 className="prod-item-title">{boardData[v - 1][1]}</h3>
          {/* 위시리스트 버튼 */}
          <div className="add-wish" onClick={inputWish} data-seq={v}>add to wishlist ＞</div>
        </li>
      );
    });
    return temp;
  };

  return (
    <ol className='list-area-ol'>
      {
        makeList(data)
      }
    </ol>
  );
}); /////////// BoardList 컴포넌트 ////////////
