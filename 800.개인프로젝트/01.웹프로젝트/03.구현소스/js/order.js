// 온고롱 서브 주문하기 js - order.js

//domFn객체
const domFn = {
    // 요소선택 함수 ////////////
    qs : (x) => document.querySelector(x),
    qsEl : (el,x) => el.querySelector(x),
    qsa : (x) => document.querySelectorAll(x),
    qsaEl : (el,x) => el.querySelectorAll(x),
    // 이벤트 세팅함수 //////////
    addEvt : (ele,evt,fn) => ele.addEventListener(evt,fn),

}; /////////////////domFn////////////////