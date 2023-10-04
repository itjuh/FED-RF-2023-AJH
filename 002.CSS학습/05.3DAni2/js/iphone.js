/* 움직이는 폰 + 무한글자이동 JS - iphone.js */

//DOM 메서드
import dFn from "./dom.js";

/************************************* 
    [ 아이폰 영역오버시 회전기능 ]
    1. 화면에 10등분된 투명 영역을 구현
    2. 이 영역이 이벤트 대상이 됨
    3. 오버시 변경대상인 아이폰에 회전값 변경
    4. 트랜지션으로 애니메이션 설정적용!
    5. 애니메이션 후에 이벤트박스를 보이게함
    (최초 width:0 -> width:100vw)
*************************************/

// 0. 데이터 세팅 : x,y축 회전각도를 배열에 세팅
const iDeg = [
    // 상단
    [30,-40,"Patty Bouvier.png","Coral"],
    [30,-20,"Ruth-Powers.png","Darkorange"],
    [30,0,"simpson.png","Salmon"],
    [30,20,"Moe Szyslak.png","Sandybrown"],
    [30,40,"Mona-Simpson.png","Yellowgreen"],
    // 중간
    [0,-40,"Bart_Simpson.png","Mediumaquamarine"],
    [0,-20,"Artie-Ziff.png","Darkseagreen"],
    [0,0,"Maggie_Simpson.png","Cornflowerblue"],
    [0,20,"Marge_Simpson.png","Dodgerblue"],
    [0,40,"Lindsey-Naegle.png","Royalblue"],
    // 하단
    [-30,-40,"Jacqueline-Bouvier.png","Steelblue"],
    [-30,-20,"Julio-Franco.png","Slateblue"],
    [-30,0,"Selma-Bouvier.png","Mediumpurple"],
    [-30,20,"Lisa_Simpson.png","Blueviolet"],
    [-30,40,"Ralph Wiggum.png","Orangered"],
];

// 이벤트 박스에 속박스 넣기
const eBox = dFn.qs('.evt-box');
eBox.innerHTML = '';
for(let i = 0; i<15; i++){
    eBox.innerHTML += '<div></div>';
}

// 1. 대상선정
// 1-1. 이벤트 대상: .evt-box div
const evtBox = dFn.qsa('.evt-box div');
// 1-2. 변경대상 : .iphone
const iphone = dFn.qs('.iphone');
console.log(evtBox, iphone);
// 1-3. 변경대상2 : .screen
const screen = dFn.qs('.screen');
// 대상 : .pointer
const pointer = dFn.qs('.pointer');

// 2. 이벤트 설정 : 이벤트 종류 - mouseenter(경계선 안으로 들어옴)
evtBox.forEach((ele,idx)=>dFn.addEvt(ele,'mouseenter',()=>seeMe(idx)));

// 3. 함수만들기
function seeMe(idx){
    // console.log('함수호출됨',idx,event.currentTarget);

    // 1. 변경 적용하기 : 대상  - iphone
    // 각도 변경하기
    iphone.style.transform = `rotateX(${iDeg[idx][0]}deg) rotateY(${iDeg[idx][1]}deg)`;
    // 트랜지션 변경하기
    iphone.style.transition = '.4s ease-out';

    // 2. 두번째 변경 적용하기 : 앞면 이미지 
    screen.style.backgroundImage = `url("./images/${iDeg[idx][2]}")`;
    screen.style.backgroundColor = '#fff';

    // 3. 세번째 변경 : 포인터 색상
    let ranNum = Math.floor(Math.random() * iDeg.length);
    pointer.style.backgroundColor = `${iDeg[ranNum][3]}`;
    if(idx == 7){
        pointer.style.transform = 'scale(2)';
        pointer.style.opacity = '0.5';
    }else{
        pointer.style.transform = 'scale(1)';
        pointer.style.opacity = '1';
    }
} /////////seeMe 함수 ////////////

// 이벤트 구역 5초 후에 등장(대기1초 회전3초)

setTimeout(()=>{
    eBox.style.width = "100vw";
    pointer.style.display = "block";
},5000)


// 대상 : .evt-box ->eBox변수
dFn.addEvt(eBox,'mouseenter',()=>{
    // console.log('마우스 포인터 변경');
    eBox.style.cursor = "crosshair";
});

/*
[ 마우스 오버/아웃 관련 이벤트 차이점 ]
1. mouseover / mouseout : 요소 자체를 기준
2. mouseenter / mouseleave : 요소 경계선을 기준
-> 둘의 차이는 이벤트 버블링에 있다.
-> 경계선 기준의 이벤트인 mouseenter / mouseleave는
자체요소에서만 발생하고 버블링 되지 않는다.
-> 자손요소에서 버블링되어 발생하는 mouseover/mouseout으로
셋팅 할 경우 빈번한 이벤트 발생이 문제가 될 수 있음
이때는 mouseenter / mouseleave를 사용 할 것을 w3c가 권고함!

*/
// 마우스 포인터 변경하기
dFn.addEvt(eBox,'mousemove',(e)=>{
    // console.log(e.offsetX,e.offsetY);
    // console.log(pointer);
    pointer.style.left = e.pageX - 25 + 'px';
    pointer.style.top = e.pageY - 25 + 'px';
});


/*

////////////////////////////////////////////
// 마우스 포인터 변경하기! ///////////////////
// 대상: .evt-box -> eBox변수

dFn.addEvt(eBox,'mouseenter',function(){
    console.log('마우스 포인터바뀜');
    // 1. 이 박스범위안에서 커서 없애기
    this.style.cursor = 'none';  

    // 2. 커서박스 읽어와서 셋팅하기
    let cursorImg = dFn.qs('.cursor-box');
    cursorImg.style.position = 'fixed';
    cursorImg.style.width = '150px';
    cursorImg.style.height = '250px';
    cursorImg.style.background = 
    'url(./images/capma.png) no-repeat 0/100% 100%';


    // 3.이 박스 범위에서 mousemove이벤트 발생시 커서 위치이동셋팅
    dFn.addEvt(this,'mousemove',(e)=>{
        cursorImg.style.top = e.pageY + 'px';
        cursorImg.style.left = e.pageX + 'px';
    });
    
}); /////////////// mouseenter 함수 ////////////

*/

