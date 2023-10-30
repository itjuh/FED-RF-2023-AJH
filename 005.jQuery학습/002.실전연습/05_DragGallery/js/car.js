// 자동차 360deg 회전 뷰 JS - car.js

$(()=>{
/***********************************************
    [ 박스에 드래그 하여 이미지 변경하기 ]
    ___________________________________
    
    원리 : 마우스 포인터 위치 중 x축 값만 이용하여
    처음 찍은 위치와 드래그 하여 마지막에 찍은 위치를
    비교하여 방향을 결정한 수 이전/다음 이미지를
    순서대로 넘겨서 자동차를 보여준다
***********************************************/
// 0. 이미지 세팅하기
// 0-1. 이미지 박스 대상: .cbx
const cbx = $('.cbx');
console.log(cbx);
// 0-2. 이미지 셋업하기 append prepend
for(let i = 1; i < 51; i++){
    cbx.append(`<img src='./360view/country${i}.jpg' alt='car'>`);
} ///////////for///////////////
// 0-3. 처음 이미지만 보이고 나머지 숨기기
// cbx.find('img').first().show().siblings().hide();
cbx.find('img').hide().first().show();

// 1. 변수 세팅하기
// 1-1. 드래그 상태변수 : 0-드래그 아님, 1-드래그중
let drag = 0;
// 1-2. 클릭 시 위치변수 : (드래그 시작점 - 실제 할당 값)
let clickPoint = 0;
// 이벤트가 너무 자주 발생하기 때문에 변수가 필요함
// 1-3. 이벤트 발생 횟수 조절 변수 : 0-허용, 1-불허용
let protectEvt = 0;
console.log(cbx.offset().top,cbx.width());
// 2. 드래그 이벤트 함수 설정하기
// - 이벤트 종류 : mousemove - touchmove
cbx.on('mousemove touchmove',e=>{
    // 0) 이벤트 횟수 줄이기
    // 광클금지와 원리가 동일
    if(protectEvt == 1) return;
    protectEvt = 1; // 이벤트 하나만 통과
    // 시간에 따라 이벤트 수를 조절 할 수 있다
    setTimeout(()=>{
        protectEvt = 0;
    },20);

    // 1) x축 위치값 가져오기 - DT:e.pageX MB:e.changedTouches[0]
    let pos = e.pageX || e.changedTouches[0].pageX; // 이벤트 발생하는 x축 위치계산
    // console.log(pos);
    
    // 2) 방향 알아내기
    // 계산방법 : 처음클릭위치(point변수) - 현재위치(pos변수)
    // 전제조건 : drag === 1 일때만
    if(drag){
        // 방향변수
        let dir = clickPoint - pos < 0 ? 0 : 1;
        // 현재방향은?
        console.log(dir?'왼':'오');
        // 이미지 넘김 함수 호출
        rotateCar(dir);
        // 마우스 무브에서 처음 위치값을 업데이트하면 드래그 상태일 때 그대로 방향을 설정할 수 있음
        clickPoint = e.pageX || e.changedTouches[0].pageX;
    } ///////////if/////////////
}); //////////mousemove 이벤트 /////////////

// 3. 드래그 상태 시작 이벤트 함수
// - 이벤트 종류 : mousedown - touchstart
cbx.on('mousedown touchstart',e=>{
    // 1) 드래그 상태값 변경
    drag = 1;
    // 2) 처음클릭위치(point변수) 업데이트
    // clickPoint = e.pageX || e.changedTouches[0].pageX;
    // 3) 그랩 손모양
    cbx.css({cursor:'grabbing'});
}); /////////mousedown 이벤트 /////////////

// 3. 드래그 상태 종료 이벤트 함수
// - 이벤트 종류 : mouseup - touchend
cbx.on('mouseup touchend mouseout',e=>{
    // 1) 드래그 상태값 변경
    drag = 0;
    // 2) 그랩 손모양 풀기
    cbx.css({cursor:'grab'});
}); /////////mousedown 이벤트 /////////////

// 이미지 순번 변수
let frameNum = 0;
// 이미지 박스의 이미지
const carImg = cbx.find('img');

// 4. 이미지 순번 변경 함수
const rotateCar = (dir)=>{ 
    // [ 1. frameNum 증감 전 숨기기: 현재이미지 ]
    // carImg.eq(frameNum).hide();
    
    // [ 2. 이미지 번호 증감처리 ]
    // 1) dir가 1: 오른쪽 회전, 사진번호 증가
    if(dir){
        frameNum++;
        // 이미지 순번 마지막번호 처리
        if(frameNum == 50) frameNum = 0;
    }
    // 2) dir가 0: 왼쪽 회전, 사진번호 감소
    else {
        frameNum--;
        // 이미지 순번 첫번호 처리
        if(frameNum < 0) frameNum = 49;

    } ////////if else///////////////
    console.log('순번',frameNum);

    // (다른방볍 : 위에서 증감전 숨기기 안하고 아래에서 하기)
    cbx.find('img:visible').hide();
    // 선택요소:visible은 display:none이 아닌 요소 선택 함
    // 선택요소:hidden 은 display:none인 요소 선택 함
    // [ 3. frameNum 증감 후 다음 이미지 보이기 ]
    carImg.eq(frameNum).show();
}; ///////// rotateCar함수 //////////////

}) ///////////JQB//////////////////////