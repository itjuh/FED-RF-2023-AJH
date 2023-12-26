// 메인페이지 Main KeyboardList page - Main.jsx

// 메인페이지 css
import "../../css/main.css";
import { Options } from "../modules/Options";
import { BoardList } from "../modules/BoardList";
import { Filter } from "../modules/Filter";
import { useEffect, useState } from "react";
import { filterBoardData } from "../data/boardData";
import { useRef } from "react";
// filterBoardData idx값만 가져오기
let AllData = [];
filterBoardData.map((v, i) => {
  AllData[i] = v.idx;
});
// 대분류 변경에 따른 리스트 변수
let prodList = AllData;
// 옵션데이터
let optionData = {
  array: [900, 750, 980],
  color: ["co-wt", "co-bk", "co-gy", "co-bu", "co-ye", "co-rd"],
  switch: ["sw-bu", "sw-br", "sw-sl", "sw-lr", "sw-cl", "sw-sr", "sw-bk"],
};

export function Main() {
  console.log('Main불러옴');
  // 대분류/세부분류 변수
  // const [optSel, setOptSel] = useState("array");
  const optSel = useRef('array');
  const [optSubSel, setOptSubSel] = useState(optionData[optSel.current]);
  const [clickSub, setClickSub] = useState(true);

  // 데이터 변수
  const [dataIdx, setDataIdx] = useState(prodList);
  // 대분류 변경함수
  const chgOpt = (txt) => {
    // 대분류 변경
    // setOptSel(txt);
    optSel.current = txt;
    // optionData
    // setOptSubSel(optionData[txt]);
    // 데이터 변경사항 리스트변수에 담기
    prodList = dataIdx;
    // 옵션데이터 업데이트
    optionData[optSel.current] = optSubSel;
    // console.log('대분류 변경으로 데이터 업데이트',optionData);
  };
  // 소분류 변경함수
  const chgOptSub = (arr) => {
    //변수업데이트
    // setOptSubSel(arr);
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

  // useEffect 구역 옵션변경 시 적용
  useEffect(() => {
    // console.log(optSel, optSubSel);
    // setDataIdx(selData(optSubSel));
  }, [optSel.current, optSubSel]);

  return (
    <>
      <main className="main in-box row-12 row-s-13">
        {/* 2-1. 제품 정렬옵션 */}
        <div className="part-box col-16 row-1">
          <Filter chgOptFn={chgOpt} />
        </div>
        {/* 2-2. 옵션 선택 시 세부옵션 */}
        <Options chgOptFn={chgOptSub} opt={optSel.current} clickFn={chgClick} />
        {/* 2-2. 제품 리스트 */}
        <div className="part-box col-16 row-10 prod-area">
          <BoardList data={dataIdx} />
        </div>
      </main>
    </>
  );
} ////////// Main컴포넌트 //////////////
