// 도깨비 PJ 메인 JS - main.js

// DOM 함수 객체 //////////////
const domFn = {
  // 요소선택함수 ////////
  qs: (x) => document.querySelector(x),
  qsEl: (el, x) => el.querySelector(x),
  qsa: (x) => document.querySelectorAll(x),
  qsaEl: (el, x) => el.querySelectorAll(x),

  // 이벤트셋팅함수
  addEvt: (ele, evt, fn) => ele.addEventListener(evt, fn),
}; /////// domFn 객체 /////////////

// 로딩구역 호출설정
window.addEventListener("DOMContentLoaded", loadFn);

//// 로딩구역 함수 /////////////////
function loadFn() {
  // 로딩확인
  console.log("로딩완료!");

  // 부드러운 스크롤 적용 ///////////////////////
  startSS();

  // 부드러운 스크롤 때문에 마우스휠 이벤트막기가
  // 작동되어 캐릭터설명박스 작은 스크롤도 작동안됨!
  // 따라서 이벤트 버블링을 막아줘야함!
  // event.stopPropagation()
  // 이벤트 객체의 이벤트 버블링 막아주는 메서드임!

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
   * [ 현장포토파트 데이터 구성하기 ]
   * - 배열데이터를 이용하여 html코드 구성
  ***********************************/

  // 1.대상선정 : .live-box
  const liveBox = domFn.qs('.live-box');

  // 2.현장포토 데이터를 기반으로 HTML코드 만들기
  let hcode = '<ul>';
  // 반복코드 만들기 ////
  // 현장포토 데이터 - data_drama.js에서 가져옴
  liveData.forEach(val=>{
    //html 변수에 계속넣기
    hcode += `
        <li>
            <figure>
                <img src="./images/live_photo/${val.img}.jpg" alt="도깨비이미지_${val.title}">
                <figcaption>${val.title}</figcaption>
            </figure>
        </li>
    `;
  }); //////////forEach /////////////////

  hcode += '</ul>';

  // 3. 대상박스에 html 넣기
  liveBox.innerHTML = hcode;
} ////////// loadFn함수 //////////////
//////////////////////////////////////

// [GNB 서브메뉴 세팅하기]
// 구조 : div.smenu>aside.smbx>h2{1차메뉴}+(ol>li>a{2차메뉴})
// 1. 대상선정 : .gnb>ul>li
// 서브메뉴 구분하기 : li는 하위a요소의 텍스트가 gnbData 속성명
// 1차 메뉴와 일치하는 경우 하위메뉴를 넣어준다.
const gnbList = domFn.qsa('.gnb>ul>li');
console.log('메뉴 :',gnbList,'/데이터:',gnbData);
// 3. 대상에 하위메뉴 태그 만들기
gnbList.forEach(ele=>{
  // li밑에 a에 있는 텍스트 읽기
  let atxt = domFn.qsEl(ele,'a').innerText;
  // console.log('텍스트',atxt);
  // 2. GNB데이터 읽기
  let gData = gnbData[atxt];
  // 3. 해당 서브가 있으면 태그 만들어서 넣기
  // Array.isArray(리스트) 배열여부확인
  // 배열값은 태그를 만들어 그 자리에 출력: 배열.map().join('');
  if(gData){//데이터 없으면 undefined
     console.log('만들어',atxt);
     ele.innerHTML += `
        <div class="smenu">
          <aside class="smbx">
            <h2> ${atxt}
              <ol>
                ${gData.map(val=>
                  `<li>
                    <a href="#">${val}</a>
                  </li>`
                ).join('')}
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
const gnb = domFn.qsa('.gnb>ul>li');
// 1-2. 변경대상
const smenu = domFn.qsa('.smenu');

console.log('대상 :',gnb);
// 2. 이벤트 설정하기
// 이벤트 종류 : mouseover / mouseout
gnb.forEach(ele=>{
  // 서브메뉴가 있을 때만 이벤트 설정!
  // if문에서 undefiend/null/1은 false처리됨
  if(domFn.qsEl(ele,'.smenu')){
    domFn.addEvt(ele,'mouseover',overFn);
    domFn.addEvt(ele,'mouseout',outFn);
  }
});
// 3. 함수만들기
function overFn(){
    // console.log('over this:',this);
    // 1. 하위 .smbx 높이값 알아오기
    let hv = domFn.qsEl(this,'.smbx').clientHeight;
    console.log('높이:',hv);
    // 2. 하위 서브메뉴박스만큼 .smenu 높이값 주기
    domFn.qsEl(this,'.smenu').style.height = hv + 'px';
} //////////overFn//////////////////
function outFn(){
    // console.log('out this:',this);
    // 3. 서브메뉴 박스 높이값 0 만들기
    domFn.qsEl(this,'.smenu').style.height = '0px';
} //////////outFn//////////////////