// 이미지 정보 가로스크롤 + 세로스크롤 JS

// 이동 대상
const infoBox = $(".info-img");
// 한계값을 위한 겉박스 크기
const limitW = $(".prod-info").width();
const limitH = $(".prod-info").height();
// const limit = 1280;
let psts = 0; /// 광스크롤막기(0-허용,1-막기)
// 위치변수
let x = 0;
let y = 0;
const MOVE = 300;

// console.log('infoBox:',infoBox,'infoImgs',infoImgs);
// 전체 이미지 세로크기 저장배열
const imgHeiSize = [];
// 전체 이미지 가로크기 저장배열
const imgWidSize = [];
// 가로영역 이동한계값, 세로 한계값, 움직일 요소 저장 배열변수
// let posx = [];
// let posy = [];

// 가로영역 이동한계값, 세로 한계값, 움직일 요소 저장 배열변수
let pos = [];
// 전체 이동거리
let all = 0;
// 이동거리 측정 대상
const infoImg = infoBox.find("img");

// 이미지 세로크기 저장 함수
// const sizeCheck = (ele) => {
//   imgWidSize.length = 0;
//   // 이동거리 저장용 임시변수
//   let xstart = 0;
//   let xend = 0;
//   // 순번값
//   let seq = 0;
//   // 이미지 세로크기 배열에 넣기
//   ele.each((i, v) => {
//     // 개별 이미지 길이 저장
//     imgHeiSize[i] = v.height;
//     // imgWidSize[i] = v.width;
//     // 가로 이동거리 저장
//     xend += v.width;
//     if (v.height !== v.width) {
//       // 가로영역 시작값,이동한계값
//       posx[seq] = [xstart, xend - limitW];
//       // 세로 한계값, 움직일 요소
//       posy[seq] = [v.height - limitH, v];
//       // 값 업데이트
//       xstart = xend - limitW;
//       seq++;
//     }
//   });
//   // 전체 이동거리 업데이트
//   all = xend - limitW;
//   console.log('posx',posx,'posy',posy);
//   // 위치이동 포인트 설정(이미지 가로세로가 다르면 세로스크롤)
// }; //////// 사이즈 저장 함수 ///////////


// 이미지 세로크기 저장 함수
const sizeCheck = (ele) => {
  imgWidSize.length = 0;
  // 이동거리 저장용 임시변수
  let xpos = 0;
  // 순번값
  let seq = 0;
  // 이미지 세로크기 배열에 넣기
  ele.each((i, v) => {
    // 개별 이미지 길이 저장
    imgHeiSize[i] = v.height;
    // imgWidSize[i] = v.width;
    // 가로 이동거리 저장
    xpos += v.width;
    if (v.height !== v.width) {
      // 가로영역 이동한계값, 세로 한계값, 움직일 요소
      pos[seq] = [xpos - limitW, v.height - limitH, infoImg.eq(i)];
      seq++;
    }
  });
  // 전체 이동거리 업데이트
  all = xpos - limitW;
  // console.log("imgHeiSize", imgHeiSize, "pos", pos, all);
  // 위치이동 포인트 설정(이미지 가로세로가 다르면 세로스크롤)
}; //////// 사이즈 저장 함수 ///////////


// 이미지 크기 저장
sizeCheck(infoImg);
/*
posx
0 [0, 1540]
1 [1540, 2440]
2 [2440, 3340]
posy
0 [703.125, img]
1 [12649.125, img]
2 [12727.125, img]
*/

// 기능 : 스크롤 방향에 따라 이동방향 결정
// 적절한 값을 hoz와 ver에 보낸다
// function totalScroll(){
//   if (dir === -1) { // 아래스크롤
//     if(x <= -xpos[0] && x >= -xpos[1]){
//       x += MOVE * dir;
//     }
//     if (x > -xpos[0]) x = xpos[0];
//     else if(x < -xpos[1]){
//       x = xpos[1];
//       verticalScroll(target, dir);
//     }
//   }
// }

// 기능 : 이미지의 크기를 받아와서 가로스크롤을 수행한다.
// 파라미터(이동대상, 이동값)
// function horizonScroll(target, dir) {
//   x += MOVE * dir;
//   // console.log(x <= -target[0],'조건문1',target[2].position().top < -target[1],'조건문2',target[2].position().top != 0,'조건문3',dir == -1);
//   if (x > -target[0] && dir == -1) y = 0; //x축 이동가능 / 아래방향 스크롤
//   else if (x <= -target[0] && target[2].position().top != -target[1] && dir == -1) {
//     //y축 이동가능 / 아래방향 스크롤
//     x = -target[0];
//     verticalScroll(target, dir);
//   } else if (target[2].position().top != 0 && dir == 1) {
//     // y축 이동가능 / 윗방향 스크롤
//     x -= MOVE * dir; // x축 이동 초기화
//     verticalScroll(target, dir);
//   } else if (target[2].position().top == 0 && dir == 1) {
//     // x축 이동가능 / 윗방향 스크롤
//   }
//   console.log(x);
//   return x;
// } ////////// 가로스크롤 함수 //////////////

function horizonScroll(target, dir) {
  x += MOVE * dir;

  if (dir === -1) {
    //아래방향 스크롤
    if (x > -target[0]) y = 0; //y고정 x이동
    else if (x <= -target[0] && target[2].position().top != -target[1]) {
      //x고정 y이동
      x = -target[0];
      verticalScroll(target, dir);
    }
  } else {
    //윗방향 스크롤
    if (target[2].position().top != 0) {
      // x고정 y이동
      x -= MOVE * dir; // x축 이동 초기화
      verticalScroll(target, dir);
    }
  }
  console.log(x);
  return x;
} ////////// 가로스크롤 함수 //////////////

// 기능 : 이미지의 세로높이를 받아와서 세로스크롤을 수행한다.
// 파라미터(이동대상, 이동값)
function verticalScroll(target, dir) {
  // target - 대상배열
  y += MOVE * dir;
  if (y > 0) y = 0;
  else if (y < -target[1]) y = -target[1];
  target[2].css("top", y + "px");
} ////////// 세로스크롤 함수 //////////////

// 기능 : 가로세로 스크롤을 조합하여 박스를 이동시킨다.
// 파라미터 (이미지 전체박스)
function infoScroll() {} //////// infoScroll 함수 ///////////////

infoBox.on("wheel", () => {
  let delta = event.wheelDelta;
  // console.log("휠중", delta);
  delta = delta > 0 ? 1 : -1;
  /////// 광스크롤 막기 //////////////////
  if (psts === 1) return true; //돌아가!
  psts = 1; //잠금!
  setTimeout(function () {
    psts = 0; //해제
  }, 20); //0.02초후 해제///////////
  //// 마우스 휠 방향에 따라 가로스크롤 이동 증감! /////
  if (x >= 0 && delta > 0) x = 0;
  else if (x >= -pos[0][0]) x = horizonScroll(pos[0], delta);
  else if (x >= -pos[1][0]) x = horizonScroll(pos[1], delta);
  else if (x >= -pos[2][0]) x = horizonScroll(pos[2], delta);
  if (x <= -pos[2][0] && delta < 0) x = -pos[2][0];

  // if (delta > 0) {
  //   //윗방향(양수) +px로 이동
  //   // 구역분기
  //   // console.log(x,'조건1',x >= -pos[0][0],'조건2',x >= -pos[1][0],'조건3',x >= -pos[2][0]);
  //   // 0 > x > -1540
  //   if (x >= -pos[0][0]) x = horizonScroll(pos[0], 1);
  //   // -1540 > x > -2440
  //   else if (x >= -pos[1][0]) x = horizonScroll(pos[1], 1);
  //   // -2440 > x > -3440
  //   else if (x >= -pos[2][0]) x = horizonScroll(pos[2], 1);
  //   // +0
  //   if (x > 0) x = 0;
  // } //////// if문 ///////////////////
  // else {
  //   // 아랫방향(음수) -px로 이동
  //   // x >= -1540
  //   if (x >= -pos[0][0]) x = horizonScroll(pos[0], -1);
  //   // -1540 > x > -2440
  //   else if (x >= -pos[1][0]) x = horizonScroll(pos[1], -1);
  //   // -2440 > x > -3440
  //   else if (x >= -pos[2][0]) x = horizonScroll(pos[2], -1);
  //   // -3440
  //   if (x <= -pos[2][0]) x = -pos[2][0];
  // } ////////// else문 //////////////
  infoBox.css("left", x + "px");
});
