// 인트로 페이지 타이핑 효과 js
//돔 객체 호출
import dFn from './dom.js';

/////////////////////////////////////////
///글자타이핑/////////////////////////////
// 글자데이터를 가져와서 한글자씩 넣으면서
// 타이핑 하는 느낌주기

// 타이핑 데이터
const typingData = {
  main: "LEOPOLD",
};
// 타이핑 시간
const TYPING_TIME = 250;
// 1) 대상선정: 이벤트 .message-box span //
let typingArr = typingData["main"].split("");

const msgBoxSpan = dFn.qs(".message-box span");
// 인터발 함수 autoI
let autoI;
let count = 0;

// .6초마다 글자를 입력하는 인터발 함수
function insertText() {
  autoI = setInterval(() => {
    msgBoxSpan.innerText += typingArr[count];
    count++;
    // 글자데이터 길이보다 길어지면 멈춤
    if (count == typingArr.length) {
      clearInterval(autoI);
    }
  }, TYPING_TIME);
} ////////////insertText함수/////////////

// 2) 이벤트 설정 : load
dFn.addEvt(window, "DOMContentLoaded", () => {
  msgBoxSpan.innerText = "";
  //  인터발함수 호출
  setTimeout(() => {
    insertText();
  }, 2000);
  typingKey(typingData.main);

  // 글자입력 끝나면
  // 키 마우스 클릭 이벤트
  setTimeout(()=>{const keyList = dFn.qsa(".key");
    keyList.forEach((ele) => {
        dFn.addEvt(ele, "mousedown", keyhoverFn);
  })}, 2000 + typingArr.length * TYPING_TIME);
  
  const prodArea = $(".prod-area");
  console.log(prodArea)
  prodArea.animate(
    {
      opacity: 0,
    },
    7000,
    "easeInQuad"); 
}); /////////////로드이벤트/////////////////////

// 타이핑 텍스트 키 매칭함수
function typingKey(txt) {
  // 타이핑 텍스트 나누기
  let eachTxt = txt.split("");
  console.log(eachTxt);
  // 타이핑 효과 줄 키 저장 변수
  let sameKeyList = [];
  for (let i = 0; i < eachTxt.length; i++) {
    dFn.qsa(".key-top").forEach((ele) => {
      if (ele.innerText.toLowerCase() == eachTxt[i].toLowerCase()) {
        //조부모찾아서 담기(스타일 대상)
        sameKeyList[i] = ele.parentNode.parentNode;
      } /////// if 일치하면 담기//////////
    }); /////////// key-top forEach /////////////
    console.log(sameKeyList);
  } ///////// for ////////////////

  // 스타일 적용
  sameKeyList.forEach((ele, idx) => {
    setTimeout(() => {
      ele.style.transform = "translateY(10px)";
      dFn.qsEl(ele, ".key-top").style.backgroundColor = "cornflowerblue";
      typingShow(ele);
    }, 2000 + idx * TYPING_TIME);
  });
} ////////// typingKey 함수 //////////

// 스타일 초기화 함수
function typingShow(ele) {
  setTimeout(() => {
    ele.style.transform = "translateY(0px)";
    dFn.qsEl(ele, ".key-top").style.backgroundColor = "#fff";
  }, 150);
} ////////// typingShow 함수 //////////

// 키 오버 함수
function keyhoverFn() {
  // console.log(this);
  this.style.transform = "translateY(10px)";
  dFn.qsEl(this, ".key-top").style.backgroundColor = "#888";
  // 마우스 놓을 때
  dFn.addEvt(this, "mouseup", function(){
    this.style.transform = "translateY(0px)";
    dFn.qsEl(this, ".key-top").style.backgroundColor = "#fff";
  });
  // 마우스 떠날 때
  dFn.addEvt(this, "mouseleave", function(){
    this.style.transform = "translateY(0px)";
    dFn.qsEl(this, ".key-top").style.backgroundColor = "#fff";
  });
} ////////// keyhoverFn ////////////
