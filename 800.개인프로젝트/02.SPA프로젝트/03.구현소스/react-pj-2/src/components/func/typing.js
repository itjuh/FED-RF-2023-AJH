// 타이핑 효과 js
import $ from "jquery";

// 타이핑 시간
const TYPING_TIME = 250;
// 타이핑 글자
const menuData = ["KEYBOARD", "SWITCH", "ROGIN", "JOINUS", "WISHLIST", "CONTANT"];

let typingArr = menuData[0].split(''); 
// 타이핑 구역
const area = $('.typing-area');
// 인터발 함수 autoI
let autoI;
let count = 0;

// .25초마다 글자를 입력하는 인터발 함수
function insertText() {
  autoI = setInterval(() => {
    area.innerText += typingArr[count];
    count++;
    // 글자데이터 길이보다 길어지면 멈춤
    if (count == typingArr.length) {
      clearInterval(autoI);
    }
  }, TYPING_TIME);
} ////////////insertText함수/////////////