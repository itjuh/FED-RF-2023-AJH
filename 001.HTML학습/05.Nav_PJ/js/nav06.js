// 가로네비 서브별 드롭다운 전체창 - nav06.js

const domFn = {
    // 요소선택함수 ////////
    qs: (x) => document.querySelector(x),
    qsEl: (el, x) => el.querySelector(x),
    qsa: (x) => document.querySelectorAll(x),
    qsaEl: (el, x) => el.querySelectorAll(x),
  
    // 이벤트셋팅함수
    addEvt: (ele, evt, fn) => ele.addEventListener(evt, fn),
}; /////// domFn 객체 /////////////

// 1. 구현 요구사항
// gnb메뉴에 데이터를 모두 html DOM으로 구조화하여
// 화면에 출력한다!!

// 2. 대상선정 .gnb
const gnbBox = domFn.qs('.gnb');
console.log('대상 gnb',gnbBox);