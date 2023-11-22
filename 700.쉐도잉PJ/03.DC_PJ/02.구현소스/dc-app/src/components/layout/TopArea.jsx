// 상단영역 컴포넌트

// gnb데이터 불러오기
import { Link } from "react-router-dom";
import { Logo } from "../modules/Logo";
import { menu } from "../data/gnb";
// 폰트어썸 아이콘 불러오기
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function TopArea() {
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
  return (
    <>
      {/* 1. 상단영역 */}
      <header className="top-area">
        <nav className="gnb">
          {/* 1-1. 네비게이션 GNB파트 */}
          <ul>
            {/* 1) DC 로고 컴포넌트 */}
            <li>
              <Logo logoStyle='top'/>
            </li>
            {/* 2) GNB메뉴 데이터 기반으로 li태그 생성하기*/}
            {menu && menu.map((v, i) => (
              <li key={i}>
                {
                  // 하위메뉴가 있으면 일반 a요소에 출력
                  // 없으면 Link 라우팅 출력
                  v.sub ? <a href="#">{v.txt}</a>:<Link to={v.link}>{v.txt}</Link>
                }
                { 
                  // 서브메뉴가 있는 경우 하위 그리기
                  v.sub &&
                  (<div className='smenu'>
                    {/* 서브메뉴 */}
                    <ol>
                      {v.sub.map((v,i)=><li key={i}>
                        <Link to={v.link}>{v.txt}</Link>
                      </li>)}
                    </ol>
                  </div>)                  
                }
              </li>
            ))}
            {/* 3) 검색,회원가입,로그인 링크 */}
            <li style={{marginLeft:'auto'}}>
              {/* 검색기능 링크 - 클릭 시 검색창 보이기 */}
              <a href='#' onClick={()=>{}}>
                <FontAwesomeIcon icon={faSearch}/>
              </a>
            </li>
            {/* 회원가입, 로그인은 로그인 아닌 상태일 때 나옴 */}
            <li>
              <Link to='/member'>Join us</Link>
            </li>
            <li>
              <Link to='/login'>Log in</Link>
            </li>
          </ul>
          {/* 모바일용 햄버거 버튼 */}
          <button className='hambtn' onClick={()=>{}}></button>
        </nav>
      </header>
    </>
  );
} ////////// TopArea 컴포넌트 //////////
