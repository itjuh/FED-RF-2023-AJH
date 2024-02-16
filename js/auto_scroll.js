// 페이지 스크롤

// 새로고침 초기 위치
setTimeout(() => {
  window.scrollTo(0, 0);
}, 500);

// 모바일 모드
const ham = document.querySelector("nav ul>li:last-child");
// 햄버거 버튼 클릭 시 사이드 메뉴
ham.addEventListener("click", function (e) {
  e.preventDefault();
  let parentHeaderNode = this.parentElement.parentElement;
  parentHeaderNode.classList.toggle("on");
});
// 모바일 모드 사이드 닫기
const sideMenu = document.querySelectorAll("nav .gnb>li");
sideMenu.forEach((ele) => {
  ele.addEventListener("click", function () {
    let parentHeaderNode = this.parentElement.parentElement;
    parentHeaderNode.classList.toggle("on");
  });
});

// 1. 전역변수 설정하기
// 1-1. 페이지변수
let pg_num = 0;
// 1-2. 휠상태변수
let sts_wheel = 0;
// 1-3. 전체페이지수
let total_pg;
// 1-4. 전체 .page요소
let ele_page;

// 2. 이벤트 등록하기 /////////////////
// 대상: window
window.addEventListener("wheel", wheelFn);
window.addEventListener("DOMContentLoaded", loadFn);

// 3. 이벤트 연결함수 /////////////////
/*************************************** 
    함수명 : loadFn
    기능 : html로딩후 실행코드구역
***************************************/
function loadFn() {
  ele_page = document.querySelectorAll(".page");
  // 전체페이지수 할당
  total_pg = ele_page.length;
} ///////// loadFn 함수 ////////////////

/*************************************** 
    함수명: wheelFn
    기능 : 마우스 휠 작동시 페이지이동
***************************************/
function wheelFn(e) {
  // 이벤트전달변수(자동)
  // 0. 광휠금지설정 //////
  if (sts_wheel) return; // 여기서나감!
  sts_wheel = 1; // 잠금!
  setTimeout(() => {
    sts_wheel = 0;
  }, 300);
  // console.log("이동");

  // 1. 휠방향에 따른 페이지변수 변경하기
  // 휠방향은 wheelDelta 로 알아냄!
  let delta = e.wheelDelta;

  // 음수(-)는 아랫방향, 양수(+)는 윗방향
  if (delta < 0) pg_num++;
  else pg_num--;

  // 한계수체크(양끝페이지고정!)
  if (pg_num < 0) pg_num = 0;
  if (pg_num == total_pg) pg_num = total_pg - 1;

  if (pg_num == 0) {
    window.scrollTo(0, 0);
  } else {
    window.scrollTo(0, window.innerHeight * pg_num);
  }

  // 3. 메뉴변경 함수 호출 : 페이지변수 변경 후!
  chgMenu();
} /////////// wheelFn 함수 ////////////////
///////////////////////////////////////////

/*************************************** 
    함수명: chgMenu
    기능 : 마우스휠 작동/메뉴클릭 시 메뉴변경
***************************************/
// 메뉴변경 대상 : .gnb li
const gnbList = document.querySelectorAll("nav ol>li");
// const indicList = domFn.qsa('.indic li');
// 메뉴처리 대상요소 배열로 묶어주기
// const menuGrp = [gnbList,indicList];

function chgMenu() {
  // 메뉴를 순화하며 on넣기
  // 나머지는 on 빼기

  // 1. 내부함수 만들기 ////
  const comFn = (target) => {
    //타겟은 순회할 대상
    target.forEach((ele, idx) => {
      if (idx == pg_num) ele.classList.add("on");
      else ele.classList.remove("on");
    });
  }; ////////익명 함수//////////////
  // 순차적으로 생성

  // 2. 처리할 요소 배열 불러오기
  // menuGrp.forEach(val=>comFn(val));
  // forEach()가 gnbList와 indicList를 각각 comFn()에 전달함!
  comFn(gnbList);
} ////////////////chgMenu함수////////////////////

function returnPage(){
  return pg_num;
}
// GNB li를 클릭 시 메뉴 변경하기
// ->pg_num을 업데이트 후 chgMenu를 호출한다
// 메뉴그룹 배열만큼 클릭 기능 만들기
// for of문 사용
// for (let x of menuGrp){ //x는 gnbList와 indicList를 순회!
//     x.forEach((ele,idx)=>{
//         domFn.addEvt(ele,'click',()=>{
//             //전역 페이지 변수 pg_num업데이트
//             pg_num = idx;
//             // 메뉴변경함수 호출
//             chgMenu();
//         });
//     }) /////////forEach///////////
// } ///////////for of///////////////////

/********************************************************************

    [ 모바일 이벤트처리 ]
    
    [ 모바일 터치 스크린에서 사용하는 이벤트 종류 ]
    1. touchstart - 손가락이 화면에 닿을때 발생
    2. touchend - 손가락이 화면에서 떨어질때 발생
    3. touchmove - 손가락이 화면에 닿은채로 움직일때 발생
    
    [ 화면터치 이벤트관련 위치값 종류 ]
    1. screenX, screenY : 디바이스 화면을 기준한 x,y 좌표
    2. clientX, clientY : 브라우저 화면을 기준한 x,y 좌표(스크롤미포함)
    3. pageX, pageY : 스크롤을 포함한 브라우저 화면을 기준한 x,y 좌표

********************************************************************/

// // 1. 모바일 이벤트 등록하기 //////////
// // 대상 : window
// window.addEventListener('touchstart',touchStart);
// window.addEventListener('touchend',touchEnd);

// // 2. 모바일 이벤트 함수 만들기 //////////

// // 터치 위치값 변수
// let pos_start = 0, pos_end = 0;

// // 2-1. 터치시작 이벤트 함수
// function touchStart(e){ // e : event 전달변수
//     // 모바일 이벤트 화면 위치값 구하기
//     // 모바일 오리지널 이벤트 객체 - originalEvent
//     // (제이쿼리에서만 씀)
//     // 하위 터치 이벤트 컬렉션 - touches[0]
//     // 변경 된 터치 이벤트를 담는 컬렉션 - changedTouches[0]

//     // 스크린 위치값 구하기
//     // 제이쿼리 originalEvent를 사용해야 나옴!
//     // let scY = e.originalEvent.touches[0].screenY;
//     pos_start = e.touches[0].screenY;
//     // 함수호출 확인
//     console.log('터치시작', pos_start);

// } ////////// touchStart 함수 /////////////
// ////////////////////////////////////////

// // 2-2. 터치끝 이벤트 함수
// function touchEnd(e){ // e : event 전달변수
//     // 모바일 이벤트 화면 위치값 구하기
//     // 모바일 오리지널 이벤트 객체 - originalEvent(제이쿼리에서만 씀)
//     // 하위 터치 이벤트 컬렉션 - touches[0]
//     // 변경 된 터치 이벤트를 담는 컬렉션 - changedTouches[0]

//     // 터치가 끝날때는 changedTouched[0]를 사용해야함
//     // 스크린 위치값 구하기
//     pos_end = e.changedTouches[0].screenY;

//     // 2. 터치 방향 알아내기
//     // 원리: 시작위치 - 끝위치
//     let result = pos_start - pos_end;
//     // 음수 (위에서 아래로 스크롤) 양수 (아래서 위로 스크롤)
//     // 함수호출 확인
//     console.log('터치끝', pos_end,'결과',result);

//     if(result == 0) return;
//     // 이벤트 처리함수 호출
//     movePage(result>0?1:0);
// } ////////// touchEnd 함수 /////////////
// ////////////////////////////////////////

// // 2-3. 이벤트 처리함수 : 화면이동
// function movePage(dir){ // dir -> direction
//     // 함수호출
//     console.log('dir',dir);

//     // 1. 페이지번호 변경 반영하기
//     // 1(true) 아랫방향, 0(false)은은 윗방향
//     if(dir>0) pg_num++;
//     else pg_num--;
//     // 2. 한계수체크(양끝페이지고정!)
//     if(pg_num<0) pg_num=0;
//     if(pg_num==total_pg) pg_num = total_pg-1;
//     console.log('pg_num : ',pg_num);
//     // 3. 페이지 이동하기
//     // offsetTop은 선택요소의 top위치값 리턴함!
//     // .page요소 전체의 몇번째 값의 top위치로 스크롤해라!
//     window.scrollTo(0,ele_page[pg_num].offsetTop);
// } ///////// movePage 함수 ////////////
