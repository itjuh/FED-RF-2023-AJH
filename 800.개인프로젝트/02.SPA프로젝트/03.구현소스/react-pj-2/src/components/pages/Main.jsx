// 메인페이지 Main KeyboardList page - Main.jsx

// 메인페이지 css
import "../../css/main.css";
import { Options } from "../modules/Options";
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
let AllData = [];
filterBoardData.map((v, i) => {
  AllData[i] = v.idx;
});
// 대분류 변경에 따른 리스트 변수
let prodList = AllData;
// 옵션데이터
let optionDataOrigin = {
  array: [900, 750, 980],
  color: ["co-wt", "co-bk", "co-gy", "co-bu", "co-ye", "co-rd"],
  switch: ["sw-bu", "sw-br", "sw-sl", "sw-lr", "sw-cl", "sw-sr", "sw-bk"],
};

export function Main() {
  console.log("Main불러옴");
  // 대분류/세부분류 변수
  const [optSel, setOptSel] = useState("array");
  // const optSel = useRef("array");
  const optSubSel = useRef(optionDataOrigin[optSel]);
  const [clickSub, setClickSub] = useState(true);

  // 데이터 변수 -> ref 바꿔야함 : 리스트가 바뀌어도 상단 리랜더링 금지
  const dataIdx = useRef(prodList);

  // 대분류 변경 함수 /////////////
  const chkTop = (e) => {
    // 1. 체크박스 대분류
    const topchk = $(e.currentTarget).text();
    // 2. 소분류 변경
    optSubSel.current = optionDataOrigin[topchk];
    // 3. 대분류 변경
    setOptSel(topchk);
  }; //////// chkTop함수 ///////////

  // 소분류 변경함수
  // 소분류는 변경 시 데이터를 업데이트함
  const chgOptSub = (arr) => {
    //변수업데이트
    optSubSel.current = arr;
  };
  // 소분류 클릭 값 변경함수
  const chgClick = (val) => setClickSub(val);

  // 정렬함수
  const sortFn = (data) => {
    data.sort((a, b) => {
      return a == b ? 0 : a > b ? 1 : -1;
    });
    return data;
  };

  // 정렬값에 맞는 데이터만 보내준다.
  // 데이터변수 변경 함수
  const selData = (arr) => {
    // 1. 대분류 : optSel /세부값 : optSubSel (배열형)
    // 2. 기존분류 가져오기
    let fullList = sortFn(prodList);
    // 3. 세부 필터 값 담을 배열 idx만 담으면 됨
    let selList = [];
    // 4. 전체 배열
    let resList = [];
    // 3. 세부값이 대분류와 일치하는 데이터 검색
    arr.forEach((ele, idx) => {
      // 세부값에 해당하는 데이터의 idx를 골라서 담는다
      selList[idx] = filterBoardData.filter((v) => {
        // console.log(v[optSel].indexOf(ele),'있는지 여부',v[optSel],'arr값',ele);
        if (v[optSel.current].indexOf(ele) !== -1) return true;
      }); ///////// filter /////////////////
    });
    // console.log("세부값이 일치하는 데이터", selList);
    // 수량변수
    let num = 0;
    // 전체배열 업데이트
    selList.map((v) => {
      v.map((i) => {
        resList[num] = i.idx;
        num++;
      });
    });
    // console.log("전체배열 업데이트 후", resList);
    // 중복제거
    resList = resList.filter((v, i) => {
      return resList.indexOf(v) === i;
    });
    resList = sortFn(resList);
    // 클릭으로 체크를 해제한 경우 : 기존 배열(fullList) 선택 된 값(lastList)이 중복이면 담기
    if (!clickSub) {
      fullList = resList.filter((v) => {
        // console.log(v,'값의 위치값',fullList.indexOf(v));
        if (fullList.indexOf(v) !== -1) return true;
      });
    }
    // 클릭으로 체크를 넣은 경우
    if (clickSub) {
      // 기존 배열이 아닌 값과 선택된 값이 중복 된 경우 데이터를 골라서 fullList 업데이트
      // 1. 기존배열이 아닌 값
      let notList;
      notList = AllData.filter((v) => {
        if (fullList.indexOf(v) == -1) return true;
      });
      // console.log("notList", notList);
      // 2. 선택된 값과 중복검사
      notList = resList.filter((v) => {
        // console.log('resList의 v:',v,'중복여부',notList.indexOf(v));
        if (notList.indexOf(v) !== -1) return true;
      });
      // 3. 전체리스트에 반영하기
      fullList = [...fullList, ...resList];
    }
    // 중복제거
    fullList = fullList.filter((v, i) => {
      return fullList.indexOf(v) === i;
    });
    // console.log("최종 데이터: prod,", fullList);
    return fullList;
  }; ///// selData ///////

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
  // 1) 체크정보 저장배열
  const chked = [];
  const checkOnOff = (e) => {
    // 0) 클래스명 가공하기
    let tgName = optSel == "switch" ? ".option-" + optSel + "-area>input:checked" : "." + optSel + "-area>input:checked";
    // 1) 체크 값 가져오기
    $(tgName).each((i, v) => (chked[i] = v.value));
    // 2) 체크값으로 서브옵션 업데이트
    optSubSel.current = chked;
    // 3) 클릭 값 업데이트
    setClickSub(e.target.checked);
    // console.log(e.target.checked);
    // if(chked.length == 0){ //모두 체크 해제 시
    //   $(e.currentTarget).attr("checked",true);
    //   console.log(e.currentTarget);
    // }
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
          <BoardList data={dataIdx.current} />
        </div>
      </main>
    </>
  );
} ////////// Main컴포넌트 //////////////
