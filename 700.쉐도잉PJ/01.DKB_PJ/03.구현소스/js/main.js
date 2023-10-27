// 도깨비 PJ 메인 JS - main.js

// 모듈 불러오기
// DOM 함수 객체 //////////////
import domFn from "./dom.js";
// 부드러운 스크롤 ////////////
import { startSS, setPos } from "./smoothscroll23.js";
// 데이터 모듈
import { gridData, gnbData, previewData, clipData, linkData } from "./data_drama.js";
// 부드러운 스크롤 적용
startSS();
// 모바일적용 여부코드 ////////////////////////////
let mob=0; // 0-DT 1-MB
const chkMob = () =>{ 
  if($(window).width()<=1024) mob=1;
  else mob=0;
  console.log(mob,'모바일여부');
  // 부가기능: 모바일일때 서브메뉴 기본 스타일 지우기
  if(mob) $('.smenu').attr('style',''); //인라인요소인 스타일시트 없애기
} ////////////모바일검사 함수 ///////////
chkMob();
//화면 리사이즈 시 모바일 검사함수 호출
$(window).resize(chkMob);
///////////////////////////////////////////////

/////////////////////////////////////////////////
////////// 모바일 시 기능구현 /////////////////////
// 1. 햄버거버튼 클릭 시 메뉴 보이기 숨기기
// 대상 : .ham
const hEle = $('.header');
$('.ham').click(()=>{
  hEle.toggleClass('on');
  // 요소.is(요소2)메서드 요소가 요소2를 가지고 있는 지 확인
  console.log(hEle.is('.on'));
  //만약 .header.on이면 body에 스크롤바 숨기기
  if(hEle.is('.on')) $('html, body').css({overflow:'hidden'});
  //아니면 넣은 인라인스타일 지우기
  else $('html, body').attr('style','');
});
// 2. 메뉴 클릭 시 하위메뉴 보이기
// 대상 : .gnb>li
$('.gnb li').click(function(){
  if(!mob) return; // 모바일이 아니면 기능안함
  console.log('클릭함');
  // 서브메뉴 슬라이드 애니로 보이기/숨기기
  // 대상: .smenu
  $(this).find('.smenu')
  .slideToggle(300,'easeInOutQuad')
  .parent() // 부모로 가서 나머지 형제들은 닫기
  .siblings().find('.smenu')
  .slideUp(300,'easeInOutQuad');
}); //////////////click이벤트 //////////////////

// 3. 스티키 메뉴 박스 드래그하여 움직여보기
// 대상: #dokebi-menu ul
$('#dokebi-menu ul').draggable({
  // x축 고정
  axis:'x',
  // 부모박스보다 작을때 사용
  // containment:'parent',
});






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
domFn.addEvt(window, "keyup", () => setPos(window.scrollY));
//////// mouseup /////////////

// 대상: .desc-box
let desc_box = document.querySelectorAll(".desc-box");
//console.log(desc_box);

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
//console.log('대상: ',gridBox);

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
//console.log("메뉴 :", gnbList, "/데이터:", gnbData);
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
    //console.log("만들어", atxt);
    ele.innerHTML += `
        <div class="smenu">
          <aside class="smbx">
            <h2> ${atxt} </h2>
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

//console.log("대상 :", gnb);
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
  if(mob) return; // 모바일이면 안함~
  // console.log('over this:',this);
  // 1. 하위 .smbx 높이값 알아오기
  let hv = domFn.qsEl(this, ".smbx").clientHeight;
  //console.log("높이:", hv);
  // 2. 하위 서브메뉴박스만큼 .smenu 높이값 주기
  domFn.qsEl(this, ".smenu").style.height = hv + "px";
} //////////overFn//////////////////
function outFn() {
  if(mob) return; // 모바일이면 안함~
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
  //console.log('보여줘');
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
//console.log(preNewData);

// 2. 대상선정: .preview-box>div
const preBox = domFn.qsa('.preview-box>div');
//console.log(preBox);

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


///////////////////////////////////////////////////
///////////최신동영상 영역 데이터 뿌리기/////////////
// 대상: .clip-box
const clipBox = domFn.qs('.clip-box');
// console.log(clipBox);
// 생성 데이터 코드변수
let clipCode = '';

// 데이터 매칭하여 태그만들기
clipData.forEach(val=>{
  clipCode += `
    <li>
    <div class="clip-mv-box">
      <img src="./images/clip_img/${val.idx}.jpg" alt="${val.subtit}">
    </div>
    <h4>${val.subtit}</h4>
    <h3>${val.title}</h3>
    </li>
  `;
});

// 코드넣기
clipBox.innerHTML = `<ul>${clipCode}</ul>`;

///////////////최신동영상 넘기기////////////////////
// 1. 요구사항 : 
// -> 버튼 한 번에 한 영상씩 이동
// -> 양쪽 끝에서 이동 중단 및 해당방향 버튼 사라짐
// 2. 대상선정 : 
// 2-1. 이벤트 대상 : .btn-box button
// 2-2. 변경 대상 : .clip-box ul (25.4%)
const btnClip = domFn.qsa('.btn-box button');
const clipList = domFn.qs('.clip-box ul');
// 3. 변수세팅
// 3-1. 리스트 개수
const CNT_LIST = domFn.qsaEl(clipList,'li').length;
// 3-2. 화면당 노출 개수
const LIMIT_LIST = 4;
// 3-3. 이동 한계 수
const LIMIT_MOVE = CNT_LIST-LIMIT_LIST;
// 3-4. 이동 단위 수 : 간격 이동을 고려 한 이동할 -25.4%
const BLOCK_NUM = 25.5;
// 3-5. 이동횟수 : 슬라이드 순번
let mvNum = 0;
// console.log(btnClip, clipList, CNT_LIST,LIMIT_LIST);

// 3. 이벤트 설정
btnClip.forEach(ele=>{
  domFn.addEvt(ele,'click',moveClip);
}); /////////forEach/////////////////

// 4. 함수만들기
function moveClip(){
  // 1. 오른쪽 버튼여부
  let isR = this.classList.contains('fa-chevron-right');
  console.log(this,'나야나',isR);
  // 2. 버튼별 이동 분기
  if(isR){
    // 이동한계수를 체크하여 이동수를 증가시킴
    mvNum++;
    // 처음 버튼 보이기
    btnClip[0].style.display = 'block';
    // 마지막 한계수를 넘어가면 마지막 수에 고정
    if(mvNum>LIMIT_MOVE){
      // 마지막 수 고정
      mvNum = LIMIT_MOVE;
      // 마지막 버튼 숨기기
      btnClip[1].style.display = 'none';
    };
  } ////////////if/////////////
  else{
    // 이동한계수 감소하기
    mvNum--;
    // 마지막 버튼 보이기
    btnClip[1].style.display = 'block';
    // 0번에서 누르면 수 고정
    if(mvNum<0){
      // 처음 수 고정
      mvNum = 0;
      // 처음 버튼 숨기기
      btnClip[0].style.display = 'none';
    };
  }
  // 3. 이동 반영하기 : - 단위수 * 이동수
  clipList.style.left = '-'+BLOCK_NUM*mvNum+'%';
}////////////moveClip///////////////////////

///////////////////////////////////////////////
/////////하단링크 콤보박스 바인딩하기////////////
//////////////////////////////////////////////
// 1. 요구사항 - 콤보박스에 맞는 데이터를 바인딩
// 2. 데이터 - linkData
// 3. 대상선정 : 바인딩 할 콤보박스 #brand #corp
const brandBox = domFn.qs('#brand');
const corpBox = domFn.qs('#corp');
// console.log(linkData,brandBox,corpBox);

// 4. 데이터 바인딩하기
// 4-1. 브랜드 바로가기 콤보박스 brandBox : 단순 바인딩(option)
// 데이터 대상 : linkData.brand
// 내부데이터 초기화
brandBox.innerHTML ='<option selected disabled hidden>브랜드 바로가기</option>';
// 데이터 바인딩
linkData.brand.forEach(val=>{
  brandBox.innerHTML += `<option value="${val}">${val}</option>`;
}); //////////forEach/////////////////////////

// 4-2. 계열사 바로가기 콤보박스 corpBox : 복합 바인딩(optgroup>option)
// 데이터는 객체형이므로 속성만 모아 배열로 변환하여 forEach를 사용한다!
const corpData = Object.keys(linkData.corp);
// console.log(corpData);
// 내부데이터 초기화
corpBox.innerHTML ='<option selected disabled hidden>계열사 바로가기</option>';
/* <option value="${}">${}</option> */

corpData.forEach(val=>{
  corpBox.innerHTML += `
  <optgroup label="${val}">
    ${linkData.corp[val].map(v=>`<option value="${v}">${v}</option>`).join('')}
  </optgroup>
  `;
}); //////////forEach/////////////////////////

//내부의 option요소는 배열데이터 .map().join('')을 사용
//map()은 배열을 재 구성하고 같은자리에 리턴하여 새로운 배열을 변수에 담거나
//그 자리에 리턴한다. 이때, 배열값을 문자열 값으로 변환하는 join()을 사용하여
//연결자를 빈값으로 처리하면 배열의 구분자 콤마가 없는 태그로만 연결 된 순수한
//태그결과 문자열이 만들어 진다!

////////////////////////////////////////////////////////
////////////제이쿼리로 기능 구현하기 /////////////////////
// 1. 서브페이지 서브 컨텐츠 보이기 기능 구현 /////////////
// (1) 대상선정
// (1-1) 이벤트 대상 : .sub-view-box 하위 .partbox 또는 li
const subViewBox = $('.sub-view-box .partbox,.sub-view-box li');
// (1-2) 변경 대상 : .sub-cont
const subContBox = $('.sub-cont');
// console.log(subViewBox);

// (2) 이벤트 함수 만들기
subViewBox.click(function(){
  console.log('나야나',this);
  // (2-1) 제목 읽어오기
  let subTit = $(this).parents('.sub-view-box').prev().text();
  // (2-2) 내용 읽어오기
  let subItem = $(this).text();

  // (2-3) 서브박스 컨텐츠 뿌리기
  subContBox.html(`
    <button class='cbtn'>×</button>
    <div class='sub-inbox inbox'>
      <h1>${subTit}</h1>
      <div class='sub-item'>${subItem}</div>
    </div>
  `);
  // (2-4) 닫기버튼 이벤트 설정
  $('.cbtn').click(()=>{
    subContBox.hide();
  }); ////////click///////////
  // (2-5) 서브박스 보이기
  subContBox.show();

}); //////////click//////////////
