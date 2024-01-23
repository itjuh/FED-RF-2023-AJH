// 대상선정
const textbox = document.querySelectorAll(".portfolio .show-text-box");
const SHOWTIMEGAP = 1;

window.addEventListener("scroll", function () {
    console.log(window.scrollY,window.innerHeight);
    if(window.scrollY >= window.innerHeight){
        textbox.forEach((ele,idx) => {
            this.setTimeout(()=>{
                ele.setAttribute("class", "show-text-box on");
            },1000 + (1000*idx))
        });
    } // if

});
