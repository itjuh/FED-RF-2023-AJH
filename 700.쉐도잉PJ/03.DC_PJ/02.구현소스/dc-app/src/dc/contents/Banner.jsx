// DC.com 배너 컴포넌트

// 배너데이터
import { banData } from "../data/banner";
// 배너 CSS
import "../../css/banner.css";
import { useEffect } from "react";
// 제이쿼리 + 제이쿼리 ui
import $ from "jquery";
import "jquery-ui-dist/jquery-ui";

// 슬라이드 기능 구현 함수
function slideFn() {
  // [1] 이동 대상선정
  const sliderBox = $(".slider");
  // [2] 변수설정
  // 1. 애니메이션 동작시간
  const A_TM = 600;
  // 2. 애니메이션 이징
  const A_ES = "easeInOutQuint";
  // 3. 광클 상태변수 0-불가 1-허가
  let cSts = 1;
  // 4. 슬라이드 순번
  // let sNum = 1;
  // 5. 슬라이드 개수
  // const sCnt = sliderBox.find('li').length;
  // 6. 슬라이드 블릿
  const indic = $('.indic li');

  // [3] 이벤트 설정 및 기능구현
  // 이동버튼 클릭 시
  $(".abtn").click(function () {
    // 0. 광클 금지
    if (!cSts) return;
    cSts = 0; //잠그기
    setTimeout(() => (cSts = 1), A_TM / 6);
    // 1. 버튼 오른쪽 여부
    let isR = $(this).is(".rb");
    console.log("bt클릭", isR);
    // 2. 버튼 별 분기
    if (isR) {
      // 오른쪽
      // 슬라이드가 왼쪽으로 이동함
      // left값이 -100%
      sliderBox.animate(
        {
          left: "-100%",
        },
        A_TM,
        A_ES,
        // 콜백함수
        () => {
          // 맨 앞 li 맨 뒤로 이동
          sliderBox
            .append(sliderBox.find("li").first())
            // 동시에 left값은 0초기화
            .css({ left: 0 });
        }
      );
      // 현재 인딕 담기
      let nowIndic = $(".indic li.on");
      // console.log(nowIndic,indic.last(),'같은지여부 =>',indic.last() == nowIndic)
      nowIndic.removeClass("on");
      if (indic.last()[0] == nowIndic[0]) { // 마지막 순번
        indic.first().addClass("on");
      } else {
        nowIndic.next().addClass("on");
      }
    } //// if //////
    else {
      // 왼쪽
      // 슬라이드가 오른쪽으로 이동함
      // left값이 -100% 에서 0으로 이동
      sliderBox.prepend(sliderBox.find("li").last()).css({ left: "-100%" }).animate(
        {
          left: "0%",
        },
        A_TM,
        A_ES
      );
      // 현재 인딕 담기
      let nowIndic = $(".indic li.on");
      nowIndic.removeClass("on");
      if (indic.first()[0] == nowIndic[0]) { // 첫 순번
        indic.last().addClass("on");
      } else {
        nowIndic.prev().addClass("on");
      }
    } //// else //////
  }); ///////// abtn 클동이벤트 //////////
} ////////// slideFn 함수 /////////////

// 배너 컴포넌트 //
export function Banner(props) {
  // category - 카테고리 분류명(배너 데이터 키)

  // 선택 데이터
  const selData = banData[props.category];

  // 페이지 랜더링 후 실행구역
  useEffect(() => {
    console.log("랜더링 후~");
    // 슬라이드 기능구현 함수 호출 : 슬라이드가 여러개일때
    if(selData.length > 1) slideFn();
  });

  // 리스트 만들기 함수
  const makeList = (data) => {
    return data.map((v, i) => (
      <li key={i}>
        <img src={v.src} alt="배너이미지"></img>
        <section className="bantit">
            <h3>{v.tit1}</h3>
            <h2>{v.tit2}</h2>
            <p>{v.cont}</p>
            <button style={{marginTop:'20px'}}>{v.btn}</button>
        </section>
      </li>
    ));
  }; ///////// makeList함수 //////////

  return (
    <div className="banner">
      {/* 이동슬라이드 */}
      <ul className="slider">{makeList(selData)}</ul>
      {/* 이동버튼 + 슬라이드 블릿 : 슬라이드 2개 이상이면 보임 */}
      {selData.length > 1 && (
        <>
          <button className="abtn lb">＜</button>
          <button className="abtn rb">＞</button>

          {/* 블릿 인디케이터 */}
          <ol className="indic">
            {selData.map((v, i) => (
              <li className={i === 0 ? "on" : ""} key={i}></li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
} ////////// Banner 컴포넌트 ///////////
