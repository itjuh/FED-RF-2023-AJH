// 쇼핑몰 배너 JS - 03.페이드효과 //

// DOM 선택함수
const qs = (x) => document.querySelector(x);
const qsa = (x) => document.querySelectorAll(x);

// addEvent 함수
// ele - 요소, evt - 이벤트, fn - 함수
const addEvt = 
(ele, evt, fn) => ele.addEventListener(evt, fn);

// HTML태그 로딩후 loadFn함수 호출! ///
addEvt(window,"DOMContentLoaded", loadFn);

/******************************************** 
 * 
    [ 페이드 효과 슬라이드 기능정의 ]
    -> 슬라이드 순번에 대한 전역변수를 사용한다!

    1. 오른쪽 버튼클릭시 다음 순번슬라이드에
    클래스 "on"을 줘서 opacity:1, z-index:1
    로 보이며 맨위로 설정해준다!(트랜지션적용)
    ->나머지 li는 모두 "on"을 지워서 초기화!

    2. 왼쪽버튼은 이전순번이 나오며 위와 동일

    3. 끝번호에 가서는 처음은 마지막으로 
    마지막은 처음으로 슬라이드가 다시 반복된다.

    4. 블릿은 현재 슬라이드와 일치된 순번표시

********************************************/

/****************************************** 
    함수명: loadFn
    기능: 로딩후 이벤트설정 및 슬라이드 기능
******************************************/
function loadFn() {
    console.log("로딩완료!");
    // 슬라이드 순번 전역변수
    let snum = 0;
    // 1. 대상선정
    // 이벤트 대상 .abtn
    const abtn = qsa('.abtn');
    // 변경대상 #slide li
    const slideLi = qsa('#slide li');
    // 슬라이드 개수
    const CNT_SLIDE = slideLi.length;
    // 블릿박스 대상 : .indic
    const indic = qsa('.indic li'); //li에 on을 줘서 이미지를 바꿀생각

    // 대상확인
    // console.log('대상',abtn,'/ 대상',slide,'/ 대상',indic);
    // 2. 이벤트 설정하기
    abtn.forEach(ele=>{
        addEvt(ele,'click',goSlide);
    }); /////////forEach //////////////////

    // 3. 함수만들기
    function goSlide(){
        console.log('goSlide함수 호출',this);
        // 0) 이번순번 li 클래스 on지우기
        // slideLi[snum].classList.remove('on');
        // 1) 버튼 구분하기
        let isR = this.classList.contains('ab2');
        // console.log('오른쪽인가봐',isR);
        if(isR){ // 오른쪽 버튼
            console.log(snum);
            //2-1) 슬라이드 길이와 같으면 처음으로
            snum==CNT_SLIDE-1?snum=0:snum++;
        } //////////if//////////
        else{ //왼쪽버튼
            console.log(snum);
            //2-2) 0이면 마지막으로
            snum==0?snum=CNT_SLIDE-1:snum--;
        } /////////else////////////
        // 4) 해당 li에 클래스 on넣기
        slideLi[snum].classList.add('on');
        // 3) 해당 li빼고 전체 li클래스 on지우기
        //(0번 안할 경우)
        slideLi.forEach(ele=>{
            // console.log(ele.isSameNode(slideLi[snum]));
            // 현재 li 아니면 클래스 on 지우기
            if(!ele.isSameNode(slideLi[snum]))
                ele.classList.remove('on');
        }); ///////forEach/////////////
    } ////////goslide 함수 ////////////////

}/////////////// loadFn 함수 //////////////
