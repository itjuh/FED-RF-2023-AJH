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
// 제품 데이터
// ['제품코드','색상명','가격','이미지']로 구성
const prodData = [
["FC900RBTPD","코랄 블루","178000","keyboard1"],
["FC750RBTPD","코랄 블루","175000","keyboard2"],
["FC900RBTPD","밀크 터쿼이즈","178000","keyboard3"],
["FC750RBTPD","밀크 터쿼이즈","175000","keyboard4"],
["FC900RBTPD","그레이 블루","178000","keyboard5"],
["FC750RBTPD","그레이 블루","175000","keyboard6"],
["FC900RBTPD","화이트 투톤","178000","keyboard7"],
["FC750RBTPD","화이트 투톤","175000","keyboard8"],
["FC900RBTPD","그레이 퍼플","178000","keyboard9"],
["FC750RBTPD","그레이 퍼플","175000","keyboard10"],
["FC900RBTPD","라이트 핑크","178000","keyboard11"],
["FC750RBTPD","라이트 핑크","175000","keyboard12"],
["FC900RBTPD","화이트 민트","178000","keyboard13"],
["FC750RBTPD","화이트 민트","175000","keyboard14"],
["FC900RBTPD","화이트 그레이","178000","keyboard15"],
["FC750RBTPD","화이트 그레이","175000","keyboard16"],
["FC900RBTPD","다크 블루","178000","keyboard17"],
["FC750RBTPD","다크 블루","175000","keyboard18"],
["FC900RBTPD","차콜 블루","178000","keyboard19"],
["FC750RBTPD","차콜 블루","175000","keyboard20"],
["FC900RBTPD","애쉬 옐로우","178000","keyboard21"],
["FC750RBTPD","애쉬 옐로우","175000","keyboard22"],
["FC900RBTPD","화이트 블루스타","178000","keyboard23"],
["FC750RBTPD","화이트 블루스타","175000","keyboard24"],
["FC900RBTPD","블랙 ","178000","keyboard25"],
["FC750RBTPD","블랙 ","175000","keyboard26"],
["FC900RBTPD","스웨디시 화이트","178000","keyboard27"],
["FC750RBTPD","스웨디시 화이트","175000","keyboard28"],
["NP900RBTPD","화이트 투톤","178000","keyboard29"],
["NP900RBTPD","차콜 블루","178000","keyboard30"],
["NP900RBTPD","그레이 블루","178000","keyboard31"],
["NP750RBTPD","그레이 블루","175000","keyboard32"],
["FC980MBTPD","화이트 투톤","182500","keyboard33"],
["FC980MBTPD","화이트 블루스타","182500","keyboard34"],
["FC980MBTPD","애쉬 옐로우","182500","keyboard35"],
["FC980MBTPD","그레이 블루","182500","keyboard36"],
["FC980MPD","화이트 투톤","155000","keyboard37"],
["FC980MPD","화이트 블루스타","155000","keyboard38"],
["FC980MPD","애쉬 옐로우","155000","keyboard39"],
["FC980MPD","블랙 ","155000","keyboard40"],
["FC980MPD","그레이 블루","155000","keyboard41"],
["FC980C","화이트 ","265000","keyboard42"],
["FC900RPD","화이트 투톤","149500","keyboard43"],
["FC900RPD","화이트 그레이","149500","keyboard44"],
["FC900RPD","블랙 ","149500","keyboard45"],
["FC900RPD","다크 블루","149500","keyboard46"],
["FC900RPD","그레이 블루","149500","keyboard47"],
["FC900ROE","블랙 퍼플","149500","keyboard48"],
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


/*  
    <div class="key">
        <!-- 키 윗면 -->
        <span class="span1 key-part">
        <!-- 키 윗면 글자부분 -->
        <div class="key-top">
            <aside class="part2">~</aside>
            <aside class="part2">`</aside>
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
 */

