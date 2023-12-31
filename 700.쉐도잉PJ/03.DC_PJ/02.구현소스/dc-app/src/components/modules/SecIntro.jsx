// DC.com 섹션소개 컴포넌트 SecIntro.jsx
// 섹션소개 모듈 데이터 가져오기
import { secIntroData } from "../data/sec_intro";
import { dcCon } from "./dcContext";
import { useContext } from "react";
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// css가져오기
import "../../css/sec_intro.css";

// 구조 : Root > section > img Box + title Box + button Box

export function SecIntro() {
  // 선택 데이터
  const selData = secIntroData;
  // 라우터 이동함수
  // const goNav = useNavigate();
  // 라우터 이동함수
  // const chgPg = (txt)=>goNav(txt);
  // 컨텍스트 API 사용하기
  const myCon = useContext(dcCon);


  return (
    <>
      <section className="sec-intro">
        {selData.map((v, i) => (
          <div key={i}>
            {/* 1. 이미지 박스 */}
            <div className="imbx">
              <img src={process.env.PUBLIC_URL+v.isrc} alt={v.tit.split('^')[0]} />
            </div>
            {/* 2. 타이틀 박스 */}
            <div className="titbx">
              <h3>{v.tit.split('^')[0]}</h3>
              <h2>{v.tit.split('^')[1].toUpperCase()}</h2>
            </div>
            {/* 3. 버튼 박스 */}
            <div className="btnbx">
              {/* <Link to={v.link}> */}
                <button onClick={()=>myCon.chgPg(v.link)}>{v.btn.toUpperCase()}</button>
              {/* </Link> */}
            </div>
          </div>
        ))}
      </section>
    </>
  );
} //////// SecIntro 컴포넌트 //////////////
