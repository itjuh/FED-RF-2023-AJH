// DC PJ 검색 컴포넌트 - Searching.jsx
// 폰트어썸 아이콘 불러오기
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SchCatList } from "./SchCatList";
// Search 모듈용 CSS
import "../../css/searching.css";
import $ from "jquery";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

export function Searching(props) {
  // props.kword - 검색어 전달
  console.log("전달 검색어 : ", props.kword);

  /////// 후크 상태관리 변수 /////////////
  // 1. 검색어 후크상태 변수
  const [kword, setKword] = useState(props.kword);
  // 2. 출력개수
  const [cntNum, setCntNum] = useState(0);
  /////////////////////////////////////////
  
  
  ///////// useRef 변수 //////////////////////////////
  // useState 와 useRef 차이
  // useState는 바뀌면 업데이트 useRef는 컴포넌트가 마운팅된 동안 값이 유지됨
  // 1. 검색케이스 구분변수(useRef) -> 값 유지
  const allow = useRef(1) // 1-상단검색허용/0-상단검색불허용
  // useRef변수 사용은 변수명.current
  // 2. 폰트어썸 참조변수
  const fontRef = useRef(null);
  useEffect(()=>{
    // fontRef가 폰트어썸 컴포넌트를 담은 후!
    console.log(fontRef);
    // 테두리 디자인 주기
    fontRef.current.style.color = 'cornflowerblue';
  });////// useEffect 구역 ////////
  
  // 검색어 업데이트 함수
  const chgKword = txt => setKword(txt);
  // 상단검색 초기 실행 함수
  const initFn = () =>{
    // 넘어온 검색어와 셋팅 된 검색어가 다르면 업데이트
    if (props.kword !== kword) {
      console.log(props.kword,'props.kword',kword,'kword');
      // 모듈검색 input창에 같은 값 넣어주기
      $("#schin").val(props.kword);
    } ////////// if /////////
  }; /////// 초기실행 함수 initFn ///////////

  // 만약 useRef변수 값이 1이면 initFn실행
  if(allow.current) initFn();
  console.log('allow값',allow.current);

  // 리스트 개수 업데이트 함수
  const chgCnt = (num) => {
    // 출력 개수 변경
    setCntNum(num);
  }; //////// showCnt함수 ///////////

  // 검색 리스트 만들기 함수
  const schList = (e) => {
    let txt = $(e.currentTarget).next().val();
    chgKword(txt);
  }; /////// schList함수 ////////

  // 엔터 키 반응함수
  const enterKey2 = (e) => {
    // 상단키워드 검색 막기
    allow.current = 0;
    // 잠시 후 상태 해제
    setTimeout(()=>allow.current=1,100);
    // 엔터키만 반영
    if (e.key == "Enter") {
      let txt = $(e.target).val();
      chgKword(txt);
    }
    // console.log('눌리는중',$(e.target).val());
  }; /////// enterKey함수 ////////
  // 체크박스 검색 함수
  const chkSearch = () => {}; //////// chkSearch함수 ///////////
  // 리스트 정렬 함수
  const sortList = () => {}; //////// sortList함수 ///////////

  //////////리턴코드 ////////////////////
  return (
    <>
      {/* 전체 검색모듈 코드 */}
      <section className="schbx">
        {/* 1. 옵션 선택박스 */}
        <div className="schopt">
          {/* 1-1. 검색박스 */}
          <div className="searching">
            {/* 검색버튼 돋보기 아이콘 */}
            <FontAwesomeIcon icon={faSearch} className="schbtn"
             title="Open search" onClick={schList} ref={fontRef}/>
            {/* 입력창 */}
            {/*
              input 요소에서 리액트 value 속성명은 defaultValue를 사용한다->초기값
              value 속성을 쓰면 동적 변경이 이루어 지고 사용자가 입력하지 못하도록
              읽기전용(readOnly)설정이 되어 있어야 한다.
            */}
            <input id="schin" onKeyUp={enterKey2} type="text" placeholder="Filter by keyword" defaultValue={kword} />
          </div>
          {/* 1-2. 체크박스구역 */}
          <div className="chkbx">
            <ul>
              <li>
                {/* 타이틀 */}
                <h2 style={{ marginRight: "10px" }}>
                  ALIGNMENT<span className="spbtn">＋</span>
                </h2>
                {/* 체크박스 리스트 */}
                <ol style={{ marginRight: "10px" }}>
                  <li>
                    Heroes
                    {/* 숨긴 체크박스 */}
                    <input type="checkbox" id="hero" className="chkhdn" onChange={chkSearch} />
                    {/* 체크박스 디자인 */}
                    <label htmlFor="hero" className="chklb"></label>
                  </li>
                  <li>
                    It's Complicated
                    {/* 숨긴 체크박스 */}
                    <input type="checkbox" id="comp" className="chkhdn" onChange={chkSearch} />
                    {/* 체크박스 디자인 */}
                    <label htmlFor="comp" className="chklb"></label>
                  </li>
                  <li>
                    Villains
                    {/* 숨긴 체크박스 */}
                    <input type="checkbox" id="villain" className="chkhdn" onChange={chkSearch} />
                    {/* 체크박스 디자인 */}
                    <label htmlFor="villain" className="chklb"></label>
                  </li>
                </ol>
              </li>
            </ul>
          </div>
        </div>
        {/* 2. 결과리스트 박스 */}
        <div className="listbx">
          {/* 2-1. 결과 타이틀 */}
          <h2 className="restit">BROWSE CHARACTERS ({cntNum})</h2>
          {/* 2-2. 정렬 선택박스 */}
          <aside className="sortbx">
            {/* name: 값 읽는 속성 */}
            <select name="sel" id="sel" className="sel" onChange={sortList}>
              <option value="0">A-Z</option>
              <option value="1">Z-A</option>
            </select>
          </aside>
          {/* 2-3. 캐릭터 리스트 컴포넌트 */}
          <SchCatList word={kword} chgCntFn={chgCnt} />
        </div>
      </section>
    </>
  );
} ///////// Searching 컴포넌트 ///////////
