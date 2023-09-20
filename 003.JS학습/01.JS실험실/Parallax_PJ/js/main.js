// 패럴렉스 PJ JS - main.js

// 부드러운 스크롤, 시작값 위치함수 불러오기
import {startSS,setPos} from "./smoothScroll20.js";
// dom 불러오기
import domFn from "./dom.js";
// 부드러운 스크롤 호출하기
startSS();

/*********************************************
    [ 패럴렉스 기능 구현하기 ]

    1. 정의
    스크롤 작동 시 같은 방향으로 이동하는 요소가 
    다른 속도를 가지고 움직이므로 
    사용자가 공간감을 느낄 수 있게 하는 구현방법

    2. 방법
        (1) 범위 - 요소가 화면에 등장하여 
        보일 동안 스크롤 될 때 이동함
        (2) 움직일 크기 설정이 필요함
        (3) 범위 체크를 위한 js 메서드를 사용함
        -> getBoundingClientRect().top
    
    3. 이벤트 : scroll

    4. 패럴렉스 대상 : 특정클래스 지정 
        (1) 글자박스 대상 : .txt
        (2) 아이콘 이미지 대상 : .icon
 ********************************************/

// 0-1. 새로고치면 스크롤바 위치 캐싱 후 맨 위로 이동
setTimeout(() => {
    // 윈도우 스크롤 맨 위로!
    window.scrollTo(0,0);
    // 부드러운 스크롤 위치값 반영!(전 위치로 이동해버림)
    setPos(0);
    // 안하면 스크롤 바를 내리고 새로고침하면 원래 위치로 강제이동함
}, 500);
// 0-2. 스크롤바 트랙을 잡고 위치 이동 시 위치값 반영
domFn.addEvt(window,'mouseup',()=>setPos(window.scrollY)); ///////// mouseup ////////////////////////
// 0-3. 키보드 방향키 이동 시 위치값 반영

domFn.addEvt(window,'keyup',()=>setPos(window.scrollY)); ///////// keyup ////////////////////////
// 1. 대상선정
// 1-1. 글자박스
const txtBox = domFn.qsa('.txt');
// 1-2. 아이콘박스
const icon = domFn.qsa('.icon');
// console.log(txtBox,icon);

// 2. 이벤트 설정하기
// 대상 : window/ 이벤트종류 : scroll
domFn.addEvt(window,'scroll',scrollFn);

// 3. 함수만들기
// 3-1. 스크롤 이벤트 함수 ///////////////
function scrollFn(){
    console.log('스크롤중~');
    
    // 1. 대상1 : 글자박스 패럴렉스 호출
    txtBox.forEach(ele=>moveEl(domFn.getBCR(ele),ele,setH2));
    // 1. 대상2 : 아이콘 패럴렉스 호출
    icon.forEach(ele=>moveEl(domFn.getBCR(ele),ele,setH1));

} //////////////scrollFn////////////////

// 세팅값 변수/////
// 윈도우 높이값
const winH = window.innerHeight;
// 패럴렉스 범위변수
const setH1 = 100, setH2 = 300;


// 3-2. 패럴렉스 이동함수 ///////////////
function moveEl(elPos,ele,setH){
    // 전달변수 
    // (1) elPos - 위치값 getBCL
    // (2) ele - 대상요소
    // (3) setH - 이동할 범위의 높이값(클수록 속도감있게 움직임)

    // console.log('위치',elPos,'\n대상',ele,'\n범위',setH);
    // 패럴렉스 범위 : 윈도우 높이 값 ~ 0 (화면에서 등장한게 getBCR = 윈도우높이)
    // 화면에서 완전히 사라질 때 범위는 0보다 작다(요소크기만큼)
    if(elPos < winH && elPos > -200){
        // 1. 실제요소 위치이동값 계산
            // 실제 이동값 = 위치값*정한범위 / 전체범위
            // let x = (elPos*setH) / winH;
            
        // 실제 이동값 = 정한범위 - (위치값*정한범위 / 전체범위);
        let x = setH - (elPos*setH) / winH;
        console.log('-x : ',-x,window.scrollY);
        // 2. 해당요소의 위치값 이동 CSS 반영하기
        ele.style.transform = `translateY(${-x}px)`;
        // 방향은 top 기준 위쪽방향이므로 음수값

    } /////////////// if //////////////////////

    /**************************************
        [ 패럴렉스 위치 계산 ]
        
        1. 전체범위 : window.innerHeight
        2. 위치값 : getBoundingClientRect().top
        3. 정한범위 : 이동 할 수치 
        4. 실제이동값 : transform:translateY(이동수치px);
        ______________________________________________
        
        ((비례식으로 실제 이동값 알아내기))
        
        전체범위 : 위치값 = 정한범위 : 실제이동값
        실제 이동값 = 위치값*정한범위 / 전체범위

        -> 그.런.데...
        Y축 위치 이동은 처음에 0부터 서서히 커지므로
        이동수치값은 정한범위에서 실제 이동값을 빼야함

        실제 이동값 = 정한범위 - (위치값*정한범위 / 전체범위);

    **************************************/
    /*
    getBCR는 스크롤 내릴수록 작아짐 (요소가 움직이 범위에 대한 변수)
    getBCR는 숫자 작아짐 (화면높이부터~0으로)
    화면이동값 translateY(-스크롤Y(0부터 화면높이로 커짐));
    두 값의 비례식을 위해서 값의 조정이 필요함

    전체범위 : 위치값 = 정한범위 : (정한범위 - 실제이동값)
    */
} ///////////moveEl///////////////////