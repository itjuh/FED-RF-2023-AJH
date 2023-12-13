// Pilot PJ 장바구니 리스트 컴포넌트

// 장바구니 리스트 CSS 불러오기
import { memo, useEffect } from "react";
import "../css/cartlist.css";
// 제이쿼리
import $ from "jquery";
import { useState } from "react";
import { useRef } from "react";

// 전달 값 변경 시 리랜더링 하기 위해 메모이제이션 적용
export const CartList = memo(({data, flag })=>{
  console.log('업뎃 상태값 :',flag.current);
  // 로컬스토리지 데이터를 props로 전달 받는다
  // console.log(JSON.parse(localStorage.getItem('cart')));
  // let data = JSON.parse(localStorage.getItem("cart"));
  // 화면 리랜더링을 위한 상태관리 변수 설정
  // 1. 변경 데이터 변수
  const [cartData, setCartData] = useState(data);
  console.log('받은데이터',data,'\n기존데이터',cartData,'\n유지데이터');
  // 카트 컴포넌트의 데이터의 상태관리로 컴포넌트 리랜더링을 위함 
  // 외부데이터 업데이트는 외부에서 온 경우만!!
  if(cartData!==data&&flag.current) setCartData(data);

  // 데이터 개수
  const cntData = cartData.length;
  // 총 합계 변수
  let totalFee = 0;
  // 총 합계 세팅함수
  const totalSet = () => {
    cartData.forEach((v) => {
      totalFee += v.ginfo[3] * v.num;
    });
  };
  totalSet();
  function addCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  // 리스트 보이기 함수 //////////
  const showList = ()=>{
    $('#cartlist').animate({
      right:'0'
    },600);
  }; //////// showList ///////
  
  // 리스트 숨기기 함수 /////////
  const hideList = (e)=>{
    e.preventDefault();
    $('#cartlist').animate({
      right:'-61%'
    },600);
  }; //////// showList ///////
  // 리스트 삭제 함수 /////////
  const delList = (e)=>{
    const selIdx = $(e.target).attr('data-idx');
    let result = cartData.filter(v=>{
      if(v.idx!==selIdx) return true;
    });
    localStorage.setItem('cart',JSON.stringify(result));
    // 전체 데이터 업데이트로 리랜더링
    setCartData(result);
    flag.current=false;
  }

  useEffect(() => {
    // 카트 버튼 보이기
    $("#mycart")
    .removeClass('on')
    .fadeIn(300, function () {
      //페이드 애니 후
      $(this).addClass('on');
    }); ///// fadeIn ////////
  }, []); ///// useEffect 구역 ///////
  // 리턴코드 //////////////////
  return (
    <>
      <section id="cartlist">
        <a href="#" className="cbtn cbtn2" onClick={hideList}>
          <span>닫기버튼</span>
        </a>
        <table>
          <caption>
            <h1> 카트 리스트</h1>
          </caption>
          <tbody>
            <tr>
              <th>상품</th>
              <th>번호</th>
              <th>상품명</th>
              <th>상품코드</th>
              <th>단가</th>
              <th>수량</th>
              <th>합계</th>
              <th>삭제</th>
            </tr>
            {cartData.map((v, i) => (
              <tr key={i}>
                {/* 상품 */}
                <td>
                  <img src={"images/goods/" + v.cat + "/" + v.ginfo[0] + ".png"} alt="item" />
                </td>
                {/* 번호 */}
                <td>{i + 1}</td>
                {/* 상품명 */}
                <td>{v.ginfo[1]}</td>
                {/* 상품코드 */}
                <td>{v.ginfo[2]} </td>
                {/* 단가 */}
                <td>{addCommas(v.ginfo[3])}원</td>
                {/* 수량 */}
                <td>{v.num}개</td>
                {/* 합계 */}
                <td>{addCommas(v.ginfo[3] * v.num)}원</td>
                {/* 삭제 */}
                <td>
                  <button className="cfn" data-idx={v.idx} onClick={delList}>
                    ×
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="6">총합계 :</td>
              <td>{addCommas(totalFee)}원</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </section>
      {/* 카트 버튼 구역 */}
      <div id="mycart" onClick={showList}>
        {/* 카트 이미지 */}
        <img src="./images/mycart.gif" title="개의 상품이 있습니다." />
        {/* 카트상품 개수 출력 박스 */}
        <div className="cntBx">{cntData}</div>
      </div>
    </>
  );
}); ////////////// CartList 컴포넌트 /////////
