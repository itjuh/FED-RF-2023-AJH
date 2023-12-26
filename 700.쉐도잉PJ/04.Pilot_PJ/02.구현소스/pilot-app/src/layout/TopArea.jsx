// Pliot PJ 상단영역 공통 컴포넌트
// GNB데이터 가져오기
import { gnbData } from "../data/gnb";
import { TotalMenu } from "../modules/TotalMenu";
import $ from 'jquery';
// 컨텍스트 API 불러오기
import { pCon } from "../modules/PliotContext";
import { useContext } from "react";

export function TopArea(props) {
  // props.chgFn - useState변환메서드
  // props.cat - 카테고리명(메뉴데이터 선택용)

  // contextAPI
  const myCon = useContext(pCon);
  /**
   * GNB 클릭 시 변경 적용 함수
   */
  const clickGnb = e=>{
    // glist일 경우 적용하기
    if(props.cat === 'glist'){
      const tgEle = $(e.currentTarget);
      let atxt = tgEle.text().substr(0,1);
      // console.log(props.cat,'클릭한자신',atxt);
      // 클릭 된 자신은 class 'on'넣고 다른 형제메뉴는 'on'빼기
      tgEle.addClass('on').siblings().removeClass('on');
      // 공유 참조변수 업데이트 : 첫글자로 모드명 가져오기
      myCon.setGlistMode(atxt);
    }
  }; ////// clickGnb
  /// GNB메뉴 리스트 만들기 함수
  const makeList = (data) => {
    return gnbData[data].map((v, i) => (
      <li key={i} className={props.cat==='glist'&&i===0?'on':''} onClick={clickGnb}>
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
