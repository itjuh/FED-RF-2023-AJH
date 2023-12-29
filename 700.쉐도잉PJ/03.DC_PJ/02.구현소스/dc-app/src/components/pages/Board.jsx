// DC PJ - OPINION page 컴포넌트
import { useState, Fragment, useRef, useContext } from "react";
// 게시판용 css
import "../../css/board.css";
// 데이터
import baseData from "../data/board.json";
// 로컬스토리지 생성 JS
import { initData } from "../func/mem_fn";

import $ from "jquery";
// 컨텍스트
import { dcCon } from "../modules/dcContext";
import { useEffect } from "react";

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
  // 보드 데이터가 로컬스에 없으면 생성하기!
  if (!localStorage.getItem("boardData")) {
    // !연산자로 false일때 실행
    // 로컬스 'bdata'가 없으므로 여기서 최초 생성하기
    // -> 조회수증가시 로컬스 데이터로 확인하기 때문!
    localStorage.setItem("boardData", JSON.stringify(originData));
  } //////////// if ///////////////
  // 기본 사용자 정보 셋업함수 호출
  initData();
  /**
   * [ 공통변수 ]
   * 1. 페이지 단위 수: 페이지당 레코드수
   * 2. 전체 레코드 수
   */
  const PAGE_BLOCK = 8;
  const totNum = originData.length;
  const myCon = useContext(dcCon);

  /**[ 상태관리 변수 셋팅 ]
   * 1. 현재 페이지 번호 pgNum
   * 2. 데이터 변경관리 변수 : 출력 될 list -> 사용안함
   * 3. 게시판 모드 관리 변수 CRUD
   * 4. 단일페이지 데이터
   * c-create r-read u-updata d-delete l-list
   * 5. 버튼 공개여부 관리변수 - 수정버튼 : modify
   * 6. 강제 리랜더링 관리 변수 : force 랜덤값으로 업데이트하여 사용
   * 7. 검색상태 관리변수 : 값 유지
   */
  const [pgNum, setPgNum] = useState(1);
  // const [currentData, setCurrentData] = useState(null);
  const [bdMode, setBdMode] = useState("L");
  const [btnSts, setBtnSts] = useState(false);
  const [force, setForce] = useState(null);
  const searchSts = useRef(false);

  // 리 랜더링 루프 방지용으로 랜더링 후 실행구역에 변경코드
  useEffect(() => {
    // 로그아웃 시 버튼 상태값 false로 변경하기
    if (myCon.logSts === null) setBtnSts(false);
    // 로그아웃 시 페이지 이동하기
    if ((myCon.logSts === null && bdMode === "C") || (myCon.logSts === null && bdMode === "U")) {
      setBdMode("L");
    }
  }, [myCon.logSts]);
  /** 리랜더링의 원인 중 많은 경우
   * 랜더링 전 가상돔에 설정을 잡을 때 발생한다.
   * 해결책은 랜더링 후 처리구역에서 변경되는 상태변수를 의존성에 등록하여
   * 변경 발생 시 한 번만 실행되도록 설정하는 것이다.
   */

  // 선택된 데이터 셋팅을 위한 참조변수
  const selData = useRef(null);
  /**
   * 함수명 : chgMode2
   * 기능 : 게시판 상태를 변경 _ version2
   */
  const chgMode2 = (e) => {
    // 기본막기
    e.preventDefault();
    // 검색상태이면 데이터 초기화
    if (searchSts.current) {
      // 검색상태가 아니므로 상태값 초기화
      searchSts.current = false;
      // orgData 초기화
      rawData();
    }

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
      // console.log(cidx, selData);
      readCont(cidx);
      // 2. 본인 글 확인
      // console.log(selData.current.uid);
      compUser(selData.current.uid);
      // 3. 리스트 이동
      setBdMode(modeTxt);
      // 4. 조회수 증가함수 호출!
      plusCnt();
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
      // 1. 제목, 내용 필수입력 체크
      const subVal = $(".writeone .subject").val().trim();
      const contVal = $(".writeone .content").val().trim();
      if (subVal === "" || contVal === "") {
        alert("제목과 내용은 필수 입력입니다.");
      } else {
        const addZero = (x) => (x < 10 ? "0" + x : x);
        // 2-1. 날짜 데이터 구성
        let today = new Date();
        let yy = today.getFullYear();
        let mm = today.getMonth() + 1;
        let dd = today.getDate();
        // 2-2. 원본데이터 변수할당
        let originTemp = originData;
        // 2-3-1. 입력 데이터가 역순정렬 되었으므로 0번데이터의 idx를 읽어옴
        // let idxData = Number(originData[0].idx)
        // 2-3. 입력 idx값 모아서 최대값에 1을 더함
        let idxData = originData.map((v) => parseInt(v.idx));
        console.log(idxData);
        // Math.max()에서 값을 비교하기위해 값을 나열하여 입력하면 됨
        // Spread Operator로 합칠 수 있음
        console.log("최대값 :", Math.max.apply(null, idxData));
        console.log("최대값 :", Math.max(...idxData));
        idxData = Math.max(...idxData);
        // 그외 방법
        // 2-3. 임시 변수에 입력할 객체 데이터 생성하기
        let temp = {
          idx: idxData + 1,
          tit: subVal,
          cont: contVal,
          att: "",
          date: `${yy}-${addZero(mm)}-${addZero(dd)}`,
          uid: selData.current.uid,
          unm: selData.current.unm,
          cnt: 0,
        };
        // 3. 원본 데이터 push
        originTemp.push(temp);
        // 4. 데이터 로컬스토리지 반영
        localStorage.setItem("boardData", JSON.stringify(originTemp));
        // 5. 리스트 페이지로 이동
        setBdMode("L");
      }
    }
    // 3-3. 수정하기 모드
    else if (modeTxt === "U") {
      console.log("수정모드");
      setBdMode(modeTxt);
    } ////// else if ///////
    // 3-5. 수정 처리
    else if (modeTxt === "S" && bdMode === "U") {
      console.log("수정처리");
      // 1. 제목, 내용 필수입력 체크
      const subVal = $(".updateone .subject").val().trim();
      const contVal = $(".updateone .content").val().trim();
      console.log(selData.current.idx, subVal, contVal);

      if (subVal === "" || contVal === "") {
        alert("제목과 내용은 필수 입력입니다.");
      } else {
        // 2. 원본데이터 변수할당
        let originTemp = originData;
        originTemp.some((v) => {
          if (Number(selData.current.idx) === Number(v.idx)) {
            // 제목과 내용 업데이트하기
            v.tit = subVal;
            v.cont = contVal;
            return true; // 코드중단
          } ///////// if ///////
        });
        // 3. 데이터 로컬스토리지 반영
        localStorage.setItem("boardData", JSON.stringify(originTemp));
        // 4. 리스트 페이지로 이동
        setBdMode("L");
      }
    } ////// else if ///////
    // 3-4. 삭제하기 모드
    else if (modeTxt === "D" && bdMode === "U") {
      if (window.confirm("Would you remove it?")) {
        // 데이터 순회하다가 해당 데이터이면 순번으로 splice(순번,1)사용 삭제
        originData.some((v, i) => {
          if (Number(selData.current.idx) === Number(v.idx)) {
            // 해당 데이터의 순번으로 삭제
            originData.splice(i, 1);
            return true; // 코드중단
          } //// if ////
        }); //// some ////
      } //// if confirm ////
      console.log("삭제처리");
      // 3. 데이터 로컬스토리지 반영
      localStorage.setItem("boardData", JSON.stringify(originData));
      // 4. 리스트 페이지로 이동
      setBdMode("L");
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
      console.log(v.idx);
      if (Number(v.idx) === Number(data)) return true;
    });
  };
  /**
   * 함수명 : writeMod
   * 기능 : 작성자/메일 자동처리
   * 기능2 : 제목과 내용은 빈값없이 작성
   */
  const writeMod = () => {
    const currentUser = JSON.parse(myCon.logSts);
    selData.current = currentUser;
  };
  /**
   * 함수명 : compUser
   * 기능 : 사용자 정보 비교함수, btnSts를 변경함
   */
  const compUser = (user) => {
    // 글쓴이 아이디 - uid
    // 사용자 정보조회 로컬스(mem-data)
    // 보드 상단에서 null일경우 생성함수 이미 호출!
    // null을 고려하지 말고 코드작성!
    // 로그인 상태일 경우 조회하여 버튼상태 업데이트
    if (myCon.logSts !== null) {
      //로그인
      // 1. 로컬스 원본 데이터 조회
      const info = JSON.parse(localStorage.getItem("mem-data"));
      // 2. 원본으로 부터 해당 사용자 정보 조회
      const cUser = info.find((v) => {
        if (v.uid === user) return true;
      });
      // 3. 로그인 사용자 정보와 비교
      const currentUser = JSON.parse(myCon.logSts);
      if (currentUser.uid === cUser.uid) setBtnSts(true);
      else setBtnSts(false);
    } else {
      //로그아웃
      setBtnSts(false);
    }

    // 3. 로그인 사용자 정보와 조회하기
  }; ///////// chgUsrInfo 함수 ////////
  /**
   * 함수명 : sortFn
   * 기능 : 정렬 함수 내림차순 [-1,1] 오름차순 [1,-1]
   */
  function sortFn(data) {
    if ($("#sel").val() == 0)
      return data.sort((a, b) => {
        return Number(a.idx) == Number(b.idx) ? 0 : Number(a.idx) > Number(b.idx) ? -1 : 1;
      });
    else
      return data.sort((a, b) => {
        return Number(a.idx) == Number(b.idx) ? 0 : Number(a.idx) > Number(b.idx) ? 1 : -1;
      });
  } //////// sortFn 함수 /////////

  /**
   * 함수명 : rawData
   * 기능 : 데이터 초기화 하기
   */
  const rawData = () => {
    // originData 를 localstorageData로 덮어쓰기(내림차순 정렬)
    originData = sortFn(JSON.parse(localStorage.getItem("boardData")));
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
    // 내림차순 정렬
    sortFn(originData);
    let initSeq = (pgNum - 1) * PAGE_BLOCK;
    let lastSeq = pgNum * PAGE_BLOCK;
    // 데이터 선별용 for
    for (let i = initSeq; i < lastSeq; i++) {
      if (i == totNum) break; // 마지막 페이지 한계수
      tempData.push(originData[i]); // 코드 푸쉬
    }
    // 데이터 없는 경우 출력
    if (tempData.length === 0) {
      return (
        <tr>
          <td colSpan="8">There is no data.</td>
        </tr>
      );
    }

    // 데이터 있는 경우 출력
    return tempData.map((v, i) => (
      <tr key={i}>
        {/* 1. 일련번호 */}
        <td>{initSeq + i + 1}</td>
        {/* 2. 타이틀 */}
        <td>
          <a href="#" data-idx={v.idx} onClick={chgMode2}>
            {v.tit}
          </a>
        </td>
        {/* 3. 작성자 */}
        <td>{v.unm}</td>
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

  /**
   * 함수명 : plusCnt
   * 기능 : 게시판 조회수 증가 반영하기
   * 조건
   *  1) 자신의 글은 업데이트 안 됨
   *  2) 같은 글은 1회 만 조회수 업데이트
   * ->> 사용자 방문한 글 번호를 session에 기록
   * 업데이트 시점 : 글 읽기 모드에 들어간 후
   */
  const plusCnt = () => {
    // 0. 처음에 통과상태 설정하기
    let isOk = true;
    // 조건 : session 등록 된 글 or 로그인 사용자는 false로 처리
    // 1. 현재 읽은 글 정보 selData.current
    let cidx = selData.current.idx;
    // 2. sessionStorage 조회
    // - 빈 데이터 처리
    if (!sessionStorage.getItem("board-idx")) sessionStorage.setItem("board-idx", "[]");
    // - 세션정보 조회
    let boardIdx = JSON.parse(sessionStorage.getItem("board-idx"));
    // 3. 조건 검사
    // 3-1. 읽은 글 검사
    boardIdx.some((v) => {
      if (Number(v) === Number(cidx)) {
        isOk = false;
        return true;
      }
    }); /////// some ////////
    // 3-2. 로그인 사용자 검사
    if (localStorage.getItem("minfo")) {
      let currentLoginMember = JSON.parse(localStorage.getItem("minfo"));
      // console.log('currentLoginMember.uid',currentLoginMember.uid);
      if (currentLoginMember.uid == selData.current.uid) isOk = false;
    }
    // 4. 카운트 증가
    if (isOk) {
      let boardData = JSON.parse(localStorage.getItem("boardData"));
      boardData.some((v) => {
        if (Number(v.idx) === Number(cidx)) {
          v.cnt += 1;
          return true;
        }
      });
      originData = boardData;
      // 원본데이터 업데이트
      localStorage.setItem("boardData", JSON.stringify(boardData));
    } /// if ///
    // 5. 읽은 글 session update
    if (isOk) {
      // 배열에 저장
      boardIdx.push(Number(cidx));
      // 세션에 저장하기
      sessionStorage.setItem("board-idx", JSON.stringify(boardIdx));
    }
  }; ///// plusCnt 함수 //////

  /**
   * 함수명 : searchList
   * 기능 : 검색기능 수행 함수
   */
  const searchList = () => {
    // 1. 검색기준값 읽어오기 : 소문자변환
    const cta = $("#cta").val();
    console.log("검색시작", cta);
    // 2. 검색어 읽어오기
    const inputText = $("#stxt").val().trim().toLowerCase();
    // 3. 공백처리
    if (inputText === "") {
      alert("Write down keyword!!!");
      $("#stxt").val("").focus();
      return;
    }
    // 4. 검색용 스토리지 데이터 불러오기
    const storageData = JSON.parse(localStorage.getItem("boardData"));
    // 3. 전체 원본 데이터에서 검색 기준값으로 검색하기
    const resultData = storageData.filter((v) => {
      // 검색기준은 동적으로 변수에 담기므로 []안으로 감싸준다.
      // 소문자 처리
      let compareTxt = v[cta].toLowerCase();
      //  indexOf() like검색
      if (compareTxt.indexOf(inputText) !== -1) return true;
    });
    // 4. 리스트 업데이트
    originData = resultData;
    // 5. 강제 리랜더링 1페이지 일때
    if (pgNum === 1) setForce(Math.random());
    else setPgNum(1);
    // 6. 검색상태관리 참조변수 업데이트
    searchSts.current = true;
  }; ///// searchList 함수 ////

  // 다른 페이지로 이동 할 경우 데이터가 검색 된 것으로 남아있으므로
  // 소멸자로 원본데이터 초기화 세팅을 호출
  useEffect(() => {
    return () => {
      rawData();
    }; ////// unMount //////
  }, []); /////// useEffect ////////

  return (
    <>
      {
        /**1. 게시판 리스트:bdMode L */
        bdMode === "L" && (
          <>
            {/* 전체 타이틀 */}
            <h1 className="tit">OPINION</h1>
            {/* 검색 옵션 박스 */}
            <div className="selbx">
              <select name="cta" id="cta" className="cta">
                <option value="tit" readOnly>
                  Title
                </option>
                <option value="cont" readOnly>
                  Contents
                </option>
                <option value="unm" readOnly>
                  Writer
                </option>
              </select>
              <select
                name="sel"
                id="sel"
                className="sel"
                onChange={() => {
                  sortFn(originData);
                  setForce(Math.random());
                }}
              >
                <option value="0" readOnly>
                  Descending
                </option>
                <option value="1" readOnly>
                  Ascending
                </option>
              </select>
              <input
                id="stxt"
                type="text"
                maxLength="50"
                onKeyUp={(e) => {
                  if (e.code === "Enter") searchList();
                }}
              />
              <button className="sbtn" onClick={searchList}>
                Search
              </button>
            </div>
            <table className="dtbl" id="board">
              <caption>{makeTit()}</caption>
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
          </>
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
                  <input type="text" className="name" size="20" readOnly value={selData.current.unm} />
                </td>
              </tr>
              <tr>
                <td>Email</td>
                <td>
                  <input type="text" className="email" size="40" readOnly value={selData.current.eml} />
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
                  <input type="text" className="name" size="20" readOnly value={selData.current.unm} />
                </td>
              </tr>
              <tr>
                <td>Title</td>
                <td>
                  <input type="text" className="subject" size="60" readOnly value={selData.current.tit} />
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
                  <input type="text" className="name" size="20" readOnly defaultValue={selData.current.unm} />
                </td>
              </tr>
              <tr>
                <td>Title</td>
                <td>
                  <input type="text" className="subject" size="60" defaultValue={selData.current.tit} />
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
                /** 게시판 리스트 버튼 : 검색 상태관리 참조변수 searchSts값이 true일때만 출력*/
                bdMode === "L" && searchSts.current && (
                  <>
                    <button
                      onClick={() => {
                        rawData();
                        $("#stxt").val("").focus();
                        $("#cta").val("tit");
                        setForce(Math.random());
                      }}
                    >
                      <a href="#">List</a>
                    </button>
                  </>
                )
              }
              {
                /**1. 게시판 리스트:bdMode L */
                bdMode === "L" && myCon.logSts !== null && (
                  <button onClick={chgMode2}>
                    <a href="#">Write</a>
                  </button>
                )
              }
              {
                /**2. 글쓰기 테이블 :bdMode C */
                bdMode === "C" && (
                  <>
                    <button onClick={chgMode2}>
                      <a href="#">Submit</a>
                    </button>
                    <button onClick={chgMode2}>
                      <a href="#">List</a>
                    </button>
                  </>
                )
              }
              {
                /**3. 읽기 테이블 :bdMode R */
                bdMode === "R" && (
                  <>
                    <button onClick={chgMode2}>
                      <a href="#">List</a>
                    </button>
                    {
                      /**글쓴이 === 로그인사용자 */
                      btnSts && (
                        <button onClick={chgMode2}>
                          <a href="#">Modify</a>
                        </button>
                      )
                    }
                  </>
                )
              }
              {
                /**4. 수정/삭제 테이블 :bdMode U/D */
                bdMode === "U" && (
                  <>
                    <button onClick={chgMode2}>
                      <a href="#">Submit</a>
                    </button>
                    <button onClick={chgMode2}>
                      <a href="#">Delete</a>
                    </button>
                    <button onClick={chgMode2}>
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
