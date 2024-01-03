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

// 옵션데이터
let optionDataOrigin = {
  array: ["full", "tenkey less", "slim"],
  color: ["co-wt", "co-bk", "co-gy", "co-bu", "co-ye", "co-rd"],
  switch: ["sw-bu", "sw-br", "sw-sl", "sw-lr", "sw-cl", "sw-sr", "sw-bk"],
};

export function Main() {
  console.log("Main불러옴");
  // 대분류/세부분류
  const [optSel, setOptSel] = useState("array");
  // const optSel = useRef("array");
  // 세부분류 옵션
  const [arrayOpt, setArrayOpt] = useState(["full", "tenkey less", "slim"]);
  const [colorOpt, setColorOpt] = useState(["co-wt", "co-bk", "co-gy", "co-bu", "co-ye", "co-rd"]);
  const [switchOpt, setSwitchOpt] = useState(["sw-bu", "sw-br", "sw-sl", "sw-lr", "sw-cl", "sw-sr", "sw-bk"]);

  // 데이터 변수 -> 리스트가 바뀌어도 상단 리랜더링 금지
  const [dataIdx, setDataIdx] = useState(prodList);

  // 다른 옵션 선택 함수
  const otherOptionList = (opt, arr) => {
    // 배열의 교집합이 존재할 경우 idx를 리턴
    let selData = [];
    let i = 0;
    filterBoardData.filter((v) => {
      let setArray = [...new Set([...arr, ...v[opt]])];
      console.log("arr ||", arr, "v[opt]\n", v[opt], "setArray\n", setArray);
      console.log(setArray == arr);
      if (setArray === arr) {
        selData[i] = v.idx;
        i++;
        return true;
      }
    });
    return selData;
  };
  const arrayOptionList = (arr) =>{
    let selData = [];
    let i = 0;
  }

  const optSubSel = useRef(["full", "tenkey less", "slim"]);
  // const [clickSub, setClickSub] = useState(true);
  const clickSub = useRef(true);

  // const dataIdx = useRef(prodList);

  // 대분류 변경 함수 /////////////
  const chkTop = (e) => {
    // 1. 체크박스 대분류
    const topchk = $(e.currentTarget).text();
    // 2. 대분류 변경
    if (optSel !== topchk) setOptSel(topchk);
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
     * 옵션1/ 옵션2/ 옵션3 에 대한 다중조건 불러오기
     * 데이터에서 옵션1일치/ 옵션2의 한개의 값이상 포함/ 옵션3의 한개의 값이상 포함
     * 각 조건에 대한 데이터 구성 A,B,C
     * 데이터 변동 state만들기
     * 각 데이터와 일치하는 데이터를 교집합 가져오기
     * true / false 동작이 일치함
     *
     * 1. 옵션체크 true
     * 나머지 옵션에 대한 list와 일치하고 체크한 옵션과 일치한 데이터를 reduce
     *
     * 현재 뿌려지는 데이터 불러오기
     * optsub 업데이트(체크박스 관리)
     * 옵션데이터에서 true항목에 대한 인덱스리스트 filter 1)
     * 인덱스 데이터 옵션 true항목 담기
     * 1. 옵션체크 true
     * 기존데이터와 합쳐서 중복제거 [...new Set(arr)] ->>>> 문제가 있음
     * 타 옵션 체크항목의 데이터를 가지고 있어야함!!!!!!!!!-> 중요함
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
      selectList = [...new Set([...dataIdx, ...selectList])];
    } else {
      // check false
      selectList = dataIdx.filter((v) => {
        // console.log(v);
        if (selectList.includes(v)) return true;
      });
    }
    // 데이터 정렬
    sortFn(selectList);
    // 전달 데이터 업데이트
    setDataIdx(selectList);
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
    let list1;
    let list2;
    // 리스트 업데이트
    switch (optSel) {
      case "array":
        setArrayOpt(chked);
        // 나머지 옵션값에 대한 데이터 가져오기 => 함수로 만들기(데이터는 넘겨주고)
        // 체크상태 분기해서 데이터 넣거나 빼기 => 함수로 만들기(데이터는 넘겨주고)
        list1 = otherOptionList("color", colorOpt);
        list2 = otherOptionList("switch", switchOpt);
        console.log(list1, list2);
        break;
      case "color":
        setColorOpt(chked);
        // list1 = otherOptionList("array", arrayOpt);
        list2 = otherOptionList("switch", switchOpt);
        // 나머지 옵션값에 대한 데이터 가져오기
        // 체크상태 분기해서 데이터 넣거나 빼기
        break;
      case "switch":
        setSwitchOpt(chked);
        list1 = otherOptionList("color", colorOpt);
        // list1 = otherOptionList("array", arrayOpt);
        // 나머지 옵션값에 대한 데이터 가져오기
        // 체크상태 분기해서 데이터 넣거나 빼기
        break;
    }

    // 분기해서 체크 값 업데이트

    // 0) 클래스명 가공하기
    // let tgName =
    //   optSel == "switch" ? ".option-" + optSel + "-area>input:checked" : "." + optSel + "-area>input:checked";
    // // 1) 체크 값 가져오기
    // $(tgName).each((i, v) => (chked[i] = v.value));
    // // 2) 체크값으로 서브옵션 업데이트
    // optSubSel.current = chked;

    // console.log("대분류 변경 시 소분류 배열값:", chked);
    // // 3) 클릭 값 업데이트
    // clickSub.current = e.target.checked;
    // console.log(optSubSel.current,'서브목록배열\n클릭값:',e.target.checked,'\nchked',chked);
    // console.log(e.target.checked);
    // if(chked.length == 0){ //모두 체크 해제 시
    //   $(e.currentTarget).attr("checked",true);
    //   console.log(e.currentTarget);
    // }

    // 데이터 변경 함수 호출
    selData();
  };
  // useEffect 구역
  useEffect(() => {
    let selNum = optSel == "array" ? 0 : optSel == "color" ? 1 : 2;
    // 선택옵션 하위옵션만 보이기
    $(".progress-sub-area").eq(selNum).css({ display: "flex" }).siblings().css({ display: "none" });
  }, [optSel]);
  // 배열 옵션 리스트 함수
  const makeOptionList = (data) => {
    return (
      <div className={"progress-sub-area col-5 flex-box col-s-14 " + data.label + "-area"}>
        {data.inputList.map((v, i) => (
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
  };
  return (
    <>
      <main className="main in-box row-12 row-s-13">
        <div className="desc-box">
          <span>Choose an option</span>
        </div>
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
        <div className="part-box col-16 row-1">
          {/* 1) 배열 옵션 */}
          {makeOptionList(optionData[1])}
          {/* 2) 색 옵션 */}
          {makeOptionList(optionData[2])}
          {/* 3) 스위치 옵션 */}
          {makeOptionList(optionData[3])}
        </div>
        {/* 2-2. 제품 리스트 */}
        <div className="part-box col-16 row-10 prod-area">
          <BoardList dataIdx={dataIdx} />
        </div>
      </main>
    </>
  );
} ////////// Main컴포넌트 //////////////
