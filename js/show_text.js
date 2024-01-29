// 대상선정
const textbox = document.querySelectorAll(".portfolio .show-text-box");
const descbox1 = document.querySelector("#page-2 .pj-desc");
const descbox2 = document.querySelector("#page-3 .pj-desc");
const groupInfobox = $(".group-info");
const SHOWTIMEGAP = 1;
const page1 = document.querySelector("#page-1");


$(() => {
    if (pg_num == 0) {
        groupInfobox.addClass("on");
    }
}); //로드구역
// 휠 이벤트 - deskTop
window.addEventListener("wheel", () => {
    console.log(pg_num);
    if (pg_num == 0) {
        groupInfobox.addClass("on");
        descbox1.classList.remove("on");
        descbox2.classList.remove("on");
    } else if (pg_num == 1) {
        groupInfobox.removeClass("on");
        descbox1.classList.add("on");
        descbox2.classList.remove("on");
    } else if (pg_num == 2) {
        groupInfobox.removeClass("on");
        descbox1.classList.remove("on");
        descbox2.classList.add("on");
    }
});
// 스크롤 이벤트 - mb
window.addEventListener("scroll", function () {
    if (page1.getBoundingClientRect().top > 0) {
        groupInfobox.addClass("on");
        descbox1.classList.remove("on");
        
        descbox2.classList.remove("on");
    } else {
        groupInfobox.removeClass("on");
        descbox1.classList.add("on");
        descbox2.classList.add("on");
    }
});
