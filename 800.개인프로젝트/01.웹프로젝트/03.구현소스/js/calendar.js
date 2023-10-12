// 달력구현 JS - calendar.js

// document객체
const dFn = {
  qs: (x) => document.querySelector(x),
  qsa: (x) => document.querySelectorAll(x),
  cg: (x) => console.log(x),
  addZero : x => x < 10? '0'+x:x,
  addEvt: (ele, evt, fn) => ele.addEventListener(evt, fn),
  // 날짜 찍기 형식변경 함수(yyyy-mm-dd 요일)
  fm: (x) =>
    `${x.getFullYear()}-${
        dFn.addZero(x.getMonth() + 1)
    }-${
        dFn.addZero(x.getDate())
    } ${week[x.getDay()]}요일`,
};
//  요일정보 배열
const week = ["일", "월", "화", "수", "목", "금", "토"];

function makeDallyeok() {
  // console.log('달력만들어');

  // 1. 변수세팅
  // (1) 변경 할 현재날짜 객체
  const currDate = new Date();
  // (2) 오늘 날짜 객체
  const today = new Date();
  // (3) 년도요소 .yearTit
  const yearTit = dFn.qs(".year");
  // (4) 월요소 .monthTit
  const monthTit = dFn.qs(".month");
  // (5) 일요소 .dates
  const dates = dFn.qs(".dates");
  // console.log(currDate,today,yearTit,monthTit,dates);
  // (6) 당해년도
  let currYear = currDate.getFullYear();
  // (7) 당월
  let currMonth = currDate.getMonth();
  // (8) 날짜넣을 배열변수
  const dateSet = [];

  // 2. 함수만들기

  // (1) 달력초기화 구성함수 /////////
  const initDallyeok = () => {
    // [ 전달 끝 날짜, 첫 날짜 알아오기 ]
    // new Date(년도,월,0-끝날짜||1-끝날짜 +1일)
    // 년도, 월, 옵션

    // 1. 전달 마지막 날짜(옵션: 0) -> 달력 처음 이전달 끝 날짜 표시
    const prevLastDate = new Date(
      currYear,
      currMonth,
      // currMonth+1, : 현재 달
      0
    );
    dFn.cg("1. 전달 마지막 날짜 : " + dFn.fm(prevLastDate));

    // 2. 현재달 첫 날짜 (옵션:1->전달로 세팅)
    // -> 달력 전달 세팅을 위한 요일을 구하기 위해서
    // -> 일요일 시작이면 전달을 찍을 필요없음
    const thisFirstDate = new Date(
        currYear,
        currMonth, 
        1
    );
    dFn.cg("2. 현재달 첫 날짜 : " + dFn.fm(thisFirstDate));
    
    // 3. 현재달 마지막 날짜
    const thisLastDate = new Date(currYear,currMonth+1,0);
    dFn.cg("3. 현재달 마지막 날짜 : " + dFn.fm(thisLastDate));

    // 4. 년도 표시하기
    yearTit.innerHTML = currYear+'년';
    // 5. 월 표시하기
    monthTit.innerHTML = currMonth+1+'월';
    // 6. 날짜 데이터 태그 구성하기
    // 6-1. 전달 날짜 앞쪽 채우기
    // 조건 : 현재달 첫 날짜 요일이 0이 아니면 내용 있음!
    // -> 일요일 시작인 월은 전달을 출력 할 필요가 없음
    let fDay = thisFirstDate.getDay()
    dFn.cg('이번달 첫 날 요일:'+fDay);
    if(fDay!=0){
        for(let i = 0; i<fDay; i++){
            // 마지막 날로부터 반복 횟수만큼 배열을 앞으로 추가
            // 앞에 추가 메서드 unshift()
            dateSet
            .unshift(`
            <span style="color:#ccc" class="bm">
            ${prevLastDate.getDate() - i}
            </span>
            `);
        } //////////for////////////////
    } ////////////////if////////////////////
    
    // 6-2. 당월 날짜 채우기
    // 반복문 구성 : 현재월 1일부터 마지막 날짜까지 반복 배열 추가
    for(let i = 1; i<=thisLastDate.getDate();i++){
        dateSet.push(i);
    } ///////////////////for////////////////////
    
    // 6-3. 다음달 마지막 날짜 채우기
    // 조건 : 클래스 am으로 구분
    // 반복문 구성 : 1부터 2주 분량정도 넣는다.
    for(let i = 1; i <= 14; i++){
        dateSet.push(`
        <span style="color:#ccc" class="am">
        ${i}
        </span>
        `);
    } ///////////////////for////////////////
    dFn.cg(dateSet);
    
    // 7. 날짜배열로 날짜태그 구성하여 출력하기
    // 7 일 * 6주 출력 = 42개 출력
    dates.innerHTML = dateSet.map((v,seq)=>seq<42?`<div class='date'>${v}</div>`:``).join('');

  }; ////////initDallyeok함수.////////

  // 초기화 함수 호출
  initDallyeok();
} //////////// makeDallyeak함수 ///////////

// 달력함수 호출
makeDallyeok();

export default makeDallyeok;
