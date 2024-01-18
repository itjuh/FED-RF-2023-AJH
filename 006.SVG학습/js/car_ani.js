// 자동차 광고 애니 js

// 애니메이션 클래스 적용 대상
/**
 * 1. 라인애니 : #mycar
 * 2. 폭스바겐 로고: #logo
 */
const mycar = document.querySelector("#mycar");
const logo = document.querySelector("#logo");
const cir = document.querySelector(".cir");

// 타임아웃 설정 공통 함수 //////
const setTime = (ele, time) => {
    setTimeout(() => {
      ele.classList.add("ani-on");
    }, time);
  }; /////// setTime함수 ////////
  
  
  // 시작버튼 클릭 설정 //////
document.querySelector('.sbtn').addEventListener('click',function(){
    // 자기자신 사라짐
    this.classList.add('hidden');
    // 1. 2초 후 라인애니
    setTime(mycar, 2000);
    // 2. 10초 후 로고 애니
    setTime(logo, 10000);
    // 3. 13초 후 로고 빛 애니
    setTime(cir, 14000);
    // 오디오 재생하기
    document.querySelector('#myaud').play();
});