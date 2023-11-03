// 보그PJ 카테고리 페이지 category.js

// 링크시스템 js 가져오기
import { makeLink } from "./linksys2.js";
// 카테고리 데이터 가져오기
import catData from "./data/category_data.js";
console.log(catData);

//////////// 상단영역 컴포넌트 ////////////////////
/************************************************ 
  컴포넌트명 : TopArea
  기능 : 상단영역에 메뉴, 로고 등 요소 구성
************************************************/
function TopArea() {
  //컴포넌트 요소 랜더링 직전 호출구역
  // -> 컴포넌트는 모두 만들어진 후 화면 뿌리기 직전(가 랜더링)
  React.useLayoutEffect(makeLink);
  // React.useLayoutEffect(()=>{makeLink() dFn2() }); //여러개 쓰는 경우 익명함수로

  return (
    <React.Fragment>
      {/* 1-1.상단메뉴 */}
      <div className="tmenu">
        {/* 1-1-1.sns박스 */}
        <div className="sns">
          <a href="#" className="fi fi-instagram">
            <span className="ir">인스타그램</span>
          </a>
          <a href="#" className="fi fi-facebook">
            <span className="ir">페이스북</span>
          </a>
          <a href="#" className="fi fi-twitter">
            <span className="ir">트위터</span>
          </a>
          <a href="#" className="fi fi-youtube-play">
            <span className="ir">유튜브</span>
          </a>
          <a href="#" className="fi cas">
            <span className="ir">카카오스토리</span>
          </a>
        </div>
        {/* 1-1-2.사이드메뉴 */}
        <div className="sideMenu">
          <ul className="smbx">
            <li>
              <a href="#">SIDE MENU</a>
              서브메뉴
              <ol className="smsub">
                <li>
                  <a href="#">회사 소개</a>
                </li>
                <li>
                  <a href="#">광고 및 제휴</a>
                </li>
                <li>
                  <a href="#">개인정보 처리방침</a>
                </li>
              </ol>
            </li>
            <li>
              <a href="#">SUBSCRIBE</a>
            </li>
          </ul>
        </div>
      </div>
      {/* 1-2.로고박스 */}
      <h1 className="logo">
        <a href="#">
          <img src="./images/mlogo.png" alt="메인로고" />
        </a>
      </h1>
      {/* 1-3.GNB박스 */}
      <nav className="gnb">
        <ul>
          <li>
            <a href="#">FASHION</a>
          </li>
          <li>
            <a href="#">BEAUTY</a>
          </li>
          <li>
            <a href="#">LIVING</a>
          </li>
          <li>
            <a href="#">PEOPLE</a>
          </li>
          <li>
            <a href="#">VIDEO</a>
          </li>
          <li>
            <a href="#">RUNWAY</a>
          </li>
          <li>
            <a href="#">TIME &amp; GEM</a>
          </li>
          <li>
            <a href="#">SHOPPING</a>
          </li>
          <li>
            {/* 돋보기 검색버튼 */}
            <i className="fi fi-search">
              <span className="ir">search</span>
            </i>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
} /////////// TopArea 컴포넌트 ////////////////////

// 상단영역 출력하기
ReactDOM.render(<TopArea />, document.querySelector(".top-area"));

///////////////////////////////////////////////////////////////////

///////// 카테고리페이지 메인 컴포넌트 /////////////
/************************************************ 
  컴포넌트명 : MainCategory
  기능 : 아이템페이지 타이틀+리스트 요소구성
************************************************/
function MainCategory() {
  // 우선 URL로 넘어온 키 값을 가져옴!
  // parameter전달값 받기 : 파라미터 JS전담객체는?
  // -> URLSearchParams
  const params = new URLSearchParams(location.search);
  const catName = decodeURIComponent(params.get("category"));
  // 'time & gem' 때문에 값을 인코딩 해서 보냄 -> 디코딩 필요함

  console.log("URL :", location.search, "\n", params, "\n", catName);
  // 파라미터 중 특정 키 받기 : get(키이름)
  // 카테고리 해당 데이터 선택하기
  // 카테고리 전체 객체 데이터 중 해당항목 선택
  const selData = catData[catName];

  console.log(selData);
  return (
    <React.Fragment>
      <SubTitle tit={selData.제목} menu={selData.메뉴} />
      <ItemList cname={selData.경로} tit={selData.타이틀} />
    </React.Fragment>
  );
} /////////// MainCategory 컴포넌트 ////////////////////

// 카테고리페이지 출력하기
ReactDOM.render(<MainCategory />, document.querySelector(".main-area"));

//// 메인 컴포넌트 하위 서브 타이틀 컴포넌트 ////////
/************************************************ 
  컴포넌트명 : SubTitle
  기능 : 서브 타이틀 요소 구성
************************************************/
function SubTitle(props) {
  // 서브메뉴 있을 경우 li데이터 생성 하기함수
  const makeList = (data) =>
    data.map((v) => (
      <li>
        <a href="#">{v}</a>
      </li>
    ));
  // data 는 배열형, map으로 코드생성({}쓰면 리턴 못함!!!)
  // 리액트에서는 리액트용 map()을 구성하여 html코드를 리턴하므로 join()불필요
  return (
    // 2-1. 카테고리페이지 상단영역
    <header class="cat-top-area">
      {/* 2-1-1. 서브타이틀 */}
      <h2 class="cat-tit">{props.tit}</h2>
      {/* 2-1-2. 서브메뉴(LNB:Local Navigation button) 
      -> 메뉴 데이터 값이 '없음'이 아닐 때만 생성 됨!*/}
      {props.menu != "없음" && (
        <nav class="lnb">
          <ul>{makeList(props.menu)}</ul>
        </nav>
      )}
    </header>
  );
} /////////// ItemList 컴포넌트 ////////////////////
//// 메인 컴포넌트 하위 서브 리스트 컴포넌트 ////////
/************************************************ 
  컴포넌트명 : ItemList
  기능 : 카페고리 아이템 별 리스트 요소 구성
************************************************/
function ItemList(props) {
  // cname - 경로
  // tit - 리스트 타이틀
  // let hcode = '';
  // const makeList = function(data){
  //   for(let i=0; i<2;i++){
  //     hcode += "<section className='pt2'>";
  //     for(let x=1; x<=3; x++){
  //       hcode += `<div className='cbx bgi bg${i+1}-${x}'>
  //       <h2>${data[i+x-1]}</h2>
  //       </div>`
  //     }
  //     hcode += '</section>'
  //   }
  //   return hcode;
  // }
  // console.log(makeList(props.tit).split(/\s/g,''));
  return <div className={"cat-cont-area " + props.cname}>{makeList(props.tit)}</div>;
  // return <div className={"cat-cont-area " + props.cname}>
  //   <section className='pt2'>
  //     <div className='cbx bgi bg1-1'>
  //       <h2>{props.tit[0]}</h2>
  //     </div>
  //   </section>
  // </div>;
} //////////n ItemList 컴포넌트 ////////////////////
