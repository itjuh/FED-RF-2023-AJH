// 대상선정
const textbox = document.querySelectorAll(".portfolio .show-text-box");
const descbox1 = document.querySelector("#page-2 .pj-desc");
const descbox2 = document.querySelector("#page-3 .pj-desc");
const descbox3 = document.querySelector("#page-4 .pj-desc");
const groupInfobox = $(".group-info");
const SHOWTIMEGAP = 1;
const page1 = document.querySelector("#page-1");
const page2 = document.querySelector("#page-2");
const page3 = document.querySelector("#page-3");
const page4 = document.querySelector("#page-4");

// 새로고침 시 
$(() => {
    if (pg_num == 0) {
        groupInfobox.addClass("on");
    }
}); // 로드구역
// 휠 이벤트 - deskTop
window.addEventListener("wheel", () => {
    if (pg_num == 0) {
        groupInfobox.addClass("on");
    } else if (pg_num == 1) {
        descbox1.classList.add("on");
    } else if (pg_num == 2) {
        descbox2.classList.add("on");
    } else if (pg_num == 3) {
        descbox3.classList.add("on");
    }
});
// 스크롤 이벤트 - deskTop
window.addEventListener("scroll", () => {
    if (page1.getBoundingClientRect().top == 0) {
        groupInfobox.addClass("on");
    } else if(page2.getBoundingClientRect().top == 0){
        descbox1.classList.add("on");
    }else if(page3.getBoundingClientRect().top == 0){
        descbox2.classList.add("on");
    }else if(page4.getBoundingClientRect().top == 0){
        descbox3.classList.add("on");
    }
});


// 터치 이벤트 - mb
window.addEventListener("touchmove", function () {
    if (page1.getBoundingClientRect().top > 0) {
        groupInfobox.addClass("on");
    } else {
        descbox1.classList.add("on");
        descbox2.classList.add("on");
        descbox3.classList.add("on");
    }
});
