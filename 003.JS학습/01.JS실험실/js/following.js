// 따라다니는 원 JS - following.js

// 1. 이벤트 등록하기
// 로드구역만들기

window.addEventListener('DOMContentLoaded',loadFn);

// 2. 함수만들기
// DOM 선택함수
const qs = x => document.querySelector(x);
const qsa = x => document.querySelectorAll(x);

// 2-1. 로드함수 //////
function loadFn(){
    // 함수 호출확인
    console.log('로딩완료!');

    // [1] html코드넣기 ///////////

    // 1. 대상선정
    // 변경대상 : .cont-box
    const cont_box = qs('.cont-box');
    
    // 2. html 태그 만들기
    // 50개 이미지 넣기
    let hcode = '';
    
    for(let i = 1; i<= 50; i++){
        hcode += `
        <div>
        <img src="../images/dress/${i}.jpg" alt="dress">
        <a href="#" class="link">이것은 너의 드레스야!</a>
        </div>
        `;
    } ////////// for /////////////

    // 3. 대상에 html 넣기
    cont_box.innerHTML = hcode;
    // 확인
    // console.log('hcode :',hcode);

    // [2] 따라다니는 원 세팅하기 ///////
    
    // 1. 대상선정
    // (1) 움직일 대상 : .mover
    const mover = qs('.mover');
    // (2) 이벤트 대상 : document.body
    const myBody = document.body;

    console.log('요소 :',myBody,mover);

    // 2. 이벤트 대상에 마우스 무브 이벤트가 적용될 때
    // 무버가 따라다니게 기능구현

    // 무버 크기의 절반 계산
    let gap = mover.clientWidth/2;
    // 선택요소의 크기 JS
    // width는 clientWidth, height는 clientHeight
    console.log('무버width:',gap);
    myBody.onmousemove = e => { // e-이벤트 전달변수
        // 위치값 출력
        // console.log('page:',e.pageX,'/',e.pageY);
        // 스크린 : 빛이 쏟아져나오는 화면기준 (Y값이 0이 안됨)
        // console.log('screen:',e.screenX,'/',e.screenY);
        // 옵셋 : 요소값 기준좌표
        // console.log('offset:',e.offsetX,'/',e.offsetY);
        // 클라이언트 : 브라우저 화면기준 (0,0 가능. 픽스드 기준값)
        // console.log('client:',e.clientX,'/',e.clientY);
    /*
    ★[[ 이벤트발생시 위치값 ]]★
    1. clientX, clientY
        -> 현재 보이는 브라우저 화면이 기준
        -> 화면을 기준한 fixed 포지션에서 주로 사용!
    2. offsetX, offsetY
        -> 이벤트 대상이 기준
        -> 특정박스가 부모자격박스로부터 위치를 사용 할 경우
    3. pageX, pageY
        -> 전체 문서를 기준(스크롤 화면을 포함)
        -> 화면을 기준한 absolute포지션에서 주로 사용!
    4. screenX, screenY
        -> 모니터 화면을 기준
    */
        // (1) 위치값 가져오기
        let posx = e.pageX - gap;
        let posy = e.pageY - gap;
        // let posy = e.clientY - gap;
        // -> 만약 .mover가 fixed 포지션이면 브라우저 
        // 화면에서의 위치인 clientY를 사용한다!

        // (2) 무버에 위치값 적용하기
        mover.style.top = posy + 'px';
        mover.style.left = posx + 'px';
    }; /////// onmousemove ////////

    // 이벤트 구역을 들어올때에만 보이기 / 나가면 숨기기
    myBody.onmouseenter = () => {
        mover.style.opacity = 1;
    } ///////// mouseenter ////////////
    myBody.onmouseleave = () => {
        mover.style.opacity = 0;
    } ///////// mouseleave ////////////

    // [3] a요소에 오버시 원 크게 만들기 /////
    // 대상 : .link
    const link = qsa('.link');
    console.log(link);

    // 한 번에 세팅하기
    // 너 몇번 아부지
    link.forEach(ele => {
        // a 요소에 마우스 들어올 때
        ele.onmouseenter = () => mover.style.transform = 'scale(2)';
        // a 요소에 마우스 나갈 때
        ele.onmouseleave = () => mover.style.transform = 'scale(1)';
    }); /////// forEach //////////

} ////////// loadFn ///////////////
