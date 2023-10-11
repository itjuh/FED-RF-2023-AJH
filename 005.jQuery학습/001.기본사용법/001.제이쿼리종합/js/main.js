// 미니언즈 좀비 탈출 애니 구현 JS - main.js

/*********************************** 

[ 요구사항정리 ]
1. 버튼을 클릭하여 미니언즈가
순서대로 특정위치로 이동하며
메시지를 보여준다
2. 각 위치별 좀비를 등장시킨다
3. 맨윗층에서 탈출할때 헬기를 사용한다

[ 변경대상 ]
1. 주인공 미니언즈
2. 좀비 미니언즈들
3. 주사기
4. 헬기

[ 이벤트와 이벤트대상  ]
1. 이벤트 : 클릭이벤트
2. 이벤트대상 : 버튼들
3. 기능구분 : 버튼글자(지시사항)

***********************************/

// 0. 주인공들 변수에 할당!
// (1) 미니언즈
const mi = $('.mi');
// (2) 건물 li
const room = $('.building li');
// (3) 버튼들
const btns = $('.btns button');
// (4) 메세지박스
const msg = $('.msg');
// (5) 좀비, 주사기 요소 변수처리
let mz1 = `<img src="./images/mz1.png" alt="좀비1" class="mz">`; //좀비1
let mz2 = `<img src="./images/mz2.png" alt="좀비2" class="mz">`; //좀비2
let zom = `<img src="./images/zom.png" alt="좀비들" class="mz">`; //좀비들
let inj = `<img src="./images/inj.png" alt="주사기" class="inj">`; //주사기

// console.log('대상들:',mi,room,btns,msg);

// 1. 건물 각 방에 번호넣기 + 좀비/주사기 넣기
// 대상: room
// 사용 제이쿼리 메서드
// (1) each((idx,ele)=>{}); : 요소의 개수만큼 순서대로 돌아줌
// (2) append(요소) : 선택요소 내부에 자식요소 추가하기(이동)
room.each((idx,ele)=>{
    // console.log(idx,ele);
    // 1. 각 방에 숫자로 순번 넣기
    $(ele).text(idx);
    // 2. 좀비/주사기 넣기
    switch(idx){
        case 9 :
            $(ele).append(mz1);
            break;
        case 7 :
            $(ele).append(mz2);
            break;
        case 2 :
            $(ele).append(inj);
            break;
        case 1 :
            $(ele).append(zom);
            break;
        
    } ///////////switch case
}); /////////each메서드///////////////////

// 좀비는 모두 숨기기
$('.mz').hide();
// 시간없는 hide()는 display:none처리함! 시간넣으면 애니메이션

// 2. 버튼세팅하기
// 대상 : btns
btns.hide().first().show();
// 버튼들.숨겨().처음건().보여줘()

// 3. 미니언즈 공통 기능 함수 ///////////////////////////////
// (1) ele 클릭 된 버튼요소
// (2) seq 이동할 li 순번
// (3) fn 이동 후 실행할 함수(콜백함수)
const actMini = (ele, seq, fn)=>{

}; ///////////////actMini에 익명함수 할당///////////////////

// 4. '들어가기' 버튼 클릭 시//////////////////////////
btns.first()
    .click(function(){
        // 이동하기
        // 원리: 이동 할 li방 위치값을 읽은 후 이동하기

        // 0. 메세지 숨기기
        msg.fadeOut(300);

        // 1. 위치값 읽기
        let myRoom = room.eq(8);
        // 위치값 배열변수
        let pos = [];
        // top위치값
        pos[0] = myRoom.offset().top;
        pos[1] = myRoom.offset().left;
        console.log(pos);

        // 2. 이동하기
        // 대상: mi
        // animate({CSS설정},시간,이징,콜백함수)
        mi.animate({
            top: pos[0]+'px',
            left: pos[1]+'px'
        },800,"easeOutElastic",()=>{
            // 메세지변경(1초후 .3초동안)
            msg.html(`와~! 아늑하다!<br>옆방으로 가보자!`)
            .delay(1000)
            .fadeIn(300);
        }); //////animate/////////////

    }); ////////들어가기 버튼 종료///////////////////