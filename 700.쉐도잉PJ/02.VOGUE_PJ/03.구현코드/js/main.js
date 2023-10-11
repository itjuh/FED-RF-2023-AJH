// 보그PJ 메인페이지 main.js

// DOM객체
import dFn from './dom.js';

// [1] 메인페이지 등장액션 클래스 넣기
// 대상선정: .main-area section
const hideBox = dFn.qsa('.main-area section');

// 클래스 넣기
hideBox.forEach((ele,idx)=>{
    // 0번째 빼고 숨김클래스 넣기
    if(idx!=0){
        ele.classList.add('scAct');
    } ///////if문///////////
}); /////////forEach/////////////
