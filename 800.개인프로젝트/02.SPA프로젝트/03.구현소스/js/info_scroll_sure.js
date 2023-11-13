// 이미지 정보 가로스크롤 + 세로스크롤 JS

// 액션 대상 위치값 리턴함수/////
const retLeftVal = (ele) => ele.getBoundingClientRect().left;
const retTopVal = (ele) => ele.getBoundingClientRect().top;
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
const MOVE = 120;

// console.log('infoBox:',infoBox,'infoImgs',infoImgs);
// 전체 이미지 세로크기 저장배열
const imgHeiSize = [];
// 전체 이미지 가로크기 저장배열
const imgWidSize = [];
// 진행방향, 진행거리, 이미지순번(top만) 저장배열변수
let pos = [];
// 전체 이동거리
let all = 0;
let dir = "left"; // 포인트 전환변수 0-가로 1-세로
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
      // 가로영역 이동한계값, 세로 스크롤 설정, 움직일 요소 순번
      // 가로영역 이동한계값 설정
      pos[seq] = [dir, xpos - limitW];
      seq++;
      // 세로 스크롤 설정
      pos[seq] = ['top', v.height - limitH,i];
      seq++;
    }
    // all += v.height; // 실제이동 임시로는 이미지 가로크기의 6배
    // 전체 이동거리 업데이트
  });
  all = xpos - limitW;
  console.log("imgHeiSize", imgHeiSize, "pos", pos, all);
  // 위치이동 포인트 설정(이미지 가로세로가 다르면 세로스크롤)
}; //////// 사이즈 저장 함수 ///////////

// 이동거리 측정 대상
const infoImg = infoBox.find("img");
// 이미지 세로크기 저장
sizeCheck(infoImg);

// 기능 : 이미지의 크기를 받아와서 가로스크롤을 수행한다.
// 파라미터(이미지, 이동대상)
function horizonScroll() {} ////////// 가로스크롤 함수 //////////////

// 기능 : 이미지의 세로높이를 받아와서 세로스크롤을 수행한다.
// 파라미터(이미지, 이동대상)
function verticalScroll() {} ////////// 세로스크롤 함수 //////////////

// 기능 : 가로세로 스크롤을 조합하여 박스를 이동시킨다.
// 파라미터 (이미지 전체박스)
function infoScroll() {} //////// infoScroll 함수 ///////////////

infoBox.on("wheel", () => {
  let delta = event.wheelDelta;
  console.log("휠중", delta);

  /////// 광스크롤 막기 //////////////////
  if (psts === 1) return true; //돌아가!
  psts = 1; //잠금!
  setTimeout(function () {
    psts = 0; //해제
  }, 20); //0.02초후 해제///////////
  //// 마우스 휠 방향에 따라 가로스크롤 이동 증감! /////
  if (delta > 0) {
    // 구역분기
    x += MOVE;
    if (x > 0) x = 0;
    //윗방향(양수) +px로 이동
    infoBox.css({
      left: x + "px",
    });
  } //////// if문 ///////////////////
  else {  // 아랫방향(음수) -px로 이동
    x -= MOVE;
    // x = -1540
    if (x <= -pos[0][1] && infoImg.eq(pos[1][2]).position().top != -pos[1][1]) {
      x = -pos[0][1];
      y -= MOVE;
      if (y > 0) y = 0;
      else if (y < -pos[1][1]) y = -pos[1][1]; // 0 < y < 703.125
      infoImg.eq(pos[1][2]).css("top", y + "px");
    } 
    // -1540 > x > -2440
    else if (x > -pos[2][1]) y = 0; 
    // x = -2440
    else if (x <= -pos[2][1] && infoImg.eq(pos[3][2]).position().top != -pos[3][1]) {
      x = -pos[2][1];
      y -= MOVE;
      if (y > 0) y = 0;
      else if (y < -pos[3][1]) y = -pos[3][1];
      infoImg.eq(pos[3][2]).css("top", y + "px");
    } 
    // -2440 > x > -3440
    else if (x > -all) y = 0; 
    else if (x <= -all && infoImg.eq(pos[5][2]).position().top != -pos[5][1]) {
      x = -pos[4][1];
      y -= MOVE;
      if (y > 0) y = 0;
      else if (y < -pos[5][1]) y = -pos[5][1];
      infoImg.eq(pos[5][2]).css("top", y + "px");
    } else {
      x = -pos[4][1];
    }
    infoBox.css("left", x + "px");
  } ////////// else문 //////////////
  console.log(x, -pos[0][1]);
});

// 분기하기
// 진행방향, 진행거리, 이미지순번(top만) 저장배열변수
// x += MOVE;
// if (x > 0) x = 0;
// else if (x > -pos[0][1]) {
//   // 0 < x < 1540
//   infoBox.css(pos[0][0], x + "px");
// } else if (x == -pos[0][1]) {
//   // 1540
//   y -= MOVE;
//   if (y > 0) y = 0;
//   else if (y < -pos[1][1]) y = -703.124; // 0 < y < 703.125
//   infoImg.eq(pos[1][2]).css(pos[1][0], y + "px");
// }
