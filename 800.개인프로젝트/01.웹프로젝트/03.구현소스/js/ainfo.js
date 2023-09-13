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
    // delay시간 지정상수
    const DELAY_TIME = .8;
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
            moveSpan[i].style.transitionDelay = i*DELAY_TIME + 's';
            moveSpan[i].style.opacity = 1;
        }
    }, 0);
    /*span태그 다 나온 후 배경과 이미지 이동하기*/
    setTimeout(()=>{
        // 1. 대상선정
        // 1-1. 변경대상 : .background-box
        const bgBox = domFn.qs('.background-box');

        // 2. 변경내용
        bgBox.style.transform = 'translateX(0)';
        bgBox.style.transitionDelay= DELAY_TIME*7 + 's';
    }, 0);
    /* 배경박스 나오고 글자 올라오기, 그림 움직이기 */
    setTimeout(()=>{
        // 1. 대상선정 : aside
        const infoAside = domFn.qs('.info-box aside');
        // 2. 변경내용 : 투명도 조절 1로
        infoAside.style.opacity = '1';
    }, 7500);
    /* 그림 움직이기 */ 
    setTimeout(()=>{
        // 1. 대상선정 : 재료박스 .intro-grad
        const gradBox = domFn.qs('.intro-grad');
        // 2. 변경내용 
        // 2-1. 위치이동(1회성)
        // 2-2. li 안쪽에서 계속 흐르기
        gradBox.style.transform = 'translateX(0)';
        
    }, 8000);

    // 대상선정 : .grad-list>ul>li가 왼쪽으로 움직임
    // appendClide 사용할 예정
    // 1. 대상 : .grad-list>ul>li
    let listUl = domFn.qs('.grad-list>ul');
    // console.log(listUl);
    // 2. 이벤트 선정 ( 시간에 따른 이벤트 )
    setInterval(() => {
        // scrollGrad();
        console.log('잠시멈춤')
    }, 20000);
    // 재료이미지 자동스크롤 함수
    function scrollGrad(){
        // 이미지 li 새로읽기
        let list = domFn.qsaEl(listUl,'.grad-list>ul>li');
        // 1. 트랜지션 주기
        listUl.style.transition= '1s';
        // 2. 이미지 이동
        listUl.style.left = '-100%';
        // -------
        setTimeout(() => {
            // 3. 트랜지션삭제
            listUl.style.transition = 'none';
            // 4. 이미지 뒤로 붙이기
            listUl.appendChild(list[0]);
            // 5. 위치값 원래대로
            listUl.style.left = "0";
            // -------
        }, 0);
    } ////////scrollGrad///////////
    //////////////////////////////////////////////////////
    ////////////////주문절차 on 넣고빼기 //////////////////
    // 주문절차 클릭 시 .process와 .bullet-box li에 on 넣기
    // 다른 목록 클릭 시 on 없애기
    // 화면이 나가면 on 없애기
    /////////////////////////////////////////////////////
    
    // 1. 대상선정
    // 1-1. 변경대상 : .process , .bullet-box li
    const process = domFn.qsa('.process');
    const bullet = domFn.qsa('.bullet-box li');
    console.log(process, bullet);
    // 2. 이벤트 선정
    // 2-1. 클릭이벤트 모든 대상을 돌면서 넣어야함
    process.forEach((ele)=>{
        domFn.addEvt(ele,'click',inputOn);
    });
    bullet.forEach((ele)=>{
        domFn.addEvt(ele,'click',inputOn);
    });
    
    // 2-2. 스크롤이벤트 스크롤이 벗어나면 모든 대상에 on제거

    // 3. 함수만들기
    // 3-1. on넣기 함수
    function inputOn(){
        // 인덱스 받아오기
        let idx = indexNum(this);
        console.log(idx);
        if(this.classList.contains('on')){
            // on이 있는 대상 누른경우 outOn()실행
            outOn();
        }else{
            outOn();
            // on이 없는 대상 on 주기
            bullet[idx].classList.add('on');
            process[idx].classList.add('on');
        }
    } ///////////inputOn///////////////
    // 3-2. on빼기 함수
    function outOn(){
        process.forEach(ele=>{
            ele.classList.remove('on');
        });
        bullet.forEach(ele=>{
            ele.classList.remove('on');
        }); 
    } ///////////outOn//////////////
    // 3-3. 순번검사
    function indexNum(child){
        let papaNode = child.parentElement;
        console.log(domFn.qsaEl(papaNode,'li'));
        // 순번검사용 n
        let n = 0;
        for(let x of domFn.qsaEl(papaNode,'li')){
            if(x == child){
                console.log('들어왔나?',n);
                return n;
            }else {
                console.log('실팬가?',n);
                n++;
            }
        }
    } /////////순번검사 indexNum//////////////
    
}///////////로드구역/////////////