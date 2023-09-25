// JS4-2. 객체연습 다국어

// DOM객체 모듈 불러오기
import dFn from "./dom.js";
// 데이터 모듈 불러오기:json
import langCode from './data_lang.json' assert{type:'json'};
// import langCode from './data_lang.json' 어서써{타입:JSON};
// 제이슨 import 맨 뒤에 assert(주장하다! 제이슨임을 주장해준다)
// assert{type:'json'}; => 어서써 타입 제이슨!
// 원래 제이슨파일과 같은 데이터 파일을 불러올 때는 데이터 파일을
// 다 불러온 후에 그 데이터를 이용하는 코드가 실행될 수 있도록 하는
//  비동기 코딩 방식인 Promise를 사용하는 것이 원칙이다.

console.log(dFn,langCode);

// 1. 다국어 요구사항
// - 언어선택 박스를 변경하면 해당 코드에 맞게 다국어 데이터를 
// 제이슨 파일에서 읽어서 본 페이지에 데이터를 변경한다.

// 2. 대상선정
// 2-1. 이벤트 대상 : .sel
const selBox = dFn.qs('.sel');
// 2-2. 변경 대상 : #gnb a / #cont img / #info address
// (1) #gnb a
// const gnbList = dFn.qsa('#gnb a');
const gnb = dFn.qs('#gnb');
// (2) #cont img
const mainImg = dFn.qs('#cont img');
// (3) #info address
const addrBox = dFn.qs('#info address');

// 3. 이벤트 설정 ////////////////////
// 이벤트 종류 : 선택박스 변경 될 때 발생하는 이벤트는? change
dFn.addEvt(selBox,'change',()=>{
    // 1. 현재 이벤트가 발생하는 선택박스의 값 읽어오기
    // 하위option요소의 value 속성값 읽기
    let selVal = event.currentTarget.value;
    // console.log('변경됨',selVal);
    // 2. 읽어온 value값으로 다국어 세팅 객체의 값과 매칭하기
    let selData = langCode[selVal];
    // 3. 데이터 세팅하기
    // 3-1. gnb데이터 세팅하기
    // gnbList.forEach((ele,idx)=>{
    //     ele.innerText = selData['메뉴'][idx];
    // });
    let hCode = langCode[selVal]['메뉴'].map(val=>`<li><a href="">${val}</a></li>`).join('');
    // console.log(hCode);
    gnb.innerHTML = `<ul>${hCode}</ul>`;

    // 3-2. img데이터 세팅하기
    mainImg.src = `images/${selVal}.jpg`;
    // 3-3. info데이터 세팅하기
    addrBox.innerText = `${langCode[selVal]['주소']}`;
});
