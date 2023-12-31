// for문 연습1 : 외부JS파일 - for_ex.js
// JS 외부파일은 html문서에 직접 들어가서 작동되므로
// CSS처럼 "utf-8"같은 인코딩 설정이 필요없음!

// 1. 대상선정 
// 1-1-1. 이벤트 대상 : 미니언즈
var mini = document.querySelectorAll('.mini');
// 1-1-2. 이벤트 대상 : 리셋버튼
var r_btn = document.querySelector('.rbtn');
// 1-2-1. 출력대상 : 파란박스 안 미니공간
var blue_box = document.querySelector('.mini-space');
// 1-2-2. 출력대상 : 개수출력
var cnt_spot = document.querySelector('.stxt span');
console.log('미니언즈,리셋버튼,공간,개수 :',mini,r_btn,blue_box,cnt_spot);

// 2. 이벤트 연결하기
// 2-1. 이벤트 대상 : 미니언즈 이미지 클릭 시 넣기 함수 호출
// mini[0].onclick = insertMini; /* 온클릭 이벤트에 함수할당 */
// 기본 for문으로 반복하여 개수만큼 이벤트 세팅하기
for(var i = 0; i < mini.length; i++){
    mini[i].addEventListener('click',insertMini);
    // console.log('for문 안 i',i); 0,1,2
} ///////////////// for문 ////////////////////////
// 2-1. 이벤트 대상 : 리셋 클릭 시 미니언즈 빼기 함수 호출
r_btn.addEventListener('click',resetMini);
// console.log('for문 밖 i',i); 3
// 3. 함수만들기
// 3-1. 미니언즈 넣기 함수
/****************************************************
    함수명 : insertMini
    기능 : 미니언즈 이미지 개수만큼 넣기(for문)
****************************************************/
function insertMini(){
    // 1. 함수호출
    console.log('미니언즈넣기함수',this);
    // this는 나 자신 : 호출한 .mini

    // 2. 세팅 된 개수 속성(data-cnt) 가져오기
    var cnt = this.getAttribute('data-cnt');
    // getAttribute('속성명') : 속성값 가져오기 내장함수
    console.log('data-cnt : ',cnt); 

    // 3. 미니언즈 넣기!!
    // 대상 : .Bcase -> blue_box
    // for (시작;개수보다 작을때까지;1씩증가)
    for(var j = 0; j < cnt; j++){
    // 대입연산자로 기존데이터에 합쳐줌
    blue_box.innerHTML += `
    <img src="./images/Minions.png" alt="미니언즈">`;
    } /////////////// for문 /////////////////////

    // 4. 현재 박스에 있는 미니언즈 개수 찍기
    // 대상 : .mini-space -> blue_box변수
    var count_mini = blue_box.querySelectorAll('img').length;
    // querySelectorAll() 전체 하위이미지 수집
    // length -> 개수읽기
    console.log(count_mini, typeof count_mini);
    // typeof : 변수의 데이터 형 출력
    // 출력대상 : .stxt span -> cnt_spot
    cnt_spot.innerText = count_mini*3;
} /////////// insertMini함수 ////////////////////////
////////////////////////////////////////////////////
// 3-2. 리셋함수
/**************************************************
    함수명 : resetMini
    기능 : 파란박스 안 미니언즈 이미지,개수 초기화
**************************************************/
function resetMini(){
    // 1. 함수호출
    console.log('미니빼!',this);
    // 2. 파란박스 미니언즈 이미지 지우기
    // 대상 : .mini-space -> blue_box
    blue_box.innerHTML = '';
    // 3. 정보박스 미니언즈 개수 초기화
    // 대상 : .stxt span -> cnt_spot
    cnt_spot.innerText = '0';
} //////////// resetMini 함수 //////////////////////
///////////////////////////////////////////////////
