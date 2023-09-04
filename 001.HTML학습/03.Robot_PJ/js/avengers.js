// 어벤져스 JS - avengers.js

window.addEventListener('wheel',(e)=>{
    // 기본기능 막기(휠, 우클릭 등등!)
    e.preventDefault();
    // 이벤트 호출 확인
    console.log('휠~',e.wheelDelta);
    // 휠 방향 분기
    let x = e.wheelDelta;
    // 페이지 이동확인
    window.scrollTo(0,window.innerHeight*(x<0?1:0));
    // window.scrollTo(x스크롤 위치값, y스크롤 위치값);
    // window.innerHeight*(e.wheelDelta<0?1:0)
    // 윈도우 높이값*음수면 1곱하기 양수면 0 곱함 (페이지가 늘면 페이지만큼 추가)
    // 아래방향은 윈도우 높이 / 윗 방향은 위치값 0
},{passive:false})
// passive:false 설정값을 변경해야 window, document, body
// 이 세가지 중요객체에 대하여
// 막기설정을 할 수 있다.(모바일때문, passive:true로 기본값 바뀜)
/*
<div class="hero">
    <img src="./ab_img/ironman.png" alt="아이언맨">
    <article class="txt">
        <div>
            <h3>아이언맨</h3>
            <p>천재적인 두뇌와 재능으로 세계 최강의 무기업체를 이끄는 CEO이자, 타고난 매력으로 셀러브리티 못지않은 화려한 삶을 살아가던 억만장자 토니 스타크.</p>
        </div>
    </article>
</div>
*/

// 초기 데이터 세팅
// 데이터 : 어벤져스 데이터  - data.js > character
// 공통 DOM 선택함수
const qs = x => document.querySelector(x);
const qsa = x => document.querySelectorAll(x);

// 어벤져서 캐릭터 박스 세팅하기
// 대상선정 : .avengers-box
const avengers = qs('.avengers-box');
// console.log(avengers);

// 2. 데이터 자동 순회하여 태그 만들기
// html코드변수
let hcode = '';
// 주석번호
let num = 1;
for(let x in character){
    // 변수x는 객체의 속성이다!!
    // 객체값은 객체변수[x]
    console.log(x,":", character[x]);
    hcode += `
    <!-- ${num}. ${x} -->
        <div class="hero">
            <!-- 이미지 -->
            <img src="./ab_img/${character[x]['이미지명']}.png" alt="${x}">
            <!-- 소개글박스 -->
            <article class="txt${num>2?' right':''}">
                <div>
                    <h3>${x}</h3>
                    <p>${character[x]['설명']}</p>
                </div>
            </article>
        </div>
    `;
    // 주석번호 증가
    num++;
} ///////////for in//////////////
/************************************************* 
   [ 객체를 위한 for in 문 ]

   - 구문: 
   for(변수 in 객체){코드}

   - 작동원리:
   객체의 개수만큼 순서대로 속성명과 속성값을 가져옴

   - 변수는 객체의 속성명이다!

   - 객체의 값을 사용하려면 for in 문 안에
       객체[변수] 로 쓰면됨!

*************************************************/

// 생성된 html확인
console.log(hcode);

// 3. 대상에 html 넣어 출력하기!!
avengers.innerHTML = hcode;

// 4. 로딩 후 1초 뒤 avengers-box에 클래스 넣기
setTimeout(() => {
    avengers.classList.add('on');
}, 1000);

// 5. 타이틀 애니 위해 한 글자씩 싸기
// 대상: .t1
let mytit = qs('.t1');
let my_text = mytit.innerText;
// 글자담기변수
let tit_one = ''; //string형 선언
// for of 문으로 한글자씩 순회하기
for(let x of my_text){
    tit_one += `<span>${x}</span>`
}
console.log(tit_one);

// 다시 타이틀에 넣기
mytit.innerHTML = tit_one;

// 셋팅된 span요소
let new_span = qsa('.t1 span');
// 하나씩 transition-delay시간 주기
new_span.forEach((ele,idx)=>{
    if(idx%2 == 0){
    ele.style.transitionDelay = (0.1*idx)+'s';
    } else{
        ele.style.transitionDelay = (0.15*idx)+'s';
    }
})
// 어벤져스 박스 나올때까지 기다린 후(5초)
// span의 transform 변경하기
// + .hero 오버 시 설정 적용되도록 어벤져스 박스에
// class active 넣기
setTimeout(()=>{
    // for(let x of new_span) x.style.transform = 'translateY(40%) scale(1)';
    mytit.classList.add('on');
    avengers.classList.add('active');
}, 5000);

// span 1번째 요소 회전
setTimeout(()=>{
    
}, 6200);