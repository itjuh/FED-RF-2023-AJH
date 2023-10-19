// 캘린더 메인 js

// 달력컴포넌트 불러오기
import DalCom from "./calendar.js";


// 달력만들기
// 달력컴포넌트 호출하여 달력 세팅하기!
// 대상 : .dalcom1, ..dalcom2
new DalCom('.dalcom1');

// 생성해서 쓰는 경우에 꼭 변수에 담아야 할까?
// -> 안쪽으로 접근 할 경우는 담는게 좋음
const dc2 = new DalCom('.dalcom2');

// 요구사항 : 두번째 달력은 다음달 달력이 처음에 출력되게 함
// 다음 달 달력을 쓸 수 있게 이전/다음달 달력 변경 내부함수를 
// 생성자함수에 this키워드로 등록하여 노출해야 한다!!!
// let a = ()=>{} 변수함수를 this.a=()=>{} 이처럼 생성자 함수에 등록하여
// 인스턴스생성 시 접근 할 수 있도록 한다.
dc2.chgCalender(1);

///////////////////////////////////////
// 제이쿼리로 달력컴포넌트 사용할 때 ////
// 추가기능 구현하기 ///////////////////

// 1. 대상선정 : 달력 .calendar .main
const datesBox = $('.calendar .main');
console.log(datesBox);

// 2. 이벤트 설정하기 : mouseenter
// - 마우스가 달력박스 안에 들어갔을때 처리
// 이벤트처리 on(이벤트명,함수)
// datesBox.on('mouseenter',()=>{
datesBox.mouseenter(function(){
    // this - 선택달력 .calendar .main
    console.log(this,'나달력');
    // 선택 달력 하위 .date를 클릭하면
    // 히든필드 데이터 읽어오기
    $(this).find('.date').click(()=>{
        // 제이쿼리는 value대신에 val()메서드
        let myData = $(this).next().val();
        
        myData = myData.split('/');
        // 달력 인스턴스 생성 시 노출된 속성/메서드 중
        // addZero() - 자리수처리(2자리수로 변환)
        // week[] - 한글 요일 변환배열
        // 생성 된 인스턴스 dc2로부터 얻을 수 있다.
        myData = 
            myData[0]+'년 '+dc2.addZero(myData[1])+'월 '+dc2.addZero(myData[2])+'일('+dc2.week[myData[3]]+'요일)';
        // $(this).parents().prev().val(myData);
        $(this).parents('.calendar').parent().prev().val(myData);
        // parent() 한단계 위의 부모요소
        // parents(특정요소) 부모들 중 특정요소
    });
}); ////////////////mouseenter///////////////

// 달력박스 원할 때 보이기, 숨기기 처리
// 1. 대상선정 : .calendar
const calBox = $('.calendar');

// 2. 보이기처리 : input박스 클릭 시 보임
$('.dalcom input').click(function(){
    // input 다음에 하위 .calendar 찾아서 보여!
    $(this).next().find('.calendar').show();
}); /////////click//////////////////

// 3. 달력 처음에 숨기기 + 떠날 때 숨기기
calBox.hide().mouseleave(function(){
    $(this).hide();
}); ///////mouseleave//////////////
