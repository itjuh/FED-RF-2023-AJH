// Postit 메인 JS - 제이쿼리 UI드래그 & 드롭 기능 활용하기////////////////


$(()=>{ // jquery 코드구역 : html 로딩 후 실행구역(DOMContentLoaded)
    // 1. 드래그 기능 대상 : .draggable
    const dragEle = $('.draggable');
    // 2. 드래그 기능 설정하기 : draggable() 메서드 호출
    // dragEle.draggable() 호출만 해도 드래그 기능 됨!
    // 드래그 기능 옵션은 {}객체로 전달
    dragEle.draggable({
        cursor:'grabbing', // 커서모양 '쥔 주먹'으로 변경
        stack:'.draggable', // 드래그 대상 상위처리 (z-index)
        opacity: 0.7, // 이동중 반투명
    });
    // 3. 상세 요구사항 반영하기
    // 드래그 중 포스트잇 이미지 변경하기
    // .invert 를 .draggable에 주면 배경이미지 변경 됨
    // 제이쿼리에 미리 만들어지지 않은 이벤트는 일반적으로 on(이벤트명,함수) 사용
    // 3-1. 드래그 시작 이벤트: dragstart -> 이미지 변경
    dragEle.on('dragstart',function(){
        // console.log('드래그 시작:',this);
        $(this).addClass('invert');
    }); ////////// dragstart 이벤트 함수 //////////////////
    // 3-2. 드래그 종료 이벤트: dragstop -> 이미지 복귀
    dragEle.on('dragstop',function(){
        // console.log('드래그 끝:',this);
        $(this).removeClass('invert');
    }); ////////// dragstop 이벤트 함수 //////////////////
    // 4. 드롭대상 박스에 드롭될 때 동영상 보여주기
    // droppable() 메서드 : 드롭되는 요소처리
    // 이벤트 대상 : .dropshow

    $('.dropshow').droppable({
        drop:function(evt,ele){
            // evt-이벤트전달변수 ele-드롭객체
            // 드롭된 요소는 ele.draggable
            let target = ele.draggable;
            console.log('나, 빠졌다~',ele.draggable.find('p').text(), this);
            // 1. 드롭된 요소의 이미지 src를 읽어오기
            let isrc = target.find('img').attr('src');
            console.log(isrc);
            
            // 2. 드롭영역의 배경 이미지 변경하기
            $(this).css({
                backgroundImage:`url(${isrc})`,
                // 3. 드롭된 자식요소 글자 읽어와서 넣기
            }).text(target.find('p').text()+'당첨~~!!');

            // 4. 드롭된 요소 사라지기
            target.hide();

            // 5. 유튜브 동영상 박스 넣기
            // 넣을 대상 :.u-box
            $('.u-box').html(`
                <div id='mbox'>
                    <!-- 닫기버튼 -->
                    <a href='#'>×</a>
                <div>
            `);
            // 6. 생성 된 유튜브 박스 CSS셋팅하기
            let mbox = $('#mbox');
            mbox.css({
                position:'fixed',
                top:0,
                left:0,
                width:'100%',
                height:'100%',
                zIndex:999,
                backgroundColor:"#000",
            }).find('a').css({
                position: "absolute",
                top: "50px",
                right: "50px",
                width: "50px",
                height: "50px",
                textDecoration: "none",
                font: "bold 48px Verdana",
                color: "#fff",
                textShadow: "0 0 5px #777",
                zIndex: 1000,
            })
            // 닫기버튼 클릭 시
            .click(function(){
                // 1. mbox닫기
                mbox.slideUp(1000,function(){
                    // 2. 자기자신 없애기 this-mbox
                    $(this).remove(); // 태그제거
                    // 3. 드롭된 요소 다시 보이기(원래 위치로)
                    target.css({
                        top:"0",
                        left:"0",
                    }).show();
                }); ////////slideUp /////////////
                // 4. 여기에 드롭하세요 다시 바꾸기
                $('.dropshow').text('여기에 드롭하세요~~!').css({
                    backgroundImage:'url(addimg/effect2.jpg)',
                });
            });
            
            // 7. 동영상박스에 유튜브 iframe 넣기
            // html()로 넣으면 닫기버튼 지워짐
            // 맨 뒤에 요소추가는 append() 메서드!
            // 동영상 아이디 정보는 드래그 된 요소(target)의 data-mv 속성의 값으로 셋팅되어 있다.
            // 속성값 읽어오기는 선택요소.attr(속성명)
            mbox.append(`
            <iframe src="https://www.youtube.com/embed/${target.attr('data-mv')}?autoplay=1" allow="autoplay" style="width:100%;height:100%;border:none;"></iframe>
            `)
            // 8. 동영상 박스 숨기고 1초 후 slideDown으로 보이기
            .hide().delay(1000).slideDown(2000);

        }, ///////drop이벤트 옵션 메서드
    }); ////////////droppable 메서드 ////////////

}); //////////////////JQB//////////////////////