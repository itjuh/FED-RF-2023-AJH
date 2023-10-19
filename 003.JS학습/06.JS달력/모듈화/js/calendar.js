// 달력구현 JS - calendar.js

/******************************************************************
* [ 생성자함수로 변환하여 사용하기 ]
* 1. 함수명을 첫글자 대문자로 변경 - 생성자 함수로 사용할 것을 알림
* 2. 호출하는 곳에서 new 키워드로 인스턴트 생성 ->이때 생성자함수로 사용!
* 3. 만약, 생성자 함수의 속성/메서드를 인스턴스 코딩구역에서 하는 경우
*    this키워드로 생성자함수를 멤버등록해서 사용할 수 있음
*    변수에 담아 하위속성/메서드로 호출이 가능해짐
* 4. 유의사항: 생성자함수 내부에서 this키워드로 등록 된 속성/메서드는 
*    내부에서 호출시에도 반드시 this키워드를 사용하여 호출해야함!

******************************************************************/

// document객체
const dFn = {
  qs: (x) => document.querySelector(x),
  qsa: (x) => document.querySelectorAll(x),
  qsEl: (el, x) => el.querySelector(x),
  qsaEl: (el, x) => el.querySelectorAll(x),
  cg: (x) => console.log(x),
  addZero: (x) => (x < 10 ? "0" + x : x),
  addEvt: (ele, evt, fn) => ele.addEventListener(evt, fn),
  // 날짜 찍기 형식변경 함수(yyyy-mm-dd 요일)
  fm: (x) => `${x.getFullYear()}-${dFn.addZero(x.getMonth() + 1)}-${dFn.addZero(x.getDate())} ${week[x.getDay()]}요일`,
};
//  요일정보 배열
const week = ["일", "월", "화", "수", "목", "금", "토"];


// // 달력함수 호출
// makeDallyeok();


function MakeDallyeok(selEl) {
  // console.log('달력만들어');
  // selEl - 달력 넣을 요소

  // 포멧팅 넘기기 생성자함수 속성메서드 연습
  // 1) 자리수 처리
  this.addZero = (x) => (x < 10 ? "0" + x : x);
  // 2) 요일처리
  this.week = ["일", "월", "화", "수", "목", "금", "토"];

  // 0. 달력 컴포넌트 html넣기
  dFn.qs(selEl).innerHTML = insertCalendarCode();

  // 1. 변수세팅
  // (1) 변경 할 현재날짜 객체
  const currDate = new Date();
  // (2) 오늘 날짜 객체
  const today = new Date();
  // (3) 년도요소 .yearTit
  const yearTit = dFn.qs(selEl+" .yearTit");
  // (4) 월요소 .monthTit
  const monthTit = dFn.qs(selEl+" .monthTit");
  // (5) 일요소 .dates
  const dates = dFn.qs(selEl+" .dates");
  // console.log(currDate,today,yearTit,monthTit,dates);
  // (6) 날짜넣을 배열변수
  const dateSet = [];
  // (7) html 코드저장 변수
  let hcode = "";
  // (8) 날짜정보 저장 히든필드
  const dateInfo = dFn.qs(selEl+" .date-info");


  // 2. 함수만들기

  // (1) 달력초기화 구성함수 /////////
  const initDallyeok = () => {
    // 변수 초기화
    // -> 배열변수.splice(순번,개수) , .splice(0); 하면 초기화됨
    dateSet.splice(0);
    hcode = '';

    // (1) 당해년도
    let currYear = currDate.getFullYear();
    // (2) 당월
    let currMonth = currDate.getMonth();

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
    // dFn.cg("1. 전달 마지막 날짜 : " + dFn.fm(prevLastDate));

    // 2. 현재달 첫 날짜 (옵션:1->전달로 세팅)
    // -> 달력 전달 세팅을 위한 요일을 구하기 위해서
    // -> 일요일 시작이면 전달을 찍을 필요없음
    const thisFirstDate = new Date(currYear, currMonth, 1);
    // dFn.cg("2. 현재달 첫 날짜 : " + dFn.fm(thisFirstDate));

    // 3. 현재달 마지막 날짜
    const thisLastDate = new Date(currYear, currMonth + 1, 0);
    // dFn.cg("3. 현재달 마지막 날짜 : " + dFn.fm(thisLastDate));

    // 4. 년도 표시하기
    yearTit.innerHTML = currYear + "년";
    // 5. 월 표시하기
    monthTit.innerHTML = currMonth + 1 + "월";
    // 6. 날짜 데이터 태그 구성하기
    // 6-1. 전달 날짜 앞쪽 채우기
    // 조건 : 현재달 첫 날짜 요일이 0이 아니면 내용 있음!
    // -> 일요일 시작인 월은 전달을 출력 할 필요가 없음
    let fDay = thisFirstDate.getDay();
    // dFn.cg("이번달 첫 날 요일:" + fDay);
    if (fDay != 0) {
      for (let i = 0; i < fDay; i++) {
        // 마지막 날로부터 반복 횟수만큼 배열을 앞으로 추가
        // 앞에 배열 추가 메서드 unshift()
        dateSet.unshift(`
            <span style="color:#ccc" class="bm">
            ${prevLastDate.getDate() - i}
            </span>
            `);
      } //////////for////////////////
    } ////////////////if////////////////////

    // 6-2. 당월 날짜 채우기
    // 반복문 구성 : 현재월 1일부터 마지막 날짜까지 반복 배열 추가
    for (let i = 1; i <= thisLastDate.getDate(); i++) {
      dateSet.push(i);
    } ///////////////////for////////////////////

    // 6-3. 다음달 마지막 날짜 채우기
    // 조건 : 클래스 am으로 구분
    // 반복문 구성 : 1부터 2주 분량정도 넣는다.
    for (let i = 1; i <= 14; i++) {
      dateSet.push(`
        <span style="color:#ccc" class="am">
        ${i}
        </span>
        `);
    } ///////////////////for////////////////
    // dFn.cg(dateSet);

    // 7. 날짜배열로 날짜태그 구성하여 출력하기
    // 7 일 * 6주 출력 = 42개 출력
    // dates.innerHTML = dateSet.map((v,seq)=>seq<42?`<div class='date'>${v}</div>`:``).join('');
    // 오늘 날짜 표시하기
    for (let i = 0; i < 42; i++) {
      // 오늘 날짜와 같은 경우 클래스 today넣기
      if (
        // 날짜 일치
        today.getDate() == dateSet[i] &&
        // 월 일치
        today.getMonth() == currDate.getMonth() &&
        // 년 일치
        today.getFullYear() == currDate.getFullYear()
      ) {
        hcode += `<div class='date today'>${dateSet[i]}</div>`;
      } else {
        hcode += `<div class='date'>${dateSet[i]}</div>`;
      }
    } ///////////for////////////////////

    // 8. 날짜태그 출력하기
    dates.innerHTML = hcode;

    // 9. 날짜정보 사용하도록 세팅하기
    // (1)대상 : .dates
    // 위에서 새로 세팅 된 대상을 읽어와야함
    let newDate = dFn.qsa(selEl+' .date');
    // console.log(newDate);
    // (2) 각 날짜 .date요소에 링크 설정하기
    newDate.forEach(ele=>{
      dFn.addEvt(ele,'click',()=>{
        // 1. 연월일 데이터 읽어오기
        // (1) 년도
        let showYear = yearTit.innerText.split('년')[0];
        // (2) 월
        let showMonth = monthTit.innerText.split('월')[0];
        // (3) 일
        let showDate = ele.innerText;
        
        // (5) 전달 or 다음달 날짜 구분하기
        let isSpan = dFn.qsEl(ele,'span');
        if(isSpan){ // span이 있으면 true
          let isAm = isSpan.classList.contains('am');
          if(isAm){
            showMonth++;
            if(showMonth==13){
              //13월은 1월로 처리
              showMonth = 1;
              //년 증가
              showYear++;
            } ///// if 13월 처리////
          } /////////// if 다음월 날짜 처리 ////////
          else{
            showMonth--;
            if(showMonth==0){
              //0월은 12월로 처리
              showMonth = 12;
              //년 감소
              showYear--;
            } ////// if 0월 처리 ////////
          }/////////// if 전월 날짜 처리 ////////
        }
        //[ 요일찍기 참고 ]
        // 날짜구성하기 : yyyy-mm-dd
        let setDate = `${showYear}-${dFn.addZero(showMonth)}-${dFn.addZero(showDate)}`;
        // (4) 요일셋팅하기
        let setDay = new Date(setDate).getDay();
        // console.log(setDate+`(${week[setDay]})`);
        
        // 히든필드에 날짜정보 넣기 : 클릭한 날짜정보 공개
        // 활용도를 위해 일반 구분자로 정보공개
        // 예) 년/월/일/요일 -> 2023/10/18/3
        dateInfo.value = `${showYear}/${showMonth}/${showDate}/${setDay}`;
        // dateInfo.value = setDate+`(${week[setDay]})`;
      
        // 2. 날짜 체크하기
        // 기존 check클래스 삭제
        newDate.forEach(ele=>ele.classList.remove('check'));
        // 누른요소 check클래스 주기
        ele.classList.add('check');
      }); ////////click함수///////
    }); /////////forEach////////////
  }; ////////initDallyeok함수.////////

  // 초기화 함수 호출
  initDallyeok();

  // let a = ()=>{} 변수함수를 this.a=()=>{} 이처럼 생성자 함수에 등록하여
  // 인스턴스생성 시 접근 할 수 있도록 한다.
  // (2) 달력 변경 함수
  this.chgCalender = (num) => { //num(1 다음, -1이전)
    // console.log("달력 ㄱㄱ",num);
    // getMonth() 월 가져오기 / setMonth() 월 세팅하기!
    currDate.setMonth(currDate.getMonth()+num);
    
    initDallyeok();
  }; ////////chgCalender 함수 ////////////

  // 3. 이벤트 설정하기
  // 이전버튼, 다음버튼 함수 연결 : 변경함수에 num(1 다음, -1이전)
  dFn.addEvt(dFn.qs(selEl+" .btnL"), "click", ()=>this.chgCalender(-1));
  dFn.addEvt(dFn.qs(selEl+" .btnR"), "click", ()=>this.chgCalender(1));
  // this키워드로 등록 된 생성자함수 속성/메서드는 반드시 this키워드를 사용해야함
} //////////// makeDallyeak함수 ///////////

/************************************************************
    함수명 : insertCalendarCode
    기능 : 달력의 HTML 코드 넣기
************************************************************/ 
function insertCalendarCode(){
  // 달력 html코드를 리턴함
  return`
  <!-- 달력 전체박스 -->
  <div class="calendar">
    <!-- 달력상단:해당년/월표시 -->
    <header class="header">
      <!-- 달력이동버튼:이전 -->
      <button class="mbtn btnL">〈</button>
      <div class="title">
        <div class="yearTit"></div>
        <div class="monthTit"></div>
      </div>
      <!-- 달력이동버튼:다음 -->
      <button class="mbtn btnR">〉</button>
    </header>
    <!-- 달력날짜표시박스 -->
    <section class="main">
      <!-- 주단위 구분박스 -->
      <div class="week">
        <div class="day">Sun</div>
        <div class="day">Mon</div>
        <div class="day">Tue</div>
        <div class="day">Wed</div>
        <div class="day">Thu</div>
        <div class="day">Fri</div>
        <div class="day">Sat</div>
      </div>
      <!-- 해당월의 달력날짜 구성박스 -->
      <!-- 전달 .bm 이후 .am -->
      <div class="dates">
      </div>
    </section>
    <!-- 달력날짜 저장용 히든필드: type='hidden' -->
    <input type='hidden' class='date-info'>
  </div>
  `;
} ///////////insertCalendarCode 함수 ////////////////////

export default MakeDallyeok;