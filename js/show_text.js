// 대상선정
const textbox = document.querySelectorAll(".portfolio .show-text-box");
const descbox1 = document.querySelector('#page-2 .pj-desc');
const descbox2 = document.querySelector('#page-3 .pj-desc');
const groupInfobox = $('.group-info');
const SHOWTIMEGAP = 1;

$(()=>{
    if(pg_num == 0){
        groupInfobox.addClass('on');
    }
}); //로드구역
window.addEventListener("wheel", ()=>{
    console.log(pg_num);
    if(pg_num == 0){
        groupInfobox.addClass('on');
    }
    else if(pg_num == 1){
        descbox1.classList.add('on');
    }else if(pg_num == 2){
        descbox2.classList.add('on');
    }
});