// 보그PJ 카테고리 페이지 category.js

// 카테고리 context API파일 불러오기
import { catContext } from "./components/cat_context.jsx";
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
  // if(catName == null){ 
  //   location.href='index.html';
  // };
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
    // 처음 들어 온 Get 파라미터가 생성 된 후 다른 카테고리 페이지로 변경하다가 
    // 새로고침 등 페이지 리로드 시 처음 들어온 Get 파라미터로 변경되며 새로 고쳐짐
    // 처음 들어 온 categoty=카테고리명 때문임
    // 리액트 컴포넌트 업데이트 시 상단 url마지막 category 값을 실제 카테고리명으로 업데이트하기
    // -> history객체는 window하위 객체임
    // 이번페이지로 이동하기 history.back() 등 유명함!!
    // history.pushState(null,null,'?키=값') => 현재 url강제 업데이트
    history.pushState(null,null,'?category='+encodeURIComponent(v));
    // 'time & gem' 때문에 값을 인코딩
  }; /////// chgCat함수 ////////
  return (
    /* 
    최상위 컴포넌트에서 관리되는 변수/함수를 하위 컴포넌트에 공유하기 위해
    Context API를 사용한다.
    순서 : 
      1. creatContext() 를 생성하여 사용 할 곳에 import 한다
      2. 최상위 컴포넌트에서 컨텍스트 프로바이더를 셋팅한다
      <생성컨텍스트명.Provider value={}>
        하위컴포넌트들....
      </생성컨텍스트명.Provider>
      3. value속성에 공유할 변수/함수를 {{}}안에 넣어준다. 
      -> value={{변수}} || value{{변수,함수,변수,...}}
      4. 하위컴포넌트에서 useContext(생성컨텍스트명)으로 생성하여 
        셋팅 된 변수/함수를 호출하여 사용한다.
    */
    <catContext.Provider value={{chgCat}}>
      {/* 1. 상단영역 */}
      <TopArea />
      {/* <TopArea  chgFn={chgCat}/> 프롭스 펑션다운으로 처리함*/}
      {/* 2. 메인영역 */}
      <MainCategory category={nowCat}/>
      {/* 3. 하단영역 */}
      <FooterArea />
    </catContext.Provider>
  );
} /////////// MainComponent 컴포넌트 ////////////////////

// 메인 컴포넌트 출력하기 ///////////////////////////////////////////////
ReactDOM.render(<MainComponent />, document.querySelector("#root"));
