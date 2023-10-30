// 아이스크림 갤러리 JS - icecream.js

$(()=>{
    /*
    요구사항 : 음료 이미지를 드래그하여 이동
                양 끝 쪽에 이동 한계값 설정
    */
    
    // 0. 변수설정
    // 1) 트랜지션 시간설정 변수
    // 데스트탑하고 모바일이 좀 달라야 자연스러움
    // 이징에 in이 들어가면 처음에 답답함
    const TRS_TIME_DT = '.8s ease-out';                
    const TRS_TIME_MOB = '.2s ease-out'; 
    // 2) 화면크기 업데이트 함수
    const updateWin = () => $(window).width();
    // 3) 최초 화면크기 윈도우 가로크기 업데이트
    let winW = updateWin();
    // console.log('최초 화면 가로크기 :',winW);

    // 1. 대상선정 : #move
    // 아이스크림 리스트를 모두 담고있는 박스

    // 2. 변경내용 
    // 2-1. 제이쿼리 ui 드래그 설정하기
    const target = $('#move');
    target.draggable({
        // x축 고정
        axis:'x'
    })
    // -> 트랜지션 모바일/DT에 따라서 전환하기
    .css({
        transition:(winW<500?TRS_TIME_MOB:TRS_TIME_DT),
        cursor:'grab'
    }); //////////// css //////////////////

    // 2-2. 이동 한계 값 설정하기
    // 화면크기 변경 시 업데이트 
    $(window).resize(()=>{
        // 1) 가로크기 업데이트
        winW = updateWin();

        // 2) 한계 값 업데이트 왼쪽제한,오른쪽제한
        firstPoint = winW/3;
        lastPoint = target.width() - winW * 2/3;
        // console.log('크기 변경 시 화면 가로크기 :',winW);
        // console.log('왼쪽 한계값 firstPoint',firstPoint);
        // console.log('오른쪽 한계값 lastPoint',lastPoint);

        // 3) 트랜지션 모바일/DT에 따라서 전환하기
        target.css({transition:(winW<500?TRS_TIME_MOB:TRS_TIME_DT)});
    }); ///////////resize////////////////

    // 4) 최초 한계값 설정하기 : 가로크기의 1/3
    let firstPoint = winW/3;
    
    // 5) 마지막 한계값 설정하기
    let lastPoint = target.width() - winW * 2/3;

    // 2-3. 이벤트 발생 시 left값 체크하여 제한하기 /////
    // on(이벤트명, 함수)
    // -> 이벤트 명을 띄어쓰기로 여러개 설정할 수 있음!
    // 기존 JS는 addEventListener()를 이벤트마다 등록해야 했음

    // 이벤트 대상 : html, body
    // 이벤트 종류 : 
    // - mousedown  마우스 왼쪽버튼 내려갈 때
    // - mouseup    마우스 왼쪽버튼 올라올 때
    // - mousemove  마우스 움직일 때
    // -> 모바일 터치 이벤트는 제이쿼리 터치펀치에서 처리함
    // touchstart touchend touchmove
    // $('html,body').on('drag keydown',()=>{
    $('html,body').on('mousedown mouseup mousemove',()=>{
        // 1) 움직이는 대상 left위치값
        let tgPos = target.offset().left;
        // console.log(tgPos);
        // 2) 처음값 체크하여 제한하기
        if(tgPos>firstPoint){
            // 첫 한계값에 고정
            target.css({left:firstPoint+'px'});
        }
        // 3) 마지막 한계값을 고정
        // left의 값이 마이너스 값이므로 -lastPoint로 계산
        else if(tgPos < lastPoint*-1){
            target.css({left: -lastPoint + 'px'});
        }
    }); ///////이벤트 설정 //////////////
}); ///////////////////JQB////////////////////////