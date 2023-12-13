// DC PJ - OPINION page 컴포넌트
// 게시판용 css
import { useState } from "react";
import "../../css/board.css";
// 데이터
import baseData from "../data/board.json";

// 초기 데이터 로컬스에 셋업하기
let org;
if (localStorage.getItem("boardData")) org = JSON.parse(localStorage.getItem("boardData"));
else org = baseData;

export function Board() {
  /**[ 상태관리 변수 셋팅 ]
   * 1. 데이터 변경관리 변수
   * 2. 게시판 모드 관리 변수 CRUD
   * c-create r-read u-updata d-delete l-list
   *
   */
  const [jsn, setJsn] = useState(org);
  const [bdMode, setBdMode] = useState("U");
  const chgMode = () => {};

  return (
    <>
      {
        /**1. 게시판 리스트:bdMode L */
        bdMode === "L" && (
          <table className="dtbl" id="board">
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
            <tbody>
              <tr>
                <td colSpan="5">There is no data.</td>
              </tr>
            </tbody>

            {/* 하단 페이징 표시부분 */}
            <tfoot>
              <tr>
                <td colSpan="5" className="paging">
                  {/* 페이징번호 위치  */}
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
