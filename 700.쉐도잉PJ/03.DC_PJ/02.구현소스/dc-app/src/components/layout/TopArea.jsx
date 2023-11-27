// 상단영역 컴포넌트

// gnb데이터 불러오기
import { Link } from "react-router-dom";
import { Logo } from "../modules/Logo";
import { menu } from "../data/gnb";
// 컨텍스트 API
// import { dcCon } from '../modules/dcContext'
// import { useContext } from "react";
// 폰트어썸 아이콘 불러오기
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// 제이쿼리
import $ from 'jquery';
import { memo } from "react";

/*
 메모이제이션 적용하기!
 그러나 단순히 적용하면 효과가 없음
 이유는? 컨텍스트 API가 전역적인 함수/변수를 전달하고 있어서 매번 새롭게
 리 랜더링 되므로 메모이제이션 갱신을 하게끔하기에 효과가 없음
 ->> 방법은? 컨텍스트 API를 사용하지 않고
 props로 전달하는 방식으로 전환하면 효과를 볼 수 있다
 ->> 왜? React.memo는 전달 속성이 변경 됨을 기준하여 메모이제이션 기능을 제공하기 때문이다.
 ->> 전달되는 함수는 반드시 useCallback()처리가 되어야 한다!!
*/

export const TopArea = memo(({chgPgFn})=>{
  /* 
    보통 props등 전달변수만 쓰면 하위 속성명으로 값을 전달하지만
    중괄호 {}를 사용하면 속성명을 직접 사용할 수 있다.
  */
  
  // 컴포넌트 호출 확인
  console.log('TopArea 컴포넌트 호출!!!');
  /******************************************************* 
  [ 리액트 라우터와 연결하여 사용되는 라우터 컴포넌트 ]
  1. <Link to="/경로명"></Link>
  -> to속성의 경로는 <Route path="/경로명"> 과 일치함!

  2. <Outlet />
  -> 라우터 연결 컴포넌트 출력자리 컴포넌트
  -> 여기서는 메인컴포넌트인 MainArea 컴포넌트에 출력
*******************************************************/
  /*
  map()을 사용하여 태그를 생성할 때 데이터의 유일키를 key속성으로 지정하지 않으면
  아래와 같은 에러가 발생함
  ->>> Warning: Each child in a list should have a unique "key" prop.
  (이유: 구별되는 항목으로 나중에 업데이트 시 이용할 수 있도록 리액트에서 강제하고 있음)
*/
// const myCon = useContext(dcCon);

// 검색관련 함수 ////////////////////////
// 1. 검색창 보이기 함수
const showSearch = (e) =>{
  // a요소 기본기능 막기
  e.preventDefault();
  // 검색창 보이고 입력창에 포커스
  $('.searchingGnb').show().find('#schinGnb').focus();
}; /////////// showSearch 함수 /////////
// 2. 입력창에 엔터키를 누르면 검색함수 호출
const enterKey = (e)=>{
  console.log('enterKey진입');
  if(e.key === 'Enter'){ 
    let txt = $(e.target).val().trim();
    // console.log(txt);
    // 빈 값이 아니면 검색함수 호출(검색어 전달)
    if(txt!='') {
      // 자기자신 닫기
      $(e.target).val('').parent().hide();
      // 검색보내기
      goSearch(txt);
    }
  } ///////// if /////////
}; //////// enterKey함수 //////////
// 3. 검색페이지로 검색어와 함께 이동하기
const goSearch = (txt) => {
  console.log('나는 검색하러 간다규!');
  // 라우터 이동함수로 이동하기 : context API사용하기
  // goNav('/schpage',{state:{keyword:''}});
  // myCon.chgPg('/schpage',{state:{keyword:txt}});

  // 메모이제이션 적용하여 페이지 이동하기
  chgPgFn('/schpage',{state:{keyword:txt}});
}; ////////// goSearch함수 ////////////


///리턴코드 /////////////////////////////
  return (
    <>
      {/* 1. 상단영역 */}
      <header className="top-area">
        <nav className="gnb">
          {/* 1-1. 네비게이션 GNB파트 */}
          <ul>
            {/* 1) DC 로고 컴포넌트 */}
            <li>
              <Logo logoStyle="top" />
            </li>
            {/* 2) GNB메뉴 데이터 기반으로 li태그 생성하기*/}
            {menu &&
              menu.map((v, i) => (
                <li key={i}>
                  {
                    // 하위메뉴가 있으면 일반 a요소에 출력
                    // 없으면 Link 라우팅 출력
                    v.sub ? <a href="#">{v.txt}</a> : <Link to={v.link}>{v.txt}</Link>
                  }
                  {
                    // 서브메뉴가 있는 경우 하위 그리기
                    v.sub && (
                      <div className="smenu">
                        {/* 서브메뉴 */}
                        <ol>
                          {v.sub.map((v, i) => (
                            <li key={i}>
                              <Link to={v.link}>{v.txt}</Link>
                            </li>
                          ))}
                        </ol>
                      </div>
                    )
                  }
                </li>
              ))}
            {/* 3) 검색,회원가입,로그인 링크 */}
            <li style={{ marginLeft: "auto" }}>
              {/* 검색 입력 박스 */}
              <div className="searchingGnb">
                {/* 검색버튼 돋보기 아이콘 */}
                <FontAwesomeIcon icon={faSearch} className="schbtnGnb" title="Open search" />
                {/* 입력창 */}
                <input id="schinGnb" onKeyUp={enterKey} type="text" placeholder="Filter by keyword" />
              </div>
              {/* 검색기능 링크 - 클릭 시 검색창 보이기 */}
              <a href="#" onClick={showSearch}>
                <FontAwesomeIcon icon={faSearch} />
              </a>
            </li>
            {/* 회원가입, 로그인은 로그인 아닌 상태일 때 나옴 */}
            <li>
              <Link to="/member">Join us</Link>
            </li>
            <li>
              <Link to="/login">Log in</Link>
            </li>
          </ul>
          {/* 모바일용 햄버거 버튼 */}
          <button className="hambtn" onClick={() => {}}></button>
        </nav>
      </header>
    </>
  );
}); ////////// TopArea 컴포넌트 //////////
