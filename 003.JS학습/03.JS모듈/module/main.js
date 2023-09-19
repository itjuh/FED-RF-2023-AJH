// 모듈 연습 메인 JS - main.js

// 1) 1가지 데이터 가져오기
// -> from뒤에 파일명 확장자 꼭 써야함
// -> SPA 모듈 개별환경에서는 .js, .jsx 등 확장자 생략 가능
// -> default로 내보낸 것은 {변수} 형식으로 받을 수 없다!
// ex) import {message} from "./msg_format.js"; -> 에러남
// DOM함수 불러오기
import dFn from "./dom.js";
// 메세지 구성함수
import msgFn from "./msg_format.js";

// 2-1) 여러개의 데이터 불러오기
// import {mTitle,sTitle,personInfo,mvData} from "./text_data.js";
// 2-2) 별칭짓기 -> 개명임
// {변수 as 별칭}
import { 
    mTitle as mTit, 
    sTitle as sTit, 
    personInfo as pInfo, 
    mvData as mv 
} from "./text_data.js";

// console.log(mTitle, sTitle, personInfo, mvData);
// console.log(mTit, sTit, pInfo, mv, msgFn);

/*************************************************** 
    
    [ import 형식 ]
    import 전달변수 from 파일경로;
    -> 반드시 가져올 모듈JS에서 export를 해줘야함!
    -> from 뒤에 경로는 반드시 상대경로일 경우
    같은 위치일 지라도 ./ 표시를 꼭해야함!(없으면 안나옴!)
    (/,./,../ 표시필수)
    -> 모듈구성은 반드시 서버형식으로 열어야 작동한다!
    (http://...) Live Server로 열기때문에 볼 수 있음!
    -> 로컬파일로 열면 작동안됨!

    [ import 시 변수명 변경하기 : 별칭사용하기 ]
    import {전달변수 as 별칭} from 파일경로;
    예) import {mymymy as m} from 파일경로;
    -> 별칭 사용이유:  단순변경요구, 같은이름 변수 피하기

    ____________________________________________________

    [ 모듈화를 위한 구성 ]
    1. 데이터 처리하기 위한 JS
    -> text_data.js
    2. 구체적인 데이터 구성처리를 위한 JS
    -> msgFormat.js

***************************************************/

// 1. 대상선정 : 출력박스
// (1) 타이틀 출력 박스
const titBox = dFn.qs('.tpart');
// (2) 내용 출력 박스
const demo = dFn.qs('#demo');
// (3) 영화정보 출력박스
const mvBox = dFn.qs('.mvpart');

// 2. 변경 적용하기
// (1) 타이틀 출력하기 : 제목 + 소제목
titBox.innerHTML = `
    <h2>${mTit}</h2>
    <h3>${sTit}</h3>
`;
// (2) 내용 출력하기 : 이름과 나이를 소개하는 메세지 넣기
demo.innerHTML = msgFn('공유',45);
demo.innerHTML += msgFn('톰행크스',59);
demo.innerHTML += msgFn('졸리',48);
// 이름과 나이가 들어간 세팅 된 배열데이터 이용하여 출력하기
pInfo.forEach(val=>{
    demo.innerHTML += msgFn(val[0],val[1]);
});

// (3) 영화정보 뿌리기
mvBox.innerHTML = '<h2>😘영화위시리스트🥰</h2>';
// ol>li형식으로 .mvpart 박스에 영화정보를 구성함 
mv.forEach(val=>{
    mvBox.innerHTML += `
        <ol>
            <li>★제목★: ${val[0]}</li>
            <li>★장르★: ${val[1]}</li>
            <li>★감독★: ${val[2]}</li>
            <li>★주연★: ${val[3]}</li>
            <li>★한마디★: ${val[4]}</li>
        </ol>
    `;
});