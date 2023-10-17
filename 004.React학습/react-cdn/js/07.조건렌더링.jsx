// 07.리액트 : 조건렌더링 + 리스트렌더링

/*****************************************
1. if문을 사용하여 조건부 렌더링하기
- 리액트에서는 조건부로 구성요소를 랜더링 할 수 있다.
*****************************************/

// 선택적으로 로딩하도록 컴포넌트를 2개 만들기

// 1번 컴포넌트
function MakeDeveloper() {
  return <h1>나는 개발자야</h1>;
} ////////////MakeDev 컴포넌트 ///////////////

// 2번 컴포넌트
function LostDeveloper() {
  return <h1>개발자가 뭐지?</h1>;
} ////////////LostDeveloper 컴포넌트 ///////////////

// 3번 컴포넌트
function MakeImg(props) {
  return <img src={props.isrc} alt={props.ialt} title={props.itit} />;
} ///////////MakeImg 컴포넌트////////////////

// 셋팅할 변수 : isDev, isrc, ialt, itit

// 출력 메인 컴포넌트
function Developer(props) {
  const isNow = props.isDev; // true/false

  // 조건문
  if (isNow) {
    return (
      <React.Fragment>
        {/* MakeDeveloper컴포넌트 선택적 출력하기 */}
        <MakeDeveloper />
        <MakeImg isrc={props.isrc} ialt={props.ialt} itit={props.itit} />
      </React.Fragment>
    );
  } ////////////if/////////////

  //if문 걸리면 위에서 return되고 나감
  //else 없어도 됨
  return (
    <React.Fragment>
      {/* MakeDeveloper컴포넌트 선택적 출력하기 */}
      <LostDeveloper />
      <MakeImg isrc={props.isrc} ialt={props.ialt} itit={props.itit} />
    </React.Fragment>
  );
} //////////developer 컴포넌트 /////////////////

// 이미지경로 배열
const devImg = [
  "https://cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/HYAONH6EGJBKIU5CJWWF343MKE.jpg",
  "https://img3.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202208/24/BoiledMovie/20220824133926904mopw.png",
];

// 컴포넌트 호출하기 : 개발자 찍기
ReactDOM.render(
  <Developer isDev={true} isrc={devImg[0]} itit="프론트엔드 개발자 공유입니다" ialt="개발자 공유" />,
  document.querySelector("#root1")
);
// 컴포넌트 호출하기 : 비 개발자 찍기
ReactDOM.render(
  <Developer isDev={false} isrc={devImg[1]} itit="개발자가 뭡니까?" ialt="주먹왕 마동석" />,
  document.querySelector("#root2")
);

/********************************************** 
    2. if문이 아닌 조건 표현하기
    -> 조건식 && JSX표현식
    조건이 true일때만 && 뒤의 JSX표현식이 출력됨!
**********************************************/
// 개발자들 취향을 알아보자

// 2-1. 제목을 찍기 위한 타이틀 컴포넌트
function Title(props) {
  // 컴포넌트 호출 시 tit를 셋팅함
  return <h1>👨‍🔧개발자👩‍🔧가 좋아하는 {props.tit}</h1>;
} /////////// Title 컴포넌트 ///////////////

// 음식리스트
const foods = ["스파게티🍝","짜파게티🍜","냉면🍲","짜장면🥡","마라탕🥘"];
// const foods = [];
// 2-2. 반복리스트를 위한 컴포넌트
function FoodList(props) {
  // 음식명은 fname에 담아서 전달~
  return <li>개발자는 {props.fname} 좋아해!</li>;
} /////////// FoodList 컴포넌트 /////////////

// 2-3. 개발자 음식 출력 컴포넌트
function DevWishList(props) {
  //wlist 속성에 담에서 보내준다
  //위시 리스트 담기
  const myFood = props.wlist;
  //코드리턴
  return (
    <React.Fragment>
      <Title tit="음식" />
      {/* 음식 위시리스트의 길이가 0보다 클때만 출력 */}
      {myFood.length > 0 && (
        <div>
          <h2>개발자가 좋아하는 음식은 모두 {myFood.length}가지 입니다.</h2>
          <ul>
            <li>
              {
                //배열변수.map() 메서드 사용
                //map(v=>바로 리턴 컴포넌트)
                //리액트 map()은 JS map()과 달리 join()필요없음
                myFood.map((x) => (
                  <FoodList fname={x} />
                ))
              }
            </li>
          </ul>
        </div>
      )}
      {/* 음식 위시리스트가 없는 경우
                다른 경우의 출력은 별도의 JSX 출력 중괄호 구역에 코딩한다! */}
      {myFood.length == 0 && <h2>아직 좋아하는 음식 리스트가 업데이트 되지 않았습니다.😥😥</h2>}
    </React.Fragment>
  );
} /////// developerWishList 컴포넌트 //////////

// 컴포넌트 출력하기
ReactDOM.render(<DevWishList wlist={foods} />, document.querySelector("#root3"));

//////////////////////////////////////////////////////////
////////// 3. 복잡한 리스트를 출력하는 컴포넌트 ////////////
// 전달 배열 변수 ////////
// const movs = [
//   { year: "2021", mtit: "모가디슈" },
//   { year: "2022", mtit: "범죄도시2" },
//   { year: "2023", mtit: "가디언즈 오브 갤럭시3" },
// ];
const movs = [];

/////// 개발자가 좋아하는 영화찍기 ///////////////
// 컴포넌트를 구상하여 찍기
/*
    [ 출력형태 ]
    👨‍🔧개발자👩‍🔧가 좋아하는 영화
    개발자가 좋아하는 영화는 최근 3년간 아래와 같습니다!
    2021년도 영화1
    2022년도 영화2
    2023년도 영화3
*/
// 3-1. 제목을 찍기 위한 타이틀 컴포넌트
// -> 2-1. 컴포넌트 재사용

// 3-2. 반복리스트를 위한 컴포넌트 //////
function MovieList(props) {
  // year - 영화 개봉 년도 / mtit 영화명
  return (
    <li>
      {props.year}년도 {props.mtit}
    </li>
  );
} ///////// MovieList 컴포넌트 /////////

// 3-3. 개발자 선호 영화리스트 출력 컴포넌트

function WishList2(props) {
  //위시 리스트 속성으로 담기
  const mymv = props.wlist;
  return (
    <React.Fragment>
      <Title tit="영화" />
      {/* 영화 위시 리스트의 값이 있을때만 출력 */}
      {mymv.length > 0 && (
        <div>
          <h2>개발자가 좋아하는 영화는 최근 {mymv.length}년간 아래와 같습니다.</h2>
          <ul>
            <li>
              {mymv.map((v) => (
                <MovieList year={v.year} mtit={v.mtit} />
              ))}
            </li>
          </ul>
        </div>
      )}
      {
        mymv.length == 0 && 
        <div>
            <h2>개발자가 좋아하는 영화가 업데이트 되지 않았습니다.😥😥</h2>
        </div>
      }
    </React.Fragment>
  );
} //////////WishList2 컴포넌트 ///////////

// 3-4. 개발자가 좋아하는 영화 출력하기
ReactDOM.render(<WishList2 wlist={movs} />, document.querySelector("#root4"));

/********************************************************** 
    4. 조건 연산자(삼항연산자)를 사용하여 조건부 랜더링하기 
**********************************************************/
// 명화 데이터
const worksrc = {
    "피카소":"https://m.theartin.net/web/product/big/201907/30c5a0fdd153bfdfdc8f19b2f4166fa8.jpg",
    "모네":"https://dimg.donga.com/wps/NEWS/IMAGE/2015/12/11/75316598.3.jpg"
};

// 개발자가 좋아하는 그림(명화)찍기

// 4-1. 타이틀과 그림 찍기 컴포넌트
// 구성: 작가이름 + 작품이미지
// 데이터: 작가이름(key - painter),이미지경로(property - worksrc), 작품명(wname)
function MakeWork(props){
    return(
        <div>
            <h2>{props.painter}</h2>
            <img src={worksrc[props.painter]}
                 alt={props.wname}
                 style={{width:'400px'}}
                 title={props.wname}            
            />
        </div>
    );
} ///////////////////MakeWork컴포넌트 /////////////////

// 전체출력 컴포넌트 만들기
// 구성: 전체타이틀(Title컴포넌트 사용) + 변경버튼 + 작가와 그림 출력(Makework)
// 특이사항: 변경버튼 클릭 시 MakeWork 컴포넌트의 데이터를 업데이트해서 출력(Hook사용!)
function ExpComp(props){
    // 작가이름 전달변수 : props.isChange
    // props.isChange : true / false
    // [ 일반변수 ]
    // let result = props.isChange;
    /*
        [ 후크변수 ]
        useState() 메서드가 변수값이 업데이트 되는 여부를 감지하여
        변경 시 사용하는 컴포넌트를 자동으로 업데이트 한다.
        set변수명 : 변수명 첫글자는 대문자로!
        
        const [변수명,set변수명] = React.useState(초기값);
        ___________________________________________________
        [ 후크변수 업데이트 ]
        set변수명(값);

    */ 
    const [result,setResult] = React.useState(props.isChange);


    // 변경버튼 호출함수
    const againFn = ()=>{
        // Not연산자 !(느낌표)는 true/false를 반환
        // [ 일반변수 업데이트 ]
        // result = !result;
        // [ 후크변수 업데이트 ]
        setResult(!result);
        console.log('다시 변경해!',result);
        // 단순히 변수값만 변경한다고 해서 이 변수를 사용하는 컴포넌트가 변경되지 않음
        // 이때, 변수의 상태를 관리하는 후크(Hook)를 사용하면 반영 할 수 있다.

    }; //////////againFn 함수 ////////////////

    return(
        <React.Fragment>
            {/* 1. 큰제목 */}
            <Title tit='명화' />
            {/* 2. 변경버튼: 클릭 시 again함수를 호출함 */}
            <button onClick={againFn}>작가변경!!!</button>
            {/* 3. 작품출력 : 3항 연산자로 작품 변경하기 */}
            {
                result ? 
                <MakeWork painter='피카소' wname='우는 여인' /> :
                <MakeWork painter='모네' wname='양산을 쓴 여인' /> 
            }
            </React.Fragment>
    );
} //////////// ExpComp 컴포넌트 ////////////////////////

// 4-3. 개발자가 좋아하는 명화 출력하기 //////////////////
ReactDOM.render(<ExpComp isChange={true}/>,document.querySelector('#root5'));


/********************************************************* 
    [ 리액트 훅크 : React Hook ]
    
    일반적으로 리액트에 사용되는 변수는 처음에 컴포넌트에 전달되어 초기 셋팅에 활용된다.
    그런데 이 변수가 변경될 경우 컴포넌트의 변경이 자동적으로 이루어지지 않는다!
    이런 종류의 변수 업데이트가 가상돔과 실제돔에 바로 반영되도록 실시간 감시역할을 하는
    리액트의 기술내용을 담고 있는 것이 후크다!

1. 목적 : 어떤 특정 데이터가 변경될때
    이 데이터를 할당하여 사용하고 있는 컴포넌트의
    변경이 반영되도록 하고자 할때 후크를 사용한다!

2. 구현방법:
    1) 노드JS SPA 개발환경에서는 상단에 import useState를 한다!
    -> CDN 에서는 React.useState 로 사용함!
    2) 코딩법 : useState() 메서드사용
        배열변수 = useState(초기값)
        (CDN) -> 배열변수 = React.useState(초기값)

        ((일반형))
        const [변수명,set변수명] = useState(초기값)
        -> set변수명 작성시 변수명 첫글자는 대문자로 씀
        예) 변수명 myname -> setMyname
        -> set변수명(값) : 메서드형태로 후크변수의 값을 셋팅함!

    3) 작동원리 
        - useState에 쓴 초기값이 배열변수 첫번째변수에 할당된다!
        - 코드에서 set변수명에 값을 할당하면
        useState메서드가 이것을 체크하여 이 변수를 사용한
        다른부분의 업데이트를 실행한다!
        예컨데 컴포넌트 내부에 사용한 경우 컴포넌트가 업데이트 됨!
    4) 사용결과
        - 별도의 메서드 호출없이 후크 상태변수를 사용한 곳이
        자동으로 변경될대마다 다시 갱신되는 것을 확인 할 수 있다!

    -> 뷰JS의 리액티브 데이터와 매우 유사함!

*****************************************************************/