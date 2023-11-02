// 리스트 업데이트 updateList.js

// 게시판 데이터 불러오기
import bData from "./data.json" assert { type: "json" };
// 데이터 idx의 내림차순 정렬
bData.sort((a, b) => (Number(a.idx) == Number(b.idx) ? 0 : Number(a.idx) > Number(b.idx) ? -1 : 1));

//////////////////////////////////////
// 로컬 스토리지 생성하기 //////////////
// 이름 : boardData //////////////////
console.log(!localStorage.getItem('boardData'));
let myStringData = JSON.stringify(bData);
// if(JSON.parse(localStorage.getItem('boardData')).length == 0){ // 데이터가 없다면
if(!localStorage.getItem('boardData')){ // 데이터가 없다면
    localStorage.setItem('boardData',myStringData);
} //////// 로컬스토리지에 데이터 넣기 /////////////////


// 데이터를 화면 리스트 코드로 변환하여 적용
// 대상선정: #board tbody
const board = $("#board tbody");
// 리스트 번호변수
let listNum = 0;
// 리스트 번호증가 함수
const addNum = () => ++listNum;
// 사용 데이터
let useData = JSON.parse(localStorage.getItem('boardData'));
console.log(useData);
///////////////////////////////////////////////////////

//////////////////////////////////////////////////////
// 페이징되는 리스트 만들기 ////////////////
// 페이징의 기본 원리 :
// 1. 한페이지당 리스트 수를 정하여 전체 페이지 개수 구하기
// 2. 개수만큼 리스트에 데이터를 반복문으로 생성 함
// 3. 페이지 번호에 따라 시작 번호를 업데이트 한다!

// [ 1. 변수설정 ]
// 1) 한 페이지 당 리스트 수 : pgBlock
const pgBlock = 9;
// 2) 페이지 순번 : pgNum
let pgNum = 1;
// 3) 전체 레코드 수 : totalCnt
const totalCnt = useData.length;
// 4) 완전한 페이지 블록 : 내림(전체 레코드 / 페이지 당 리스트 수)
let pagingBlock = Math.floor(totalCnt / pgBlock);
// 5) 나머지 리스트 여부 : 0 추가페이지 없음 >0 추가페이지 레코드 개수
let addOver = totalCnt % pgBlock;
console.log(`pgBlock${pgBlock}\npgNum:${pgNum}\ntotalCnt:${totalCnt}\npagingBlock:${pagingBlock}\naddOver:${addOver}`);

///////////// 페이지 업데이트 /////////////
export const updateList = (newPgNum) => {
    // 기존 페이지 번호를 업데이트 함
    pgNum = newPgNum;
    // 6) 시작번호 업데이트
    listNum = pgBlock * (pgNum - 1);
  
    let hcode = "";
    // 리스트 블록으로 리스트 소스 만들기
    for (let i = listNum; i < pgBlock * pgNum; i++) {
      // 만약 리스트의 번호인 i가 전체 개수와 같거나 크면 break;
      if (i >= totalCnt) break;
      hcode += `
          <tr>
              <td>${addNum()}</td>
              <td>${useData[i].tit}</td>
              <td>${useData[i].writer}</td>
              <td>${useData[i].date}</td>
              <td>${useData[i].cnt}</td>
          </tr>
      `;
    } //////////////for///////////////
  
    // 코드 반영하기
    board.html(hcode);
  
    ////////////////////////////////////////////////////
    // 페이지 이동 링크 페이징 만들기
    // 대상 : .pageing
    // 링크 생성원리 : block개수만큼 숫자로 만든다
    // pagingBlock : 완 페이지 수 / addOver : 잔여 데이터 수
    // 링크는 5개씩 보이고 나머지는 > < 으로 넘기기
    const pNumBlock = $(".paging");
  
    let pNumCode = "";
  
    // 페이지 링크 a요소 만들기
    for (let x = 0; x < pagingBlock; x++) {
      // 현재페이지만 b태그 / 나머지는 a태그 사용
      // 현재페이지는 pgNum이므로 x+1 == pgNum이면 b태그 사용
      pNumCode += (x+1 == pgNum?`<b>${x+1}</b>`:`<a href='#'>${x + 1}</a>`);
      if (x + 1 == pagingBlock) break;
      pNumCode += ` | `;
    }
    // 잔여 데이터가 있으면 마지막 페이지 수 하나 더 늘림
    if (addOver != 0) pNumCode += ` | <a>${pagingBlock + 1}</a>`;
    pNumBlock.html(pNumCode);
  
    // 페이지 이벤트 걸기
    $(".paging a").click(function () {
      // 기본이동 막기
      event.preventDefault();
      let txt = $(this).text();
      // 리스트 업데이트 함수 호출
      console.log(txt);
      updateList(txt);
    }); //////////// click////////////
  
  }; /////////// updateList 함수 ///////////////