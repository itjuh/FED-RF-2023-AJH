// JS3-4. for문연습2 : 쇼핑몰 상품 리스트 - for_ex2.js

// 1. 변경대상 : .list-box
var list_box = document.querySelector('.list-box');
// 확인
console.log('리스트박스',list_box);

// 2. 입력 코드 만들어 넣기
// 변수 만들기 : 전체코드변수(문자형 리터럴 -> +=사용 시 에러방지)
var hcode = '';

// 코드생성 시작
hcode += '<ul>';

// 반복코드
// for(시;한;증){코드}
for(var i = 0; i < 50; i ++){
    hcode += `
        <li>
            <img src="./images/dress/${i+1}.jpg" alt="dress">
            <div class="item-info">
                <h3>상품명${i+1}</h3>
                <h4>가격${1+1}</h4>
            </div>
        </li>
    `;
} /////////// for문 /////////////

// 코드 마무리
hcode += '</ul>';

// 3. 대상에 넣기
list_box.innerHTML = hcode;
