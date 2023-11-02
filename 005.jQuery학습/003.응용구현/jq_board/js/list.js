// 리스트 페이지 JS - list.js

// 리스트 업데이트 함수 불러오기
import { updateList } from "./updateList.js";
// console.log(bData);

// 리스트 업데이트 함수 최초호출 : 1페이지
updateList(1);

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
