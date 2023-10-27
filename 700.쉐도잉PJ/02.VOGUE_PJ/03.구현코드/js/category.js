// 보그PJ 카테고리 페이지 category.js

// json데이터 읽어오기
import catagoryData from './data/category_data.json' assert{type:'json'};
// console.log(catagoryData);

////////////////////////////////////////////////////////
// 카테고리페이지 기능 구현하기 //////////////////////////
// 요구사항 : url로 전달 된 키값을 읽어서 페이지 셋업하기//
////////////////////////////////////////////////////////

// 1. url 전체 읽기
let parameter = location.href;

// 값 처리하기 함수 호출
setValue();

// 값 셋팅하기 함수!!////////////
function setValue(){
    // 2. url 키값 분리하기(?있는지 확인)
    // ?는 Get방식의 시그널이므로 이것의 존재 여부로 문자자르기
    try{
        if(parameter.indexOf('?') == -1 ||
            parameter.indexOf('=') == -1){
            throw '잘못 된 접근입니다.';
        } 
    }catch(err){ // throw의 값을 err로 받음 
        // 에러 메세지 띄우기
        alert(err);
        // 메인으로 보내기
        location.href = 'index.html';
    } ////////try catch///////////
    // 3. 값 추출하기
    parameter = parameter.split('?')[1].split('=')[1];
    // 특수문자 변환하기 : time & gem때문
    parameter = decodeURIComponent(parameter);
    
    // 4. 카테고리 데이터 매칭하기
    // json파일 객체데이터 속성으로 선택함
    const selData = catagoryData[parameter];
    console.log(selData);

    // 5. 데이터 바인딩하기
    // 5-1. 배경 이미지를 위한 클래스 주기
    // ' & '를 '-'로 변경하기 : time-gem
    $('.main-area').addClass(parameter.replace(' & ','-'));
    // 5-2. 제목 바인딩
    $('.cat-tit').text(selData['제목']);
    // 5-3. 메뉴 변경하기
    // 1) 대상 : .lnb
    let lnb = $('.lnb');
    // 2) 메뉴데이터 : selData.메뉴
    let mData = selData.메뉴;
    // 3) 메뉴리턴함수
    const retMenu = () => mData.map(v=>`<li><a href="#">${v}</a></li>`).join('');
    // 4) 메뉴데이터 분기하기
    if(mData == '없음'){
        lnb.remove();
    } else{
        lnb.html(`<ul>${retMenu()}</ul>`);
    } ////////if else //////////////
    // 5-4. 서브타이틀 바인딩 $(선택자).each((순번,요소)=>{구현부});
    $(selData['타이틀']).each((i,v)=>{
        $('.cat-cont-area h2').eq(i).html(v);
    });
    // 5-5. 탭 메뉴 타이틀 바인딩
    // 형식: 카테고리명 | 보그 코리아 (Vogue Korea) 2023
    // 제이쿼리 prepend() 메서드 사용 -> 자식요소 또는 내용의 맨 앞에 넣기
    $('title').prepend(parameter.toUpperCase()+' | ');
    
} ////////////////setValue함수/////////////////

