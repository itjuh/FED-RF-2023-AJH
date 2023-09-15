// 가로네비 서브별 드롭다운 전체창 - nav06.js

const domFn = {
    // 요소선택함수 ////////
    qs: (x) => document.querySelector(x),
    qsEl: (el, x) => el.querySelector(x),
    qsa: (x) => document.querySelectorAll(x),
    qsaEl: (el, x) => el.querySelectorAll(x),
  
    // 이벤트셋팅함수
    addEvt: (ele, evt, fn) => ele.addEventListener(evt, fn),
}; /////// domFn 객체 /////////////

// 1. 구현 요구사항
// gnb메뉴에 데이터를 모두 html DOM으로 구조화하여
// 화면에 출력한다!!

// 2. 대상선정 .gnb
const gnbBox = domFn.qs('.gnb');
// console.log('대상 gnb',gnbBox);

// 3. 객체 데이터로 html코드만들기

let hcode = '';
for(let x in mdata){ // x 는 속성명
    // console.log('속성명 : ',x);
    hcode +=`
        <ul>
            <li>
                <a href="#">${x}</a>
                <div class="smenu">
                    <aside class="smbx">
                        <h2>
                            <div class="stit">${x}</div>
                            <a href="#">전체보기</a>
                        </h2>
                        <div class="swrap">
                            <!-- 2차메뉴 dl생성-->
                            ${makeCode(mdata[x])}
                        </div>
                    </aside>
                </div>
            </li>
        </ul>
    `
} ////////////for in //////////////////

// console.log(hcode);

// 내부 for in 문 코드생성 함수
function makeCode(obj){ //obj는 전달값
    // console.log('나야나',obj);
    // 코드변수
    let hcode = '';

    // 객체반복문 for in사용
    for(let x in obj){
        hcode +=
        `<dl>
            <dt>${x}</dt>
            <!-- 3차메뉴 dd생성 -->
            ${obj[x].map(
                val=>`<dd><a href="#">${val}</a></dd>`).join('')}
        </dl>`
    }
    return hcode;
} //////////makeCode /////////////////

// 최종 GNB출력하기/////////////////////
gnbBox.innerHTML = hcode;

/*******************************************
  [ 배열데이터를 변경하여 다시 배열로 만들기 : map()]
    
  배열변수.map((배열값,순번,전체배열)=>{변경코드})
  -> 결과로 변경 된 배열이 리턴 됨

  ex) const arr = ['두현','대희','민희'];
  let arr2 = aa.map(val => val+'씨');
  -> 결과: ['두현씨','대희씨','민희씨'];
  ____________________________________________
  Array.isArray(배열); 
  -> 결과로 true / false가 리턴됨
  ____________________________________________
  -> 새로 만들어진 배열 데이터를 현재 자리에 그대로 출력할 때
  배열메서드 .join(구분자)를 이용하여 배열을 하나의 문자형
  데이터로 만들어 주면 편리하다.
  ex) const aa = ['하하','호호'];
  `<div>${aa.map(val => `<h2>${val}</h2>`).join('')}</div>`
  -> 결과: <div><h2>하하</h2><h2>호호</h2></div>
  -> 구분자가 없는 태그로만 구성 된 최종데이터를 그 자리에 출력 함
  ->>>>잊지말자 맵 조인
 
*******************************************/
// const arr = ['두현','대희','민희'];
// let arr2 = arr.map(val => val+'씨');
// console.log(arr2);
// // 결과 : ['두현씨', '대희씨', '민희씨']
// let arr3 = arr2.map((val,idx) =>`<div>${idx+'.'+val}</div>`);
// console.log(arr3,Array.isArray(arr3));
// 결과 : ['<div>0.두현씨</div>', '<div>1.대희씨</div>', '<div>2.민희씨</div>'] true



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
    domFn.addEvt(ele,'mouseover',overFn);
    domFn.addEvt(ele,'mouseout',outFn);
});
// 3. 함수만들기
function overFn(){
    // console.log('over this:',this);
    // 1. 하위 .smbx 높이값 알아오기
    // let hv = domFn.qsEl(this,'.smbx').clientHeight;
    console.log('높이:',hv);
    // 2. 하위 서브메뉴박스만큼 .smenu 높이값 주기
    domFn.qsEl(this,'.smenu').style.height = hv + 'px';
} //////////overFn//////////////////
function outFn(){
    // console.log('out this:',this);
    // 3. 서브메뉴 박스 높이값 0 만들기
    domFn.qsEl(this,'.smenu').style.height = '0px';
} //////////outFn//////////////////