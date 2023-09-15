/* JS실험실 : 05. 중간스크롤 가로이동 dance.js*/

// DOM 함수 객체 //////////////
const domFn = {
    // 요소선택함수 ////////
    qs: (x) => document.querySelector(x),
    qsEl: (el, x) => el.querySelector(x),
    qsa: (x) => document.querySelectorAll(x),
    qsaEl: (el, x) => el.querySelectorAll(x),
  
    // 이벤트셋팅함수
    addEvt: (ele, evt, fn) => ele.addEventListener(evt, fn),
  
    // 바운딩 위치값 함수
    getBCR: (ele) => ele.getBoundingClientRect().top,
    // 옵셋 탑 반환 함수
    getOT: ele => ele.offsetTop,
  }; /////// domFn 객체 /////////////

////////////////////////////////////////////////////
// 1. 요구사항: 3번 스테이지에 ul>li구조의 이미지 넣기
// 2. 대상선정 : .slidePg
const slidePg = domFn.qs('.slidePg');
// console.log(slidePg);

// 3. 코드만들기
let hcode = '';

for(let i=1; i<9; i++){
    hcode += `
    <li>
        <img src="./images/dance/${i}.jpg" alt="댄스">
    </li>`;
}////////////for문////////////

hcode = `<ul>${hcode}</ul>`;
// console.log(hcode);
// 4. 대상요소에 코드 넣기
slidePg.innerHTML = hcode;

///////////////////////////////////////////////////

//////////////////////////////////////////////////
// 1. 요구사항 : 3번째 영역에서 내용을 가로방향 이동
// 2. 대상선정 
// 2-1 이벤트 대상 : window
// 2-2 위치 대상 : .tpg :스티키박스를 싸고있는 부모박스
// 2-3 움직일 대상 : .slidePg>ul
// 3. 이벤트 종류 : scroll
/////////////////////////////////////////////////
// 원리 
// 세로로 긴 부모박스 만들기 (h : 100vh+길이값)

// 위치대상 : .tpg
let tpg = domFn.qs('.tpg');
// 움직일 대상 : .slidePg>ul
let target = domFn.qs('.slidePg>ul');

// 이벤트 설정하기
domFn.addEvt(window,'scroll',moveSlide);

function moveSlide(){
    // 1. 스티키 부모박스 바운딩 top값
    let bTop = domFn.getBCR(tpg)
    // 바운딩 값으로 대상 left 위치 변경하기
    // 움직일 대상 : 스티키박스 -> .slidePg
    // 움직이기 시작은 바운딩값이 0이하일때부터
    if( bTop<=0 && bTop >= -3000){
        target.style.left = bTop + 'px';
    }
    // 위쪽(0초과)일때 처음위치 설정하기
    else if( bTop > 0 ){
        target.style.left = '0px';
    }
    // 아래쪽(-3000px)일 때 마지막위치 설정하기
    else{
        target.style.left = '-3000px';
    }

}///////////moveSlide함수//////////////

/////////////////////////////////////////////
// 1. 요구사항 : 메뉴에 오버 시 움직이는 배경
// 2. 대상선정
// 2-1. 이벤트 대상: .gnb>ul>li
// 2-2. 변경대상 : .mbg
// 3. 이벤트 종류 : mouseover, mouseout
/////////////////////////////////////////////
// 1. 대상수집
// 이벤트 대상
const gnbList = domFn.qsa('.gnb>ul>li');
// 변경대상
const mbg = domFn.qs('.mbg');
console.log(gnbList,mbg)
// 2. 이벤트 설정하기
// 이벤트 종류 mouseover / mouseout
gnbList.forEach(ele=>{
    domFn.addEvt(ele,'mouseover',overFn);
    domFn.addEvt(ele,'mouseout',outFn);
}); //////////forEach///////////////////
// 3. 함수만들기
function overFn(){
    //console.log('overFn호출',this);
    // 1. 오버 된 li의 left위치값 알아내기
    let posL = this.offsetLeft;
    console.log('위치:',posL);
    // 2. 메뉴배경 보이기 + 움직이기
    mbg.style.opacity = 1;
    mbg.style.left = posL + 'px';
} ////////////overFn함수////////////////
function outFn(){
    console.log('outFn호출',this);
    // 3. 메뉴배경 사라지기
    mbg.style.opacity = 0;
} ////////////oetFn함수////////////////