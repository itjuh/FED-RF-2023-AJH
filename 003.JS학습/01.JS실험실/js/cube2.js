// 회전제어 JS - cube2.js //////////////

/************************************* 
    [구현내용]
    -마우스 휠 이벤트에 따라 기본기능은 막고
     큐브를 회전하는 속성인 transform의 rotateY(각도)의
     값 변경을 이용한 큐브 회전을 적용함
    - 대상 : window
    - 사용이벤트 : wheel
    - 단위각도 : 360도 / 9개 = 40도
    - CSS 이징적용 : ease-out

*************************************/
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

// 0. 변수세팅
// 단위각도
const DEG = 40;
// 광휠 상태변수(0:허용,1:금지)
let stsWheel = 0;
// 휠 단위수(휠 할때 증감하는 수)
let numWheel = 0;
// 휠 제어 시간
const TIME_WHEEL = 200;

// 1. 대상선정
const cube = domFn.qs('.cube');

console.log(cube);
// 2. 이벤트 설정
domFn.addEvt(window,'wheel',rotateMem);

// 3. 함수만들기
function rotateMem(){
    // 0. 휠 이벤트 발생 수 조절하기(광휠금지)
    if(stsWheel) return; // 막기
    stsWheel = 1; // 잠금
    setTimeout(() => stsWheel = 0,TIME_WHEEL); //해제
    // 1. 휠 방향 알아보기 휠 델타
    let delta = event.wheelDelta;
    // 2. 방향에 따른 회전각도 만들기
    if(delta < 0){
        numWheel--;
    }
    else{
        // 아래방향 휠 -> right회전
        // 휠 단위수 증가
        numWheel++;
    }
    // 호출확인
    console.log('휠~~~~',numWheel,delta);

    // 3. 대상요소에 각도 적용하기
    // 적용각도 = 단위각도 * 휠단위수
    cube.style.transform = `rotateY(${numWheel*DEG}deg)`;

} //////////rotateMem함수//////////
