// 수집
const pickerBody = document.querySelector(".time-picker-body");
const pickedView = document.querySelector(".time-picker-view");
const moveDistance = document.querySelector(".time-picker-body li").getBoundingClientRect().height; //21.33

const ampmList = document.querySelector(".am-pm-slider ol");
const hourList = document.querySelector(".hour-slider ol");
const minList = document.querySelector(".minute-slider ol");

const arrowBtns = document.querySelectorAll(".arrow-button");

let ampmState = "am";
let ampmInitPos = (moveDistance * 2);
let initPos = -(moveDistance * 2);
// console.log("am/pm위치",ampmPos,"hour크기",hourPos,"min위치",minPos,'initpos',initPos);

function initPosSetting() {
  ampmList.style.top = ampmInitPos + "px";
  hourList.style.top = initPos + "px";
  minList.style.top = initPos + "px";
}

function ampmPosSetting() {
  ampmInitPos = ampmState == "am" ? moveDistance * 2 : moveDistance * 1;
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
      console.log("클릭했습니다.", item);
    }
    setTime(readData());
  });
});

function isUp(button) {
  if (button.classList.contains("up-arrow")) return "up";
  else if (button.classList.contains("down-arrow")) return "down";
}

// 반복클릭 금지
let clicking = false;
function defendClick(){
  clicking = true;
  setTimeout(()=>clicking=false,250);
}

function ampmMove(direction) {
  if(clicking) return;
  defendClick();
  // 1. 버튼 클릭 시 ol위치를 move만큼 이동
  // 2. 탭으로 이동 시 ol위치를 move만큼 이동
  // 3. 이동 후 pick-data의 값 변경
  setTransition(ampmList,true);
  if (direction == "up") {
    ampmState = "pm";
    ampmPosSetting();
    ampmList.style.top = ampmInitPos + "px";
    ampmList.querySelectorAll("li")[0].dataset.pick = -1;
    ampmList.querySelectorAll("li")[1].dataset.pick = 0;
  } else {
    ampmState = "am";
    ampmPosSetting();
    ampmList.style.top = ampmInitPos + "px";
    ampmList.querySelectorAll("li")[0].dataset.pick = 0;
    ampmList.querySelectorAll("li")[1].dataset.pick = 1;
  }
}

function timeMove(target, direction) {
  if(clicking) return;
  defendClick();
  // 1. 버튼 클릭 시 버튼을 구분하여 li를 잘라서 붙임
  // 2. 탭으로 이동 시 방향을 구분하여 li를 잘라서 붙임
  // 3. 이동 후 pick-data의 값을 변경
  target = target.querySelector("ol");
  let allList = target.querySelectorAll("li");

  let num = -4;
  if (direction == "up") {
    // 이동
    setTransition(target, true);
    target.style.top = initPos - moveDistance + "px";
    // transition없애기 => 잘라붙이기
    setTimeout(() => {
      setTransition(target, false);
      target.appendChild(allList[0]);
      target.style.top = initPos + "px";
    }, 300);
    allList.forEach((li) => {
      li.dataset.pick = num - 1;
      num++;
    });
    allList[0].dataset.pick = num - 1; // num이 li를 다 돌아서 마지막 순번이 됨
  } else {
    // 이동
    setTransition(target, true);
    target.style.top = initPos + moveDistance + "px";
    // transition없애기 =>잘라붙이면서 위치초기화
    setTimeout(() => {
      setTransition(target, false);
      target.prepend(allList[allList.length - 1], allList[0]);
      target.style.top = initPos + "px";
    }, 300);
    allList.forEach((li) => {
      num++;
      li.dataset.pick = num;
    });
    allList[allList.length - 1].dataset.pick = -4;
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

const timeSliderWraper = document.querySelectorAll(".time-slider-wraper ol");
console.log("슬라이드랩퍼", timeSliderWraper);
timeSliderWraper.forEach((item, idx) => {
  goDrag(item, idx);
});
let gapY = 0; // 위치이동 차이
// 드래그 시 이동
function goDrag(ele, idx) {
  let firstY;
  let limitgapY;
  let state = false;
  let init = idx == 0 ? ampmInitPos : initPos; // top에 적용값
  const startDrag = () => {
    state = true;
  };
  const endDrag = () => {
    state = false;
  };
  const dragMove = (e) => {
    if (state) {
      setTransition(ele, false);
      gapY = firstY - e.clientY;
      if(gapY <= -limitgapY) gapY = -limitgapY;
      else if(gapY >= limitgapY) gapY = limitgapY;
      console.log(idx,"요소 눌렀을때 초기값 보여줘!",firstY,"갭은?",gapY,ampmState);
      
      if(ampmState == "am"){
        
      }
      ele.style.top = init - gapY + "px";
    }
  };
  const startSet = (e) => {
    firstY = e.clientY;
    console.log("firstY", firstY);
  };

  ele.addEventListener("mousedown", function (e) {
    startDrag();
    startSet(e);
  });
  ele.addEventListener("mouseup", function () {
    endDrag();
    gowhere(ele, idx);
  });
  ele.addEventListener("mousemove", dragMove);
  ele.addEventListener("mouseleave", ()=>{
    endDrag();
    gowhere(ele, idx);
  });
}

// 방향 판별
function gowhere(ele, idx) {
  let init;
  init = idx == 0 ? ampmInitPos : initPos;
  let ref = 20;
  ref = idx == 0 ? 64 : 20;
  let gap = idx == 0 ? 0: 44;
  let targetPos = ele.offsetTop; //기본위치 ampm 64 나머지는 20
  // let targetPos = idx == 0 ? ele.offsetTop : ele.offsetTop - init; //기본위치 ampm 64 나머지는 20
  // console.log("타겟", ele, "타겟위치 :", targetPos, "기준점 :", ref, "차이 :", ref - targetPos);
  if (ref - targetPos >= gap + 12) {
    ele.parentNode.previousSibling.previousSibling.click();
  } else if (ref - targetPos <= gap - 12) {
    ele.parentNode.nextSibling.nextSibling.click();
  } else {
    ele.style.top = init + "px";
    setTransition(ele, true);
  }
}

let arr = [];
for(i = 1; i < 10; i++){
  let res1 = -Math.round(i/2) + 1;
  let res2 = 44 - Math.floor((i-1)/2)*22;
  arr[i-1] = `<div>% : ${res1} /: ${res2}</div>`;
}
document.querySelector(".test").innerHTML = `${arr.map(v=>v).join("")}`;

// 데이터 뿌리기
function makeInitData(ol){
  // 데이터 길이에 따라서 동적으로 위치 구현
  let listLenght = ol.querySelectorAll("li").length;
  let firstPickNumber = -Math.round(listLenght / 2) + 1;
  let firstListPosition = move*2 - Math.floor((listLenght-1)/2)*move;
  return [firstPickNumber,firstListPosition];
}

function makeList(num){

}