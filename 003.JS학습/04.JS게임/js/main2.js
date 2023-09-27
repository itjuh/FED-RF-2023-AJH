// Racing2 PJ 메인 JS - main.js

// DOM메서드 모듈
import domFn from "./dom.js";

// 메세지 제이슨 불러오기
import msgTxt from "./data_racing.json" assert { type: "json" };

/********************************************** 
            [ 게임 기능정의 ]
    _________________________________

    1. 게임룰: 거북버튼 클릭하여 거북을
        왼쪽에서 오른쪽으로 이동함
        이때 토끼는 자동으로 이동하여
        결승선에 먼저 도달하는 레이서가 승리함
    2. 토끼의 이동속도는 레벨로 설정함
    3. 결승선 도착은 둘 중 하나가 먼저
        도착할 경우 판별함수에서 결과를
        화면에 출력한다.
    4. 포커스가 버튼에 갈 경우 마우스가
        아닌 키보드 버튼으로 조작할 수 없게함
        (마우스만 사용하도록 함!)
    5. 기본적으로 거북이동버튼 클릭시
        토끼는 자동으롤 작동됨!
    6. 토끼이동버튼은 토끼만 미리 작동가능
    7. 처음으로 버튼은 전체를 리셋함
**********************************************/

// 1. 대상선정 ///////////////////
// (1) 거북 : #t1
const t1 = domFn.qs("#t1");
// (2) 토끼 : #r1
const r1 = domFn.qs("#r1");

// (3) 버튼 : #btns a
const btns = domFn.qsa("#btns a");
// (4) 레벨 : #level
const level = domFn.qs("#level");
// (5) 메시지박스 : #msg
const msgBox = domFn.qs("#msg");
// (6) 토끼, 거북 위치값 변수
let t1Pos = 0,
  r1Pos = 0;

// 인터발 변수
let autoI;
// 토끼위치 : r1pos / 거북위치 : t1pos

// cg(msg);

// 2. 이벤트 설정하기 ////////////
// 대상: 버튼들 - btns변수
btns.forEach((ele) => {
  domFn.addEvt(ele, "click", startFn);
});

/*********************************** 
    함수명: startFn
    기능: 토끼 거북이 자동이동(인터발함수)
***********************************/
function startFn() {
  if (this.innerText == "시작") {
    if (!autoI) {
      //autuI가 처음 클릭 될 때만
      //인터발 함수 실행
      goAuto();
      
    }
    // 게임종료
    if (r1Pos >= 1400 || t1Pos >= 1400) {
      clearInterval(autoI);
      // 메세지 업데이트

      // 메세지창 보이기
      msgBox.style.display = block;
    }
  } else if (this.innerText == "처음으로") {
    // 처음으로 버튼
    // 페이지 리로드하기
    location.reload();
  } else if (this.innerText == "응원하기") {
    if(!t1Stop){
        if (level.value == "거북") {
            t1.classList.add('sel');
            r1.classList.remove('sel');
        } else {
            r1.classList.add('sel');
            t1.classList.remove('sel');
        }
    }
  }
}

/*********************************** 
    함수명: goAuto
    기능: 자동이동(인터발함수)
***********************************/
function goAuto() {
  // 인터발
  autoI = setInterval(() => {
    // 랜덤수만큼 토끼이동(0~9)
    r1Pos += Math.floor(Math.random() * 9);
    r1.style.left = `${r1Pos}px`;

    // 랜덤수만큼 거북이 이동(0~9)
    t1Pos += Math.floor(Math.random() * 9);
    t1.style.left = `${t1Pos}px`;

    // 승자 판별함수 호출
    whoWinner();
  }, 50);
} ////////goR1함수/////////////

/***************************************** 
    함수명: whoWinner
    기능: 기준값 보다 레이서위치값이 큰경우
        승자를 판별하여 메시지를 보여준다!
*****************************************/
// 거북 멈춤 변수
let t1Stop = 0; //0 달려 ,1 멈춰

function whoWinner() {
  // 1. 거북이와 토끼의 이동값 확인
  console.log("거북위치", t1Pos, "\n토끼위치", r1Pos);
  if (t1Pos >= 500 || r1Pos >= 500) {
    //배팅 종료 시점
    // (1) sel박스 클릭금지
    // (2) 응원하기 버튼 클릭 금지
    t1Stop = 1;
  } else if (t1Pos >= 1300 || r1Pos >= 1300) {
    //게임 종료 시점
    // (1) 토끼야 거북아 멈춰라
    clearInterval(autoI);
    // (2) 승자판별
    // 승자변수
    let winner;
    if (r1Pos > t1Pos) winner = "토끼";
    else if (r1Pos < t1Pos) winner = "거북";
    else winner = "비김";
    // 승자변수
    // (4) 메세지 랜덤으로 커버박스에 넣기

    // 선택 메세지 배열
    let selMsg = msgTxt[winner];
    // 랜덤 수 만들기
    let rdmNum = Math.floor(Math.random() * selMsg.length);
    // 내림해야 0부터 나옴, 0,1,2 3개 찍을거니까 *3
    // console.log(selMsg[rdmNum],selMsg.length);

    // 랜덤 메세지
    let rdmMsg = selMsg[rdmNum];

    // (5) 메세지 박스에 메세지 넣기
    msg.innerText = rdmMsg;
    // (6) 메세지 박스 보이기
    msg.style.display = "block";
    msg.style.zIndex = "100";

    // (7) 전체 반투명 커버 암전 주기
    domFn.qs(".cover").innerHTML += `
        <div style='
            position:fixed;
            top:0;
            left:0;
            width:100vw;
            height:100vh;
            background-color:#000;
            opacity:0.5;
            z-index:99'>
        </div>`;
    // (8) 버튼 맨 위로 올리기
    domFn.qs("#btns").style.zIndex = "200";
  }
}
