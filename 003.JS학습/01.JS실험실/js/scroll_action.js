/* 스크롤 액션 JS - scroll_action.js*/

// DOM 함수 객체 //////////////
const domFn = {
  // 요소선택함수 ////////
  qs: (x) => document.querySelector(x),
  qsEl: (el, x) => el.querySelector(x),
  qsa: (x) => document.querySelectorAll(x),
  qsaEl: (el, x) => el.querySelectorAll(x),

  // 이벤트셋팅함수
  addEvt: (ele, evt, fn) => ele.addEventListener(evt, fn),

  // 바운딩 위치값 함수
  getBCR: (ele) => ele.getBoundingClientRect().top,
  // 옵셋 탑 반환 함수
  getOT: ele => ele.offsetTop,
}; /////// domFn 객체 /////////////

// 부드러운 스크롤 호출
startSS();

/****************************************************
 [ 스크롤 이벤트를 활용한 요소 등장 액션 기능 구현하기 ]

 1. 사용 이벤트 :scroll
 -> 스크롤 바가 있는 페이지에서 또는 부분박스에서 사용 가능함
 -> **주의**: wheel이벤트와 다르다!
 스크롤 바가 이동하지 않아도 마우스 휠이 작동 될 때 발생
 휠 이벤트는 모바일에서 사용 불가

 2. 스크롤바 위치 값 알아내기
    1) window.scrollY (IE6~11지원안함)
    2) document.scrollingElement.scrollTop
    3) document.documentElement.scrollTop
    4) document.querySelector('html').scrollTop
    가로방향은 X대신Y

3. 스크롤 등장 대상 요소의 보이는 화면에서의 top값
    getBoundingClientRect().top
    -> 보이는 화면 상단을 기준으로 이것보다 위로 갈 경우 -값을 리턴
    -> 기준: 보이는 화면의 크기를 기준하면 됨
    -> 윈도우 화면 전체: window.innerHeight
    예) 화면의 2/3는 window.innerHeight/3*2 : 위에서부터 66%위치
    예) 화면의 3/4은 window.innerHeight/4*3 : 위에서부터 75%위치
****************************************************/

// 1. 스크롤 등장할 대상 선정
// 스크롤에 의해 등장할 대상 : .scact
const scAct = domFn.qsa(".hide-ele");
// console.log('대상: ',scAct);
// 2. 전체 window에 스크롤 이벤트 세팅하기
// 2-1. 스크롤 등장액션
domFn.addEvt(window, "scroll", showIt);
// 2-2. 스크롤 시 떨어지는 이미지
domFn.addEvt(window, "scroll", moveWoman);
// 2-3. 스크롤 시 글자 이동
domFn.addEvt(window, "scroll", moveTit);

// 요소 위치값 : 실제로 사용하진 않음
// let pos1 = scAct[0].offsetTop;
// let pos2 = scAct[1].offsetTop;
// let pos3 = scAct[2].offsetTop;

// 각 요소 옵셋top값 구하기
const posTop = [];
scAct.forEach((ele,idx)=> posTop[idx] = domFn.getOT(ele)); ///////////forEach/////////////////
console.log(posTop);
// 스크롤 등장 요소 위치값 찍기
// console.log(pos1);

// 3. 스크롤 등장 기준 설정 : 화면의 3/4
const CRITERIA = (window.innerHeight / 4) * 3;

// 4. 스크롤 등장액션 함수 만들기
function showIt() {
  // 스크롤 위치값 변수
  // let scTop = window.scrollY;
  // let scTop2 = document.scrollingElement.scrollTop;
  // let scTop3 = document.documentElement.scrollTop;
  // let scTop4 = document.querySelector('html').scrollTop;
  // console.log("scTop값:",scTop,"scTop2값:",scTop2,"scTop3값:",scTop3,"scTop4값:",scTop4);
  // 모두 동일함
  // console.log(pos1,"/",scTop);

  // 정해진 위치의 요소를 스크롤 위치값으로 : 사용하지 않음
  // if(scTop > (pos1 - 500)) scAct[0].classList.add('on');
  // if(scTop > (pos2 - 500)) scAct[1].classList.add('on');
  // if(scTop > (pos3 - 500)) scAct[2].classList.add('on');

  // console.log('요소1 바운딩값:',scAct[0].getBoundingClientRect().top);
  // 요소 바운딩 위치값 찍기
  for (let x of scAct) addOn(x);

  
} ////////////showIt함수 /////////////

// 기준값을 검사 후 클래스를 넣는 함수
function addOn(ele) {
  //ele - 대상요소
  let boundingTop = domFn.getBCR(ele);
  // console.log(boundingTop);
  // 기준값인 화면 3/4일때 나오기
  if (boundingTop < CRITERIA) ele.classList.add("on");
  // 기준값보다 클때 돌아가기
  else ele.classList.remove("on");
} ////////// addOn함수/////////////

// 구현내용: 글자를 박스에 넣고 하나씩 날아오면서 등장
// 1.대상선정: .stage
const stage = domFn.qs(".stage");
// console.log(stage);

// 2.데이터 변수할당
const mytxt = "신카이 마코토";

// 3.데이터글자 한글자씩 태그싸기
// for of문사용!

let hcode = ""; // 코드저장변수
let idx = 0; // 순번변수

for (let x of mytxt) {
  // 띄어쓰기일 경우 특수문자처리!
  if (x === " ") hcode += "&nbsp";
  // 코드만들어 변수에 대입연산자로 넣기!
  else
    hcode += `<span style="transition-delay: ${idx * 0.1}s">
                    ${x}</span>`;

  // 순번변수증가
  idx++;
} //////////// for of ////////////

// console.log(hcode);

// 4. 스테이지 박스에 글자넣기
stage.innerHTML = hcode;

// 5. 일정시간후 스테이지박스에 클래스 "on"주고 애니작동!
setTimeout(() => {
  stage.classList.add("on");
}, 2000);

////////// 스크롤 시 떨어지는 여자 함수 /////////////////////////
// 원리: 전체 페이지 스크롤 이동 한계값을 기준으로 
// 보이는 화면에서의 분할값을 만들어서 위치값 조정

// 비례식 스크롤한계값:스크롤이동값 = 화면높이:이미지이동값
// 이미지 이동값 = 화면높이*스크롤이동값/스크롤한계값
// 1. 화면높이값
let winH = window.innerHeight;
// 2. 문서전체높이값
let docH = document.body.clientHeight;
// 3. 스크롤한계값 : 전체높이 - 화면높이
// document.body.clientHeight - window.innerHeight
let scLimit = docH - winH;
// 4. 떨어지는 여자 요소
const woman = domFn.qs('#woman');

// console.log(scLimit);
function moveWoman(){
    
    // 1. 스크롤 위치값
    let scTop = window.scrollY;
    // console.log('난 떨녀!',scTop);
    
    // 2. 떨녀 top값
    // 이미지 이동값 = winH*scTop/scLimit
    let wTop = winH * scTop / scLimit;

    // console.log(wTop);
    // 3. 떨어지는 여자에 적용하기
    woman.style.top = wTop + 'px';
    // 4. 맨 위일 때 위쪽으로 숨기기
    if(scTop == 0) woman.style.top = '-20%';
} //////////moveWoman 함수/////////////////


///////////////////////////////////////////////
/////////타이틀 이동 애니함수////////////////////
///////////////////////////////////////////////
// 대상: .tit
const tit = domFn.qs('.tit');
function moveTit(){
  // 스크롤 위치값
  let scTop = window.scrollY;
  // console.log('호출됨');
  // 맨 위 위치에서
  // 스크롤 위치값이 작을때 0번 요소의 위치값 - 화면중앙보다
  if(scTop < posTop[0] - winH/2){
    tit.style.top = '0';
    tit.style.left = '50%';
    tit.style.transition = '1s'
  }
  if(scTop > posTop[0] - winH/2 && scTop < posTop[0]){
    tit.style.top = '50%';
    tit.style.left = '25%';
    tit.style.transition = '2s'
  }
  if(scTop > posTop[1] - winH/2 && scTop < posTop[1]){
    tit.style.top = '70%';
    tit.style.left = '65%';
    tit.style.transition = '1s'
  }
  if(scTop > posTop[2] - winH/2 && scTop < posTop[2]){
    tit.style.top = '50%';
    tit.style.left = '25%';
    tit.style.transition = '.5s'
  }
}////////moveTit함수/////////////