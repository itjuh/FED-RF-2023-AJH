// 보그PJ 메인페이지 main.js

// DOM객체
import dFn from './dom.js';
// 부드러운 스크롤 모듈
import { startSS, setPos } from './smoothscroll23.js';
// [1] 부드러운 스크롤 적용 ////////////
startSS();

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

// 스크롤 메뉴 적용대상 : .top-area
const topArea = $('#top-area');

// 탑버튼 : .tbtn
const tBtn = $('.tbtn'); 

// 스크롤 이벤트
$(window).scroll(()=>{
    let scTop = $(window).scrollTop();
    // console.log('스크롤!!!!' , scTop);

    // 1. 스크롤 위치값이 100을 초과하면 슬림상단 클래스 on넣기
    if(scTop>100) topArea.addClass('on');
    else topArea.removeClass('on');
    
    // 2. 스크롤 위치값이 300을 초과하면 나오기
    if(scTop>300) tBtn.addClass('on');
    else tBtn.removeClass('on');

    // 3. 윈도우 높이값의 3/4 지점에서 .main-area section에 on 넣기
    hideBox.each((idx,ele)=>{
        let val = dFn.getBCR(ele);
        if(idx!=0 && val < winH){
            // console.log(`${idx}번째 대상의 getBCR top값 :`,dFn.getBCR(ele));
            $(ele).addClass('on');
        } ///////////////if///////////////////////
    });
}); ///////////scroll ///////////

// 2. 상단이동버튼 클릭 시 맨 위로 가기//
// 부드러운 스크롤 함수 업데이트
tBtn.click((e)=>{
    // 기본 a태그 기능(#-맨위이동) 막기
    e.preventDefault();
    // 부드러운 스크롤 위치값 변경
    setPos(0);
    console.log('나클릭');
}); ///////////click//////////
