// 도깨비 PJ 메인 JS - main.js

// 모듈 불러오기
// DOM 함수 객체 //////////////
import domFn from "./dom.js";
// 부드러운 스크롤 ////////////
import { startSS, setPos } from "./smoothscroll23.js";
// 데이터 모듈
import { gridData, gnbData, previewData } from "./data_drama.js";
// 부드러운 스크롤 적용
startSS();

// 0-1. 새로고치면 스크롤바 위치 캐싱 후 맨 위로 이동
setTimeout(() => {
  // 윈도우 스크롤 맨 위로!
  window.scrollTo(0,0);
  // 부드러운 스크롤 위치값 반영!(전 위치로 이동해버림)
  setPos(0);
  // 안하면 스크롤 바를 내리고 새로고침하면 원래 위치로 강제이동함
}, 500);
// 0-2. 스크롤바 트랙을 잡고 위치 이동 시 위치값 반영
domFn.addEvt(window,'mouseup',()=>setPos(window.scrollY)); ///////// mouseup ////////////////////////
// 0-3. 키보드 방향키 이동 시 위치값 반영


// 대상: .desc-box
let desc_box = document.querySelectorAll(".desc-box");
console.log(desc_box);

// 모든 캐릭터 설명박스는 이벤트 버블링 막기!!!
// -> 여기서 마우스휠 됨!!!
desc_box.forEach((ele) => {
  // ele - 요소자신
  ele.onwheel = (e) => e.stopPropagation();
});

/***********************************
 * [ 그리드박스 공통파트 데이터 구성하기 ]
 * - 배열데이터를 이용하여 html코드 구성
 ***********************************/

// 1.대상선정 : .grid-box(.live-box / .poster-box)
const gridBox = domFn.qsa(".grid-box");
console.log('대상: ',gridBox);

// 2. 대상 코드넣기 함수 호출 설정하기/////////
gridBox.forEach((ele,idx)=>makeGrid(ele,idx));

// 3. 그리드 스타일 데이터 생성하기 함수
function makeGrid(ele,idx){// 요소,순번
  // 2.현장포토 데이터를 기반으로 HTML코드 만들기
  let hcode = "<ul>";
  // 반복코드 만들기 ////
  // 현장포토 데이터 - data_drama.js에서 가져옴
  gridData[idx].forEach((val) => {
    //html 변수에 계속넣기
    //폴더경로는 idx가 0이면 live_photo (false)
    // idx가 1이면 poster_img (true)
    hcode += `
          <li>
              <figure>
                  <img src="./images/${idx?'poster_img':'live_photo'}/${val.img}.jpg" alt="도깨비이미지_${val.title}">
                  <figcaption>${val.title}</figcaption>
              </figure>
          </li>
      `;
  }); //////////forEach /////////////////
  
  hcode += "</ul>";
  
  // 3. 대상박스에 html 넣기
  ele.innerHTML = hcode;
} ///////////////makeGrid함수////////////////////

// [GNB 서브메뉴 세팅하기]
// 구조 : div.smenu>aside.smbx>h2{1차메뉴}+(ol>li>a{2차메뉴})
// 1. 대상선정 : .gnb>ul>li
// 서브메뉴 구분하기 : li는 하위a요소의 텍스트가 gnbData 속성명
// 1차 메뉴와 일치하는 경우 하위메뉴를 넣어준다.
const gnbList = domFn.qsa(".gnb>ul>li");
console.log("메뉴 :", gnbList, "/데이터:", gnbData);
// 3. 대상에 하위메뉴 태그 만들기
gnbList.forEach((ele) => {
  // li밑에 a에 있는 텍스트 읽기
  let atxt = domFn.qsEl(ele, "a").innerText;
  // console.log('텍스트',atxt);
  // 2. GNB데이터 읽기
  let gData = gnbData[atxt];
  // 3. 해당 서브가 있으면 태그 만들어서 넣기
  // Array.isArray(리스트) 배열여부확인
  // 배열값은 태그를 만들어 그 자리에 출력: 배열.map().join('');
  if (gData) {
    //데이터 없으면 undefined
    console.log("만들어", atxt);
    ele.innerHTML += `
        <div class="smenu">
          <aside class="smbx">
            <h2> ${atxt}
              <ol>
                ${gData
                  .map(
                    (val) =>
                      `<li>
                    <a href="#">${val}</a>
                  </li>`
                  )
                  .join("")}
              </ol>
            </h2>
          </aside>
        </div>
     `;
  }
}); /////////forEach///////////////

/*******************************************
 [ 메뉴 li 오버 시 하위메뉴 보이기 ]
 이벤트 대상: .gnb>ul>li
 변경 대상: .smenu
*******************************************/
// 1. 대상선정
// 1-1. 이벤트 대상
const gnb = domFn.qsa(".gnb>ul>li");
// 1-2. 변경대상
const smenu = domFn.qsa(".smenu");

console.log("대상 :", gnb);
// 2. 이벤트 설정하기
// 이벤트 종류 : mouseover / mouseout
gnb.forEach((ele) => {
  // 서브메뉴가 있을 때만 이벤트 설정!
  // if문에서 undefiend/null/1은 false처리됨
  if (domFn.qsEl(ele, ".smenu")) {
    domFn.addEvt(ele, "mouseover", overFn);
    domFn.addEvt(ele, "mouseout", outFn);
  }
});
// 3. 함수만들기
function overFn() {
  // console.log('over this:',this);
  // 1. 하위 .smbx 높이값 알아오기
  let hv = domFn.qsEl(this, ".smbx").clientHeight;
  console.log("높이:", hv);
  // 2. 하위 서브메뉴박스만큼 .smenu 높이값 주기
  domFn.qsEl(this, ".smenu").style.height = hv + "px";
} //////////overFn//////////////////
function outFn() {
  // console.log('out this:',this);
  // 3. 서브메뉴 박스 높이값 0 만들기
  domFn.qsEl(this, ".smenu").style.height = "0px";
} //////////outFn//////////////////

/////////////////////////////////////////////////
// 인트로 동영상 클릭 시 플레이 하기
// 대상 : .intro-mv-img
// 이벤트 : click
// -> 가상요소 플레이버튼 클릭 시 이벤트 버블링으로
// 본 박스가 반응함!

// 1. 대상선정
const mvBox = domFn.qs('.intro-mv-img');

// 2. 이벤트 설정하기
domFn.addEvt(mvBox,'click',showMv);

// 클릭상태 변수
let stsShowMv = 0;

// 3. 함수만들기
function showMv(){
  if(stsShowMv) return;
  console.log('보여줘');
  // 이벤트 등록 지우기 위해서 두번 째 클릭 시 함수연결 끊기
  stsShowMv = 1; //한 번만 실행
  // 동영상 넣기
  // 대상 : 나 자신
  this.innerHTML = `
    <video src='./images/intro_mv.mp4' autoplay controls></video>
  `;
  // 가상요소 플레이버튼 없애기 위해 .off 지우기
  this.classList.remove('off');

  
}///////////showMv///////////////////

// 원본데이터 sort하여 데이터 오름차순 -> 내림차순으로 바꾸기(원본데이터도 변경됨)
let preNewData = previewData.sort((x,y)=>{
  //x,y는 배열값 앞 뒤를 계속 가지고 들어옴
  //배열값 중 idx속성값을 가져와서 숫자형변환 후 사용
  let a = Number(x.idx);
  let b = Number(y.idx);

  // 배열 순서 변경 메서드인 sort() 내부에 return값을 
  // 사용하여 순서를 변경 한 새로운 배열을 만들어 준다.
  return a == b ? 0 : a > b ? -1:1;
  // if(a==b) 0 else{if(a>b) -1 else 1}
});
console.log(preNewData);

// 2. 대상선정: .preview-box>div
const preBox = domFn.qsa('.preview-box>div');
console.log(preBox);

// 3. 대상을 순회하여 태그 만들어 넣기
// 데이터 : 역순정렬을 한 미리보기 데이터 넣기
preBox.forEach((ele,idx)=>{
  ele.innerHTML = `
    <div>
      <h3>${preNewData[idx].title}</h3>
      <p>${preNewData[idx].story}</p>
    <div>
  `;
}); /////////forEach////////////////
