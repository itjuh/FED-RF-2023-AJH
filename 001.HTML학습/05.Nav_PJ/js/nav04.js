// 네비게이션 유형 4 JS - nav04.css

const domFn = {
    // 요소선택함수 ////////
    qs: (x) => document.querySelector(x),
    qsEl: (el, x) => el.querySelector(x),
    qsa: (x) => document.querySelectorAll(x),
    qsaEl: (el, x) => el.querySelectorAll(x),
  
    // 이벤트셋팅함수
    addEvt: (ele, evt, fn) => ele.addEventListener(evt, fn),
}; /////// domFn 객체 /////////////

// 1. 구현 요구사항
// 상위메뉴 클릭 시 하위메뉴 나타나기
// 영역을 벗어날 때 하위메뉴 닫기

// 2. 대상선정
// 2-1. 이벤트 대상  .gnb>ul>li
// 2-2. 변경대상     .smenu ->클릭 된 이벤트 대상의 하위요소만
const gnbList = domFn.qsa('.gnb>ul>li'); 
// console.log('gnbList :',gnbList);

// 3. 이벤트 설정하기
gnbList.forEach(ele=>{
    domFn.addEvt(ele,'click',showSub);
}); /////////////forEach //////////////////

// 4. 함수 생성하기
function showSub(){
    // console.log('showSub함수 호출, 누른대상 this는??',this);
    // 4-1. 서브메뉴 유무판별
    // -> .smenu가 하위에 있는지
    let isSub = domFn.qsEl(this,'.smenu');
    // console.log('서브 있나?',isSub);

    // 조건문 조건식에 null값은 false처리됨
    if(isSub){ //서브가 있으면 들어감
        // console.log('있음');
        // 4-2. 서브메뉴 내부 ol박스 높이값 읽기!
        let olHv = domFn.qsEl(isSub,'ol').clientHeight;
        console.log('구해온 ol의 높이는?',olHv);
        // 4-3. 현재 li에 높이값 적용하기
        // 토글기능 구현 : li가 이미 높이가 있으면 0 아니면 적용
        // isSub.clientHeight==0?olHv:0
        isSub.style.height = (isSub.clientHeight==0?olHv:0) + 'px';
        // 4-4. 누른대상이 아닌 요소를 닫기
        // gnb안에 li를 전체 다 돌면서
        gnbList.forEach(ele=>{
            // 처리대상 변수
            let target = domFn.qsEl(ele,'.smenu');
            // 요소.isSameNode(비교요소)
            // 결과 : 같으면 true, 다르면 false값 리턴
            let result = ele.isSameNode(this);
            // console.log('같니? ',result, ele);
            // false일 때 true처리 하려면 논리부정(!)사용
            if(!result){ //누른값과 다르면 들어감
                if(target){ //서브가 있으면 들어감
                    target.style.height = '0px';
                    // 결과 처리하기: false일때만 높이값 0처리
                } ///////// if///////////
            } /////// if///////////
        }); /////////forEach////////////
    }else{ //서브가 없으면 들어감
        // 4-5. 모든 서브메뉴 닫아주기
        gnbList.forEach(ele=>{
            // 처리대상 변수
            let target = domFn.qsEl(ele,'.smenu');
            if(target){ //서브가 있으면 들어감
                target.style.height = '0px';
                // 결과 처리하기: false일때만 높이값 0처리
            } ///////// if///////////
        }); /////////forEach////////////
    }////////else///////////////
} /////////showSub ////////////////////