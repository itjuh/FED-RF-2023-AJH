// JS실험실 : 10.드래그배너 JS - drag_banner.js

// DOM 메서드
import dFn from './dom.js';

// console.log(dFn);


// 슬라이드 대상 요소 :.banbx
const banBox = dFn.qsa('.banbx');
console.log('슬라이드 대상:',banBox);
// 슬라이드만큼 모두 호출하기
banBox.forEach((ele,idx)=>{
  // 배너 슬라이드 셋업 먼저!
  if(idx==0){
    let hcode = ``;
    for(let i = 0; i < 13; i++){
      hcode += `
        <li><img src='./images/img_nav06/ban${i+1}.png' alt='slide'></li>
      `;
    }
    dFn.qsEl(ele, '.slide').innerHTML = hcode;

  } //////////////if//////////////
  // 슬라이드함수 호출하기
  slideFn(ele);
});////////forEach/////////

/***************************************************** 
[ 슬라이드 이동 기능정의 ]
1. 이벤트 종류: click
2. 이벤트 대상: 이동버튼(.abtn)
3. 변경 대상: 슬라이드 박스(.slide)
4. 기능 설계:

    (1) 오른쪽 버튼 클릭시 다음 슬라이드가
        나타나도록 슬라이드 박스의 left값을
        -330%로 변경시킨다.
        -> 슬라이드 이동후!!! 
        바깥에 나가있는 첫번째 슬라이드
        li를 잘라서 맨뒤로 보낸다!
        동시에 left값을 -220%으로 변경한다!

    (2) 왼쪽버튼 클릭시 이전 슬라이드가
        나타나도록 하기위해 우선 맨뒤 li를
        맨앞으로 이동하고 동시에 left값을
        -330%로 변경한다.
        그 후 left값을 -220%으로 애니메이션하여
        슬라이드가 왼쪽에서 들어온다.

    (3) 공통기능: 슬라이드 위치표시 블릿
        - 블릿 대상: .indic li
        - 변경 내용: 슬라이드 순번과 같은 순번의
        li에 클래스 "on"주기(나머진 빼기->초기화!)

*****************************************************/

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
            <img src="images/img_nav06/dot1.png" alt="흰색">
            <img src="images/img_nav06/dot2.png" alt="회색">
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
        if(isRight){ // 오른쪽 버튼
            rightSlide();
        }else{ // 왼쪽 버튼 
            // (1)맨뒤 li 맨 앞으로 이동
            // 놈놈놈 ->insertBefore(넣을놈, 넣을놈전놈);
            slide.insertBefore(eachOne[eachOne.length-1],eachOne[0]);
            // (2)left값 -330%만들기(밖으로 나가서 안보이게) : 입장준비
            // slide.style.left = '-330%'
            // 슬라이드 부모로 가서 크기의 3.3배 왼쪽이동
            slide.style.left =
            -(slide.parentElement.clientWidth*3.3-rx)+'px';
            // -rx 는 드래그한 위치값만큼 보정
            // rx는 이동후에는 rx=0으로 초기화해야 버튼 클릭 시 정상작동
            console.log(rx);
            // (3)트랜지션 없애기
            slide.style.transition = 'none';
            // 같은 left값을 동시에 변경하면 효과가 없음
            setTimeout(()=>{// 비동기처리해야함
                // (4)left값 0으로 들어오기!
                slide.style.left = '-220%';
                // (5)트랜지션주기
                slide.style.transition = TIME_SLIDE+'ms ease-out';
                // (6)드래그 보정값 초기화
                rx=0;
            },0);
        } ///////////if else //////////
        // 4. 슬라이드 순번과 일치하는 불릿에 클래스 넣기 함수호출
        chgIndic(isRight); // 보낼 때 방향 값 보내주기

        // 5. 자동넘김 멈춤함수 호출하기
        // clearAutoI();
        
    } //////////goSlide 함수 ///////////

    // 불릿변경 함수 /////////////////////////
    function chgIndic(isRight){ //함수에게 방향을 알려주면 됨(0-왼쪽,1-오른쪽)
        // [ 슬라이드 순번과 일치하는 불릿에 클래스 넣기 ]
        // 대상 : .indic li -> indic변수
        // 맨 앞 슬라이드 li의 'data-seq' 값 읽어오기
        // isRight값이 true이면 오른쪽버튼! 순번은 [1]
        // isRight값이 false이면 왼쪽버튼~ 순번은 [0]
        // 먼저 잘라내고 이동하는 것으로 통일 했으므로
        // 순번은 항상 0번
        let nowSeq = slide.querySelectorAll('li')[0].getAttribute('data-seq');
        // let nowSeq = slide.querySelectorAll('li')[isRight?1:0].getAttribute('data-seq');
        console.log('현재슬라이드',nowSeq);
        // 해당순번 블릿에 .on넣기
        // 블릿 전체 순회시 해당 순번은 on넣고 나머지는 on 빼기
        indic.forEach((ele,idx)=>{
            if(idx==nowSeq) ele.classList.add('on');
            else ele.classList.remove('on');
        }); //////////forEach//////////////
    } /////////////chgIndic 함수 ////////////

    // 슬라이드 오른쪽 방향 넘기기 함수
    function rightSlide(){
      // 1. 슬라이드 이동 전 먼저 잘라낸다!
      // 이유 : 슬라이드 순서를 왼쪽이동과 같아지게 한다.
      // 1. 슬라이드 li 새로읽기 변수(배열형)
      let eachOne = slide.querySelectorAll('li');
      // (3)맨 앞 li 맨 뒤로 이동
      slide.appendChild(eachOne[0]);
      // (4)슬라이드 left값 -110%
      slide.style.left = -(slide.parentElement.clientWidth*1.1-rx)+'px';
      // (5)트랜지션 없애기
      slide.style.transition = 'none';
      // 잘라내서 붙이기! 위치값-100%만들기! 움직이기!
      // appendChild(요소);
      setTimeout(()=>{ //비동기처리
        // (1)슬라이드 left값 초기화
        slide.style.left = '-220%';
        // (2)트랜지션주기
        slide.style.transition = TIME_SLIDE+'ms ease-out';
        // 이동시간 후 맨 앞 li 잘라서 맨 뒤로 이동하기
        rx = 0;
        },0);
    } /////////rightSlide 함수 //////////////


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
    // slideAuto();
    
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

/***************************************************
    [ 드래그 다중적용 함수 만들기 ]
    함수명 : goDrag
    기능 : 다중 드래그 기능 적용
***************************************************/
// 드래그 적용 이벤트 설정하기
// 1. 대상선정 : .dtg는 .slide와 일치함!
const dtg = dFn.qsa(".dtg");
// 2. 드래그 설정하기
dtg.forEach(ele=>goDrag(ele));
// (5) 위치이동 차이 : result x, result y
let rx=0, ry=0;

function goDrag(ele) {
  // ele - 드래그 대상요소
  // 1. 변수 세팅
  // (1) 드래그 상태변수 : true 드래그중, false 드래그아님
  let drag = false;
  // (2) 첫번째 위치 포인트 : first x, first y
  let fx , fy;
  // (3) 마지막 위치 포인트 : last x, last y
  // 마지막 위치가 슬라이드 최초 left위치값으로 읽어옴
  let lx = ele.offsetLeft,
   ly = 0;
  // -> 마지막 위치로부터 처음 작동하므로 초기값 0 세팅
  // (4) 움직일 때 위치 포인트 : move x, move y
  let mvx, mvy;
  // (5) 위치이동 차이 : result x, result y
  // let rx, ry; -> 위치이동 차이값은 왼쪽슬라이드 오른쪽 이동 시 보정값으로 
  // 슬라이드 이동 파트에서도 써야하므로 함수 바깥에 선언해줌


  // 2. 함수만들기
  // (1) 드래그 상태 true로 변경함수
  const dTrue = () => (drag = true);
  // (2) 드래스 상태 false로 변경함수
  const dFalse = () => (drag = false);
  // (3) 드래그 움직일 때 작동함수
  const dMove = (e) => {
    // console.log("드래그상태:", drag);

    // 드래그 상태일때만 실행
    if (drag) {
      // 0. 슬라이드 드래그 상태일때는 트랜지션을 없앰
      ele.style.transition = 'none';
      // 1. 드래그 상태에서 움직일 때 위치값
      // pageX,pageY는 일반 브라우저용
      // touches[0].screenX, touches[0].screenY는 터치스크린용
      mvx = e.pageX || e.touches[0].screenX;
    //   mvy = e.pageY || e.touches[0].screenY;

      // 2. 움직일때 위치값 - 처음 위치값 : rx, ry
      // x축 값은 left값
      // y축 값은 top값
      rx = mvx - fx;
    //   ry = mvy - fy;
      // 순수하게 움직인 거리를 계산!! -> 가장 중요한 핵심

      // 3. x, y 움직인 위치 값을 타겟 요소에 적용!
      // 움직일 대상 ele
      ele.style.left = (rx+lx)+'px';
    //   ele.style.top = (ry+ly)+'px';
      // 한번 드래그 후 다시 드래그 시 움직인 위치값이 필요함!
      // -> 마지막 위치값 저장 필요
      // -> 항상 최종 위치에서 움직인 위치를 더한다~

      // 4. z-index값을 드래그 대상만 높여주고 나머지는 지움
      dtg.forEach(ele=>ele.style.zIndex = 0);
      ele.style.zIndex = 1;

      // 값 확인
    //   console.log(`fx:${fx} | fy:${fy}`);
    //   console.log(`mvx:${mvx} | mvy:${mvy}`);
    //   console.log(`rx:${rx} | ry:${ry}`);
    //   console.log(`lx:${lx} | ly:${ly}`);
    } //// if /////
    // 커서 편손/쥔손 상태 변경
    ele.style.cursor = drag?"grabbing":'grab';
  }; ////////dMove변수에 익명함수 할당////////////////

  // (4) 첫번째 위치 포인트 세팅함수 : fx, fy
  const firstPoint = (e) => { //요소자신이 호출하는 것이 아니라서 이벤트가 전달이 안됨
    fx = e.pageX || e.touches[0].screenX;
    // fy = e.pageY || e.touches[0].screenY;
    // console.log('첫포인트:',fx,"|",fy);
  }; ///////firstPoint변수에 익명함수 할당 ////////////

  // (5) 마지막 위치 포인트 세팅함수 : lx, ly
  const lastPoint = () => {
    // 움직일 때 위치값을 기존 값에 계속 더함
    // 마지막 포인트는 위치이동 차이를 계속 업데이트
    lx += rx;
    // ly += ry;
    // console.log('마지막포인트:',lx,"|",ly);
  }; //////lastPoint변수에 익명함수 할당 //////////////
  // 3. 이벤트 등록하기
  // 대상 : 호출 시 보내준 파라미터요소 : ele
  // (1) 마우스 내려갈 때 : 드래그 true + 첫번째 위치값 업데이트
  dFn.addEvt(ele, "mousedown", (e) => {
    // 드래그상태 업데이트
    dTrue();
    // 첫번째 위치 세팅 : 
    // firstPoint함수에 이벤트가 직접적으로 발생하지 않으므로 
    // 이벤트를 전달해야함
    firstPoint(e);
  });
  // (1-2) 모바일
  dFn.addEvt(ele, "touchstart", (e) => {
    // 드래그상태 업데이트
    dTrue();
    // 첫번째 위치 세팅
    firstPoint(e);
  });
  // (2) 마우스 올라갈 때 : 드래그 false + 마지막 위치값 업데이트
  dFn.addEvt(ele, "mouseup", () => {
    // 드래그상태 업데이트
    dFalse();

    // 마지막 위치 세팅
    // lastPoint(); 
    /* 슬라이드 드래그는 마지막 위치 업데이트가 불필요
     why? 자유 드래그는 멈춘 위치에서 다시 움직여야함. 
     but, 슬라이드는 마지막에 항상 특정 위치에 가 있기 때문
     그리고 중간에 업데이트를 하면 슬라이드가 튐
    */
    //드래그 이동 판별함수 호출 : ele -> 선택한 슬라이드
    goWhere(ele);
  });
  // (2-2) 모바일
  dFn.addEvt(ele, "touchend", () => {
    // 드래그상태 업데이트
    dFalse();

    // 마지막 위치 세팅
    // lastPoint(); 
    /* 슬라이드 드래그는 마지막 위치 업데이트가 불필요
     why? 자유 드래그는 멈춘 위치에서 다시 움직여야함. 
     but, 슬라이드는 마지막에 항상 특정 위치에 가 있기 때문
     그리고 중간에 업데이트를 하면 슬라이드가 튐
    */
    //드래그 이동 판별함수 호출 : ele -> 선택한 슬라이드
    goWhere(ele);
  });
  // (3) 마우스 움직일 때 : 움직일 때 처리함수 dMove실행
  dFn.addEvt(ele, "mousemove", dMove);
  // (3-2) 모바일
  dFn.addEvt(ele, "touchmove", dMove);
  // (4) 마우스 벗어날 때 : 드래그상태 false
  // (마우스가 벗어나서 mouseup 됐을때 인식을 못하는 문제를 해결)
  dFn.addEvt(ele, "mouseleave", dFalse);

} /////////////////goDrag함수////////////////////////


/*****************************************************
    함수명 : goWhere
    기능 : 드래그 시 왼쪽/오른쪽 이동 판별
    호출 : 드래그 시 mouseup/touchend 이벤트에서 호출
*****************************************************/
function goWhere(target){ // target은 드래그 대상
    // 1. 현재 드래그 대상 left 위치값
    let tgLeft = target.offsetLeft;
    
    // 2. 기준위치값 : 부모박스를 기준한 -220%의 left 위치값
    let pointLeft = target.parentElement.clientWidth * 2.2;
    // parentElement 상위부모요소 이동
    // clientWidth 박스크기 가로값
    // console.log('target의 left 위치값: ',tgLeft,'\n 기준 left, pointLeft 위치값: ',-pointLeft);

    // 3. 방향 판별하기 : 기준값에 특정값을 더하고 뻄
    // 3-1. 왼쪽 방향 이동(오른쪽버튼 클릭과 동일하게 이동)
    if(tgLeft < -pointLeft - 50){ // 50px로 기준값 정하기
        console.log('왼쪽으로 이동!');
        // 오른쪽버튼 클릭이벤트 발생하기
        // 상대적으로 현재 위치에서 판별하기
        // console.log(dFn.qsEl(target.parentElement,'.ab2'));
        dFn.qsEl(target.parentElement,'.ab2').click();
    }// 3-2. 오른쪽 방향 이동(왼쪽버튼 클릭과 동일하게 이동)
    else if(tgLeft > -pointLeft + 50 ){
        console.log('오른쪽으로 이동!');
        dFn.qsEl(target.parentElement,'.ab1').click();
    }// 3-3. 이동값이 작으면 제자리로
    else{
        console.log('제자리로!');
        target.style.left = '-220%';
        target.style.transition = 'left .2s ease-out';
    }////////////////if/////////////////////

} /////////////goWhere 함수 /////////////////////


// 화면 리사이즈시 페이지 리로드하기
dFn.addEvt(window,'resize',()=>location.reload());