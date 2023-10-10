// JS 페이지간 데이터 전달하기 : 서브페이지 JS - sub.js

// 넘어온 URL 파라미터값 받기
// location.href 를 오른쪽에 쓰면 상단의 URL값을 읽어온다
let parameterURL = location.href;

// 기본 Get방식 파라미터의 물음표시그널이 없으면 첫페이지로 이동
console.log(parameterURL.indexOf('?')<0?"바로 들어오면 -1리턴":"누르고 들어오면 순번뜸");
if(parameterURL.indexOf('?')== -1){
    alert('올바른 접근이 아닙니다.');
    // 첫페이지로 이동
    location.href = 'Get01.html';
}
// split(자를기준 문자열) => 배열데이터가 됨!
// 1) ?(물음표)로 잘라서 뒷 글자 가져오기 : get방식 전송 데이터
parameterURL = parameterURL.split('?')[1];
// 2) =(이퀄)로 잘라서 뒷 글자 가져오기 : 키=값에서 값 들고오기
parameterURL = parameterURL.split('=')[1];
// 3) 인코딩처리 된 문자열 디코딩하기
parameterURL = decodeURIComponent(parameterURL);

console.log('URL:',parameterURL);

/// 데이터 셋업하기! //////
let sdata = {
    레드샵: {
        배경색: "red",
        이미지: "shop_red.jpg",
    },
    오렌지샵: {
        배경색: "orange",
        이미지: "shop_orange.jpg",
    },
    블루샵: {
        배경색: "cornflowerblue",
        이미지: "shop_blue.jpg",
    },
    블랙샵: {
        배경색: "black",
        이미지: "shop_black.jpg",
    },
    그린샵: {
        배경색: "green",
        이미지: "shop_green.jpg",
    },
}; ///////// sdata객체 /////////////

console.log('매칭data:',sdata[parameterURL]);

// 대상선정
const title = document.querySelector('#title');
const main = document.querySelector('#main');

// 페이지 세팅하기
title.innerText = parameterURL;
title.style.backgroundColor = sdata[parameterURL].배경색;
main.style.background = `url(./images/${sdata[parameterURL].이미지}) no-repeat center/cover`;
