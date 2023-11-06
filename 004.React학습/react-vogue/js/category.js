// 보그PJ 카테고리 페이지 category.js

// 상단영역 컴포넌트 불러오기
import TopArea from "./components/top_area.jsx";
// 메인영역 컴포넌트 불러오기
import MainCategory from "./components/main_area.jsx";
// 하단영역 컴포넌트 불러오기
import FooterArea from "./components/footer_area.jsx";

// 제이쿼리 기능구현 함수 불러오기
import setJSTop from "./common2.js";

///////// 카테고리페이지 전체 출력 컴포넌트 /////////////
/************************************************ 
  컴포넌트명 : MainComponent
  기능 : 상단, 메인, 하단페이지 출력
************************************************/
function MainComponent() {
  // 페이지 랜더링 후 1회 실행
  React.useEffect(setJSTop,[]);
  
  // 우선 URL로 넘어온 키 값을 가져옴!
  // parameter전달값 받기 : 파라미터 JS전담객체는?
  // -> URLSearchParams
  const params = new URLSearchParams(location.search);
  const catName = decodeURIComponent(params.get("category"));
  // 'time & gem' 때문에 값을 인코딩 해서 보냄 -> 디코딩 필요함

  // 만약 처음 들어오는 경우 파라미터가 null이면 정상적인 접근이 아니므로 첫페이지로 이동
  //  if(!catName) location.href='index.html';
  // console.log("URL :", location.search, "\n", params, "\n", catName);
  // 파라미터 중 특정 키 받기 : get(키이름)

  // 후크변수를 통한 카테고리페이지 관리하기
  // 카테고리 데이터 상태관리 변수 만들기
  const [nowCat, setNowCat] = React.useState(catName);

  // 카테고리 데이터 상태관리 변수 업데이트 함수
  const chgCat = v => {
    console.log(v,'바꿔');
    // 상태관리 변수 nowCat 업데이트
    setNowCat(v);
  }; /////// chgCat함수 ////////

  return (
    <React.Fragment>
      {/* 1. 상단영역 */}
      <TopArea  chgFn={chgCat}/>
      {/* 2. 메인영역 */}
      <MainCategory category={nowCat}/>
      {/* 3. 하단영역 */}
      <FooterArea />
    </React.Fragment>
  );
} /////////// MainComponent 컴포넌트 ////////////////////

// 메인 컴포넌트 출력하기 ///////////////////////////////////////////////
ReactDOM.render(<MainComponent />, document.querySelector("#root"));
