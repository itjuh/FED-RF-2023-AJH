// 메인 컴포넌트  - 03.메모이제이션 : useMemo JSX

function App() {
  // 점수 관련 후크변수
  const [score, setScore] = React.useState(0);
  // 국적 관련 후크변수
  const [isKor, setIsKor] = React.useState(true);

  // 국적표시 객체( 일반객체 : 리 렌더링 시 객체의 주소지를 새로 할당해줌 -> 변경으로 인식 됨)
  // const nara = { country: isKor ? "한국" : "일본" };
  // 해결방안 : useMemo(()=>{},[]);
  const nara = React.useMemo(()=>{
    // useMemo()함수 내부에서 원래 객체를 리턴함!!
    return{
        country: isKor ? '한국':'일본'
    }
    // 의존성이 변하지 않으면 내부리턴 객체를 재활용함
  },[isKor]);

  // 랜더링 상태관리(useEffect) : nara 데이터 변경 시 
  // nara객체는 isKor 후크변수와 연결 됨!
  // 현재 증상 : nara는 isKor에 연결되었으나 score에는 연결 되어있지 않음
  // 그러나 왜? nara에 변경을 관리하는 useEffect에 걸리는 걸까? 
  React.useEffect(()=>{
    console.log('나라변경',nara.country);
    // 해당 국적 이미지만 위로 이동
    $('img').eq(isKor?1:0) // isKor 1-손흥민
    .animate({bottom:'+=50px'},300)
  },[nara]); //////// useEffect ///////////
  /*
        [흔하면서도 재미있는 현상!!!]
    useEffect의 의존성 배열에 nara를 넣었는데 score의 state를 변경해도 useEffect가 실행된다.
    그 이유는 자바스크립트에서 객체는 원시 타입과는 다르게 값이 저장될 때 주소 값으로 저장되기 때문이다.
    그렇기 때문에 리액트에선 score의 state가 바뀌면 App 컴포넌트가 재호출되면서 nara의 주소값이 변경이 되었기 때문에 nara가 변경이 되었다고 인식을 한다.

    여기서도 useMemo 훅을 통해 이를 방지할 수 있다.
    -> 방지의 원리는 의존성을 심어서 실제로 변경되는 데이터를 특정하여 정확한 반영을 위해 기존 데이터를 재사용 해 준다.
  */

  // 코드 리턴구역
  return (
    <header className="header" style={{ textAlign: "center" }}>
      <h1>
        한국과 일본이 축구를 하고 있습니다! <br />
        {isKor ? "한국이" : "일본이"} 몇점 차로 승리한다고 예측하십니까?
      </h1>
      <input
        type="number"
        value={score}
        onChange={(e) => setScore(e.target.value)}
        style={{ fontSize: "40px", textAlign: "center" }}
      />
      <hr />
      <h1>당신은 어느나라 사람입니까?</h1>
      <h2 style={{ fontSize: "30px" }}>{nara.country}사람</h2>
      {/* 국적 변경 버튼 */}
      <button
        onClick={() => {
          // 국적 반대로 넣기
          setIsKor(!isKor);
          // 점수차 초기화
          setScore(0);
          // 해당되는 국적선수 올라오기
        }}
        style={{ fontSize: "40px" }}
      >
        국적변경하기
      </button>
      {/* 다나카 */}
      <img
        src="https://i.namu.wiki/i/_7clMYRh4lQpmab_9mRbYqcaytIydOj40IGAOjOwRW4Z2v3RbRXh00Hq5NIMwHSXA9BCFfvKZXE85JtokIyw0KRdLIoBzT9TOli_OwQ2uDBFYomQRR3DqO8DcULZ_Y8s5GmVhX9TcoL1DgvmBwfMVQ.webp"
        style={{
          height: "300px",
          position: "fixed",
          bottom: "-100px",
          left: "5vw",
          borderRadius: "50%",
          border: "10px double lightblue",
        }}
      />
      {/* 손흥민 */}
      <img
        src="https://i.namu.wiki/i/6IbJUlvAY5g8I1eD5dMFYEpaUajLlz4kZjS0vf86ssahkMsrRXDwiDujI-4tt4OqHGDLt3BbSXxxiawyDXf2tCKUBz-Vmsv9C8ZsXBNEXKkBO6zJEhlAPqodPsAsl5vh9DgcodJPjLZt6dPvFA4gnA.webp"
        style={{
          height: "300px",
          position: "fixed",
          bottom: "-100px",
          right: "5vw",
          borderRadius: "50%",
          border: "10px double orangered",
        }}
      />
    </header>
  ); ////////return////////////
} /////////// App컴포넌트 //////////////////////

//출력하기
ReactDOM.render(<App />, document.querySelector("#root"));
