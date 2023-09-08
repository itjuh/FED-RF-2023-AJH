// 온고롱 오시는길 페이지 JS - bmap.js

//domFn객체
const domFn = {
    // 요소선택 함수 ////////////
    qs : (x) => document.querySelector(x),
    qsEl : (el,x) => el.querySelector(x),
    qsa : (x) => document.querySelectorAll(x),
    qsaEl : (el,x) => el.querySelectorAll(x),
    // 이벤트 세팅함수 //////////
    addEvt : (ele,evt,fn) => ele.addEventListener(evt,fn);
}; /////////////////domFn////////////////

//호출은 domfn.qs(x);

// [ 클릭한 가상요소안쪽 content를 읽어와서 가상요소 박스 색상을 바꾼다 ]


