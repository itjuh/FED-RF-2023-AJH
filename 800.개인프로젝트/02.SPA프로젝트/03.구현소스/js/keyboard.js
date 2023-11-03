//keyboard.js 키보드 구현 js
// 키보드 배열 구성하기

//돔 객체 호출
import dFn from './dom.js';

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

////////////////////////////////////////////
// 대상에 키보드 배열 뿌리기
// 1. 대상선정 : .key-box
const keyBox = dFn.qs('.key-box');
// console.log(keyBox);

let hcode = '';

keyData.forEach(ele=>{
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


