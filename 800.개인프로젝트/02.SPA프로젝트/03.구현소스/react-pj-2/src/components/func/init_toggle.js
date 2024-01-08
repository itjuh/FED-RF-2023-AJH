// 토글 초기화 함수
import $ from "jquery";
import "jquery-ui-dist/jquery-ui";

function initToggle() {
  // 토글박스 원 초기설정
  $(".tg-cir").css({
    left: "4px",
  });
  // 토글박스 글자 초기설정
  $(".tg-btn")
    .first()
    .css({
      color: "#000",
    })
    .siblings()
    .css({
      color: "rgb(128, 128, 128)",
    });
} /////////// initToggle 함수 ///////////

export { initToggle };
