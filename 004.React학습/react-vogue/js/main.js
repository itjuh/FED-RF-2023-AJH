// 보그PJ 메인페이지 main.js

// DOM객체
import dFn from './dom.js';

// [1] 메인페이지 등장액션 클래스 넣기
// 대상선정: .main-area section
// const hideBox = dFn.qsa('.main-area section');
const hideBox = $('.main-area section');

// 클래스 넣기 - JS code
// hideBox.forEach((ele,idx)=>{
//     // 0번째 빼고 숨김클래스 넣기
//     if(idx!=0){
//         ele.classList.add('scAct');
//     } ///////if문///////////
// }); /////////forEach/////////////

// 클래스 넣기 JQuery
hideBox.each((idx,ele)=>{
    if(idx!=0) $(ele).addClass('scAct');
}); /////////forEach/////////////


////////////////////////////////////////////
// 제이쿼리 라이브러리를 사용하여 구현 ////////
// 1. 스크롤 등장 액션 구현하기 //////////////
// (1) 대상선정 : window
// (2) 이벤트 : scroll
// (3) 기준값 : getBoundingClientRect() -> dFn.getBCR()
// 등장액션 대상: .main-area section

// 기준값 윈도우 높이값의 3/4 지점
let winH = $(window).height() * 3/4;

// 스크롤 이벤트
$(window).scroll(()=>{
    
    // 1. 윈도우 높이값의 3/4 지점에서 .main-area section에 on 넣기
    hideBox.each((idx,ele)=>{
        let val = dFn.getBCR(ele);
        if(idx!=0 && val < winH){
            // console.log(`${idx}번째 대상의 getBCR top값 :`,dFn.getBCR(ele));
            $(ele).addClass('on');
        } ///////////////if///////////////////////
    });
}); ///////////scroll ///////////
