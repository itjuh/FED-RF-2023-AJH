// 공유신발 act_effect.js

// JS함수 : 제이쿼리 코드를 실행하는 함수 //
function initFn() {
    // 메인이미지 박스는 투명하게
    $(".img-box").css({ opacity: 0 }).delay(1000).fadeTo(500, 1);
    // fadeTo(시간,오파,이징.함수) -> 투명도만 애니!
    // 상품리스트 박스 숨기기
    $(".gwrap").hide().delay(1500).slideDown(1000);
  } /////////// initFn함수 //////////////////
  // JS함수 : 처음에 한 번 실행하는 함수 //
  function firstOneFn() {
    $(".tit").css({
      transform: "scale(2)",
      transition: "1s ease-out 1s",
    });
    setTimeout(()=>{
      $('.tit').css({
        transform: "scale(1)",
        transition: "1s ease-out 1s",
      })
    }, 2500);
  } /////////// firstOneFn함수 //////////////////

  export {initFn,firstOneFn};
  