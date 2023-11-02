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

/////////////////////////////////////////////////
///////// 원형으로 이미지 데이터 뿌리기 ///////////
/////////////////////////////////////////////////
// [1] 요구사항 
// 1. 데이터 개수를 분류하여 뿌리기
// 2. 이미지는 화면 중심으로부터 이동
// 대상 :.box1, .box2
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
arr = [dataArr2,dataArr1];

console.log(arr);
let hcode = "";

/////////////////////////////////////////////////////////
///해당 영역에 원형 뿌리기 함수 ///////////////////////////
// 1. 기능 : 대상area와 대상데이터를 받아와서 원형배치한다.
////////////////////////////////////////////////////////// 
function makeFn(area,data,radiusVal) {
  hcode = '';
  let arrSeq = 0;
  // 안쪽반지름 설정
  let radius = radiusVal;
  // 윈도우 중앙기준
  let wid = window.innerWidth;
  let high = window.innerHeight;
  data.forEach((ele,idx)=>{
    arrSeq = idx;
    if(arrSeq > 0) radius = radiusVal + 300;
    ele.forEach((ele2,idx2)=>{
      // 삼각함수 각도값
      let degVal = ((2*Math.PI)*idx2)/data[arrSeq].length;
      let degRotate = 0 + (360/data[arrSeq].length)*idx2;
      // 위치이동값 박스크기/2 - 이미지크기/2 + sin(각도)*원반지름 - 내위치값;
      let topVal = (high/2 - 65/2) + radius*Math.sin(degVal);
      let leftVal = (wid/2 - 200/2) + radius*Math.cos(degVal);
      // console.log(topVal,leftVal);
      hcode += `
      <div class='prod-item' style='left: ${leftVal}px; top: ${topVal}px;'>
      <img src='./image_prod2/${ele2[3]}.png' alt='${ele2[1]} 이미지' style='transform: rotate(${degRotate}deg);'>
            <!-- <span>${ele2[0]}</span> -->
            <!-- <span>${ele2[2]}</span> -->
        </div>
      `;
    });
  }); /////////forEach //////////
  // transform: rotate(${degVal}deg); 회전시킬 경우 style에 적용시키면 됨
  area.innerHTML = hcode;
  // console.log(hcode);
} /////////makeFn 함수 /////////////

makeFn(prodBox1,arr,500);

function chgPosition(ele){
  // 포지션 강제변경
    ele.style.position = 'relative';
    ele.style.top = '0';
    ele.style.left = '0';
} //////// chgPosition ////////////
////////////////////////////////////////////////
// 리셋버튼
// 보정값 변수
const posX = []; //left보정값
const posY = []; //top보정값
const btn = dFn.qs('button');
dFn.addEvt(btn,'click',function(){
  const prodItem = dFn.qsa('.prod-item');
  const prodItemImg = dFn.qsa('.prod-item img');
  const prodArea = dFn.qs('.prod-area');
  prodItem.forEach((ele,idx)=>{
    // 위치값 구하기
    posY[idx] = ele.offsetTop;
    posX[idx] = ele.offsetLeft;
    // 포지션 강제변경
    chgPosition(ele);
  });
  console.log(posX,posY);
  // 회전제어
  prodItemImg.forEach(ele=>{
    ele.style.transform = 'rotate(0deg)';
  });
  // 제품구역 위치 변경
  prodArea.style.margin = '0 auto';
  prodArea.style.width = '1400px';
  // 제품박스
  prodBox1.style.animation = 'none';
  this.style.display = 'none';
});
