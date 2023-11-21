// Pliot PJ 상단영역 공통 컴포넌트
// GNB데이터 가져오기
import { gnbData } from "../data/gnb";
import { TotalMenu } from "../modules/TotalMenu";

export function TopArea(props) {
  // props.chgFn - useState변환메서드
  // props.cat - 카테고리명(메뉴데이터 선택용)

  /// GNB메뉴 리스트 만들기 함수
  const makeList = (data) => {
    return gnbData[data].map((v, i) => (
      <li key={i}>
        <a href="#">{v}</a>
      </li>
    ));
  }; ///////// makeList ///////
  return (
    <>
      <div id="top-area">
        <header className="top-area ibx">
          <h1 id="logo">
            <a href="#">
              <img src="./images/main_logo.png" alt="파일럿로고" />
            </a>
          </h1>
          <nav className="gnb">
            <ul>
              <li className="bld">배너순번 li 숨기기</li>
              {makeList(props.cat)}
            </ul>
          </nav>
          <div className="ham">
            <span></span> <span></span> <span></span>
          </div>
          <TotalMenu />
        </header>
      </div>
    </>
  );
} ////////// TopArea 컴포넌트 ///////////

// <button onClick={()=>{props.chgFn('men')}}>남성페이지</button>
//             <button }>여성페이지</button>
//             <button onClick={()=>{props.chgFn('style')}}>스타일페이지</button>
//             <button onClick={()=>{props.chgFn('main')}}>메인페이지</button>
