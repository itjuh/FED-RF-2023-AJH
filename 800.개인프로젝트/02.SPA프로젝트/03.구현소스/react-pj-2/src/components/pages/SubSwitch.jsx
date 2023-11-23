// 서브페이지 sub switch page - SubSwitch.jsx
import { useLocation } from "react-router-dom";
import "../../css/subboard.css";
// 서브페이지용 데이터
import { detailData } from "../data/detailData";
// 제이쿼리
import $ from "jquery";
import { moveImgInfo } from "../func/info_scroll";
import { useContext } from "react";
import { LeoCon } from "../modules/LeopoldContext";

export function SubSwtich() {
  // 본페이지에서 데이터 받아오기
  const location = useLocation();
  let name = location.state.name; //switchname
  // 선택 데이터
  let selData = detailData[name] ? detailData[name] : false;
  // 컨텍스트
  const myCon = useContext(LeoCon);

  const loadFn = () => {
    const imgWd = [];
    let all = 0;
    const setNav = () => {
      $(".info-img img").each((i, v) => (all += v.height));
      $(".info-img img").each((i, v) => {
        imgWd[i] = Math.floor((v.height / all) * 100);
      });
      // 네비게이션 길이 적용
      $(".nav-area li").each((i, v) => $(v).css({ width: imgWd[i] + "%" }));
      // 휠 이벤트
      moveImgInfo($(".detail-page"));
    }; /////// nav세팅 함수 /////////////
    
    // 타이틀 세팅
    let txt = selData.code +'^'+ selData.sub
    myCon.chgTit(txt);

    if (!selData) return;
    else setNav();
  }; ///////////// loadFn 함수 //////////////

  // 네비게이션
  const makeProgress = (data) => {
    return (
      <div className="part-box col-14 row-1 nav-area">
        <ul className="flex-box">
          {data.map((v, i) => (
            <li key={i}>
              {/* 네비게이션 안내 */}
              <h2 className="nav-tit">{v["ialt"]}</h2>
              <div className="nav-cont">
                {/* 네비게이션 색 채우기 구역 */}
                <div className="nav-full"></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  // 이미지
  const makeImage = (data) => {
    return (
      <section className="prod-info row-10">
        <div className="info-img flex-box">
          {/* 제품 정보 옆으로 흘러갈 박스 */}
          {data.map((v, i) => (
            <img key={i} src={v["isrc"]} alt={selData["sub"] + " " + v["ialt"]} />
          ))}
        </div>
      </section>
    );
  };

  // 리턴구역 ///////////////////
  return (
    <>
      <main className="main in-box row-12 detail-page" onLoad={loadFn}>
        {/* 네비게이션 구역 */}
        {selData ? makeProgress(selData["img"]) : <h2></h2>}
        {/* 제품 설명 구역 */}
        <div className="part-box col-16 row-11 prod-area">
          {/* 제품이미지 */}
          {selData ? makeImage(selData["img"]) : <h2>세부이미지가 없습니다.</h2>}
          {/* 버튼들 */}
          <section className="prod_pick flex-box">
            <div className="add-wish wish-sub">add to wishlist ＞</div>
            <div className="add-wish wish-sub buy-btn">buy now ↗</div>
          </section>
        </div>
      </main>
    </>
  );
} //////// SubSwitch ///////////
