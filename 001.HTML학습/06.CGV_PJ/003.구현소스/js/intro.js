// 인트로 페이지 JS - intro.js

// 비디오가 모두 플레이 종료되면 main.html 이동
// 클릭하면 이동

// 1. 대상선정 #myvid
const myvid = document.querySelector('#myvid');
// 2. 이벤트 지정 : timeupdate -> 동영상이 재생중 발생 이벤트
myvid.addEventListener('timeupdate',()=>{
    //  1. 동영상 멈춤여부 알아내기 함수
    // 비디오요소.paused => 멈추면 true
    let isStop = myvid.paused;
    console.log('동영상 재생 중~',isStop);
    // 2. 멈췄으면 페이지 이동
    if(isStop){
        location.href = 'main.html';
    }
}); ///////////timeupdate함수////////////////////