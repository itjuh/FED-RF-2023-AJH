// 상품 전체 리스트 페이지

// 상품전체리스트 CSS 불러오기
import { useContext, useEffect, useRef, useState } from "react";
import "../css/glist.css";

// 제이쿼리
import $ from "jquery";

// 상품데이터 불러오기
import gdata from "../data/glist_item";
import { ItemDetail } from "../modules/ItemDetail";
import { pCon } from "../modules/PliotContext";
import { Fragment } from "react";

//////// GList component ///////////
export function GList() {
  const myCon = useContext(pCon);
  // glistMode : F - Filter List P - Paging List M - MoreList
  // 리액트 조건출력

  // 변경 될 데이터 원본가 분리하여 데이터 변경하기 위한 참조변수
  const transData = useRef(JSON.parse(JSON.stringify(gdata)));
  // 값복사로 원본 데이터와 연결성 없음 **.current로 사용

  // 참조변수셋팅 : 리랜더링없이 값유지!
  // 1. 아이템 코드(m1,m2,m3,...)
  const item = useRef("m1");
  // 2. 카테고리명(men/women/style)
  const catName = useRef("men");
  ///////////페이징 변수 세팅 ///////////
  // 3. 페이지 단위수 : 한 페이지 당 레코드수
  const PAGE_BLOCK = 10;
  // 4. 전체 레코드수 : 배열데이터 총개수
  const totNum = gdata.length;
  // 1. 현재 페이지 번호 : 가장중요한 리스트 바인딩의 핵심!
  const [pgNum, setPgNum] = useState(1);
  //////////////////////////////////////

  // 리랜더링을 위한 상태변수 : 무조건 리랜더링설정목적
  const [force, setForce] = useState(null);
  // 데이터 상태관리변수
  const [currData, setCurrData] = useState(transData.current);

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
    // 초기화 전역변수 false로 업데이트
    myCon.gInit.current = false;
    // bindList(); ->>> pgNum사용으로 리랜더링
  }; /////// chgList 함수 ///////////

  // 리스트 만들기 함수 ////////
  const makeList = () => {
    let temp;

    // 1. Filter List
    if (myCon.glistMode === "F") {
      // 데이터 초기화 하기
      // gdata와 같지 않으면 초기화, 단 모드 변경 시에만
      // gInit 참조변수 true일때만 적용
      if(currData !== gdata && myCon.gInit.current){
        // 깊은복사로 재할당 -> 무한 리랜더링을 피하려면 참조변수를 활용한다!
        transData.current = JSON.parse(JSON.stringify(gdata));
      }
      temp = transData.current.map((v, i) => (
        <div key={i}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              showDetail(v.ginfo[0], v.cat);
            }}
          >
            [{i + 1}]
            <img src={"./images/goods/" + v.cat + "/" + v.ginfo[0] + ".png"} alt="dress" />
            <aside>
              <h2>{v.ginfo[1]}</h2>
              <h3>{addComma(v.ginfo[3])}원</h3>
            </aside>
          </a>
        </div>
      ));
    }
    // 2. Paging list
    else if (myCon.glistMode === "P") {
      // 상단메뉴 클릭 한 경우 pgNum이 1이 아니면 초기화
      if(myCon.gInit.current && pgNum !== 1){
        setPgNum(1);
      }
      // map이 아닌 일반 for문 사용시 배열에 데이터 push하여 데이터 넣기
      // JSX문법 태그는 그냥 태그가 아.니.다...!!!
      // 페이징은 데이터 변형이 아니므로 원본데이터에 대한 부분데이터 가져오기다
      temp = [];
      for (let i = (pgNum-1)*PAGE_BLOCK; i < pgNum*PAGE_BLOCK; i++) {
        if (i == totNum) break;
        temp.push(
          <div key={i}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                showDetail(gdata[i].ginfo[0], gdata[i].cat);
              }}
            >
              [{i + 1}]
              <img src={"./images/goods/" + gdata[i].cat + "/" + gdata[i].ginfo[0] + ".png"} alt="dress" />
              <aside>
                <h2>{gdata[i].ginfo[1]}</h2>
                <h3>{addComma(gdata[i].ginfo[3])}원</h3>
              </aside>
            </a>
          </div>
        );
      }
    }
    // 3. More list
    return temp;
  }; //////////// makeList ////////

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //정규식함수(숫자 세자리마다 콤마해주는 기능)
  function addComma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // 상품클릭시 상세보기 보여주는 함수 ////
  const showDetail = (gCode, catCode) => {
    // gCode - 상품코드, catCode - 분류명
    console.log("상세보여!", gCode, catCode);

    // 1. 값업데이트
    item.current = gCode;
    catName.current = catCode;

    // 2. 리랜더링 상태변경
    setForce(Math.random());
    // -> 리랜더링시 변경된 부분만 업데이트 한다!
    // -> ItemDetail 컴포넌트 파트가 업데이트됨!

    // 대상 보이기
    $("#bgbx").slideDown(600);
  }; //////////// showDetail 함수 ///////////
  /**
   * 함수명 : changeList
   * 기능 : 체크박스에 따른 리스트 변경하기
   */
  const changeList = (e) => {
    // 체크박스일 경우 초기화 전역변수 false로 업데이트
    myCon.gInit.current = false;
    // console.log("나야나 체크!", e.currentTarget);
    // 1. 체크박스 아이디 : 검색항목의 값(alignment)
    const cid = e.target.id;
    // 2. 체크박스 체크여부 : checked (true/false)
    const chked = e.target.checked;
    // console.log("아이디:", cid, chked);
    // 3. 체크박스 체크개수 세기
    let num = $(".chkbx:checked").length;
    // console.log("체크개수:", num);

    // 4. 체크박스 체크유무에 따른 분기
    // (1) 체크박스가 true일때 해당 검색어로 검색하기
    // 데이터 추가 시 원본에서 데이터를 만들고 참조변수에 추가함
    if (chked) {
      // 현재 데이터 변수에 담기(검색결과에서 검색하기)
      const nowList = gdata.filter((v) => {
        if (v.cat === cid) return true;
      }); ////// filter /////////
      // console.log(nowList);
      // 체크개수가 1 초과일 때 배열 합치기
      if (num > 1) {
        //스프레스 연산자(...) 사용!
        transData.current = [...transData.current, ...nowList];
      } else {
        transData.current = nowList;
      } //////// if else //////// data count
    } ////// if chked //////
    // (2) 체크박스가 false일때 해당 검색어로 검색해서 배열 제거하기
    // 데이터 제거 시 참조변수에서 데이터를 삭제
    else {
      // 기존 데이터의 연결성 없이 임시변수 할당
      const temp = JSON.parse(JSON.stringify(transData.current));
      // for문을 돌면서 배열데이터 중 해당값을 지운다
      for (let i = 0; i < temp.length; i++) {
        // 데이터 중 cat항목 값이 cid와 일치하면 삭제
        if (temp[i].cat === cid) {
          // 해당항목 지우기
          // 배열지우기 메서드 : splice(순번,개수)
          temp.splice(i, 1);
          // 주의사항! 배열 length가 줄어든다. 반드시 줄임 처리!
          i--;

          // 참고테스트 : 배열삭제 delete는 무엇인가?
          // delete배열지우기는 값만 지우고 주소는 남는다 지운 후 값은 undefined처리
          // delete temp[i]; ->> 리스트 처리 시 에러발생
          // 여기서는 splice를 반드시 사용할 것!
        }
      }
      console.log("삭제처리 된 배열 : temp", temp);
      transData.current = temp;
    }

    console.log(transData.current);
    // 6. 검색결과 리스트 업데이트하기
    setCurrData(transData.current);
  }; ///////// changeList 함수 /////////

  // 리턴 코드 ///////////////////
  return (
    <main id="cont">
      <h1 className="tit">All ITEMS LIST</h1>
      {myCon.glistMode === "F" && (
        // filter list Mode 출력
        <section>
          <div id="optbx">
            <label htmlFor="men">남성</label>
            <input type="checkbox" className="chkbx" id="men" defaultChecked onChange={changeList} />
            <label htmlFor="women">여성</label>
            <input type="checkbox" className="chkbx" id="women" defaultChecked onChange={changeList} />
            <label htmlFor="style">스타일</label>
            <input type="checkbox" className="chkbx" id="style" defaultChecked onChange={changeList} />
          </div>
          <div className="grid">{makeList()}</div>
        </section>
      )}
      {myCon.glistMode === "P" && (
        // paging list Mode 출력
        <section>
          <div className="grid">{makeList()}</div>
          <div id="paging">
            {pagingLink()}
          </div>
        </section>
      )}
      {myCon.glistMode === "M" && (
        // more list Mode 출력
        <section>
          <div className="grid">{makeList()}</div>
          <div id="more">
            <button className="more">MORE</button>
          </div>
        </section>
      )}
      {/* 2.5. 상세보기박스 */}
      <div
        id="bgbx"
        style={{
          position: "fixed",
          top: 0,
          paddingTop: "12vh",
          backdropFilter: "blur(8px)",
          height: "100vh",
          zIndex: 9999,
          display: "none",
        }}
      >
        <ItemDetail goods={item.current} cat={catName.current} />
      </div>
    </main>
  );
} /////////////// GList 컴포넌트 ///////////
