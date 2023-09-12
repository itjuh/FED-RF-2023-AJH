// 온고롱 서브A 안내페이지 js - ainfo.js

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


// 로드함수
domFn.addEvt(window,'load',loadFn);
function loadFn(){
    /* 안내페이지 재료소개 구역에 데이터 뿌리기 */
    // 1. 대상선정
    // 1-1. 변경대상 : .intro-grad
    const introGrad = domFn.qs('.intro-grad');
    
    // html 코드저장 함수
    let hcode = '';
    // 코드 저장하기
    grad_info.forEach(ele=>{
        // console.log(ele, introGrad);
        hcode+=`
        <li class="grad-box">
            <img src="${ele.src}" alt="${ele.alt}">
            <mark>${ele.재료명}</mark>
        </li>
        `;
    });
    console.log(hcode);
    // 코드 뿌리기
    introGrad.innerHTML = hcode;

    /* 화면이 로드 된 후 brand-span 순차적으로 떨어지기 */
    // 비동기 처리구현
    setTimeout(() => {
        // right-box span 다 떨어지면 left-box 떨어지기
        // transform = translateY(0);
        // 1. 대상선정
        // 1-1. 변경대상 : .top-title span
        const moveSpan = domFn.qsa('.top-title span');
        let i = 0;
        for(i = 0; i < moveSpan.length; i++){
            moveSpan[i].style.transform = 'translateY(0)';
            moveSpan[i].style.transitionDelay = i*.8 + 's';
        }
    }, 0);
    /*span태그 다 나온 후 배경과 이미지 이동하기*/
}///////////로드구역/////////////