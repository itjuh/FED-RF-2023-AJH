// 메인페이지 Main KeyboardList page - Main.jsx

// 메인페이지 css
import "../../css/main.css";
import { BoardList } from "../modules/BoardList";
import { Fragment, useEffect, useState } from "react";
import { useRef } from "react";
// 데이터 가져오기
import { filterBoardData } from "../data/boardData";
import { optionData } from "../data/optionData";
// 제이쿼리 가져오기
import $ from "jquery";
import { CheckCon } from "../modules/Icons";
window.jQuery = $;
require("jquery-ui-dist/jquery-ui");
require("jquery-ui-touch-punch/jquery.ui.touch-punch");

// filterBoardData idx값만 가져오기
let idxData = [];
filterBoardData.map((v, i) => {
  idxData[i] = v.idx;
});
// 대분류 변경에 따른 리스트 변수
let prodList = idxData;

export function Main() {
  console.log("Main불러옴");
  // 대분류/세부분류 변수
  const [optSel, setOptSel] = useState("array");
  // const optSel = useRef("array");
  const optSubSel = useRef([900, 750, 980]);
  // const [clickSub, setClickSub] = useState(true);
  const clickSub = useRef(true);

  // 데이터 변수 -> [배열데이터,변경상태] 리스트가 바뀌어도 상단 리랜더링 금지
  // const [dataIdx, setDataIdx] = useState(prodList);
  const dataIdx = useRef(prodList);
  /** flag true 새로추가 false 내부변경 */
  const flag = useRef(true); // true 부모변경 false 내부변경

  // 대분류 변경 함수 /////////////
  const chkTop = (e) => {
    // 1. 체크박스 대분류
    const topchk = $(e.currentTarget).text();
    // 2. 소분류 변경
    const chked = [];
    // 0) 클래스명 가공하기
    let tgName =
      optSel == "switch" ? ".option-" + optSel + "-area>input:checked" : "." + optSel + "-area>input:checked";
    // 1) 체크 값 가져오기
    $(tgName).each((i, v) => (chked[i] = v.value));
    // 2) 체크값으로 서브옵션 업데이트
    optSubSel.current = chked;
    // 3. 대분류 변경
    setOptSel(topchk);
    // 4. flag 업데이트
    flag.current = true;
  }; //////// chkTop함수 ///////////

  // 정렬함수
  const sortFn = (data) => {
    // console.log(data);
    if (data.lenght !== 0) {
      data.sort((a, b) => {
        return a == b ? 0 : a > b ? 1 : -1;
      });
      return data;
    }
  };

  // 데이터 변경 함수
  const selData = () => {
    /**
     * 현재 뿌려지는 데이터 불러오기
     * optsub 업데이트(체크박스 관리)
     * 옵션데이터에서 true항목에 대한 인덱스리스트 filter 1)
     * 인덱스 데이터 옵션 true항목 담기
     * 1. 옵션체크 true
     * 기존데이터와 합쳐서 중복제거 [...new Set(arr)]
     * 2. 옵션체크 false
     * 데이터 중복제거 [...new Set(arr)]
     * 기존분류 인덱스데이터와 공통데이터만 뽑기
     */
    // 기존데이터 - dataIdx.current
    // 선택 서브옵션 - optSubSel.current
    // 서브 checkded true항목의 데이터를 인덱스로 filter
    let selectList = [];
    optSubSel.current.forEach((ele) => {
      // 세부값에 해당하는 데이터의 idx를 골라서 담는다
      filterBoardData.filter((v) => {
        // console.log(v[optSel].indexOf(ele),'있는지 여부',v[optSel],'arr값',ele);
        if (v[optSel].indexOf(ele) !== -1) {
          selectList.push(v.idx);
        }
      }); ///////// filter /////////////////
    });
    // 중복제거
    selectList = [...new Set(selectList)];
    if (clickSub.current) {
      // check true
      selectList = [...new Set([...dataIdx.current, ...selectList])];
    } else {
      // check false
      selectList = dataIdx.current.filter((v) => {
        // console.log(v);
        if (selectList.includes(v)) return true;
      });
    }
    // 데이터 정렬
    sortFn(selectList);
    // 전달 데이터 업데이트
    dataIdx.current = selectList;
    // 4. flag 업데이트
    flag.current = false;
    console.log(flag.current, dataIdx.current,'부모');
  };

  // 클릭한 필터 값 이동하기
  const addOn = function (e) {
    const prog = $(".progress-area li");
    let tg = $(e.currentTarget);
    // 클릭 li 순번
    let idx = prog.index(tg);
    // progressbar 길이
    let wid = 33.3 * (idx + 1);

    // 해당순번에 on넣고 이전순번까지on 적용
    prog.eq(idx).addClass("on").prevAll().addClass("on");
    // 해당순전 이후 on제거
    prog.eq(idx).nextAll().removeClass("on");
    // 프로그래스바 css적용
    $(".progress-bar").css({
      width: wid + "%",
    });
    // myCon.chgSel(idx);
  };
  // 소분류 변경함수
  const checkOnOff = (e) => {
    // 소분류 체크
    const chked = [];
    // 0) 클래스명 가공하기
    let tgName =
      optSel == "switch" ? ".option-" + optSel + "-area>input:checked" : "." + optSel + "-area>input:checked";
    // 1) 체크 값 가져오기
    $(tgName).each((i, v) => (chked[i] = v.value));
    // 2) 체크값으로 서브옵션 업데이트
    optSubSel.current = chked;
    // 3) 클릭 값 업데이트
    clickSub.current = e.target.checked;
    // console.log(optSubSel.current,'서브목록배열\n클릭값:',e.target.checked,'\nchked',chked);
    // console.log(e.target.checked);
    // if(chked.length == 0){ //모두 체크 해제 시
    //   $(e.currentTarget).attr("checked",true);
    //   console.log(e.currentTarget);
    // }

    // 데이터 변경 함수 호출
    selData();
  };
  // 배열 옵션 리스트 함수
  const makeOptionList = () => {
    // 배열 서브옵션
    if (optSel === "array") {
      return (
        <div className="progress-sub-area col-5 flex-box col-s-14 array-area">
          {optionData[1].inputList.map((v, i) => (
            <Fragment key={i}>
              {/* 옵션 선택 구역 */}
              <input type="checkbox" value={v.val} id={v.id} defaultChecked onChange={checkOnOff} />
              <label className={v.labelClass} htmlFor={v.id}>
                {v.labelClass === "check-array" && v.val}
                {v.labelClass !== "check-array" && (
                  <h1>
                    <CheckCon />
                  </h1>
                )}
              </label>
            </Fragment>
          ))}
        </div>
      );
    }
    // 색상 서브옵션
    else if (optSel === "color") {
      return (
        <div className="progress-sub-area col-5 flex-box col-s-14 color-area">
          {optionData[2].inputList.map((v, i) => (
            <Fragment key={i}>
              {/* 옵션 선택 구역 */}
              <input type="checkbox" value={v.val} id={v.id} defaultChecked onChange={checkOnOff} />
              <label className={v.labelClass} htmlFor={v.id}>
                {v.labelClass === "check-array" && v.val}
                {v.labelClass !== "check-array" && (
                  <h1>
                    <CheckCon />
                  </h1>
                )}
              </label>
            </Fragment>
          ))}
        </div>
      );
    }
    // 스위치 종류 서브옵션
    else if (optSel === "switch") {
      return (
        <div className="progress-sub-area col-5 flex-box col-s-14 option-switch-area">
          {optionData[3].inputList.map((v, i) => (
            <Fragment key={i}>
              {/* 옵션 선택 구역 */}
              <input type="checkbox" value={v.val} id={v.id} defaultChecked onChange={checkOnOff} />
              <label className={v.labelClass} htmlFor={v.id}>
                {v.labelClass === "check-array" && v.val}
                {v.labelClass !== "check-array" && (
                  <h1>
                    <CheckCon />
                  </h1>
                )}
              </label>
            </Fragment>
          ))}
        </div>
      );
    }
  };

  return (
    <>
      <main className="main in-box row-12 row-s-13">
        {/* 2-1. 제품 정렬옵션 */}
        <div className="part-box col-16 row-1">
          <div className="progress-area col-6 col-s-14">
            <ul className="flex-box">
              {optionData[0].top.map((v, i) => (
                <li
                  key={i}
                  className={i == 0 ? "on" : ""}
                  onClick={(e) => {
                    chkTop(e);
                    addOn(e);
                  }}
                >
                  <h2>{v}</h2>
                </li>
              ))}
            </ul>
            <div className="progress-bar"></div>
          </div>
        </div>
        {/* 2-2. 옵션 선택 시 세부옵션 */}
        <div className="part-box col-16 row-1">{makeOptionList()}</div>
        {/* 2-2. 제품 리스트 */}
        <div className="part-box col-16 row-10 prod-area">
          <BoardList dataIdx={dataIdx.current} flag={flag.current} />
        </div>
      </main>
    </>
  );
} ////////// Main컴포넌트 //////////////
