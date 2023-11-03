// 보그 PJ - 공통모듈 JS : common2.js
// 상단메뉴를 컴포넌트화 하기에 이것을 빼고 뿌리는 js
// 난 category 페이지용이다.


// DOM 메서드
import dFn from './dom.js';
// 상단, 하단 공통데이터 불러오기
import tData from './data/com.module.js';

// 부드러운 스크롤 모듈
import { startSS, setPos } from './smoothscroll23.js';

// [1] 상단 하단 공통모듈 넣기 //////////////////
// html넣기
// 대상선정 : .common-area
const commonArea = dFn.qsa('.common-area');
// html넣기 [0]상단,[1]하단
commonArea[1].innerHTML = tData['footer-area'];
// 모바일 메뉴 햄버거버튼 추가로 넣기
commonArea[0].innerHTML += tData.mobtn;
// 모바일 메뉴 박스 추가로 넣기
commonArea[0].parentElement.innerHTML += tData.mobx;


// [2] 부드러운 스크롤 적용 ////////////
startSS();


// [3] 탑메뉴, 탑버튼 스크롤 시 변경적용하기 ///////////
// 스크롤 메뉴 적용대상 : .top-area
const topArea = $('#top-area');
// 탑버튼 : .tbtn
const tBtn = $('.tbtn'); 

// 스크롤 이벤트
$(window).scroll(()=>{
    let scTop = $(window).scrollTop();
    // console.log('스크롤!!!!' , scTop);

    // 1. 스크롤 위치값이 100을 초과하면 슬림상단 클래스 on넣기
    if(scTop>100) topArea.addClass('on');
    else topArea.removeClass('on');
    
    // 2. 스크롤 위치값이 300을 초과하면 나오기
    if(scTop>300) tBtn.addClass('on');
    else tBtn.removeClass('on');

}); ///////////scroll ///////////

// [4] 상단이동버튼 클릭 시 맨 위로 가기//
// 부드러운 스크롤 함수 업데이트
tBtn.click((e)=>{
    // 기본 a태그 기능(#-맨위이동) 막기
    e.preventDefault();
    // 부드러운 스크롤 위치값 변경
    setPos(0);
    // console.log('나클릭');
}); ///////////click//////////

// console.log(tData, dFn);

////////////////////////////////////////////////////////////
// 모바일 버튼 클릭 시 메뉴박스/검색박스 보이기 || 숨기기 //////
////////////////////////////////////////////////////////////
// 대상 : .sbtn(검색버튼) .hbtn(메뉴버튼)
// 요구사항 : 햄버거 버튼은 #mobx 보이고 숨기기
//           검색버튼은 .mos 보이고 숨기기
// 제이쿼리 메서드 : click(), slideToggle()
$('.hbtn').click(()=>{$('#mobx').slideToggle(300)});
$('.sbtn').click(()=>{$('.mos').slideToggle(300)});


// 토글 : 두 가지를 전환하는 효과
// toggle() -> show() / hide()
// slideToggle() -> slideUp() / slideDown() 
// fadeToggle() -> fadeIn() / fadeOut()