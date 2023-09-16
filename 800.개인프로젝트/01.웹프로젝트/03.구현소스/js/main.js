// 온고롱 메인js - main.js

const domFn = {
    // 요소선택함수 ////////
    qs: (x) => document.querySelector(x),
    qsEl: (el, x) => el.querySelector(x),
    qsa: (x) => document.querySelectorAll(x),
    qsaEl: (el, x) => el.querySelectorAll(x),
  
    // 이벤트셋팅함수
    addEvt: (ele, evt, fn) => ele.addEventListener(evt, fn),

    // 바운딩 위치값 함수
    getBCR: (ele) => ele.getBoundingClientRect().top,
    // 옵셋 탑 반환 함수
    getOT: ele => ele.offsetTop,

}; /////// domFn 객체 /////////////

// 전역변수
// 1. 광클금지 상태변수 : 0-허용, 1-불허용
let clickSts = 0;
// 2. 슬라이드 이동시간
const TIME_SLIDE = 800;

// 배너 데이터 이미지와 설명 뿌리기
// 대상 banner-ul
let evtBannerImg = domFn.qs('.banner-ul');
// 대상 banner-desc>ol
let bannerDescBox = domFn.qs('.banner-desc>ol');
// 코드변수 이미지용 설명용
// let bannerCode = ``;
let bannerUl = ``;
let bannerDesc = ``;


for(let x in event_info){
    // 데이터 넣기
    bannerUl += `
    <li>
        <img src="${event_info[x]["src"]}" alt="event">
    </li>
    
    `;
    bannerDesc +=`
    <li>
        <h1 class="tit">${event_info[x]["tit"]}</h1>
        <p class="txt">${event_info[x]["cont"]}</p>
    </li>
    `;
}
// console.log(bannerUl,bannerDesc)
evtBannerImg.innerHTML = bannerUl;
bannerDescBox.innerHTML = bannerDesc;

// 상품 데이터 뿌리기
// 대상: .hot-item-list>ol
let hotItem = domFn.qs('.hot-item-list>ol');
// 코드변수
let hotItemCode = '';
// console.log(hotItem);
for(let x = 1; x < 5; x++){
    // console.log(prod_info["prod0"+x]);
    // 데이터 넣기
    hotItemCode += `
    <li>
        <div class="partbox">
            <div class="img-box">
                <img src="${prod_info["prod0"+x]["src"]}" alt="상품이미지1">
            </div>
            <div class="txt-box">
                <ul>
                    <li class="prod-name">${prod_info["prod0"+x]["prod_name"]}</li>
                    <li class="prod-price">${prod_info["prod0"+x]["prod_price"]}</li>
                    <li class="prod-tag">${prod_info["prod0"+x]["prod_tag"]}</li>
                </ul>
            </div>
        </div>
    </li>
    `;
}; //////////////for//////////////
// console.log(hotItemCode);

hotItem.innerHTML = hotItemCode;
// 리뷰 데이터 뿌리기
// 대상: .review-list>ol
let review = domFn.qs('.review-list>ol');
// 코드변수
let reviewCode = '';
// console.log(review);
for(let x = 1; x < 5; x++){
    // 데이터 넣기
    reviewCode += `
    <li>
        <div class="partbox">
            <div class="txt-box">
                <ul>
                    <li class="reviewer">${review_info["review0"+x]["reviewer"]}</li>
                    <li class="review-txt">${review_info["review0"+x]["review_txt"]}</li>
                    <li class="prod-tag">${review_info["review0"+x]["review_tag"]}</li>
                </ul>
            </div>
            <div class="img-box">
                <img src="${review_info["review0"+x]["src"]}" alt="상품이미지1">
            </div>
        </div>
        </li>
        `;
} //////////////for/////////////
// console.log(reviewCode);

review.innerHTML = reviewCode;

// 스크롤배너 데이터 뿌리기
// 대상: .scroll-banner-box>ul
const banner = domFn.qs('.scroll-banner-box>ul');
let hcode = '';
//<li><img src="" alt=""></li>
for(let x = 0; x<2; x++){
    banner_img.forEach(ele=>{
        // console.log(ele);
        hcode += `
        <li><img src="${ele.src}" alt="${ele.alt}"></li>
        `;
    });
}////////////for문////////////////////
// console.log(hcode);
// 데이터 넣기
banner.innerHTML = hcode;


///////////////////////////////////////
// 배너 움직이기
// 이벤트 대상 :.prev-btn/.next-btn
// 변경대상 이미지 : .banner-ul  > evtBannerImg
// 변경대상 설명 : .banner-desc>ol  > bannerDescBox
/////////////////////////////////////////
// 1. 대상선정
// 1-1. 버튼들 .move-btn 수집
const moveBtn = domFn.qsa('.move-btn');
// 1-2. 변경대상 수집 : 이미 되어있음

// 수집확인
// console.log(moveBtn,evtBannerImg,bannerDescBox);
// 2. 이벤트 지정
// moveBtn[0].onclick = goSlide;
moveBtn.forEach(ele=>domFn.addEvt(ele,'click',goSlide));

/***************************************
    함수명 : goSlide
    기능 : 
    1. 방향버튼 클릭 시 배너를 이동 
    2. 광클을 막기위해 TIME_SLIDE = 800 줌(ms)
***************************************/
// 3. 함수생성
function goSlide(){

    // 광클금지
    if(clickSts) return;//나가기
    clickSts=1;//잠금
    setTimeout(()=>clickSts=0,TIME_SLIDE);//해제!

    // 호출확인
    // 버튼종류 확인
    let isNext = this.classList.contains('next-btn');
    console.log(isNext);
    // 배너 새로 읽기
    // let bannerImgArr = evtBannerImg.querySelectorAll('li');
    // let bannerDescArr = bannerDescBox.querySelectorAll('li');
    let bannerImgArr = domFn.qsaEl(evtBannerImg,'li');
    let bannerDescArr = domFn.qsaEl(bannerDescBox,'li');
    // console.log(bannerImgArr);
    // console.log(bannerDescArr);
    if(isNext){ //오른쪽 버튼
        // (1)대상이동 : 이미지 가로이동, 텍스트 세로이동
        evtBannerImg.style.left = '-100%';
        bannerDescBox.style.left = '-100%';
        // (2)트랜지션
        evtBannerImg.style.transition = TIME_SLIDE+'ms ease-in-out';
        bannerDescBox.style.transition = TIME_SLIDE+'ms ease-in-out';
        // 이동시간 후 맨 앞 li 잘라서 맨 뒤로 이동하기
        // appendChild(요소);
        setTimeout(()=>{ //비동기처리
            // (3)맨 앞 li 맨 뒤로 이동
            evtBannerImg.appendChild(bannerImgArr[0]);
            bannerDescBox.appendChild(bannerDescArr[0]);
            // (4)슬라이드 left값 초기화, left
            evtBannerImg.style.left = '0';
            bannerDescBox.style.left = '0';
            // (5)트랜지션 없애기
            evtBannerImg.style.transition = 'none';
            bannerDescBox.style.transition = 'none';
        },TIME_SLIDE);
    // 잘라내서 붙이기! 위치값-100%만들기! 움직이기!
    }else{ //왼쪽버튼
        // (1)맨뒤 li 맨 앞으로 이동
        // 놈놈놈 ->insertBefore(넣을놈, 넣을놈전놈);
        evtBannerImg.insertBefore(bannerImgArr[bannerImgArr.length-1],bannerImgArr[0]);
        bannerDescBox.insertBefore(bannerDescArr[bannerDescArr.length-1],bannerDescArr[0]);
        // (2)left,left값 -100%만들기(밖으로 나가서 안보이게) : 입장준비
        evtBannerImg.style.left = '-100%'
        bannerDescBox.style.left = '-100%'
        // (3)트랜지션 없애기
        evtBannerImg.style.transition = 'none';
        bannerDescBox.style.transition = 'none';
        // 같은 left값을 동시에 변경하면 효과가 없음
        setTimeout(()=>{// 비동기처리해야함
        // (4)left,left값 0으로 들어오기!
        evtBannerImg.style.left = '0';
        bannerDescBox.style.left = '0';
        // (5)트랜지션주기
        evtBannerImg.style.transition = TIME_SLIDE+'ms ease-in-out';
        bannerDescBox.style.transition = TIME_SLIDE+'ms ease-in-out';
        },0);
    } ///////////if else //////////
} /////////goSlide /////////////////

// 말풍선 내부의 글자값 #search넣기
// 키워드 대상: .bubble-key
const bubbleKey = domFn.qsa('.bubble-key');
// 검색 input
const searchInput = domFn.qs('#search');
// console.log(bubbleKey,searchInput);

bubbleKey.forEach(ele=>{
    domFn.addEvt(ele,'click',()=>{
        let txt = ele.innerText.replace('#','');
        console.log(txt);

        searchInput.value = txt;
    })
})


// 스크롤 이벤트 만들기
// 대상: #search 위치 이동
// 1. 스크롤 위치값 찍기 2360 2610이 getBoundingClientRect()top에서 0이 되면 원래자리로
// 2. 특정 위치값에서 ~~까지 위치지정

// 1-1. 위치대상
let keyBox = domFn.qs('.main-key-search');
// 1-2. 움직일 대상 : .search-box
let sBox = domFn.qs('.search-box');
// 2. 위치대상의 높이 값 읽기
let eleH = keyBox.clientHeight;
// 이벤트 설정하기
domFn.addEvt(window,'scroll',leaveOutOn);
// 윈도우 높이
let winH = window.innerHeight;

function leaveOutOn(){ //추후에 확인할 요소값 받기
    // .main-key-search 위치를 지나가면 위치이동 on을 준다
    // 2. 위치대상의 바운딩값
    let bTop = domFn.getBCR(keyBox);
    // 종료지점은 상단부에 붙는 순간
    let endPoint = 0;
    // console.log('bTop:',bTop,winH);
    // 시작지점 : bTop >= winH 박스내려오자
    if(bTop < winH && bTop >= endPoint){
        sBox.style.top = bTop + 'px';
        sBox.style.transition = '0s';
        sBox.style.left = '-125%';
        sBox.style.transform = 'scale(2)';
        // console.log('들어왔다',bTop);
    }else{
        sBox.style.top = 0;
        sBox.style.left = 0;
        sBox.style.transition = '.5s';
        sBox.style.transform = 'scale(1)';
        // console.log('나갔다',bTop);
    }
}


// footer영역 
// footer_sns span태그 길이만큼 영역확장
