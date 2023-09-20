// 옷소매 갤러리 JS - main.js

// DOM함수
import domFn from './dom.js';

// 1. 기능정의 : 버튼 클릭 시 갤러리 박스를 잘라서 앞/뒤로 이동함
// 1-1. 오른쪽버튼 클릭 시 - 맨앞 div 맨 뒤로 이동
// -> 갤러리 부모박스.appendChild
// 1-2. 왼쪽버튼 클릭 시 - 맨 뒤 div 맨 앞으로 이동
// -> 갤러리 부모박스.insertBefore(맨 뒤자식 div, 맨 앞자식 div)

// 2. 대상선정
// 2-1. 이벤트 대상 : .abtn(이동버튼)
const abtn = domFn.qsa('.abtn');
// 2-2. 변경대상 : .gbx(갤러리 부모박스)
const gbx = domFn.qs('.gbx');

// 3. 이벤트 설정하기
abtn.forEach(ele=>{
    domFn.addEvt(ele,'click',goSlide);
});

// 광클금지 변수(0허용 1불가)
let stsClick = 0;
// 잠금시간 변수
const TIME_SLIDE = 400;

// 4. 함수만들기
// 슬라이드 넘기기 함수
function goSlide(){
    // (0) 광클금지
    if(stsClick) return; // 움직여!
    stsClick=1; // 잠금!
    setTimeout(()=>stsClick=0,TIME_SLIDE); // 해제!

    // (1) 버튼구분하기
    let isR = this.classList.contains('rb');
    // 현재 갤러리 하위자식 div요소집합 새로읽기
    // 매번 순서가 바뀌니까 click하면 읽어야함
    let newList = domFn.qsaEl(gbx,'div');
    // (2) 기능 분기하기
    if(isR){ //오른쪽 버튼 appendChild
        //부모박스.appendChild(domFn.qsaEl(부모,자식)[0]);
        gbx.appendChild(newList[0]);
    }else{ //왼쪽버튼 insertBefore(놈,놈,놈)
        //갤러리 부모박스.insertBefore(맨 뒤자식 div, 맨 앞자식 div)
        gbx.insertBefore(newList[newList.length-1],newList[0]);
    }
} ///////////goSlide/////////////////

// 1. 기능정의 : 자동넘김
// 자동넘김용 호출 함수
const goRight = () => gbx.appendChild(domFn.qsaEl(gbx,'div')[0]);

// 자동넘김용 변수(인터발용:autoI, 타임아웃용:autoT)
let autoI, autoT;
// 인터벌 호출함수
const autoSlide = () => autoI = setInterval(goRight,3000);

// 인터발 함수 최초호출
autoSlide();

// 인터발 지우기 함수 /////////
const clearAuto = ()=>{
    //인터발 지우기
    clearInterval(autoI);
    //타임아웃 지우기
    clearTimeout(autoT);
    //일정시간 후 작동
    autoT = setTimeout(autoSlide,5000);
}; ///////clearAuto/////////////

// 버튼 클릭 시 clearAuto함수 호출하기
abtn.forEach(ele=>domFn.addEvt(ele,'click',clearAuto));


// 슬라이드 넘기기 공통함수
function goSlideFn(mom,son){
    // (0) 광클금지
    if(stsClick) return; // 움직여!
    stsClick=1; // 잠금!
    setTimeout(()=>stsClick=0,TIME_SLIDE); // 해제!

    // (1) 버튼구분하기
    let isR = this.classList.contains('next');
    // 현재 갤러리 하위자식 div요소집합 새로읽기
    // 매번 순서가 바뀌니까 click하면 읽어야함
    let newList = domFn.qsaEl(mom,son);
    // (2) 기능 분기하기
    if(isR){ //오른쪽 버튼 appendChild
        mom.appendChild(newList[0]);
    }else{ //왼쪽버튼 insertBefore(놈,놈,놈)
        mom.insertBefore(newList[newList.length-1],newList[0]);
    }
} ///////////goSlideFn/////////////////