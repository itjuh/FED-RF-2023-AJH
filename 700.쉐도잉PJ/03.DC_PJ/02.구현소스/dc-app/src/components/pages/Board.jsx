// DC PJ - OPINION page 컴포넌트
// 게시판용 css
import { useState } from "react";
import "../../css/board.css";
// 데이터
import baseData from "../data/board.json";
import $ from "jquery";
import { Fragment } from "react";

// baseData reverse sort
baseData.sort((a, b) => {
  return Number(a.idx) == Number(b.idx) ? 0 : Number(a.idx) > Number(b.idx) ? -1 : 1;
  // return b.idx - a.idx;
});
// 초기 데이터 로컬스에 셋업하기
let originData;
if (localStorage.getItem("boardData")) originData = JSON.parse(localStorage.getItem("boardData"));
else originData = baseData;
// else originData = []; // 빈 데이터 테스트용

//************* Board 컴포넌트 상단 ************//
export function Board() {
  /**
   * [ 공통변수 ]
   * 1. 페이지 단위 수: 페이지당 레코드수
   * 2. 전체 레코드 수
   */
  const PAGE_BLOCK = 7;
  const totNum = originData.length;

  /**[ 상태관리 변수 셋팅 ]
   * 1. 현재 페이지 번호 pgNum
   * 2. 데이터 변경관리 변수 : 출력 될 list
   * 3. 게시판 모드 관리 변수 CRUD
   * c-create r-read u-updata d-delete l-list
   */
  const [pgNum, setPgNum] = useState(1);
  const [currentData, setCurrentData] = useState(null);
  const [bdMode, setBdMode] = useState("L");

  // 상태관리 변경함수
  const chgMode = (e) => {
    let txt = $(e.currentTarget).text();
    switch (txt) {
      case "Write":
        setBdMode("C");
        break;
      case "Submit":
        setBdMode("R");
        break;
      case "List":
        setBdMode("L");
        break;
      default:
        setBdMode("R");
        break;
    }
  };

  /**
   * 함수명 : bindList
   * 기능 : 페이지별 리스트 생성하여 바인딩
   */
  const bindList = () => {
    // console.log("다시 바인딩", pgNum);
    // 데이터 선별하기
    /**
     * 페이지 시작 번호 : (pgNum-1)*PAGE_BLOCK
     * 페이지 종료 번호 : pgNum*PAGE_BLOCK
     */
    const tempData = [];
    let initSeq = (pgNum - 1) * PAGE_BLOCK;
    let lastSeq = pgNum * PAGE_BLOCK;
    // 데이터 선별용 for
    for (let i = initSeq; i < lastSeq; i++) {
      if (i == totNum) break; // 마지막 페이지 한계수
      tempData.push(originData[i]); // 코드 푸쉬
    }
    // 데이터 없는 경우 출력
    if (tempData.length === 0)
      return (
        <tr>
          <td colSpan="5">There is no data.</td>
        </tr>
      );
    // 데이터 있는 경우 출력
    return tempData.map((v, i) => (
      <tr key={i}>
        {/* 1. 일련번호 */}
        <td>{initSeq + i + 1}</td>
        {/* 2. 타이틀 */}
        <td>
          <a href="#" datatype={v.idx} onClick={chgMode}>
            {v.tit}
          </a>
        </td>
        {/* 3. 작성자 */}
        <td>{v.writer}</td>
        {/* 4. 작성일 */}
        <td>{v.date}</td>
        {/* 5. 조회수 */}
        <td>{v.cnt}</td>
      </tr>
    ));
  }; ///////// bindList /////////
  /**
   * 함수명 : pagingLink
   * 기능 : 페이징
   */
  const pagingLink = () => {
    // 페이징 블록 만들기 ///
    /**
     * 1. 전체 레코드 : totNum
     * 2. 페이지 단위 : PAGE_BLOCK
     * 3. 남은 블록 : blockPad
     * 4. 전체 페이지 번호 : blockPad===0?blockCnt:blockCnt+1
     */
    const blockCnt = Math.floor(totNum / PAGE_BLOCK);
    const blockPad = totNum % PAGE_BLOCK;
    // console.log("블록개수:", blockCnt, "\n블록나머지:", blockPad);
    // 최종 블록 수
    let limit = blockPad === 0 ? blockCnt : blockCnt + 1;
    // 리액트에서는 jsx문법 코드를 배열에 담아서 return map
    let code = [];
    for (let i = 0; i < limit; i++) {
      code[i] = (
        <Fragment key={i}>
          {i === pgNum - 1 ? (
            <b>{i + 1}</b>
          ) : (
            <a href="#" onClick={chgList}>
              {i + 1}
            </a>
          )}
          {i < limit - 1 ? " | " : ""}
        </Fragment>
      );
    }
    return <>{code.map((v) => v)}</>;
  }; /////// pagingLink ////////////

  /**
   * 함수명 : chgList
   * 기능 : 페이지 리스트 재생성하여 바인딩
   */
  const chgList = (e) => {
    setPgNum(e.target.innerText);
    // bindList(); ->>> pgNum사용으로 리랜더링
  }; /////// chgList 함수 ///////////
  const makeTit = () => {};
  return (
    <>
      {
        /**1. 게시판 리스트:bdMode L */
        bdMode === "L" && (
          <table className="dtbl" id="board">
            <caption>{makeTit()}</caption>
            <caption>OPINION</caption>
            {/* 상단 컬럼명 표시영역 */}
            <thead>
              <tr>
                <th>Number</th>
                <th>Title</th>
                <th>Writer</th>
                <th>Date</th>
                <th>Hits</th>
              </tr>
            </thead>
            {/* 중앙 레코드 표시부분 */}
            <tbody>{bindList()}</tbody>

            {/* 하단 페이징 표시부분 */}
            <tfoot>
              <tr>
                <td colSpan="5" className="paging">
                  {/* 페이징번호 위치  */}
                  {pagingLink()}
                </td>
              </tr>
            </tfoot>
          </table>
        )
      }
      {
        /**2. 글쓰기 테이블 :bdMode C */
        bdMode === "C" && (
          <table className="dtblview writeone">
            <caption>OPINION : Write</caption>
            <tbody>
              <tr>
                <td>Name</td>
                <td>
                  <input type="text" className="name" size="20" readOnly />
                </td>
              </tr>
              <tr>
                <td>Email</td>
                <td>
                  <input type="text" className="email" size="40" readOnly />
                </td>
              </tr>
              <tr>
                <td>Title</td>
                <td>
                  <input type="text" className="subject" size="60" />
                </td>
              </tr>
              <tr>
                <td>Content</td>
                <td>
                  <textarea className="content" cols="60" rows="10"></textarea>
                </td>
              </tr>
            </tbody>
          </table>
        )
      }
      {
        /**3. 읽기 테이블 :bdMode R */
        bdMode === "R" && (
          <table className="dtblview readone">
            <caption>OPINION : Read</caption>
            <tbody>
              <tr>
                <td width="100">Name</td>
                <td width="650">
                  <input type="text" className="name" size="20" readOnly />
                </td>
              </tr>
              <tr>
                <td>Title</td>
                <td>
                  <input type="text" className="subject" size="60" readOnly />
                </td>
              </tr>
              <tr>
                <td>Content</td>
                <td>
                  <textarea className="content" cols="60" rows="10" readOnly></textarea>
                </td>
              </tr>
            </tbody>
          </table>
        )
      }
      {
        /**4. 수정/삭제 테이블 :bdMode U/D */
        bdMode === "U" && (
          <table className="dtblview updateone">
            <caption>OPINION : Modify</caption>
            <tbody>
              <tr>
                <td>Name</td>
                <td>
                  <input type="text" className="name" size="20" readOnly />
                </td>
              </tr>
              <tr>
                <td>Title</td>
                <td>
                  <input type="text" className="subject" size="60" />
                </td>
              </tr>
              <tr>
                <td>Content</td>
                <td>
                  <textarea className="content" cols="60" rows="10"></textarea>
                </td>
              </tr>
            </tbody>
          </table>
        )
      }
      <br />
      {/* 5. 버튼그룹박스 */}
      <table className="dtbl btngrp">
        <tbody>
          <tr>
            <td>
              {
                /**1. 게시판 리스트:bdMode L */
                bdMode === "L" && (
                  <button onClick={chgMode}>
                    <a href="#">Write</a>
                  </button>
                )
              }
              {
                /**2. 글쓰기 테이블 :bdMode C */
                bdMode === "C" && (
                  <>
                    <button onClick={chgMode}>
                      <a href="#">Submit</a>
                    </button>
                    <button onClick={chgMode}>
                      <a href="#">List</a>
                    </button>
                  </>
                )
              }
              {
                /**3. 읽기 테이블 :bdMode R */
                bdMode === "R" && (
                  <button onClick={chgMode}>
                    <a href="#">List</a>
                  </button>
                )
              }
              {
                /**4. 수정/삭제 테이블 :bdMode U/D */
                bdMode === "U" && (
                  <>
                    <button onClick={chgMode}>
                      <a href="#">Submit</a>
                    </button>
                    <button onClick={chgMode}>
                      <a href="#">Delete</a>
                    </button>
                    <button onClick={chgMode}>
                      <a href="#">List</a>
                    </button>
                  </>
                )
              }
              {/* <button onClick={chgMode}>
                      <a href="#">Modify</a>
                    </button> */}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
} ///////// Board 컴포넌트 /////////////
