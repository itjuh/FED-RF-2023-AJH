// 공각기동대 인트로JS

// 애니메이션 클래스 적용 대상
/**
 * 1. 라인애니 : .stage
 * 2. 스틸컷 애니: .stc
 * 3. 로고애니 : .mlogo
 */
const stage = document.querySelector(".stage");
const stc = document.querySelector("#stc");
const mlogo = document.querySelector("#mlogo");

// 시차로 애니메이션 적용하기 : .ani-on
// 1. 2초 후 라인애니
setTimeout(() => {
  stage.classList.add("ani-on");
}, 2000);
// 2. 5초 후 스틸컷 애니
setTimeout(() => {
  stc.classList.add("ani-on");
}, 5000);
// 3. 8초 후 로고 애니
setTimeout(() => {
  mlogo.classList.add("ani-on");
}, 8000);

// 오디오 컨트롤 하기
// 버튼 대상 : .play-box
const playbutton = document.querySelector(".play-box");
playbutton.addEventListener("mouseover", function () {
  let csrc = this.getAttribute("src");
  this.setAttribute("src", csrc.replace(".png", "-1.png"));
});
playbutton.addEventListener("mouseout", function () {
  let csrc = this.getAttribute("src");
  this.setAttribute("src", csrc.replace("-1.png", ".png"));
});
// 오디오 컨트롤
const myAudio = document.querySelector(".my-audio");
// 재생 시작시간 변경 : 값 second
myAudio.currentTime = 50;
// 볼륨은 0~1사이 소수점으로 표현(80%는 0.8)
myAudio.volume = 1;

playbutton.addEventListener("click", function () {
  
  let isPaused = myAudio.paused;
  //   console.log("멈춤?", isPaused);
  //   분기하여 처리하기
  if (isPaused) {
    myAudio.play();
    let csrc = this.getAttribute("src");
    this.setAttribute("src", csrc.replace("vbt2", "vbt1"));
  } else {
    myAudio.pause();
    let csrc = this.getAttribute("src");
    this.setAttribute("src", csrc.replace("vbt1", "vbt2"));
  }
});

// /////////////
// // jquery
// 대상선정
// const stage = $('.stage');
// const stc = $('#stc');
// const mlogo = $('#mlogo');
// const playbutton = $('.play-box');

// // 시차로 애니메이션 적용하기 : .ani-on
// // 1. 2초 후 라인애니
// setTimeout(() => {
//   stage.addClass("ani-on");
// }, 2000);
// // 2. 5초 후 스틸컷 애니
// setTimeout(() => {
//   stc.addClass("ani-on");
// }, 5000);
// // 3. 8초 후 로고 애니
// setTimeout(() => {
//   mlogo.addClass("ani-on");
// }, 8000);

// playbutton.hover(
//   function () {
//     //over
//     // 오버시 진한 이미지로 바꾸기 '.png'를 '.-1.png'로 변경
//     let csrc = $(this).attr("src");
//     $(this).attr("src", csrc.replace(".png", "-1.png"));
//   },
//   function () {
//     //out
//     let csrc = $(this).attr("src");
//     $(this).attr("src", csrc.replace("-1.png", ".png"));
//   }
// );
// // 오디오 요소 : 제이쿼리는 get(0)으로 요소를 선택
// const myAudio = $(".my-audio").get(0);

// // 재생 시작시간 변경 : 값 second
// myAudio.currentTime = 50;
// // 볼륨은 0~1사이 소수점으로 표현(80%는 0.8)
// myAudio.volume = 1;

// playbutton.click(function () {  
//   // 멈춤여부 알아오기
//   let isPaused = myAudio.paused;
//   console.log("멈춤?", isPaused);
//   // 분기하여 처리하기
//   if (isPaused) {
//     myAudio.play();
//     let csrc = $(this).attr("src");
//     $(this).attr("src", csrc.replace("vbt2", "vbt1"));
//   } else {
//     myAudio.pause();
//     let csrc = $(this).attr("src");
//     $(this).attr("src", csrc.replace("vbt1", "vbt2"));
//   }
// });
