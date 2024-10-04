const drop = document.querySelectorAll("nav");
const itemUl = document.querySelectorAll(".items");
const item = document.querySelectorAll(".items>li");

// 드롭다운 열기 / 닫기
function open(target) {
  allClose();
  target.classList.add("on");
}
function allClose() {
  itemUl.forEach((ele) => {
    ele.classList.remove("on");
  });
}
// 아이템 선택
function select(target) {
  const text = target.innerText;
  const dropdown = target.parentNode.previousElementSibling;
  dropdown.innerText = text;
}

// 드롭다운 선택
drop.forEach((ele) => {
  // pc
  ele.addEventListener("click", function (e) {
    e.stopPropagation();
    const target = e.currentTarget.parentNode.querySelector(".items");
    open(target);
  });
  // 모바일
  ele.addEventListener("touchstart", function (e) {
    e.stopPropagation();
    const target = e.currentTarget.parentNode.querySelector(".items");
    open(target);
  });
  // 엔터진입
  ele.addEventListener("keydown", function (e) {
    e.stopPropagation();
    if (e.key === 'Enter') {
        const target = e.currentTarget.parentNode.querySelector(".items");
        open(target);
    }
  });
});

// 목록 선택
item.forEach((ele) => {
  ele.onclick = (event) => {
    event.stopPropagation();
    select(event.currentTarget);
  };
  ele.addEventListener("keydown", function (e) {
    e.stopPropagation();
    if (e.key === 'Enter') {
        select(e.currentTarget);
    }
  });
});

// 다른요소 클릭 시 닫기
window.addEventListener("click", function(){
  allClose();
});
window.addEventListener("touchstart", function(){
  allClose();
});
