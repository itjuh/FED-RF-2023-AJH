// 제이쿼리로 구현한 자동페이지 휠 JS : jquery-autoScroll.js
// 제이쿼리 가져오기
import $ from "jquery";
window.jQuery = $;
require("jquery-ui-dist/jquery-ui");
require("jquery-ui-touch-punch/jquery.ui.touch-punch");

// 로딩구역없이 함수로 구현함! /////
// export function autoScroll() {
/****************************************** 
  대상 변수할당하기
******************************************/
// 전체 페이지번호
let pno = 0;
// 전체 페이지 번호 초기화 함수
const zeroPno = ()=>{pno=0};
// 페이지 요소
let pg;
// 전체 페이지개수
let pgcnt;
// console.log("페이지개수:", pgcnt, pg);
// 광실행금지변수
let prot = [];
// 광스크롤금지
prot[0] = 0;

// 요소할당은 로딩구역에서 할당
$(() => {
  // 페이지 요소
  pg = $(".page");
  // 전체 페이지개수
  pgcnt = pg.length;
}); ///////// JQB /////////////

/****************************************** 
    이벤트 등록하기
    **React에서 jquery로 이벤트 설정을 할 경우
    리액트와 충돌되는 문제가 생길 수 있다.
    예컨테 현재 휠 이벤트는 설정되지만 wheelDelta값이
    undefined됨 
    원인 : 제이쿼리로 이벤트를 설정 시, 객체형으로 처리됨
    해결방안 : 순수한 JS로 설정 시 값을 받아올 수 있음
  ******************************************/
// 윈도우 휠이벤트 발생시
// $(window).on("wheel", wheelFn); -> 제이쿼리 사용 안함
window.addEventListener("wheel", wheelFn);
// 키보드 방향키 이벤트도 동일하게 js로 설정

// 새로고침시 스크롤위치 캐싱 변경하기(맨위로!)
function initPos(){
  $("html,body").animate({ scrollTop: "0px" });
}

/**************************************** 
    함수명: wheelFn
    기능: 마우스휠 이벤트 발생시 호출됨
    -> 한페이지씩 자동스크롤 기능
  ****************************************/
function wheelFn(e) {
  // 광휠금지
  if (prot[0]) return;
  chkCrazy(0);

  // console.log("휠~~~~~~!");

  // 1.휠방향 알아내기
  let delta = e.wheelDelta;
  // console.log(delta);

  // 2. 방향에 따른 페이지번호 증감
  if (delta < 0) {
    pno++;
    if (pno === pgcnt) pno = pgcnt - 1;
    // 마지막 페이지번호에 고정!
  } //// if /////
  else {
    pno--;
    if (pno === -1) pno = 0;
    // 첫페이지번호에 고정!
  } //// else ////

  // console.log(pno);

  // 3. 스크롤 이동하기 + 메뉴에 클래스"on"넣기
  movePg();
} /////////////// wheelFn 함수 ///////////////

/******************************************** 
    함수명: chkCrazy
    기능: 광적동작 체크하여 제어리턴
  ********************************************/
function chkCrazy(seq) {
  // seq 관리변수 순번
  prot[seq] = 1;
  setTimeout(() => (prot[seq] = 0), 800);
} //////// chkCrazy함수 //////////////

/******************************************** 
    함수명: movePg
    기능: 페이지이동 애니메이션
  ********************************************/
function movePg() {
  // 대상: html,body -> 두개를 모두 잡아야 공통적으로 적용됨!
  $("html,body")
    .stop()
    .animate(
      {
        scrollTop: $(window).height() * pno + "px",
      },
      700,
      "easeInOutQuint",
      // 애니메이션 후 actPage함수 호출
      actPage
    ); /////// animate //////////
  // 선택 메뉴에 클래스 on 넣기
  addOn();
} ///////////////// movePg ////////////////

/*************************************************** 
    함수명: addOn
    기능: GNB + 사이드 인디케이터 해당페이지에 on 넣기
    사용: 메뉴클릭 + 마우스 휠 이동 시 함수호출
  ***************************************************/
const addOn = () => {
  $(".gnb li").eq(pno).addClass("on").siblings().removeClass("on");
  $(".indic li").eq(pno).addClass("on").siblings().removeClass("on");
}; /////////// addOn 함수 //////////

/******************************************** 
    [ 페이지 등장액션 요소 적용하기 ]
    1. 이벤트 적용시점 : 페이지도착후(애니후콜백) 
    2. 이벤트 대상 : 각 페이지 동일
      (1) .page .imgc - 이미지파트
      (2) .page .txtc h2 a - 타이틀파트
    3. 변경내용 :
      [스타일시트 아래 항목 변경]
      ((변경값))
      transform: rotate(45deg);
      opacity: 0;
      transition: 1s 1s; -> 타이틀만 지연시간
      ((고정값))
      transform-origin: left top;
      display: inline-block; -> a요소만
  ********************************************/
/********************************************
    함수명: initSet
    기능: 등장요소 처음상태 셋팅
  ********************************************/
function initSet() {
  // 1. 초기화 하기
  // 대상: .imgc
  $(".imgc").css({
    transform: "rotate(45deg)",
    transformOrigin: "-10% -10%",
    opacity: 0,
    transition: "1s ease-in-out",
  }); ////// imgc css /////////////////
  // 대상: .txtc a
  $(".txtc a").css({
    transform: "rotate(45deg)",
    transformOrigin: "-100% -100%",
    opacity: 0,
    transition: "1s ease-in-out .5s",
    display: "inline-block",
  }); ////// .txtc a css /////////////////
} ///////// initSet ///////////////


/********************************************
    함수명: actPage
    기능: 페이지 도착 후 등장 애니메이션
  ********************************************/
function actPage() {
  // console.log("액션!!", pno);
  // pno가 0 또는 4가 아니면 작동
  if (pno != 0 || pno != 4) {
    // 대상: 해당순번 .page 아래 .imgc .txtc a
    $(".page").eq(pno).find(".imgc, .txtc a").css({
      transform: "rotate(0deg)",
      opacity: 1,
    });
  }
  // 최상단 페이지에서 초기화
  if (pno == 0) {
    initSet();
  }
} ///////// actPage ///////////////

// } ////// autoScroll 함수 //////

// 이벤트 설정 함수 //////////
function evtFn() {
  // 로고 클릭 이벤트
  $("#logo a").click((e) => {
    e.preventDefault();
    pno = 0;
    movePg();
  });
  /***********************************************
    GNB메뉴 + 사이드 인디케이터 클릭 이동기능
  ***********************************************/
  $(".gnb li, .indic li").click(function () {
    // 1. 순번가져오기
    let idx = $(this).index();
    // 2. 순번 pno 할당
    pno = idx;
    // 3. 페이지 이동
    movePg();
  }); /////////// click //////////////
  // 키보드 이벤트발생시 업데이트
  // 1. Page Up(33) / Up Arrow (38)
  // 2. Page Down(34) / Down Arrow (40)
  $(document).keydown((e) => {
    // document.addEventListener("keydown", function (e) { -> 제이쿼리 안되면 해당으로 바꾸면 됨
    // 계속실행금지
    if (prot[0]) return;
    chkCrazy(0);
    // 이전페이지이동
    if (e.keyCode === 33 || e.keyCode === 38) {
      pno--;
      if (pno === -1) pno = 0;
      //스크롤 이동하기 + 메뉴에 클래스"on"넣기
      movePg();
    }
    // 다음페이지이동
    else if (e.keyCode === 34 || e.keyCode === 40) {
      pno++;
      if (pno === pgcnt) pno = pgcnt - 1;
      //스크롤 이동하기 + 메뉴에 클래스"on"넣기
      movePg();
    }
  }); ///////////// keydown ////////////////
} /////// evtFn 함수 /////////////

// 사용 할 함수만 내보냄
export { wheelFn, evtFn, initSet, zeroPno, initPos };
