// Pliot PJ 신상품 컴포넌트

import { useEffect } from "react";
import $ from "jquery";
// 신상품 데이터 가져오기
import { newProdData } from "../data/new_prod";
import { useRef } from "react";

export function NewProdList({cat, chgItemFn}) {
  // cat 카테고리 분류명
  // chgItemFn - 선택상품정보변경 부모함수
  // 선택 데이터 : 해당 카테고리 상품 데이터만 가져온다
  let selData = newProdData[cat];

  const makeList = () => {
    // 코드 담을 배열
    let temp = [];
    // 만들 개수만큼 반복
    for (let i = 0; i < 9; i++) {
      temp[i] = (
        <li onMouseEnter={showInfo} onMouseLeave={removeInfo} 
        key={i} className={"m" + (i + 1)}>
          <a href="#" onClick={(e)=>{
            e.preventDefault();
            chgItemFn('m'+(i+1))}}>
            <img src={"./images/goods/" + cat + "/m" + (i + 1) + ".png"} 
            alt="신상품" />
          </a>
        </li>
      );
    } /////// for //////////
    // JSX를 담은 배열을 리턴 -> 자동 태그 변환
    return temp;
  }; /////// makeList ///////////

  // 상품에 오버 시 상품정보를 보여주는 함수 //////////
  const showInfo = (e) => {
    // 대상
    const tg = $(e.currentTarget);
    // 이벤트가 발생한 li의 클래스 읽어오기(상품정보의 key)
    let goodsKey = tg.attr("class");
    // console.log("showInfo호출", selData[goodsKey]);
    // 2. 상품정보 박스를 보이게 하기
    // 마우스 오버 된 자신에 넣어줌
    tg.append(`<div class='ibox'></div>`);
    // 3. 현재 li에 만든 .ibox에 데이터 넣기
    tg.find('.ibox').html(selData[goodsKey].split('^').map(v=>`
    <div>${v}</div>`))
    // 등장 애니
    .animate({top:'100%',opacity:1},300)
  }; //////// showInfo 함수 /////////////

  // 정보박스 지우기
  const removeInfo = (e) =>{
    $(e.currentTarget).find('.ibox').remove();
  }

  // 신상품 리스트 이동함수 변수
  // 리랜더링 시 기존값을 유지하도록 useRef를 사용한다.
  // 위치값 변수(left값)
  let lpos = useRef(0);
  // 재귀호출 상태값 ( 1- 호출, 0 멈춤)
  let callSts = useRef(1);

  // 신상품 리스트 이동함수
  const flowList = (ele) => {
    // console.log('호출');
    // 대상의 left값을 1씩 감소함
    lpos.current--;
    // 이미지 박스 한개가 나가면 잘라서 맨 뒤로 보냄
    if (lpos.current < -300) {
      // 위치값 초기화 (-301 일때 0으로)
      lpos.current = 0;
      // 첫번째 li 맨 뒤로 이동
      ele.append(ele.find("li").first());
    }
    // 적용
    ele.css({ left: lpos.current + "px" });
    // 재귀호출
    if (callSts.current) setTimeout(() => flowList(ele), 40);
  }; //////// flowList //////////

  // 오버 아웃 시 상태값 변경함수
  const chgSts = (num) => {
    callSts.current = num;
  }; /////// chgSts 함수 ////////////

  // 랜더링 후 한 번 실행구역
  useEffect(() => {
    // 대상선정: .flist

    // 신상 리스트 이동 함수
    flowList($(".flist"));
  },[]); //////// useEffect 구역 /////////

  // 리턴코드
  return (
    <>
      <h2 className="c1tit">
        NEW MEN'S ARRIVAL
        <button>전체리스트</button>
      </h2>
      <div
        className="flowbx"
        onMouseOver={() => chgSts(0)}
        onMouseOut={() => {
          chgSts(1);
          flowList($(".flist"));
        }}
      >
        <ul className="flist">{makeList()}</ul>
      </div>
    </>
  );
} ////////// NewProdList 컴포넌트 //////////////
