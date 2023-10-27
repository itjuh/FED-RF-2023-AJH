//keyboard.js 키보드 구현 js
// 키보드 배열 구성하기

const dFn = {
  qs: (x) => document.querySelector(x),
  qsEl: (el, x) => el.querySelector(x),
  qsa: (x) => document.querySelectorAll(x),
  qsaEl: (el, x) => el.querySelectorAll(x),

  // 이벤트셋팅함수
  addEvt: (ele, evt, fn) => ele.addEventListener(evt, fn),
};
// 키보드 데이터 
// ['키 길이','키보드 자판글자']
const keyData = [
["" , ["~","`"]],
["" , ["!","1"]],
["" , ["@","2"]],
["" , ["#","3"]],
["" , ["$","4"]],
["" , ["%","5"]],
["" , ["^","6"]],
["" , ["&","7"]],
["" , ["*","8"]],
["" , ["(","9"]],
["" , [")","0"]],
["" , ["-","_"]],
["" , ["+","="]],
["size0" , "Backspace"],
["size1" , "Tab"],
["" , "Q"],
["" , "W"],
["" , "E"],
["" , "R"],
["" , "T"],
["" , "Y"],
["" , "U"],
["" , "I"],
["" , "O"],
["" , "P"],
["" , ["{","["]],
["" , ["}","]"]],
["size1" , ["|","￦"]],
["size2" , "CapsLock"],
["" , "A"],
["" , "S"],
["" , "D"],
["" , "F"],
["" , "G"],
["" , "H"],
["" , "J"],
["" , "K"],
["" , "L"],
["" , [":",";"]],
["" , ['"',"'"]],
["size3" , "Enter"],
["size3" , "Shift"],
["" , "Z"],
["" , "X"],
["" , "C"],
["" , "V"],
["" , "B"],
["" , "N"],
["" , "M"],
["" , ["<",","]],
["" , [">","."]],
["" , ["?","/"]],
["size4" , "Shift"],
["size5" , "Ctrl"],
["size5" , "Win"],
["size5" , "Alt"],
["size6" , "SpaceBar"],
["size5" , "Alt"],
["size5" , "Fn"],
["size5" , "Win"],
["size5" , "Ctrl"],
];
// 키보드 데이터 
// ['키 길이','키보드 자판글자']
const keyData22 = [
["" , "M"],
["" , "E"],
["" , "N"],
["" , "U"],
// ["size3" , "Enter"],
];
// ['키 길이','키보드 자판글자']
const keyData33 = [
["" , "5"],
["" , "5"],
["" , "0"],
["" , "🤍"],
// ["size3" , "Enter"],
];

////////////////////////////////////////////
// 대상에 키보드 배열 뿌리기
// 1. 대상선정 : .key-box
const keyBox = dFn.qs('.key-box');
// console.log(keyBox);

let hcode = '';

keyData33.forEach(ele=>{
    hcode += `
    <div class="key ${ele[0]}">
        <!-- 키 윗면 -->
        <span class="span1 key-part">
        <!-- 키 윗면 글자부분 -->
        <div class="key-top">
            ${insertTop(ele[1])}
        </div>
        </span>
        <!-- left -->
        <span class="span2"></span>
        <!-- right -->
        <span class="span3"></span>
        <!-- top -->
        <span class="span4"></span>
        <!-- bottom -->
        <span class="span5"></span>
        <!-- 키 맨뒷면 -->
        <span class="span6"></span>
    </div>
    `;
}); //////keyData forEach문///////////

// 키 윗면 글자넣기 함수
function insertTop(ele){
    let res = '';
    if(Array.isArray(ele)){
        res = `
        <aside class="part2">${ele[0]}</aside>
        <aside class="part2">${ele[1]}</aside>
        `;
    }else{
        res = `<aside class="part1">${ele=='SpaceBar'?"":ele}</aside>`;
    }
    return res;
} /////////insertTop함수//////////////

// 키 뿌리기
keyBox.innerHTML = hcode;

// 키 마우스 클릭 이벤트
const keyList = dFn.qsa('.key');
keyList.forEach(ele=>{dFn.addEvt(ele,'mousedown',keyhoverFn)});


// 키 오버 함수
function keyhoverFn(){
    // console.log(this);
    this.style.transform = 'translateY(10px)';
    // 마우스 놓을 때
    dFn.addEvt(this,'mouseup',()=>{
        this.style.transform = 'translateY(0px)';
    });
    // 마우스 떠날 때
    dFn.addEvt(this,'mouseleave',()=>{
        this.style.transform = 'translateY(0px)';
    });
} ////////// keyhoverFn ////////////

typingKey('LEOPOLD');
// 타이핑 텍스트 키 매칭함수
// function typingKey(txt){
//     // 타이핑 텍스트 나누기
//     let eachTxt = txt.split('');
//     console.log(eachTxt);
//     // 타이핑 효과 줄 키 저장 변수
//     let sameKeyList = [];
//     for(let i=0; i<eachTxt.length; i++){
//         dFn.qsa('.key-top').forEach(ele=>{
//             if(ele.innerText.toLowerCase() == eachTxt[i].toLowerCase()){
//                 //조부모찾아서 담기(스타일 대상)
//                 sameKeyList[i] = ele.parentNode.parentNode;
//             } /////// if 일치하면 담기//////////
//         }); /////////// key-top forEach /////////////
//         console.log(sameKeyList);
//     } ///////// for ////////////////

//     // 스타일 적용
//     sameKeyList.forEach((ele,idx)=>{
//         setTimeout(()=>{
//             ele.style.transform = 'translateY(10px)';
//             dFn.qsEl(ele,'.key-top').style.backgroundColor = 'cornflowerblue';
//             typingShow(ele);
//         },3000 + (idx*600));
//     });
// } ////////// typingKey 함수 //////////

// // 스타일 초기화 함수
// function typingShow(ele){
//     setTimeout(()=>{
//         ele.style.transform = 'translateY(0px)';
//         dFn.qsEl(ele,'.key-top').style.backgroundColor = '#fff';
//     },200);
// } ////////// typingShow 함수 //////////