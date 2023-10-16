// JS4-4. 배열의 정렬과 검색 JS

// DOM메서드
import dFn from "./dom.js";

// console.log(dFn);

/**************************************************************
    [ JS 배열의 정렬 ]

    용어의 정의: 정렬이란?
        -> 배열의 값을 기준으로 순서를 다시 정하는것!
        -> 배열의 정렬은 sort() 메서드 사용!
    sort() 메서드를 사용하여 배열의값을 오른차순,내림차순으로 정렬할 수 있음!

    [ sort() 메서드의 특징 ]

    1. 기본정렬 : 
        오름차순(1,2,3,.../a,b,c,...) -> sort()
        내림차순 메서드 -> reverse()
    2. 원리 : 
        배열 값을 문자열로 캐스팅(형 변환)한 후 변환 된 문자열을 비교하여 순서를 결정함
        (참고: undefined 값일 경우 배열 맨뒤에 배치함)
        ***주의: 숫자를 비교해도 문자열로 비교함
        "25"와 "100"중 큰 숫자는 100이지만 문자형으로 비교하여 
        앞자리인 1과 2를 먼저 비교하여 "25"를 더 크게 정렬함

    [ sort() 메서드 비교함수 ]

    -> sort() 메서드 내부에 2개의 전달값을 가지는 함수를 쓰면
    sort메서드 자체에서 값을 비교하여 배열값의 순서를 바꾼다!
    -> 숫자일 경우 빼기 연산을 함
    ((오름차순))
    배열변수.sort() -> 기본정렬
    숫자데이터배열.sort(function(a,b){return a-b;})
    숫자데이터배열.sort((a,b)=>a-b)
    ((내림차순))
    배열변수.reverse() -> 기본정렬
    숫자데이터배열.sort(function(a,b){return b-a;})
    숫자데이터배열.sort((a,b)=>b-a)
    -> a는 앞 데이터, b는 뒷 데이터


    ->>> 숫자형, 문자형에 무관하게 처리하기
    [ sort() 메서드만 사용하여 정렬잡기 ]

    (비교함수사용)
    배열변수.sort(function(x,y){
        if(x>y) return 1;
        if(x<y) return -1;
        return 0;
    })
    
    -> 단순화하기(삼항연산자사용!)
    배열변수.sort(function(x,y){
        return x == y ? 0 : x > y ? 1 : -1;
    })
    -> 더 단순화 하기
    배열변수.sort((x,y)=>x==y?0:x>y?1:-1);

    -> 리턴값의 의미(오름차순)
    1) if(x>y) return 1; -> x가 y뒤에 옴 (리턴값 양수)
    2) if(x<y) return -1; -> x가 y앞에 옴 (리턴값 음수)
    3) return 0; -> x,y 정렬을 유지 (리턴값 0)

    -> 내림차순은 양수/음수만 반대로 써주면 된다!

    [ 정렬시 데이터 유의사항 ]
    1. 문자형일 경우 대소문자가 섞여있으면 대문자나 소문자중
    하나로 통일하여 비교해야함(toUpperCase()/toLowerCase())
    예)
    배열변수.sort((x,y)=>{
        let a = x.toUpperCase(),
            b = y.toUpperCase();
        
        return a == b ? 0 : a > b ? 1 : -1;
    })

    2. 날짜정렬도 숫자와 동일함(날짜데이터 자체가 숫자형으로 되어있음)

    3. 특정언어의 특수문자일 경우 localeCompare() 메서드로 
    문자열 비교를 한다!
    예) 특수문자 x변수를 y변수와 변환후 비교 
    x.localeCompare(y)

*************************************************************

    [ 배열의 검색 : find() / filter() / indexOf() ]

    1. find() 메서드
    (1) 검색후 첫번째 일치값 하나만을 리턴
    (2) 결과가 없으면 undefined 리턴(if문에서 false처리!)
    (3) 콜백함수구성 : function(val,idx,obj){}
        1) val : 처리중 배열의 값
        2) idx : 처리중 배열의 순번
        3) obj : 처리중 배열전체
    (4) 리턴데이터 : 배열의 값 하나(값의 데이터형)
    (5) 활용케이스 : 아이디검사 결과 리턴
    (6) 코드예 :
        변수 = 배열.find(v=>{
            if(v[속성명].indexOf(검색어)!==-1) return true;
        })
        -> 배열을 자동순회하여 if문에 해당되는 데이터가 있으면
        return true 하여 할당된 변수에 저장하고 문장이 바로 끝난다!


    2. filter() 메서드
    (1) 검색후 모든 일치값을 리턴
    (2) 결과가 없으면 빈배열 리턴([]->배열.length 값이 0)
    (3) 콜백함수구성 : function(val,idx,obj){}
        1) val : 처리중 배열의 값
        2) idx : 처리중 배열의 순번
        3) obj : 처리중 배열전체
    (4) 리턴데이터 : 배열형데이터(하나여도 배열값으로 넘어옴!)
    (5) 활용케이스 : 검색리스트 결과 리턴
    (6) 코드예 :
        변수 = 배열.filter(v=>{
            if(v[속성명].indexOf(검색어)!==-1) return true;
        })
        -> 배열을 자동순회하여 if문에 해당되는 데이터가 있으면
        return true 하여 다른값이 계속 나올때까지 배열로 값을
        할당변수에 저장한다!(배열을 전체순회함!)

    3. LIKE 검색방법 : 값의 일부만 넣어도 검색되는 방법
    -> indexOf(값) 을 사용함!
    결과값으로 문자열의 위치순번을 리턴하는데
    만약 없으면 -1을 리턴하므로 이것을 이용하여 
    조건문에 -1이 아닌경우가 검색결과가 있는 경우가 됨!
    예) 
    if(문자열.indexOf(검색문자열)!==-1){결과리턴}

**************************************************************/


// 숫자값 배열
// const arrNum = [4, 5, 8, 10, 2, 1, 9, 3, 7, 6, 4, 5, 8, 10, 2, 1, 9, 3, 7, 6, 4, 5, 8, 10, 2, 1, 9, 3, 7, 6];
const arrNum = [4, 5, 8, 10, 2, 1, 9, 3, 7, 6];
// 문자값 배열
const arrStr = ["파", "타", "하", "가", "바", "사", "다", "라", "차"];

// console.log(arrNum,"숫자배열정렬",arrNum.sort(),arrStr,"문자배열정렬",arrStr.sort());
// console.log(arrNum,"숫자배열정렬",arrNum.reverse(),arrStr,"문자배열정렬",arrStr.reverse());

//////////////////////////////////////////////////////////
//// 배열데이터 화면 출력하기 /////////////////////////////
// 1. 숫자배열의 화면 뿌리기 -> map()으로 태그감싸기 ///////
// (1) 대상선정 : .showNum
const showNum = dFn.qs('.showNum');
// (2) 배열 숫자 데이터만큼 이미지로 변환하여 출력
// showScreen에 함수 할당
const showScreen = () => showNum.innerHTML = arrNum.map(val=>`<img src="./images/num/num_0${val}.png" alt="숫자${val}이미지">`).join('');

// 최초출력
showScreen();

// 헷갈리면 참고하세요!!!!!

// let count = 0;
// arrNum.sort((a,b)=>{
//     console.log('a:',a,'b:',b,'count: ',count);
//     // console.log('a>b?',a>b,'return값 :',a == b ? 0 : a > b ? 1 : -1);
//     console.log('a==b?',a==b,'a>b?',a>b,'return값 :',a == b ? 0 : a > b ? 1 : -1);
//     count++;
//     return a == b ? 0 : a > b ? 1 : -1;
// });

// (3) 정렬 기준에 따라 선택박스 변경 이벤트 발생 시 정렬 변경하기(오름차순/내림차순)
//  a. 변경대상: #sel
const selBox = dFn.qs('#sel');
//  b. 이벤트 연결하기: 종류 - change
dFn.addEvt(selBox,'change',function(){
    // ㄱ. 선택옵션 value값 읽어오기
    let optVal = this.value;
    console.log('숫자 정렬변경:', optVal);
    // ㄴ. 정렬 분기하기 : 1 - 오름차순, 2 - 내림차순
    if(optVal==1){ // 오름차순
        //sort() 빼기연산 처리 : 앞수-뒷수
        // arrNum.sort((a,b)=>a-b);
        arrNum.sort((a,b)=>a==b?0:a>b?1:-1);
    }else if(optVal==2){ // 내림차순
        //sort() 빼기연산 처리 : 뒷수-앞수
        // arrNum.sort((a,b)=>b-a);
        arrNum.sort((a,b)=>a==b?0:a>b?-1:1);
    } //////// else if /////////////

    // 화면출력 -> 원본 배열의 정렬이 변경 됨
    showScreen();
}); ///////change이벤트 함수//////////////

/////////////////////////////////////////////////////////
// 2. 문자배열의 화면 뿌리기 -> map()으로 태그감싸기 ///////
// (1) 대상선정 : .showNum2
const showNum2 = dFn.qs('.showNum2');
// (2) 배열 숫자 데이터만큼 이미지로 변환하여 출력
// showScreen에 함수 할당
const showScreen2 = () => showNum2.innerHTML = arrStr.map(val=>`<span>${val}</span>`).join('');

// 최초출력
showScreen2();

// (3) 정렬 기준에 따라 선택박스 변경 이벤트 발생 시 정렬 변경하기(오름차순/내림차순)
//  a. 변경대상: #sel2
const selBox2 = dFn.qs('#sel2');
//  b. 이벤트 연결하기: 종류 - change
dFn.addEvt(selBox2,'change',function(){
    // ㄱ. 선택옵션 value값 읽어오기
    let optVal = this.value;
    console.log('문자 정렬변경:', optVal);
    // ㄴ. 정렬 분기하기 : 1 - 오름차순, 2 - 내림차순
    if(optVal==1){ // 오름차순
        // sort()메서드 내부함수 사용법
        arrStr.sort((a,b)=>a==b?0:a>b?1:-1);
        // a==b 0 리턴 -> 그대로
        // a>b일 때 true이면 1 리턴 -> 순서바꿈
        
        // 오름차순 기본 메서드 : arrStr.sort();
        // arrStr.sort();
    }else if(optVal==2){ // 내림차순
        arrStr.sort((a,b)=>a==b?0:a>b?-1:1);
        // a>b일 때 true이면 -1 리턴 -> 순서안바꿈

        // 내림차순 기본 메서드 : arrStr.reverse();
        // arrStr.reverse();
    } //////// else if /////////////

    // 화면출력 -> 원본 배열의 정렬이 변경 됨
    showScreen2();
}); ///////change이벤트 함수//////////////

/////////////////////////////////////////////////
// 3. 객체 데이터 배열의 정렬 ////////////////////

// 1) 객체데이터배열
const list1 = [
    {
        idx: 8,
        tit: "나는 누구?",
        cont: "공동구매) 슬로건 공구 (계좌와 네이버폼)",
    },
    {
        idx: 4,
        tit: "여기는 어디?",
        cont: "총공 공지] 오늘부터 일 2회, 총공 진행합니다",
    },
    {
        idx: 1,
        tit: "나야나",
        cont: "연합 갈라 서포트 계좌오픈",
    },
    {
        idx: 15,
        tit: "이제 얼마나 남은거니?",
        cont: "음악프로그램에 출연 요청글도 써볼까요?",
    },
    {
        idx: 12,
        tit: "웰시코기의 귀여움에 대하여",
        cont: "털이 폭신폭신 너무 귀여워요",
    },
    {
        idx: 3,
        tit: "오늘의 런데이일정",
        cont: "서울숲 7번출구 선착순 20명만 참석가능합니다.",
    },
]; /////////////// list1 /////////////

// 2) html 코드 생성하여 출력하는 함수 만들기
// upCode함수를 공통으로 파라미터 처리하기
const upCode = (data,exBox) => {
    // data - 객체데이터 배열
    // exBox - 출력박스
    // 반복코드 만들기
    // 대상코드 : 위에있는 list1 배열
    let hcode = data.map(val=>`
        <tr>
            <td>${val.idx}</td>
            <td>${val.tit}</td>
            <td>${val.cont}</td>
        </tr>
    `).join('');
    // console.log(hcode);
    // 테이블 생성코드 넣기
    exBox.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>내용</th>
                </tr>
            </thead>
            <tbody>
                ${hcode}
            </tbody>
        </table>
    `;
}; /////////upCode함수/////////////////

// 3) 요소에 데이터 코드 넣기
// 대상 : .showList3
const showList3 = dFn.qs('.showList3');
// 기본 테이블 모양 넣기
upCode(list1,showList3);

// 4) 정렬변경 이벤트 발생 시 실제 정렬 변경하기
// 이벤트 대상: .sel3(정렬옵션) .cta3(정렬기준)
const sel3 = dFn.qs('.sel3');
const cta3 = dFn.qs('.cta3');
// 정렬변경함수의 데이터 및 출력요소 셋팅변수
let targetData = list1;
// let targetEle = showList3;

// 이벤트 등록
dFn.addEvt(sel3,'change',()=>{
    targetData = list1;
    // targetEle = showList3;
});
dFn.addEvt(sel3,'change',sortingFn);
dFn.addEvt(cta3,'change',()=>{
    targetData = list1;
});
dFn.addEvt(cta3,'change',sortingFn);

// 앞에있는 형제요소 선택
// this.previousElementSibling
// this.nextElementSibling

// 정렬변경 함수 만들기
function sortingFn(){
    // 1. 선택값 담기 : select변경 값
    let optVal = this.value;
    // console.log('앞에 누구?',this.previousElementSibling); // 옵션 변경 시 null | 정렬변경 시 옵션
    // console.log('뒤에 누구?',this.nextElementSibling); // 옵션 변경 시 정렬 | 정렬변경 시 null
    // console.log(this,'바꿔',isNaN(this.value),sel3.value);
    // console.log(this.parentNode.nextElementSibling);
    // 2. 분기하기
    if(isNaN(optVal) && this.nextElementSibling.value!=0){ // 정렬이 선택 된 상태에서 옵션 변경
        // 정렬 기준 읽기
        let otherOpt = this.nextElementSibling.value;
        // 정렬 기준으로 분기(otherOpt)
        if(otherOpt==1){ //오름차순
            targetData.sort((a,b)=>{
                // a,b는 모두 객체데이터 
                // 따라서 내부 속성을 구체적으로 비교필요
                // 정렬옵션이 optVal에 담기므로 해당으로 데이터 읽어오기
                return a[optVal]==b[optVal]?0:a[optVal]>b[optVal]?1:-1;
            });
        }else{ // 내림차순
            targetData.sort((a,b)=>{
                return a[optVal]==b[optVal]?0:a[optVal]>b[optVal]?-1:1;
            });
        }
    }else if(!isNaN(optVal)){ // 옵션이 선택 된 상태에서 정렬 변경
        // 정렬옵션 읽기
        let otherOpt = this.previousElementSibling.value;
        // 정렬 기준으로 분기(optVal)
        if(optVal==1){ //오름차순
            targetData.sort((a,b)=>{
                // a,b는 모두 객체데이터 
                // 따라서 내부 속성을 구체적으로 비교필요
                // 정렬옵션이 otherOpt에 담기므로 해당값으로 데이터 읽어오기
                return a[otherOpt]==b[otherOpt]?0:a[otherOpt]>b[otherOpt]?1:-1;
            });
        }else{ // 내림차순
            targetData.sort((a,b)=>{
                return a[otherOpt]==b[otherOpt]?0:a[otherOpt]>b[otherOpt]?-1:1;
            });
        }
    }/////////else if///////////////
    // 정렬 선택 제어문(검색기능때문에 삭제)
    // else{ // 정렬이 선택 되지 않은 상태에서 옵션 변경
    //     alert('정렬을 선택해주세요!!');
    // }
    // 리스트 코드 반영하기
    upCode(targetData,this.parentNode.nextElementSibling);
} //////////////sortingFn함수////////////

/////////////////////////////////////////////////
// 4. 객체데이터 검색후 배열의 정렬🔎 /////////////


// (1) 출력대상: .showList4
const showList4 = dFn.qs('.showList4');

// (2) 변경대상 선정: .sel4(정렬옵션) .cta4(정렬기준)
const sel4 = dFn.qs('.sel4');
const cta4 = dFn.qs('.cta4');
// (3) 데이터 : 객체 데이터 배열
const list2 = [
    {
        idx: 105,
        tit: "당근마켓에 가자",
        cont: "당근마켓에서 싸게 사고싶어!",
    },
    {
        idx: 22,
        tit: "당근마켓에 가자",
        cont: "당근마켓이 정말로 싸고 좋다구~!",
    },
    {
        idx: 74,
        tit: "점심에 뭐먹지? 당근스프~",
        cont: "오스틴님 생일 서포트 안내",
    },
    {
        idx: 18,
        tit: "직돌이는 쉬고싶다~!",
        cont: "활동정지에 대한 파생글 무통보 삭제 및 경고",
    },
    {
        idx: 104,
        tit: "올해는 다른 회사로 이직한다!",
        cont: "⚜️갈라콘 서포트에 많은 참여 부탁드립니다!",
    },
]; /////////////// list2 /////////////  

// 검색 정렬용 변수 -> 검색 시 newList 업데이트 
let newList = list2;

// console.log(showList4,list2);
// (4) upCode 함수로 페이지 최초 찍기
upCode(list2,showList4);

// (5) 이벤트 등록 : 실제 정렬 변경하기
dFn.addEvt(sel4,'change',()=>{
    // 정렬용 데이터는 원본데이터가 아닌 검색으로 바뀐 데이터 업데이트
    targetData = newList;
});
dFn.addEvt(sel4,'change',sortingFn);
dFn.addEvt(cta4,'change',()=>{
    // 정렬용 데이터는 원본데이터가 아닌 검색으로 바뀐 데이터 업데이트
    targetData = newList;
});
dFn.addEvt(cta4,'change',sortingFn);

// (6) 검색기능 버튼 클릭 이벤트 설정

// (6-1) 이벤트 대상 : .sbtn
dFn.addEvt(dFn.qs('.sbtn'),'click',searchingFn);

// (7) 검색함수 만들기 
function searchingFn(){
    // (7-1) 검색어 읽어오기
    // 대상 : #stxt
    let stxt = dFn.qs('#stxt').value;
    // (7-2) 검색 기준 읽어오기
    // 대상 : .cta4 -> cta4
    let ctaVal = cta4.value;
    
    console.log('입력문자:',stxt,'검색기준:',ctaVal);

    // (7-3) filter()로 LIKE검색하기 : 다중값 리턴
    // filter() + indexOf()
    let res = list2.filter(v=>{
        // v[객체속성명] -> cta가 변수임 .으로 접근 불가
        // indexOf(검색어)
        // 숫자형 데이터일 경우 에러발생
        if(String(v[ctaVal]).indexOf(stxt)!=-1)return true;
    }); ////////filter///////////
    // (7-4) 출력하기
    upCode(res,showList4);
    // 검색 결과를 list2 원본데이터에 할당하면
    // list2 = res; //list2가 const형이여서 할당 안됨

    // (7-5) 새로운 변수를 선언하여 그 변수의 값을 업데이트 하기
    // 단, 변수는 정렬시에 사용하도록 한다.
    newList = res;
} //////////searchingFn 함수 ////////////////

// (8) 전체 리스트 돌아가기 버튼 클릭 시 기능구현 //////////
// 대상 : 전체 리스트 .fbtn
dFn.addEvt(dFn.qs('.fbtn'),'click',initSearch); ///////// fbtn click이벤트 ///////////

// 초기화 함수 : 검색 선택박스 초기화
function initSearch(){
    // (8-1)원본리스트 업데이트
    newList = list2;
    // (8-2)출력하기
    upCode(newList, showList4);
    // (8-3)검색어 초기화
    dFn.qs('#stxt').value = '';
    // (8-4)검색어 기준선택 초기화
    sel4.value='0';
    // (8-5)정렬 초기화
    cta4.value='idx';

} ////////////initSearch 함수 //////////////

// 샘플 버튼으로 데이터를 검색 한 결과를 콘솔에 찍어주기
dFn.addEvt(dFn.qs('.sample'),'click',()=>{
    // 1. find() 메서드 확인하기 : 데이터 정확히 일치 해야함
    let res1 = list2.find(v=>{
        if(v.tit == '당근마켓에 가자') return true;
        // 데이터가 완벽하게 일치하면 배열의 값을 리턴함!!
        // if(v.tit == '당근마켓에가자') return true; 
        // 데이터가 완벽하게 일치하지 않으면 undefined
    }); ////////find
    console.log('검색어:"당근마켓에 가자"\n결과:',res1);

    // 2. find() 메서드 LIKE 검색하기 : 데이터 일부만 일치해도 찾기
    // indexOf() 결과가 -1이 아니면 내용이 있으므로 처리
    // find() 의 특성상 처음 만나는 데이터 하나만 리턴
    let res2 = list2.find(v=>{
        if(v.tit.indexOf('다')!=-1) return true;
        // 데이터에 '다'가 있으면 리턴
    }); ////////find
    console.log('검색어:"다"\n결과:',res2);
    
    // 3. filter() 메서드 LIKE 검색하기
    // filter()는 해당 결과를 배열로 리턴함!!!!
    let res3 = list2.filter(v=>{
        // if(v.tit.indexOf('도토리')!=-1) return true;
        // 데이터에 검색결과가 없으면 []이 리턴, 배열.length==0
        if(v.tit.indexOf('당근')!=-1) return true;
        // 데이터에 '당근'이 있으면 리턴
    }); ////filter
    console.log('검색어:"도토리"fliter검색 \n결과:',res3);
}); //////////sample 버튼 클릭 이벤트 ///////////////
