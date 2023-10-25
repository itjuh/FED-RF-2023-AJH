// 타이핑 효과

const dFn = {
    qs: (x) => document.querySelector(x),
    qsEl: (el, x) => el.querySelector(x),
    qsa: (x) => document.querySelectorAll(x),
    qsaEl: (el, x) => el.querySelectorAll(x),
  
    // 이벤트셋팅함수
    addEvt: (ele, evt, fn) => ele.addEventListener(evt, fn),
};

/////////////////////////////////////////
///글자타이핑/////////////////////////////
// 글자데이터를 가져와서 한글자씩 넣으면서
// 타이핑 하는 느낌주기

// 타이핑 데이터
const typingData = {
    'main':'LEOPOLD',
}
// 1) 대상선정: 이벤트 .message-box span //
let typingArr = typingData['main'].split('');

const msgBoxSpan = dFn.qs('.message-box span');
// 인터발 함수 autoI
let autoI;
let count = 0;

// .6초마다 글자를 입력하는 인터발 함수 
function insertText(){
    autoI = setInterval(() => {
        msgBoxSpan.innerText += typingArr[count];
        count++;
        // 글자데이터 길이보다 길어지면 멈춤
        if(count==typingArr.length){
            clearInterval(autoI);
        }
    }, 600);
} ////////////insertText함수/////////////

// 2) 이벤트 설정 : load
window.addEventListener('DOMContentLoaded',()=>{
    msgBoxSpan.innerText = '';
    //  인터발함수 호출
    setTimeout(()=>{
        insertText();
    },2800);
}); /////////////로드이벤트/////////////////////