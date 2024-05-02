// 수집
const pickerBody = document.querySelector(".time-picker-body");
const pickedView = document.querySelector(".time-picker-view");
const moveDistance = document.querySelector(".time-picker-body li").getBoundingClientRect().height; //21.33

const ampmList = document.querySelector(".am-pm-slider ol");
const hourList = document.querySelector(".hour-slider ol");
const minList = document.querySelector(".minute-slider ol");

const arrowBtns = document.querySelectorAll(".arrow-button");

let ampmInitPos = moveDistance * 2;
let initPos = -(moveDistance * 2);
// console.log("am/pm위치",ampmPos,"hour크기",hourPos,"min위치",minPos,'initpos',initPos);

function initPosSetting() {
  ampmList.style.top = ampmInitPos + "px";
  hourList.style.top = initPos + "px";
  minList.style.top = initPos + "px";
}
function setTransition(target, boolean) {
  if (boolean) target.style.transition = ".3s ease-in-out";
  else target.style.transition = "none";
}
// 초기위치 설정
initPosSetting();
// 트랜지션 설정(초기설정 시 트랜지션 없애기)
setTimeout(() => {
  setTransition(ampmList, true);
}, 400);
// 초기 시간 설정
setTime(readData());

// 버튼 클릭 시 이동
arrowBtns.forEach((item) => {
  item.addEventListener("click", function go() {
    if (this.dataset.type == "am-pm") {
      ampmMove(isUp(this));
    } else {
      timeMove(this.parentNode, isUp(this));
    }
    setTime(readData());
  });
});

function isUp(button) {
  if (button.classList.contains("up-arrow")) return "up";
  else if (button.classList.contains("down-arrow")) return "down";
}

function ampmMove(direction) {
  // 1. 버튼 클릭 시 ol위치를 move만큼 이동
  // 2. 탭으로 이동 시 ol위치를 move만큼 이동
  // 3. 이동 후 pick-data의 값 변경
  if (direction == "up") {
    ampmList.style.top = ampmInitPos - moveDistance + "px";
    ampmList.querySelectorAll("li")[0].dataset.pick = -1;
    ampmList.querySelectorAll("li")[1].dataset.pick = 0;
  } else {
    ampmList.style.top = ampmInitPos + "px";
    ampmList.querySelectorAll("li")[0].dataset.pick = 0;
    ampmList.querySelectorAll("li")[1].dataset.pick = 1;
  }
}

function timeMove(target, direction) {
  // 1. 버튼 클릭 시 버튼을 구분하여 li를 잘라서 붙임
  // 2. 탭으로 이동 시 방향을 구분하여 li를 잘라서 붙임
  // 3. 이동 후 pick-data의 값을 변경
  target = target.querySelector("ol");
  let allList = target.querySelectorAll("li");

  if (direction == "up") {
    let num = -5;
    // 이동
    setTransition(target, true);
    target.style.top = initPos - moveDistance + "px";
    // transition없애기 => 잘라붙이기
    setTimeout(() => {
      setTransition(target, false);
      allList[0].dataset.pick = num; // num이 li를 다 돌아서 마지막 순번이 됨
      target.appendChild(allList[0]);
      target.style.top = initPos + "px";
    }, 300);
    allList.forEach((li) => {
      li.dataset.pick = num;
      num++;
    });
  } else {
    let num = -3;
    // 미리 이동 후 뒤에서 앞으로 붙이기
    setTransition(target, false);
    target.prepend(allList[allList.length - 1], allList[0]);
    target.style.top = initPos - moveDistance + "px";
    // 이동 보여주기
    setTimeout(() => {
      setTransition(target, true);
      allList[allList.length - 1].dataset.pick = -2;
      target.style.top = initPos + "px";
    }, 0);
    allList.forEach((li) => {
      li.dataset.pick = num;
      num++;
    });
  }
}

function readData() {
  const ampm = ampmList.querySelector("[data-pick='0']").innerText;
  const hour = hourList.querySelector("[data-pick='0']").innerText;
  const min = minList.querySelector("[data-pick='0']").innerText;
  return ampm + " " + hour + " : " + min;
}
function setTime(time) {
  // pickedView 에 세팅
  pickedView.innerText = time;
}

// 드래그 작업
// 움직일때 위치 값, 처음 값, 위치이동 차이, 마지막 위치
// 
let moveY = 0;
let firstY = 0;
let lastY;

const timeSliderWraper = document.querySelectorAll(".time-slider-wraper ol");
console.log("슬라이드랩퍼", timeSliderWraper);
// timeSliderWraper.forEach(ele=>{
//   console.log("옵셋Y",ele.offsetTop);
//   // console.log("겟바운딩",ele.getBoundingClientRect(),"옵셋Y",ele.offsetTop);
//   ele.addEventListener("mousemove",function(e){
//     console.log(e.clientY);
//   });
// });
// 드래그 시 이동
const goDrag = (ele)=>{
  let state = false;
  let moveY = 0; // 움직일 때 위치값
  let gapY = firstY - moveY; // 위치이동 차이

  let lastY = ele.offsetTop;

  const startDrag=()=>{state = true};
  const endDrag=()=>{state = false};
  const dragMove =(e)=>{
    if(state){
      ele.style.transition = "none";
      gapY = firstY - e.clientY;
      ele.style.top = initPos - gapY + "px";
    }
  };
  const startSet=(e)=>{ 
    firstY = e.clientY;
    // console.log();
  };
  const endSet=(e)=>{
    lastY += gapY;
  };
};

// 방향 판별
function gowhere(ele,idx){
  let initPos = idx==0?ampmInitPos:initPos;
  let center = pickerBody.offsetHeight / 2 - 11;
  let targetPos = idx==0?ele.offsetTop:ele.offsetTop - initPos; //기본위치 ampm 64 나머지는 20
  console.log(targetPos, center);
  console.log(ele.parentNode.previousSibling.previousSibling);
  if(targetPos > center + 11){
    ele.parentNode.nextSibling.nextSibling.click();
  }else if(targetPos < center - 11){
    ele.parentNode.previousSibling.previousSibling.click();
  }else{
    ele.style.top = initPos;
  }
}
gowhere(timeSliderWraper[1],1);