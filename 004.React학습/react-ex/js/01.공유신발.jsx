// 메인 컴포넌트  - 01.공유신발 JSX

// JS기능함수 : 순수 JS함수호출임!
import { initFn,firstOneFn } from "./act_effect.js"

// 서브컴포넌트 불러오기
import { GoodsComponent } from "./01.sub_com/goods_component.jsx";
import { SubViewCode } from "./01.sub_com/sub_view_code.jsx";

// console.log("여성의류Data:", myData2);

// [ 메인컴포넌트 ] ///////////////////////
// 메인의 의미는? - 다른구성요소 컴포넌트들을 모아서 최종적으로 랜더링하는 구성 컴포넌트
function MainComponent() {
  // 상태관리 메서드를 사용하여 후크변수를 설정하자!
  // const[변수명, set변수명] = React.useState(초기값);
  // dataNum은 데이터를 구분하는 번호저장 후크변수다!
  // 데이터 구분값으로 배열순번을 생각하여 처음에 로딩 될 데이터가 0번째
  // 즉, 첫번째 배열 순번 데이터를 값으로 셋팅함!

  // [ 후크 상태관리 변수 세팅 ] ////////////////////////
  // 1. 데이터 순번 값 0-공유 1-효진
  const [dataNum, setDataNum] = React.useState(0);
  // 2. 리스트/상세보기 상태관리변수 0-리스트 1-상세보기
  const [subView, setSubView] = React.useState(0);
  // 3. 선택아이템 고유번호 상태관리변수 아이템고유번호
  const [selItem, setSelItem] = React.useState(0);
  // 4. JS 효과적용 여부 상태관리 0-NO, 1-OK
  const [effectOK, setEffectOK] = React.useState(1);
  // 테스트 후크 상태변수
  const [test, setTest] = React.useState(0);
  // console.log("최초값", dataNum);
  /////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////
  // [ 리액트 컴포넌트 렌더링 후 실행함수 호출하기 ]

  // [ 컴포넌트가 뿌려지기 전 숨길 요소 적용하기 ]
  React.useLayoutEffect(()=>{if(effectOK)initFn()}); //함수를 호출하는게 아니고 등록하면 한 번에 끝남

  // [ 처음 한번만 타이틀 글자 커졌다가 작아지기 ]
  React.useEffect(()=>{if(effectOK)firstOneFn()}, []);

  // [ useEffect 테스트 코드 ] //////////////////////////////////
  // 가상돔에서 실제 돔에 반영 후 DOM에 구현할 JS코드는 어디에 넣어야 함?
  // ->>>>>>>>useEffect();
  // ->>>>>>>>useLayoutEffect();
  // 최종 리턴 소스코드 //////////////////////////////////////
  // 함수, 변수, 구현소스는 모두 return 위쪽에 코딩!! /////////
  // console.log("컴포넌트 그냥구역", document.querySelector(".img-box"));

  // 순수 useEffect()
  // -> 페이지 업데이트 시 매번 실행
  React.useEffect(() => {
    // console.log("useEffect 순수구역");
    //     document.querySelector('.img-box'));
    // console.log('useEffect 제이쿼리',
    //     $('.img-box'));
    // //버튼 display:none
    // $('.btn-gong').hide();
  });

  // 빈 배열옵션 useEffect()
  // -> 페이지 로딩 후 단 한번만 실행
  React.useEffect(() => {
    // console.log("빈 배열옵션 useEffect");
  }, []);

  // 의존성 배열옵션 useEffect()
  React.useEffect(() => {
    // console.log("의존성 배열옵션 test");
  }, [test]);

  // 의존성 배열옵션 useEffect()
  React.useEffect(() => {
    // console.log("의존성 배열옵션 dataNum,test");
  }, [dataNum, test]);
  // 의존성이 다수인 경우 []배열형태의 옵션에 콤마로 연결

  // 순수 useLayoutEffect()
  React.useLayoutEffect(() => {
    // console.log("useLayoutEffect 순수구역");
    //버튼 display:none
    // $('.btn-gong').hide();
  });

  // 의존성 테스트 함수 //
  const testFn = () => {
    setTest(test ? 0 : 1);
    // console.log("테스트 후크변수 변경", test);
  }; ////////////testFn함수////////////
  //////////////////// 테스트 구역 끝 ///////////////////////////////

  /****************************************************
    함수명 : chgData(데이터 변경호출 함수)
    기능 : 상태관리변수 중 데이터 순번 값을 업데이트하여 
    화면의 상품리스트를 업데이트 한다.
    상태변수 :
     (1) dataNum/setDataNum 0-공유 1-효진
     (2) subView/setSubView 0-리스트 1-상세보기
  ****************************************************/
  const chgData = () => {
    console.log("바꿔~!");
    // 데이터 키 후크변수를 업데이트 함
    setDataNum(dataNum ? 0 : 1);
    // console.log("업데이트 값", dataNum);
    // 상세보기에서 넘어와도 항상 리스트보기로 전환
    setSubView(0);
  }; //////// chgData함수 ///////////
  /****************************************************
    함수명 : chgSubView(상태관리 변경호출함수)
    기능 : 상태관리변수 중 리스트/상세보기 선택변수를 
    업데이트하여 뷰를 전환한다.
    상태변수 :
      (1) subView/setSubView 0-리스트 1-상세보기
      (2) selItem/setSelItem 아이템고유번호
      (3) effectOK/setEffectOK 0-NO, 1-OK
  ****************************************************/
  const chgSubView = (num,idx) => {
    // a요소 기본이동 막기
    event.preventDefault();
    console.log("subView바꿔",num,'/고유번호:',idx);

    // 1. 리스트/상세보기 상태관리변수 변경하기
    setSubView(num);
    // 2. 선택아이템 고유번호 변경
    setSelItem(idx);
    // 3. JS 효과상태 변경 (없애기)
    setEffectOK(0);
    // console.log("업데이트 값", subView);
  }; //////// chgSubView 함수 ///////////

  // 메인컴포넌트 리턴 //////
  return (
    <React.Fragment>
      {/* 1. 타이틀 */}
      <h1 className="tit">{dataNum ? "효진이 입고" : "공유가 신고"} 다닌다는!</h1>
      {/* 2. 내용박스 */}
      <section>
        {/* 2-1. 서브타이틀 */}
        <h2>{dataNum ? "효진은 매일매일 상큼합니다." : "공유는 오늘도 멋집니다."}</h2>
        {/* 2-2. 이미지 */}
        <div className="img-box">
          {dataNum ? (
            <ChgImg src="gallery/hyo.jpg" alt="효진" />
          ) : (
            <ChgImg src="vans/gongyoo.jpg" alt="앉아있는 공유" />
          )}
        </div>
      </section>
      {/* 3. 데이터 변경 버튼 */}
      <button onClick={()=>{chgData();setEffectOK(1);}} className="btn-gong">
        {dataNum ? "공유" : "효진"}초이스 바로가기
      </button>
      <button onClick={testFn} className="btn-gong">
        의존성 테스트
      </button>
      {/**********************************************
        4. 상품리스트 박스 :
        상태관리 변수를 생성하여 리스트/상세보기를 전환
       **********************************************/}
      <div className="gwrap">
        { // 상품리스트 컴포넌트 출력
          subView == 0 && 
          <GoodsComponent idx={dataNum} chgFn={chgSubView}/>     
        }
        { // 상품상세보기 컴포넌트 출력
          // 부모의 함수 chgSubView를 props로 전달하기
          // ->> 자식은 props.속성명()으로 호출
          subView == 1 && 
          <SubViewCode 
          idx={dataNum} 
          chgFn={chgSubView}
          itemNum={selItem} />     
        }
      </div>
    </React.Fragment>
  );
} //////////// MainComponent 컴포넌트 ////////////////////
// console.log(myData);


// 메인컴포넌트 출력하기
ReactDOM.render(<MainComponent />, document.querySelector("#root"));

// 서브 컴포넌트(자식컴포넌트 -> 부모컴포넌트로부터 데이터를 프롭스로 전달받는다)
// 이미지 만들기 컴포넌트 ///////////////////
function ChgImg(props) {
  return <img src={"./images/" + props.src} alt={props.alt} />;
} //////////// chgImg 컴포넌트 ////////////////////
