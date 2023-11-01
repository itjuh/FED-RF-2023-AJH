// 리스트 페이지 JS - list.js

// 게시판 데이터 불러오기
import bData from "./data.json" assert { type: "json" };

// console.log(bData);

// 데이터를 화면 리스트 코드로 변환하여 적용
// 대상선정: #board tbody
const board = $("#board tbody");
// 데이터 idx의 내림차순 정렬
bData.sort((a, b) => (Number(a.idx) == Number(b.idx) ? 0 : Number(a.idx) > Number(b.idx) ? -1 : 1));
// 리스트 번호변수
let listNum = 0;
// 리스트 번호증가 함수
const addNum = () => ++listNum;

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
const totalCnt = bData.length;
// 4) 완전한 페이지 블록 : 내림(전체 레코드 / 페이지 당 리스트 수)
let pagingBlock = Math.floor(totalCnt / pgBlock);
// 5) 나머지 리스트 여부 : 0 추가페이지 없음 >0 추가페이지 레코드 개수
let addOver = totalCnt % pgBlock;
console.log(`pgBlock${pgBlock}\npgNum:${pgNum}\ntotalCnt:${totalCnt}\npagingBlock:${pagingBlock}\naddOver:${addOver}`);

///////////// 페이지 업데이트 /////////////

const updateList = (newPgNum) => {
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
            <td>${bData[i].tit}</td>
            <td>${bData[i].writer}</td>
            <td>${bData[i].date}</td>
            <td>${bData[i].cnt}</td>
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

// 리스트 업데이트 함수 최초호출
updateList(pgNum);

// board.html(
//     bData.map(v=>`
//     <tr>
//         <td>${addNum()}</td>
//         <td>${v.tit}</td>
//         <td>${v.writer}</td>
//         <td>${v.date}</td>
//         <td>${v.cnt}</td>
//     </tr>
//     `).join('') /////////// 맵조인
// );

// 데이터를 태그로 구성
// 태그 구조 : <tr>  <td></td>  </tr>
/*
    [ 매칭 데이터 ]
    <tr>
        <td>번호 - idx</td>
        <td>글 제목 -tit</td>
        <td>글 쓴이 = writer</td>
        <td>등록일자 - data</td>
        <td>조회수 - cnt</td>
    </tr>
*/
