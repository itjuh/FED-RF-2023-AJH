// Pilot PJ 장바구니 리스트 컴포넌트

// 장바구니 리스트 CSS 불러오기
import { memo, useEffect } from "react";
import "../css/cartlist.css";
// 제이쿼리
import $ from "jquery";

// 전달 값 변경 시 리랜더링 하기 위해 메모이제이션 적용
export const CartList = memo(({data})=>{
  // 로컬스토리지 데이터를 props로 전달 받는다
  // console.log(JSON.parse(localStorage.getItem('cart')));
  // let data = JSON.parse(localStorage.getItem("cart"));

  // 데이터 개수
  const cntData = data.length;
  // 총 합계 변수
  let totalFee = 0;
  // 총 합계 세팅함수
  const totalSet = () => {
    data.forEach((v) => {
      totalFee += v.ginfo[3] * v.num;
    });
  };
  totalSet();
  function addCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const showList = ()=>{
    $('#cartlist').animate({
      right:'0'
    },600);
  }; //////// showList ///////
  
  const hideList = (e)=>{
    e.preventDefault();
    $('#cartlist').animate({
      right:'-61%'
    },600);
  }; //////// showList ///////
  

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
            {data.map((v, i) => (
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
                  <button className="cfn" data-idx={v.idx}>
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
