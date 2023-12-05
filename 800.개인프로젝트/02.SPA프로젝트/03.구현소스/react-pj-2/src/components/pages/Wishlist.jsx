// 레오폴드 장바구니 페이지
import "../../css/wishlist.css";

export function Wishlist() {
  return (
    <main className="main in-box row-12">
      {/* 장바구니 박스 */}
      <div className="part-box col-16 row-12 ">
        <div className="wish-area">
          {/* 1. 상단부 */}
          {/* 1-1. 상단 타이틀 */}
          <h2>WishList</h2>
          {/* 1-2. 닫기버튼 */}
          <div className="close-btn" onClick={() => {}}>
            ×
          </div>
          {/* 2. 장바구니 영역 */}
          <section className="wish-box">
            <table className="wish-table">
              <thead>
                {/* 장바구니 상단부 */}
                <tr>
                  <td colSpan={2}>All List Check</td>
                  <td colSpan={6}>SubTotal(10 items)</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {/* 2-1. 체크박스 */}
                  <th>Check</th>
                  {/* 2-2. 이미지 */}
                  <th>Image</th>
                  {/* 2-3. 제품명 */}
                  <th>Product</th>
                  {/* 2-4. 수량 */}
                  <th>Quantity</th>
                  {/* 2-5. 단가 */}
                  <th>Price</th>
                  {/* 2-6. 할인 */}
                  <th>Saved</th>
                  {/* 2-7. 배송비 */}
                  <th>Delivery Fee</th>
                  {/* 2-8. 선택구역 */}
                  <th>Select</th>
                </tr>
                <tr>
                  <td>
                    <div className="chk-box"></div>
                  </td>
                 
                  <td>
                    <img src="" alt="" />
                  </td>
                  <td>
                    <span>레오폴드키보드</span>
                  </td>
                  <td>
                    <div className="quant-box flex-box">
                      <div className="up-btn">－</div>
                      <div className="quant">1</div>
                      <div className="dw-btn">＋</div>
                    </div>
                  </td>
                  <td>
                    <span>
                      <strong>10000</strong>원
                    </span>
                  </td>
                  <td>
                    <span>
                      <strong>1000</strong>원
                    </span>
                  </td>
                  <td>
                    <span>
                      <strong>2500</strong>원
                    </span>
                  </td>
                  <td>
                    <div className="sel-box flex-box">
                      <button>order</button>
                      <button>delete</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </main>
  );
} //////////// WishList 컴포넌트 ///////////////
