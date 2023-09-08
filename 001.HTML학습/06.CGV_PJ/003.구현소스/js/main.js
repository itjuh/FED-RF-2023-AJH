// CGV PJ 메인 페이지 JS - main.js


// DOM함수 객체
const domFn = {
    // 요소선택함수 ////////
    qs : (x) => document.querySelector(x),
    qsEl : (el,x) => el.querySelector(x),
    qsa : (x) => document.querySelectorAll(x),
    qsaEl : (el,x) => el.querySelectorAll(x),
    // 이벤트 세팅함수 ///////
    addEvt : (ele,evt,fn) => ele.addEventListener(evt,fn),
} ////////////domFn객체 /////////////////

// 호출하기
// domFn.qs()

// [ 포스터 메뉴를 클릭하여 메인 유튜브 이미지를 변경한다 ]
// 1. 대상
// 1-1. 이벤트 대상 : .poster-menu a
const pmenu = domFn.qsa('.poster-menu a');
// 1-2. 변경 대상 : .screen
const screen = domFn.qs('.screen');
// 1-3. 변경 대상2 : 포스터메뉴
const mlist = domFn.qsa('.poster-menu>ul>li');
// 대상확인
// console.log('대상 : ',pmenu,screen);

// 2. 데이터 생성하기
// 각 영화별 아이디 객체 만들기
const mvCode = {
    '닥터스트레인지2':'mI9oyFMUlfg',
    '쥬라기월드:도미니언':'DSEfRVqjbFA',
    '브로커':'DpVAb7Bi5UQ',
    '범죄도시2':'aw9j_23nORs',
    '몬스터싱어':'ELuQ4sMp4yw',
    '스파이더맨:노웨이홈':'W7edvITC9g4',
}

// 3. 이벤트 대상에 함수 만들기
// 이벤트 대상에 클릭 설정하여 함수 연결하기
pmenu.forEach(ele=>{
    domFn.addEvt(ele,'click',(e)=>{
        // let me = e.currentTarget;
        // target ->누른대상인 info정보가 나옴

        // console.log('나야나', e.currentTarget, domFn.qsEl(ele,'li')); 
        //ele는 pmenu를 돌면서 가져오는 객체 자신

        // 1. 클릭 된 a 요소 하위 영화제목정보 읽어오기
        let mtit = domFn.qsEl(ele,'li').innerText;
        console.log(mtit, mvCode[mtit], ele.parentElement);
        // 2. 스크린 박스에 아이프레임 src 재구성하여 넣기
        screen.innerHTML = `
            <iframe src="https://www.youtube.com/embed/${mvCode[mtit]}?autoplay=1"
             allow="autoplay"></iframe>
        `;
        // 3. 추가구현 : 클릭 된 a요소의 부모인 li의 클래스에 on주기
        // - on을 주면 미리 세팅 된 대로 li가 일어나 있다.
        // 3-1. li요소에 클래스 on 초기화
        mlist.forEach(ele=>ele.classList.remove('on'));
        ele.parentElement.classList.add('on');
        // 3-2. 해당 li요소에 클래스 on넣기
    });
}); /////////forEach//////////////////