// 레오폴드 장바구니 페이지
import { useState } from "react";
import "../../css/wishlist.css";
import { WishTable } from "../modules/WishTable";

export function Wishlist() {
  // 로컬 데이터 읽어오기
  let data = JSON.parse(localStorage.getItem("wish"));
  // 변경 상태 관리 : 0:변경없음 1:변경있음
  const [sts, setSts] = useState(0);
  const chgFn = (num)=>{
    setSts(num);
    setTimeout(()=>{
      setSts(0);
    },30)
  }; ///////// chgFn //////////

  if(sts){
    data = JSON.parse(localStorage.getItem("wish"));
  }
  // // 장바구니 닫기
  // const closeList = () => {
  //   $(".wish-area").animate({ left: "200%" });
  // };

  // useEffect(()=>{
  //   $(".wish-area").animate({ left: "0%" });
  // })
  return (
    <main className="main in-box row-12">
      {/* 장바구니 박스 */}
      <div className="part-box col-16 row-12 ">
        <div className="wish-area">
          {/* 1. 상단부 */}
          {/* 1-1. 상단 타이틀 */}
          <h2>WishList</h2>
          {/* 1-2. 닫기버튼 */}
          {/* <div className="close-btn" onClick={() => closeList()}>
            ×
          </div> */}
          {/* 2. 장바구니 영역 */}
          <WishTable data={data} chgFn={chgFn}/>
        </div>
      </div>
      <div className="message-box">
        <div className="message-wrap">
          <div className="message-tit">
            <span>❗ delete confirm</span>
            <button>×</button>
          </div>
          <div className="message-cont">Do you really want to delete it????</div>
          <div className="message-btns">
            <button>Delete</button>
            <button>Cancel</button>
          </div>
        </div>
      </div>
    </main>
  );
} //////////// WishList 컴포넌트 ///////////////
