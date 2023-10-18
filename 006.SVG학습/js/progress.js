/* 프로그레스 페이지 JS - progress.JS */

// 요구사항 1 : 원형 SVG를 각 %를 다르게하여 숫자%와 함께
// 진행율을 애니메이션하여 표현한다.
console.log('%c펭수!','font-size:16px;color:coral')
// 1) 대상 선정 
// 1-1) 이벤트 대상: .act button
const btnAct = $('.act button');
// 1-2) 변경 대상: 퍼센트 원 .btns
const btns = $('.btns');
// 1-3) 변경 대상: 진행바 .lineper
const lineper = $('.lineper');

// 대상.click()하면 계속 이벤트 적용되므로
// 대상.onc('click',함수) 한번만 이벤트를 적용하는 메서드 사용!

// 2) 이벤트 설정
btnAct.one('click',function(){ // 1회성 실행
// btnAct.click(function(){
    let btxt = $(this).text();
    console.log(btxt);
    
    // 1. 버튼별 분기하기
    if(btxt == '팽수1'){ // 팽수1 클릭
        progFn(0,65);
        progFn(1,40);
        progFn(2,90);
        progFn(3,75);
        // $(this).css({pointerEvents: 'none'}); 버튼죽이기
    }else if(btxt == '팽수2'){ // 팽수2 
        // [ 내부에서 재귀호출하기 ]
        // 1. 대상 선정 : 바 수치 .ltxt b, 바 이미지 .lbar
        let barTxt = lineper.find('.ltxt b');
        let num = barTxt.text();
        let barBox = lineper.find('.lbar')
        // 2. 반복 실행부 함수화하기
        const progBar = () =>{
            // 1. num증가
            num++;
            // 2. 퍼센트 수치 반영
            barTxt.text(num);
            barBox.css({width: num + '%'});
            // 3. 재귀호출
            setTimeout(()=>{
                if(num<100) progBar();
            }, 40);
            if(num==100){
                console.log('음악틀어!');
                // 이미 페이지에 삽입 된 오디오를 재생시킨다
                /*
                    [ 비디오 / 오디오 ]
                    재생 메서드 : play()
                    멈춤 메서드 : pause()
                    -> Javascript에서 사용 
                    선택요소.play();
                    -> jQuery에서 get(0) 메서드사용
                    $(선택요소).get[0].play()
                    $(선택요소)[0].play()      
                */
                // $('#myaud').get(0).play();
                document.querySelector('#myaud').play();
            } ////////if//////////
        } ///////////progBar 함수 ////////////

        // 최초호출
        progBar();

    } //////////if문//////////////
}); ////////////click이벤트//////////

/*******************************************
    함수명 : progFn
    기능 : %증가에 따른 숫자,그래프 변경
*******************************************/
function progFn(seq,max){
    // seq-해당순번, max-최대퍼센트

    // [1] 숫자 퍼센트 증가
    // 1. 해당 순번의 자식요소인 숫자요소
    let pertxt = btns.eq(seq).find('.ptxt');
    // 2. 퍼센트 증가 : 읽어온 숫자를 1씩 증가시킨다
    let num = pertxt.text(); // 문자형 숫자
    num++;
    // 3. 개별 숫자 반영하기
    pertxt.text(num);
    // [2] SVG원 퍼센트 증가
    // 1. 해당 순번의 svg원
    btns.eq(seq).find('.c1')
    // 2. css를 조정
    .css({
        strokeDashoffset: (300-num*3)+'%'
        // strokeDashoffset: (300*(100-num)/100)+'%'
    });
    /*
        수치계산법 : 
        전체값 * (100 - 현재퍼센트 수치)/100 = 원하는 값
    */

    // 4. 재귀호출하기 : 기준수보다 작을 동안 타임아웃 호출
    if(num < max){
        // seq-해당순번, max-최대퍼센트
        setTimeout(()=>{
            progFn(seq,max);
        },40);
    } //////if////////
} //////////////progFn 함수///////////////