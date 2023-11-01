// 컨텍스트 불러오기
import { 누구냐 } from "./cont_provider.jsx";

function 이야기() {
  // 컨텍스트를 사용하기 위해서는 useContext() 메서드 사용
  const 맘대로 = React.useContext(누구냐);
  // 공유 컨텍스트인 누구냐를 사용함
  // 선택 된 배열 데이터 걸기
  const selData = 맘대로.myData.find((v) => {
    if (v.이름 == 맘대로.myVal) return true;
  });
  const btnData = 맘대로.myData.filter((v) => {
    if (v.이름 != 맘대로.myVal) return true;
  });
  console.log(맘대로, selData, btnData);

  return (
    <div
      style={{
        position: "relative",
        padding: "20px",
        border: "10px dotted skyblue",
        borderRadius: "10px",
        width: "60%",
        margin: "20px auto",
        textAlign: "center",
      }}
    >
      {/* 1. 제목 */}
      <h1>{맘대로.myVal}</h1>
      {/* 2. 내용 */}
      {/* 2-1. 이미지 */}
      <img src={selData.이미지} alt={맘대로.myVal} style={{ width: "100%" }} />
      {/* 2-2. 산정보 */}
      <div
        style={{
          position: "absolute",
          width: "50%",
          bottom: "105px",
          left: "20px",
          padding: "15px",
          fontSize: "16px",
          color: "#fff",
          textShadow: "0 0 5px #000",
          textAlign: "left",
          borderRadius: "20px",
          backgroundColor: "rgb(0 0 0 / .4)",
        }}
      >
        <ul>
          <li>이름 : {selData.이름}</li>
          <li>설명 : {selData.설명}</li>
          <li>높이 : {selData.높이}</li>
          <li>융기 : {selData.융기}</li>
          <li>최초등반 : {selData.최초등반}</li>
          <li>최초등반가 : {selData.최초등반가}</li>
          <li>산맥 : {selData.산맥}</li>
        </ul>
      </div>
      {/* 2-3. 버튼 */}
      {/* 현재 산 빼고 나머지 산 버튼 만들기 */}
      {/* 버튼 클릭 시 메인컴포넌트의 상태 훅 변수 업데이트되어 전체가 변경 됨
            ->changeMyVal() 메서드 사용*/}
      <div>
        {btnData.map((v) => (
          <button
            onClick={() => 맘대로.changeMyVal(v.이름)}
            style={{
              padding: "15px",
              fontSize: "20px",
              margin: "10px",
            }}
          >
            {v.이름}
          </button>
        ))}
      </div>
    </div>
  );
} ///////이야기 컴포넌트 /////////////

export default 이야기;
