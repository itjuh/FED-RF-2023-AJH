// 04.콜백 : useCallback JSX

// 요구사항 : 좋아요 표시기능 누르면 엄지가 상단으로 올라가고 다시 누르면 내려감
// 고려사항 : 매번 이미지가 변화면서 리랜더링 시 함수가 재사용되도록 고려

// 축구선수에세 좋아요 표시를 하는 컴포넌트
function MarkLike() {
  // 세명의 선수에 대한 좋아요 상태값 관리 변수
  const [son, setSon] = React.useState(false);
  const [danaka, setDanaka] = React.useState(false);
  const [lee, setLee] = React.useState(false);

  // 상태관리 변수를 업데이트 하는 함수
  const toggleSon = React.useCallback(() => setSon(!son),[son]);
  const toggleDanaka = React.useCallback(() => setDanaka(!danaka),[danaka]);
  const toggleLee = React.useCallback(() => setLee(!lee),[lee]);

  // 기존 사용 코드
  // const toggleSon = () => setSon(!son);
  // const toggleDanaka = () => setDanaka(!danaka);
  // const toggleLee = () => setLee(!lee);

  /*
    [ 리액트 성능 최적화를 위한 문제 인식!! ]
    -> 하나의 버튼 클릭 시 하나만 변경 됨에도 불구하고 전체 컴포넌트가 리 렌더링 된다
    이때 호출되는 함수도 새로 만들어져서 호출됨!
    -> 이게 효율성과 최적화에 문제가 됨
    어떻게 기존에 만들어진 함수를 다시 로딩하지 않을 수 있을까?
    >>>>> 메모이제이션 활용 <<<<< : useCallback

    - 아래와 같이 의존성변수를 등록하여 변경 여부에 따라 함수를 기존에 로딩한 것으로 재사용!
    해주는 것이 useCallback이다

    const [의존성변수, set의존성변수] = useState(초기값);
    const 콜백 = useCallback(() => {}, 
    [의존성변수]);
    _______________________________________________________________________________
    **주의)호출되는 컴포넌트가 매번 리 랜더링 되므로 메인 컴포넌트에 useCallback처리된 함수도 매번 새로 그려진다
    그래서 효과가 없다. 따라서 호출되는 서브컴포넌트를 메모이제이션 처리 해주어야 useCallback도 효과가 있다.
    */

  // 코드리턴
  return (
    <div style={{ textAlign: "center" }}>
      <h1
        style={{
          fontSize: "70px",
          color: "hotpink",
          textShadow: "5px 5px 2px #555",
        }}
      >
        좋아요😘부탁해요🥰
      </h1>
      {/* 좋아요 버튼 서브컴포넌트 호출 */}
      <ShowLike name="손흥민" sts={son} fn={toggleSon} />
      <ShowLike name="다나카" sts={danaka} fn={toggleDanaka} />
      <ShowLike name="이강인" sts={lee} fn={toggleLee} />
    </div>
  ); ////////// return ////////
} //////////////// MarkLike 컴포넌트 /////////////////////

// **주의)호출되는 컴포넌트가 매번 리 랜더링 되므로 메인 컴포넌트에 useCallback처리된 함수도 매번 새로 그려진다
//     그래서 효과가 없다. 따라서 호출되는 서브컴포넌트를 메모이제이션 처리 해주어야 useCallback도 효과가 있다.
// ->>> 방법 : 기존 컴포넌트 함수를 memo처리 하기!

// 좋아요 서브 컴포넌트
const ShowLike = React.memo(({ name, sts, fn }) => {
  console.log(name, "이 불렀음");
  // name-선수명,sts-좋아요상태,fn-상태관리함수
  console.log({ name, sts });
  // 코드리턴
  return (
    <div style={{ padding: "10px" }}>
      <button onClick={fn} style={{ fontSize: "100px" }}>
        {name} {sts ? "👍" : "👎"}
      </button>
    </div>
  ); ////////return/////////////
}); //////////////ShowLike함수 ////////////////////

// 컴포넌트 출력하기 ////////////////
ReactDOM.render(<MarkLike />, document.querySelector("#root"));
