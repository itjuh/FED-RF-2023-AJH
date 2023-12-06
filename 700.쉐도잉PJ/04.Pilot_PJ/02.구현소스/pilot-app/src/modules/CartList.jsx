// Pilot PJ 장바구니 리스트 컴포넌트

// 장바구니 리스트 CSS 불러오기
import "../css/cartlist.css";

export function CartList() {
  // console.log(JSON.parse(localStorage.getItem('cart')));
  let data = JSON.parse(localStorage.getItem("cart"));

  // 총 합계 변수
  let totalFee = 0;
  // 총 합계 세팅함수
  const totalSet = () =>{
    data.forEach((v)=>{
      totalFee += v.ginfo[3]*v.num;
    });
  };
  totalSet();
  function addCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <>
      <section id="cartlist">
        <a href="#" className="cbtn cbtn2">
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
            {data.map((v, i) =>
              <tr key={i}>
                {/* 상품 */}
                <td>
                  <img src={"images/goods/"+v.cat+"/"+v.ginfo[0]+".png"} alt="item" />
                </td>
                {/* 번호 */}
                <td>{i+1}</td>
                {/* 상품명 */}
                <td>{v.ginfo[1]}</td>
                {/* 상품코드 */}
                <td>{v.ginfo[2]} </td>
                {/* 단가 */}
                <td>{addCommas(v.ginfo[3])}원</td>
                {/* 수량 */}
                <td>{v.num}개</td>
                {/* 합계 */}
                <td>{addCommas(v.ginfo[3]*v.num)}원</td>
                {/* 삭제 */}
                <td>
                  <button className="cfn" data-idx={v.idx}>
                    ×
                  </button>
                </td>
              </tr>
            )}
            <tr>
              <td colSpan="6">총합계 :</td>
              <td>{addCommas(totalFee)}원</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
} ////////////// CartList 컴포넌트 /////////
