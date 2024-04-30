// 수집
const pickerBody = document.querySelector(".time-picker-body");
const pickedView = document.querySelector(".time-picker-view");
const moveDistance = document.querySelector(".time-picker-body li").getBoundingClientRect().height; //21.33

const ampmList = document.querySelector(".am-pm-slider ol");
const hourList = document.querySelector(".hour-slider ol");
const minList = document.querySelector(".minute-slider ol");

const arrowBtns = document.querySelectorAll(".arrow-button");

let initPos = moveDistance * 2;
// console.log("am/pm위치",ampmPos,"hour크기",hourPos,"min위치",minPos,'initpos',initPos);

function initPosSetting() {
  ampmList.style.top = initPos + "px";
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
    ampmList.style.top = initPos - moveDistance + "px";
    ampmList.querySelectorAll("li")[0].dataset.pick = -1;
    ampmList.querySelectorAll("li")[1].dataset.pick = 0;
  } else {
    ampmList.style.top = initPos + "px";
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
    let num = -3;
    // 이동
    setTransition(target, true);
    target.style.top = -moveDistance + "px";
    // transition없애기 => 잘라붙이기
    setTimeout(() => {
      setTransition(target, false);
      allList[0].dataset.pick = num; // num이 li를 다 돌아서 마지막 순번이 됨
      target.appendChild(allList[0]);
      target.style.top = 0 + "px";
    }, 300);
    allList.forEach((li) => {
      li.dataset.pick = num;
      num++;
    });
  } else {
    let num = -1;
    // 미리 이동 후 뒤에서 앞으로 붙이기
    setTransition(target, false);
    target.prepend(allList[allList.length - 1], allList[0]);
    target.style.top = -moveDistance + "px";
    // 이동 보여주기
    setTimeout(() => {
      setTransition(target, true);
      allList[allList.length - 1].dataset.pick = -2;
      target.style.top = 0 + "px";
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
let clickStartPos;
let clickEndPos;
let clickStatus = false;

const timeSliderWraper = document.querySelectorAll(".time-slider-wraper");
console.log("슬라이드랩퍼",timeSliderWraper);
// 드래그 시 이동
document.addEventListener("mousedown",function go(e){
    console.log("현재위치 client",e.clientY,e.target);
    clickStartPos = e.clientY;
    clickStatus = true;
});
document.addEventListener("mouseup",function go(e){
    console.log("현재위치 client",e.clientY,e.target);
    clickEndPos = e.clientY;
    clickStatus = false;
});
if(clickStatus){

}