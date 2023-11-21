// 서브페이지 sub KeyboardList page - SubBoard.jsx
// 서브 페이지용 css
import { useLocation } from 'react-router-dom';
import '../../css/subboard.css'
// 서브페이지용 데이터
import { detailData } from "../data/detailData";
import { useLayoutEffect } from 'react';

/*
  keyboard1: {
    code: "FC900RBTPD",
    sub: "코랄 블루",
    type: "keyboard",
    img: [
      { isrc: "./images/keyboard1/01.jpg", ialt: "image1" },
      { isrc: "./images/keyboard1/02.jpg", ialt: "image2" },
      { isrc: "./images/keyboard1/03.jpg", ialt: "image3" },
      { isrc: "./images/keyboard1/04.jpg", ialt: "must-read" },
      { isrc: "./images/keyboard1/05.jpg", ialt: "infomation1" },
      { isrc: "./images/keyboard1/06.jpg", ialt: "infomation2" },
    ],
*/
export function SubBoard() {
  // 본페이지에서 데이터 받아오기
  const location = useLocation();
  let name = location.state.name; //detailData key
  // 선택 데이터
  let selData = detailData[name];

  // 랜더링 후
  useLayoutEffect(()=>{
    // 네비게이션바 길이 조정

  });

  // 네비게이션
  const makeProgress = (data)=>{
    return(
      data.map((v,i)=><li key={i}>
        <h2 className='nav-tit'>{v['ialt']}</h2>
        <div className='nav-cont'></div>
      </li>)
    )
  };
  // 이미지
  const makeImage = (data) => {
    return(
      data.map((v,i)=><img key={i} src={v['isrc']} alt={selData['sub']+' '+v['ialt']} />)
    )
  };

  // 리턴구역 ///////////////////
  return (
    <>
      <main className="main in-box row-12">
        {/* 네비게이션 구역 */}
        <div className="part-box col-14 row-1 nav-area">
          <ul className="flex-box">
            {makeProgress(selData['img'])}
          </ul>
        </div>
        {/* 제품 설명 구역 */}
        <div className="part-box col-16 row-11 prod-area">
          <section className="prod-info row-10">
            {/* 제품 정보 옆으로 흘러갈 박스 */}
            <div className="info-img flex-box">
              {makeImage(selData['img'])}
            </div>
          </section>
          <section className="prod_pick flex-box">
            <div className="add-wish wish-sub">add to wishlist ＞</div>
            <div className="add-wish wish-sub buy-btn">buy now ↗</div>
          </section>
        </div>
      </main>
    </>
  );
} /////////// SubBoard 컴포넌트 ////////////////