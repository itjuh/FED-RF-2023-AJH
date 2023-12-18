// DC PJ - OPINION page 컴포넌트
// 게시판용 css
import { useState } from "react";
import "../../css/board.css";
// 데이터
import baseData from "../data/board.json";
import $ from "jquery";
import { Fragment } from "react";
import { useCallback } from "react";
import { useRef } from "react";

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
  const PAGE_BLOCK = 8;
  const totNum = originData.length;

  /**[ 상태관리 변수 셋팅 ]
   * 1. 현재 페이지 번호 pgNum
   * 2. 데이터 변경관리 변수 : 출력 될 list
   * 3. 게시판 모드 관리 변수 CRUD
   * 4. 단일페이지 데이터
   * c-create r-read u-updata d-delete l-list
   */
  const [pgNum, setPgNum] = useState(1);
  const [currentData, setCurrentData] = useState(null);
  const [bdMode, setBdMode] = useState("L");
  // 선택된 데이터 셋팅을 위한 참조변수
  const selData = useRef(null);

  /**
   * 함수명 : chgMode
   * 기능 : 게시판 상태를 변경
   */
  const chgMode1 = (e) => {
    e.preventDefault();
    let txt = $(e.currentTarget).text();
    switch (txt) {
      case "Write":
        // 읽기모드 화면데이터 불러오기
        writeMod();
        // 화면처리
        setBdMode("C");
        break;
      case "Submit": // write, modify에서 둘다 있음
        if (bdMode === "C") {
          // write의 submit
        } else {
          // modify의 submit
        }
        setBdMode("L");
        break;
      case "List":
        setBdMode("L");
        break;
      case "Modify":
        setBdMode("U");
        break;
      case "Delete":
        setBdMode("L");
        break;
      default:
        let seq = $(e.currentTarget).attr("data-idx");
        setBdMode("R");
        readCont(seq);
    }
  };
  /**
   * 함수명 : chgMode2
   * 기능 : 게시판 상태를 변경 _ version2
   */
  const chgMode2 = (e) => {
    // 1. 해당 버튼의 텍스트 읽어오기
    let btxt = $(e.target).text();
    console.log(btxt);

    // 2. 텍스트별 모드 연결하기
    let modeTxt;

    switch (btxt) {
      case "List":
        modeTxt = "L";
        break;
      case "Write":
        modeTxt = "C";
        break;
      case "Modify":
        modeTxt = "U";
        break;
      case "Submit":
        modeTxt = "S";
        break;
      case "Delete":
        modeTxt = "D";
        break;
      default:
        modeTxt = "R";
    }

    // 3. 모드별 분기하기 //////
    // 3-1. 읽기 모드
    if (modeTxt === "R") {
      // 1. a링크의 data-idx 읽어오기
      let cidx = $(e.target).attr("data-idx");
      readCont(cidx);
      // 2. 리스트 이동
      setBdMode(modeTxt);
    } ////// if ///////
    // 3-2. 쓰기 모드
    else if (modeTxt === "C") {
      console.log("쓰기모드");
      writeMod();
      setBdMode(modeTxt);
    } ////// else if ///////
    // 3-3. 쓰기 처리
    else if (modeTxt === "S" && bdMode === "C") {
      console.log("쓰기처리");
    }
    // 3-3. 수정하기 모드
    else if (modeTxt === "U") {
      console.log("수정모드");
      setBdMode(modeTxt);
    } ////// else if ///////
    // 3-5. 수정 처리
    else if (modeTxt === "S" && bdMode === "U") {
      console.log("수정처리");
      setBdMode('L');
    } ////// else if ///////
    // 3-4. 삭제하기 모드
    else if (modeTxt === "D") {
      console.log("삭제처리");
    } ////// else if ///////
    // 3-5. 리스트 모드
    else if (modeTxt === "L") {
      setBdMode(modeTxt);
    }
  };
  /**
   * 함수명 : readCont
   * 기능 : 클릭한 글 내용을 바인딩
   */
  const readCont = (data) => {
    selData.current = originData.find((v) => {
      if (v.idx === data) return true;
    });
  };
  /**
   * 함수명 : writeMod
   * 기능 : 작성자/메일 자동처리
   * 기능2 : 제목과 내용은 빈값없이 작성
   */
  const writeMod = () => {
    let tempMem = { uid: "tomtom", eml: "tom@gmail.com" };
    selData.current = tempMem;
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
          <a href="#" data-idx={v.idx} onClick={chgMode1}>
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
    e.preventDefault();
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
                  <input type="text" className="name" size="20" readOnly defaultValue={selData.current.uid} />
                </td>
              </tr>
              <tr>
                <td>Email</td>
                <td>
                  <input type="text" className="email" size="40" readOnly defaultValue={selData.current.eml} />
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
                  <input type="text" className="name" size="20" readOnly defaultValue={selData.current.writer} />
                </td>
              </tr>
              <tr>
                <td>Title</td>
                <td>
                  <input type="text" className="subject" size="60" readOnly defaultValue={selData.current.tit} />
                </td>
              </tr>
              <tr>
                <td>Content</td>
                <td>
                  <textarea
                    className="content"
                    cols="60"
                    rows="10"
                    readOnly
                    defaultValue={selData.current.cont}
                  ></textarea>
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
                  <input type="text" className="name" size="20" readOnly defaultValue={selData.current.writer}/>
                </td>
              </tr>
              <tr>
                <td>Title</td>
                <td>
                  <input type="text" className="subject" size="60" defaultValue={selData.current.tit}/>
                </td>
              </tr>
              <tr>
                <td>Content</td>
                <td>
                  <textarea className="content" cols="60" rows="10" defaultValue={selData.current.cont}></textarea>
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
                  <button onClick={chgMode1}>
                    <a href="#">Write</a>
                  </button>
                )
              }
              {
                /**2. 글쓰기 테이블 :bdMode C */
                bdMode === "C" && (
                  <>
                    <button onClick={chgMode1}>
                      <a href="#">Submit</a>
                    </button>
                    <button onClick={chgMode1}>
                      <a href="#">List</a>
                    </button>
                  </>
                )
              }
              {
                /**3. 읽기 테이블 :bdMode R */
                bdMode === "R" && (
                  <>
                    <button onClick={chgMode1}>
                      <a href="#">List</a>
                    </button>
                    <button onClick={chgMode1}>
                      <a href="#">Modify</a>
                    </button>
                  </>
                )
              }
              {
                /**4. 수정/삭제 테이블 :bdMode U/D */
                bdMode === "U" && (
                  <>
                    <button onClick={chgMode1}>
                      <a href="#">Submit</a>
                    </button>
                    <button onClick={chgMode1}>
                      <a href="#">Delete</a>
                    </button>
                    <button onClick={chgMode1}>
                      <a href="#">List</a>
                    </button>
                  </>
                )
              }
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
} ///////// Board 컴포넌트 /////////////
