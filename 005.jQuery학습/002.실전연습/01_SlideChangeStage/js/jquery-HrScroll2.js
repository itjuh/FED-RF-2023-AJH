// 제이쿼리로 구현한 가로방향 스크롤 JS :
// - jquery-HrScroll2.js

// 전체 마우스 휠 이벤트를 정지시킴
// overflow:hidden 설정을 html, body에 했으므로
// 스크롤(휠)이벤트가 발생하지만 작동하지 않음

// 이벤트 대상 : html,body
// 이벤트 종류 : wheel
// 휠 이동 변수
let wNum = 0;
// 화면크기
let winW = $(window).width();
// 스크롤 한계값
let limit = winW*7 - winW;

$("html,body").on("wheel", () => {
//   console.log("휠~~~~", event.wheelDelta);
  // 휠 방향 알아내기 : 델타값으로 알아냄
  // 1. 휠방향
  // -> 값 증가(오른쪽 이동) : 음수 값
  // -> 값 감소(왼쪽 이동) : 양수 값
  let dir = event.wheelDelta;

  // 2. 휠 방향에 따른 증감
  if(dir<0) wNum += 100;
  else wNum -= 100;

  // 3. 한계값 지정
  if(wNum < 0) wNum = 0;
  else if(wNum > limit) wNum = limit;

  // 변경대상 : html, body 가로스크롤
  // ->scrollLeft 속성사용
  // 애니메이션 큐에 쌓인 것 처리는 stop()메서드로!
  // 이전 애니메이션은 지우고 현재 걸린 마지막 애니만 작동
  // 4. 실제 가로 스크롤 이동 애니메이션 주기
  $("html,body").stop().animate({
    scrollLeft: wNum + 'px',
  },1000,'easeOutQuint')
}); ////////wheel 이벤트 //////////
