// 쇼핑몰 배너 JS - 01.가로방향 배너 슬라이드 //

// DOM모듈함수 호출
import dFn from "./dom.js";

// 슬라이드 대상 요소 :.banbx
const banBox = dFn.qsa('.banbx');
console.log('슬라이드 대상:',banBox);
// 슬라이드만큼 모두 호출하기
banBox.forEach(ele=>slideFn(ele));////////forEach/////////

/****************************************** 
 함수명: slideFn
 기능: 로딩 후 버튼 이벤트 및 기능구현
 ******************************************/
function slideFn(selEl) { //selEl은 선택 된 슬라이드 부모 요소

    console.log("슬라이드 호출 확인!");
    // 0. 변수구역//////////////////
    // 0-1. 광클금지 상태변수 : 0-허용, 1-불허용
    let clickSts = 0;
    // 0-2. 슬라이드 이동시간 : 상수설정
    const TIME_SLIDE = 400;

    // 1. 대상선정
    // 1-1. 슬라이드 부모요소 : 전달 된 선택요소 -> selEl
    const sldWrap = selEl; //DOM요소를 직접 받음
    // 1-2. 변경대상: 선택요소 하위 .slide
    const slide = dFn.qsEl(sldWrap,'.slide');
    // 1-3. 이벤트 대상: 전달 슬라이드 하위 .abtn
    const abtn = dFn.qsaEl(sldWrap,'.abtn');
    // 1-4. 블릿박스 대상 : 전달 슬라이드 하위 .indic
    let indic = dFn.qsEl(sldWrap,'.indic'); //li에 on을 줘서 이미지를 바꿀생각
    // 대상확인
    console.log('대상',abtn,'/ 대상',slide,'/ 대상',indic);

    // 1.5. 슬라이드 개수와 동일한 블릿 동적생성
    // 대상 : .indic -> indic변수
    // 슬라이드 개수변수
    let slideLength = dFn.qsaEl(slide,'li').length;
    for(let i=0; i < slideLength; i++){
        indic.innerHTML += `
        <li ${i==0?'class="on"':""}>
            <img src="images/dot1.png" alt="흰색">
            <img src="images/dot2.png" alt="회색">
        </li>
        `;
    } /////////for문///////////////

    // 블릿 li 재선택 할당하기
    indic = dFn.qsaEl(sldWrap,'.indic li');

    // li 리스트에 순번속성 만들기!!
    // 만드는 이유(불릿변경에 현재 슬라이드 순번이 필요)
    // 사용자 정의 속성은 반드시 data-로 시작해야함(W3C규칙)
    // data-seq로 순번속성을 넣을것임
    slide.querySelectorAll('li').forEach((ele,idx)=>{
        ele.setAttribute('data-seq',idx);
    });
    // setAttribute('속성명','속성값');


    // 2. 이벤트 설정
    // 버튼요소들 클릭 시 transform
    abtn.forEach(ele=>dFn.addEvt(ele,'click',goSlide));
    // addEvt(abtn,'click',goSlide);
    // 3. 함수만들기
    function goSlide(){
        
        // a요소 기본이동 막기
        event.preventDefault();

        // 광클금지
        if(clickSts) return;//나가기
        clickSts=1;//잠금
        setTimeout(()=>clickSts=0,TIME_SLIDE);//해제!

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
            rightSlide();
        }else{
            // (1)맨뒤 li 맨 앞으로 이동
            // 놈놈놈 ->insertBefore(넣을놈, 넣을놈전놈);
            slide.insertBefore(eachOne[eachOne.length-1],eachOne[0]);
            // (2)left값 -330%만들기(밖으로 나가서 안보이게) : 입장준비
            slide.style.left = '-330%'
            // (3)트랜지션 없애기
            slide.style.transition = 'none';
            // 같은 left값을 동시에 변경하면 효과가 없음
            setTimeout(()=>{// 비동기처리해야함
                // (4)left값 0으로 들어오기!
                slide.style.left = '-220%';
                // (5)트랜지션주기
                slide.style.transition = '.4s ease-in-out';
            },0);
        } ///////////if else //////////
        // 4. 슬라이드 순번과 일치하는 불릿에 클래스 넣기 함수호출
        chgIndic(isRight); // 보낼 때 방향 값 보내주기

        // 5. 자동넘김 멈춤함수 호출하기
        clearAutoI();
        
    } //////////goSlide 함수 ///////////

    // 슬라이드 오른쪽 방향 넘기기 함수
    function rightSlide(){
        // 1. 슬라이드 li 새로읽기 변수(배열형)
        let eachOne = slide.querySelectorAll('li');
        // (1)대상이동하기
        slide.style.left = '-330%';
        // (2)트랜지션주기
        slide.style.transition = TIME_SLIDE+'ms ease-in-out';
        // 이동시간 후 맨 앞 li 잘라서 맨 뒤로 이동하기
        // appendChild(요소);
        setTimeout(()=>{ //비동기처리
            // (3)맨 앞 li 맨 뒤로 이동
            slide.appendChild(eachOne[0]);
            // (4)슬라이드 left값 초기화
            slide.style.left = '-220%';
            // (5)트랜지션 없애기
            slide.style.transition = 'none';
            // 잘라내서 붙이기! 위치값-100%만들기! 움직이기!
        },TIME_SLIDE);
    } /////////rightSlide 함수 //////////////

    // 불릿변경 함수 /////////////////////////
    function chgIndic(isRight){ //함수에게 방향을 알려주면 됨(0-왼쪽,1-오른쪽)
        // [ 슬라이드 순번과 일치하는 불릿에 클래스 넣기 ]
        // 대상 : .indic li -> indic변수
        // 맨 앞 슬라이드 li의 'data-seq' 값 읽어오기
        // isRight값이 true이면 오른쪽버튼! 순번은 [1]
        // ->> 
        // isRight값이 false이면 왼쪽버튼~ 순번은 [0]
        // ->> 
        let nowSeq = slide.querySelectorAll('li')[isRight?1:0].getAttribute('data-seq');
        console.log('현재슬라이드',nowSeq);
        // 해당순번 블릿에 .on넣기
        // 블릿 전체 순회시 해당 순번은 on넣고 나머지는 on 빼기
        indic.forEach((ele,idx)=>{
            if(idx==nowSeq) ele.classList.add('on');
            else ele.classList.remove('on');
        }); //////////forEach//////////////
    } /////////////chgIndic 함수 ////////////

    /***********************************************
        자동넘기기 기능 구현
        -> 일정시간 간격으로 오른쪽 버튼 클릭
        -> 사용JS내장함수는 : setInterval()
        -> 버튼 클릭 실행 메서드 : click()
        -> 대상 : 오른쪽버튼 .ab2 -> abtn[1]
    ***********************************************/ 

    // 인터발변수
    let autoI;
    // 인터발 타이밍 함수를 변수에 할당 후 
    // clearInterval(할당변수) 해야 멈출 수 있다!

    // 타임아웃 변수
    let autoT;
    // 인터발 타임아웃 함수도 clearTimeout(할당변수)해야 
    // 실행쓰나미를 막을 수 있다

    //자동으로 넘기기 함수//////////////
    function slideAuto(){
        autoI = setInterval(() => {
            // 오른쪽 이동 슬라이드 함수 호출
            rightSlide();
            // 불릿변경 함수 호출(오른쪽은 1)
            chgIndic(1);
            // 오른쪽 버튼 클릭이벤트 강제 발생
            // 선택요소.click() ->요소를 클릭시킨다
            // abtn[1].click();
        }, 3000);
    } ///////////// slideAuto함수 ////////////////
    
    // 인터벌함수 최소호출
    slideAuto();
    
    // 버튼을 클릭 할 경우 자동넘김을 멈춰준다.
    function clearAutoI(){
        // 함수호출
        console.log('멈춤!');
        // 1. 인터발 지우기
        // setInterval() 지우는 법 clearInterval(인터벌 할당함수)
        clearInterval(autoI);
        // 2. 타임아웃 지우기(재실행 호출 쓰나미 방지)
        clearTimeout(autoT);
        // 3. 일정 시간 후 다시 인터벌함수 호출하기
        autoT = setTimeout(slideAuto,5000);
        // 5초 후 interval재실행은 1번만 남음
    } //////////// clearAutoI함수 //////////////

} //////////////// loadFn 함수 ///////////////
/////////////////////////////////////////////