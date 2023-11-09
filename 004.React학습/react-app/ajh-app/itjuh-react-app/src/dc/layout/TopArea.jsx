// 상단영역 컴포넌트

// gnb데이터 불러오기
import { Logo } from "../contents/Logo";
import { menu } from "../data/gnb";

export function TopArea(props) {
  // chgFn - 상단메뉴변경용 상태관리함수
  return (
    <>
      {/* 1. 상단영역 */}
      <header className="top-area">
        <nav className="gnb">
          {/* 1-1. 네비게이션 GNB파트 */}
          <ul>
            <li>
              {/* DC 로고 */}
              <Logo />
            </li>
            {
                menu.map((v,i)=><li key={i}><a href='#' onClick={()=>props.chgFn(v.txt=='Home'?'main':v.txt)}>{v.txt}</a></li>)
                /*
                map()을 사용하여 태그를 생성할 때 데이터의 유일키를 key속성으로 지정하지 않으면
                아래와 같은 에러가 발생함
                ->>> Warning: Each child in a list should have a unique "key" prop.
                (이유: 구별되는 항목으로 나중에 업데이트 시 이용할 수 있도록 리액트에서 강제하고 있음)
                */
            }
          </ul>
        </nav>
      </header>
    </>
  );
} ////////// TopArea 컴포넌트 //////////
