const dFn = {
  qs: (x) => document.querySelector(x),
  qsEl: (el, x) => el.querySelector(x),
  qsa: (x) => document.querySelectorAll(x),
  qsaEl: (el, x) => el.querySelectorAll(x),

  // 이벤트셋팅함수
  addEvt: (ele, evt, fn) => ele.addEventListener(evt, fn),
};

// 제품 데이터
// ['제품코드','색상명','가격','이미지']로 구성
const prodData = [
  ["FC900RBTPD", "코랄 블루", "178000", "keyboard1"],
  ["FC750RBTPD", "코랄 블루", "175000", "keyboard2"],
  ["FC900RBTPD", "밀크 터쿼이즈", "178000", "keyboard3"],
  ["FC750RBTPD", "밀크 터쿼이즈", "175000", "keyboard4"],
  ["FC900RBTPD", "그레이 블루", "178000", "keyboard5"],
  ["FC750RBTPD", "그레이 블루", "175000", "keyboard6"],
  ["FC900RBTPD", "화이트 투톤", "178000", "keyboard7"],
  ["FC750RBTPD", "화이트 투톤", "175000", "keyboard8"],
  ["FC900RBTPD", "그레이 퍼플", "178000", "keyboard9"],
  ["FC750RBTPD", "그레이 퍼플", "175000", "keyboard10"],
  ["FC900RBTPD", "라이트 핑크", "178000", "keyboard11"],
  ["FC750RBTPD", "라이트 핑크", "175000", "keyboard12"],
  ["FC900RBTPD", "화이트 민트", "178000", "keyboard13"],
  ["FC750RBTPD", "화이트 민트", "175000", "keyboard14"],
  ["FC900RBTPD", "화이트 그레이", "178000", "keyboard15"],
  ["FC750RBTPD", "화이트 그레이", "175000", "keyboard16"],
  ["FC900RBTPD", "다크 블루", "178000", "keyboard17"],
  ["FC750RBTPD", "다크 블루", "175000", "keyboard18"],
  ["FC900RBTPD", "차콜 블루", "178000", "keyboard19"],
  ["FC750RBTPD", "차콜 블루", "175000", "keyboard20"],
  ["FC900RBTPD", "애쉬 옐로우", "178000", "keyboard21"],
  ["FC750RBTPD", "애쉬 옐로우", "175000", "keyboard22"],
  ["FC900RBTPD", "화이트 블루스타", "178000", "keyboard23"],
  ["FC750RBTPD", "화이트 블루스타", "175000", "keyboard24"],
  ["FC900RBTPD", "블랙 ", "178000", "keyboard25"],
  ["FC750RBTPD", "블랙 ", "175000", "keyboard26"],
  ["FC900RBTPD", "스웨디시 화이트", "178000", "keyboard27"],
  ["FC750RBTPD", "스웨디시 화이트", "175000", "keyboard28"],
  ["NP900RBTPD", "화이트 투톤", "178000", "keyboard29"],
  ["NP900RBTPD", "차콜 블루", "178000", "keyboard30"],
  ["NP900RBTPD", "그레이 블루", "178000", "keyboard31"],
  ["NP750RBTPD", "그레이 블루", "175000", "keyboard32"],
  ["FC980MBTPD", "화이트 투톤", "182500", "keyboard33"],
  ["FC980MBTPD", "화이트 블루스타", "182500", "keyboard34"],
  ["FC980MBTPD", "애쉬 옐로우", "182500", "keyboard35"],
  ["FC980MBTPD", "그레이 블루", "182500", "keyboard36"],
  ["FC980MPD", "화이트 투톤", "155000", "keyboard37"],
  ["FC980MPD", "화이트 블루스타", "155000", "keyboard38"],
  ["FC980MPD", "애쉬 옐로우", "155000", "keyboard39"],
  ["FC980MPD", "블랙 ", "155000", "keyboard40"],
  ["FC980MPD", "그레이 블루", "155000", "keyboard41"],
  ["FC980C", "화이트 ", "265000", "keyboard42"],
  ["FC900RPD", "화이트 투톤", "149500", "keyboard43"],
  ["FC900RPD", "화이트 그레이", "149500", "keyboard44"],
  ["FC900RPD", "블랙 ", "149500", "keyboard45"],
  ["FC900RPD", "다크 블루", "149500", "keyboard46"],
  ["FC900RPD", "그레이 블루", "149500", "keyboard47"],
  ["FC900ROE", "블랙 퍼플", "149500", "keyboard48"],
];

/////////////////////////////////////////////////
///////// 원형으로 이미지 데이터 뿌리기 ///////////
/////////////////////////////////////////////////
// [1] 요구사항
// 1. 데이터 개수를 분류하여 뿌리기
// 2. 이미지는 화면 중심으로부터 이동
// 3. 화면사이즈를 가져와서 이미지 크기를 조정한다.

// 대상 :.box1, .box2
const prodInBox = dFn.qs(".inner-box");
const prodOutBox = dFn.qs(".outer-box");

// [2] 데이터 나누기
let data750arr = []; // 안쪽 원
let data900arr = []; // 밖 원
let dataOther = []; // 나머지

let x = 0; // 900분류용
let y = 0; // 750분류용
let z = 0; // 나머지분류용
for (let i = 0; i < prodData.length; i++) {
  let a = prodData[i][0];
  a = a.substr(2, 3);
  if (a == 900) {
    data900arr[x] = prodData[i];
    x++;
  } else if (a == 750) {
    data750arr[y] = prodData[i];
    y++;
  } else {
    dataOther[z] = prodData[i];
    z++;
  }
} /////////////for//////////////////

console.log(data750arr, data900arr, dataOther);
let hcode;

/////////////////////////////////////////////////////////
///해당 영역에 원형 뿌리기 함수 ///////////////////////////
// 1. 기능 : 대상area와 대상데이터를 받아와서 원형배치한다.
//////////////////////////////////////////////////////////
function makeFn(area, data, radius, imgSize) {

  hcode = "";
  // 윈도우 중앙기준
  let wid = window.innerWidth;
  let high = window.innerHeight;
  data.forEach((ele, idx) => {
    // 삼각함수 각도값
    let degVal = (2 * Math.PI * idx) / data.length;
    let degRotate = 0 + (360 / data.length) * idx;
    // 위치이동값 박스크기/2 - 이미지크기/2 + sin(각도)*원반지름 - 내위치값;
    let topVal = high / 2 - imgSize[0] / 2 + radius * Math.sin(degVal);
    let leftVal = wid / 2 - imgSize[1] / 2 + radius * Math.cos(degVal);
    // console.log(topVal,leftVal);
    hcode += `
      <div class='prod-item' style='left: ${leftVal}px; top: ${topVal}px;'>
      <img src='./image_prod2/${ele[3]}.png' alt='${ele[1]} 이미지' style='transform: rotate(${degRotate}deg);'>
            <!-- <span>${ele[0]}</span> -->
            <!-- <span>${ele[2]}</span> -->
        </div>
      `;
  }); /////////forEach //////////
  // transform: rotate(${degVal}deg); 회전시킬 경우 style에 적용시키면 됨
  area.innerHTML = hcode;
} /////////makeFn 함수 /////////////
let initImg = [65,200]; //초기 이미지 사이즈
makeFn(prodInBox, data750arr, 500, initImg);
makeFn(prodOutBox, data900arr, 800, initImg);

window.addEventListener('resize',()=>{
  // 1920/1080 일대 200/65
  
  makeFn(prodInBox, data750arr, 500, initImg);
  makeFn(prodOutBox, data900arr, 800, initImg);
});
