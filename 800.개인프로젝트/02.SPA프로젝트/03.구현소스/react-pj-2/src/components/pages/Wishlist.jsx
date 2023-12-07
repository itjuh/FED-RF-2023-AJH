// 레오폴드 장바구니 페이지
import "../../css/wishlist.css";
import $ from "jquery";

export function Wishlist() {
  // 로컬 데이터 읽어오기
  let data = JSON.parse(localStorage.getItem("wish"));
  if(!data){
    localStorage.setItem('wish',JSON.parse([]));
    data = JSON.parse(localStorage.getItem("wish"));
  }

  // 총 합계 변수
  let subFee = 0;
  let totalFee;
  let sendFee = 0;
  let cnt = 0;
  // 총 합계 세팅함수
  const totalSet = () => {
    data.forEach((v) => {
      subFee += v.cost * v.count;
      cnt += v.count;
    });
    if(subFee > 0) {
      sendFee = 2500;
      totalFee = Number(subFee) + sendFee;
    }
    else totalFee = 0;
  };
  // 최종합계 세팅함수 호출
  totalSet();
  // 3자리수 콤마 함수
  function addCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // 수량조절 함수
  const upDownCnt = (e) => {
    const txt = $(e.currentTarget).text();
    const tg = $(e.currentTarget).siblings('.quant');
    let cnt = tg.text();
    if(txt==='－'){
      cnt--;
      if(cnt == 0) cnt = 1;
    }else{
      cnt++;
      if(cnt > 99) cnt = 99;
    }
    //증감 화면에 반영하기
    tg.text(cnt);
  };
  // 항목 삭제함수
  const deleteFn = (e)=>{
    // 누른 대상의 seq 고유번호
    const tgSeq = $(e.currentTarget).parent().attr('data-seq');
    // 제거 데이터 배열번호
    let arrNum = 0;
    data.forEach((v,i)=>{
      if(Number(v.idx)===Number(tgSeq)){
        arrNum = i;
      }
    });
    // 데이터 제거
    data.splice(arrNum,1);
    // 로컬 스토리지 반영하기
    localStorage.setItem('wish',JSON.stringify(data));
  }
  // 장바구니 닫기
  const closeList = () => {
    $(".wish-area").animate({ left: "200%" });
  };
  function addCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <main className="main in-box row-12">
      {/* 장바구니 박스 */}
      <div className="part-box col-16 row-12 ">
        <div className="wish-area">
          {/* 1. 상단부 */}
          {/* 1-1. 상단 타이틀 */}
          <h2>WishList</h2>
          {/* 1-2. 닫기버튼 */}
          <div className="close-btn" onClick={() => closeList()}>
            ×
          </div>
          {/* 2. 장바구니 영역 */}
          <section className="wish-box">
            <table className="wish-table">
              <thead>
                {/* 장바구니 상단부 */}
                <tr>
                  <td colSpan={2}>
                      <input type="checkbox" name="all-item" id="all-item" defaultChecked />
                      <label className="wish-chk" htmlFor="all-item">
                        ✔
                      </label>
                    All Product
                  </td>
                  {cnt > 1 && <td colSpan={5}>SubTotal({cnt} items)</td>}
                  {cnt <= 1 && <td colSpan={5}>SubTotal({cnt} item)</td>}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {/* 2-1. 체크박스 */}
                  <th></th>
                  {/* 2-2. 이미지 */}
                  <th>Image</th>
                  {/* 2-3. 제품명 */}
                  <th>Product</th>
                  {/* 2-4. 단가 */}
                  <th>Price</th>
                  {/* 2-5. 수량 */}
                  <th>Quantity</th>
                  {/* 2-6. 합계 */}
                  <th>Sub Total</th>
                  {/* 2-7. 선택구역 */}
                  <th>Select</th>
                </tr>
                {data.map((v, i) => (
                  i < 5 && i >= 0 &&
                  <tr key={i} className={v.src}>
                    {/* 2-1. 체크박스 */}
                    <td>
                        <input type="checkbox" name={"item" + v.idx} id={"item" + v.idx} defaultChecked />
                        <label className="wish-chk" htmlFor={"item" + v.idx}>
                          ✔
                        </label>
                    </td>
                    {/* 2-2. 이미지 */}
                    <td>
                      <img src={"/images/image_prod2/" + v.src + ".png"} alt={v.src + "이미지"} />
                    </td>
                    {/* 2-3. 제품명 */}
                    <td>
                      <span>
                        {v.code} - {v.sub}
                      </span>
                    </td>
                    {/* 2-4. 단가 */}
                    <td>
                      <span>
                        <strong>￦{addCommas(v.cost)}</strong>
                      </span>
                    </td>
                    {/* 2-5. 수량 */}
                    <td>
                      <div className="quant-box flex-box">
                        <div className="quant-btn" onClick={(e)=>upDownCnt(e)}>－</div>
                        <div className="quant">{v.count}</div>
                        <div className="quant-btn" onClick={(e)=>upDownCnt(e)}>＋</div>
                      </div>
                    </td>

                    {/* 2-6. 합계 */}
                    <td>
                      <span>
                        <strong>￦{addCommas(v.cost * v.count)}</strong>
                      </span>
                    </td>
                    {/* 2-7. 선택구역 */}
                    <td>
                      <div className="sel-box flex-box" data-seq={v.idx}>
                        <button>order</button>
                        <button onClick={(e)=>deleteFn(e)}>delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {data.map((v, i) => (
                  i === 5 &&
                  <tr key={i}>
                    <td colSpan={7}>... show more...</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3}>
                    ￦{addCommas(subFee)}(Product Price) + ￦{addCommas(sendFee)}(delivery fee) = 
                  </td>
                  <td colSpan={4}>
                    <i>Total ￦{addCommas(totalFee)}</i>
                  </td>
                </tr>
              </tfoot>
            </table>
          </section>
        </div>
      </div>
    </main>
  );
} //////////// WishList 컴포넌트 ///////////////
