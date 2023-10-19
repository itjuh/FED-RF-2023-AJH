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
const prodData2 = [["FC900RBTPD", "코랄 블루", "178000", "keyboard1"]];
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
const colorName = [
"Aqua",
"Black",
"Blue",
"Fuchsia",
"Gray",
"Green",
"Lime",
"Maroon",
"Navy",
"Olive",
"Purple",
"Red",
"Silver",
"Teal",
"White",
"Yellow",
]

/////////////////////////////////////////////////
///////// 원형으로 이미지 데이터 뿌리기 ///////////
/////////////////////////////////////////////////
// [1] 요구사항 
// 1. 데이터 개수의 1/5개는 안쪽 원에 뿌리기
// 2. 데이터 개수의 4/5개는 바깥쪽 원에 뿌리기
// 3. 이미지는 중심으로부터 이동
// 대상 :.prod-box
const prodBox1 = dFn.qs(".box1");
const prodBox2 = dFn.qs(".box2");

// [2] 데이터 나누기
let dataArr1 = []; // 안쪽원
let dataArr2 = []; // 바깥쪽 원
// dataArr1 에 데이터 넣기 (1/5개)
let arr = [];
let x = 0;
let y = 0;
for(let i = 0; i < prodData.length; i++){
  let a = prodData[i][0];
  a = a.substr(2,3);
  if(a == 900){
    dataArr1[x] = prodData[i];
    x++;
  }else if(a == 750){
    dataArr2[y] = prodData[i];
    y++; 
  }
} /////////////for//////////////////
// dataArr2 에 데이터 넣기 (2/3개)
// for(let i = 0; i < prodData.length*2/5; i++){
//   let seq = dataArr1.length + i;
//   dataArr2[i] = prodData[seq];
// }
// console.log(dataArr1, dataArr2, dataArr1.length,dataArr2.length,prodData.length);
console.log(dataArr1,dataArr2);

let hcode = "";

/////////////////////////////////////////////////////////
///해당 영역에 원형 뿌리기 함수 ///////////////////////////
// 1. 기능 : 대상area와 대상데이터를 받아와서 원형배치한다.
////////////////////////////////////////////////////////// 
function makeFn(area,data,Radius) {
  hcode = '';
  data.forEach((ele,idx) => {

    // let Radius = 400;
    let degVal = ((2*Math.PI)*idx)/data.length;
    let degRotate = 180 + (360/data.length)*idx;
    let wid = window.innerWidth;
    // console.log(wid);
    let high = window.innerHeight;
    let topVal = (high/2 - 65/2) + Radius*Math.sin(degVal);
    let leftVal = (wid/2 - 200/2) + Radius*Math.cos(degVal);
      // console.log(topVal,leftVal);

  // 16개 기준
  // 회전각도 :  90deg += 360/data.length * data.index (오른쪽 가운데부터 정렬)
  // let x = (2*3.14)/15 하나씩 더해줌 원주율을 나눠주는 작업
  // 위치이동값 top (박스/2 - 너비/2 +(박스/2 - 너비/2)*math.cos(x))
  // 위치이동값 left (박스/2 - 높이/2 + (박스/2 - 높이/2)*math.sin(x))
  // let degVal = ((2*Math.PI)/data.length*idx);
  // let degRotate = 180 + (360/data.length)*idx;
  // let wid = area.clientWidth;
  // let high = area.clientHeight;
  // let radius = area.hcode/2;
  // let topVal = Math.round(high/2 - 130/2 + (radius)*Math.sin(degVal));
  // let leftVal = Math.round(wid/2 - 260/2 + (radius)*Math.cos(degVal));
    console.log(topVal,leftVal);
    hcode += `
            <div class='prod-item' style='left: ${leftVal}px; top: ${topVal}px;'>
                <img src='./image_prod2/${ele[3]}.png' alt='${ele[1]} 이미지' style='transform: rotate(${degRotate}deg);'>
                <!-- <span>${ele[0]}</span> -->
            </div>
        `;
  }); /////////forEach //////////

  // transform: rotate(${degVal}deg); 회전시킬 경우 style에 적용시키면 됨
  area.innerHTML = hcode;
  // console.log(hcode);
} /////////makeFn 함수 /////////////

makeFn(prodBox1,dataArr1,800);
makeFn(prodBox2,dataArr2,500);

