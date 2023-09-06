// 쇼핑몰 배너 JS - 01.가로방향 배너 슬라이드 //

// DOM 선택함수
const qs = (x) => document.querySelector(x);
const qsa = (x) => document.querySelectorAll(x);

// addEvent 함수
// ele - 요소, evt - 이벤트, fn - 함수
const addEvt = 
(ele, evt, fn) => ele.addEventListener(evt, fn);

// HTML태그 로딩후 loadFn함수 호출! ///
addEvt(window,"DOMContentLoaded", loadFn);

/***************************************************** 
    [ 슬라이드 이동 기능정의 ]
    1. 이벤트 종류: click
    2. 이벤트 대상: 이동버튼(.abtn)
    3. 변경 대상: 슬라이드 박스(#slide)
    4. 기능 설계:

        (1) 오른쪽 버튼 클릭시 다음 슬라이드가
            나타나도록 슬라이드 박스의 left값을
            -100%로 변경시킨다.
            -> 슬라이드 이동후!!! 
            바깥에 나가있는 첫번째 슬라이드
            li를 잘라서 맨뒤로 보낸다!
            동시에 left값을 0으로 변경한다!

        (2) 왼쪽버튼 클릭시 이전 슬라이드가
            나타나도록 하기위해 우선 맨뒤 li를
            맨앞으로 이동하고 동시에 left값을
            -100%로 변경한다.
            그 후 left값을 0으로 애니메이션하여
            슬라이드가 왼쪽에서 들어온다.

        (3) 공통기능: 슬라이드 위치표시 블릿
            - 블릿 대상: .indic li
            - 변경 내용: 슬라이드 순번과 같은 순번의
            li에 클래스 "on"주기(나머진 빼기->초기화!)

*****************************************************/

/****************************************** 
    함수명: loadFn
    기능: 로딩 후 버튼 이벤트 및 기능구현
******************************************/
function loadFn() {
    console.log("로딩완료!");
    // 1. 대상선정
    // 이벤트 대상 .abtn
    const abtn = qsa('.abtn');
    // 변경대상 #slide
    const slide = qs('#slide');
    // 대상확인
    console.log('대상',abtn,'/ 대상',slide);

    // 2. 이벤트 설정
    // 버튼요소들 클릭 시 transform
    abtn.forEach(ele=>addEvt(ele,'click',goSlide));
    // addEvt(abtn,'click',goSlide);
    // 3. 함수만들기
    function goSlide(){
        // 호출확인
        console.log('나야나',this,
        this.classList.contains('ab2'));
        
        //classList.contains('클래스명');
        // 선택요소에 해당 클래스가 있으면 true
        // 1. 오른쪽 버튼여부 알아내기 변수
        let isRight = this.classList.contains('ab2');
        // 2. 슬라이드 li 새로읽기 변수(배열형)
        let eachOne = slide.querySelectorAll('li');
        // 3. 버튼분기하기 '.ab2'이면 오른쪽버튼
        // 오른쪽으로 가고! 잘라서 뒤로 보내고! 원래 위치값0!
        if(isRight){ //오른쪽 버튼
            // (1)대상이동하기
            slide.style.left = '-100%';
            // (2)트랜지션주기
            slide.style.transition = '.4s ease-in-out';
            // 이동시간 후 맨 앞 li 잘라서 맨 뒤로 이동하기
            // appendChild(요소);
            setTimeout(()=>{ //비동기처리
                // (3)맨 앞 li 맨 뒤로 이동
                slide.appendChild(eachOne[0]);
                // (4)슬라이드 left값 초기화
                slide.style.left = '0';
                // (5)트랜지션 없애기
                slide.style.transition = 'none';
            },400);
        // 잘라내서 붙이기! 위치값-100%만들기! 움직이기!
        }else{
            // (1)맨뒤 li 맨 앞으로 이동
            // 놈놈놈 ->insertBefore(넣을놈, 넣을놈전놈);
            slide.insertBefore(eachOne[eachOne.length-1],eachOne[0]);
            // (2)left값 -100%만들기(밖으로 나가서 안보이게) : 입장준비
            slide.style.left = '-100%'
            // (3)트랜지션 없애기
            slide.style.transition = 'none';
            // 같은 left값을 동시에 변경하면 효과가 없음
            setTimeout(()=>{// 비동기처리해야함
                // (4)left값 0으로 들어오기!
                slide.style.left = '0';
                // (5)트랜지션주기
                slide.style.transition = '.4s ease-in-out';
            },0);
        } ///////////if else //////////
    } //////////goSlide 함수 ///////////

} //////////////// loadFn 함수 ///////////////
/////////////////////////////////////////////
