// DC PJ 검색 컴포넌트 - Searching.jsx
// 폰트어썸 아이콘 불러오기
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SchCatList } from "./SchCatList";
// Search 모듈용 CSS
import "../../css/searching.css";
// 제이쿼리
import $ from "jquery";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
// 캐릭터 리스트
import { catListData } from "../data/swiper_cat";

// 최초 원본 데이터 정렬 변경하기(오름차순)
// 주의사항! 컴포넌트 내부에 포함시키지 말 것!
// ->> 배열의 정렬 정보가 컴포넌트에 포함 될 경우? 
// 컴포넌트 리 랜더링시 초기화 됨. 결과적으로 정렬이 변경되지 않음
// 따라서 컴포넌트 밖에 정렬 된 원본 배열 데이터를 만들어준다.
catListData.sort((a,b)=>{
  return a.cname==b.cname?0:a.cname>b.cname?1:-1;
})

// console.log(catListData);
// console.log(temp);
export function Searching(props) {
  // props.kword - 검색어 전달
  // console.log("전달 검색어 : ", props.kword);

  /////// 후크 상태관리 변수 /////////////
  // 1. 검색어 후크상태 변수 : 초기값 null
  const [kword, setKword] = useState(null);

  // 2. 출력개수
  const [cntNum, setCntNum] = useState(0);

  // 3. 데이터 구성 상태변수 : [배열데이터,정렬상태]
  const [selData, setSelData] = useState([[],2]);
  // - 정렬상태값 : 0-오름차순 1-내림차순 2-정렬전
  // 두가지 값을 같이 관리하는 이유? -> 데이터 정렬만 변경 될 경우
  // 배열 자체가 변경된 것으로 인식하지 않기 때문이다
  
  // 4. 데이터 개수
  const [cnt, setCnt] = useState(0);
  /////////////////////////////////////////

  ///////// useRef 변수 //////////////////////////////
  // useState 와 useRef 차이
  // useState는 바뀌면 업데이트 useRef는 컴포넌트가 마운팅된 동안 값이 유지됨
  // 1. 검색케이스 구분변수(useRef) -> 값 유지
  const allow = useRef(1); // 1-상단검색허용/0-상단검색불허용
  // useRef변수 사용은 변수명.current
  // 2. 폰트어썸 참조변수
  const fontRef = useRef(null);
  // 3. 처음상태 구분변수(랜더링 이전시점 1번 실행 구분)
  const firstSts = useRef(0);

  useEffect(() => {
    // fontRef가 폰트어썸 컴포넌트를 담은 후!
    // console.log(fontRef);
    // 테두리 디자인 주기
    fontRef.current.style.color = "cornflowerblue";
  }); ////// useEffect 구역 ////////

  // 검색어 업데이트 함수
  const chgKword = (txt) => setKword(txt);
  // 상단검색 초기 실행 함수
  const initFn = () => {
    // 넘어온 검색어와 셋팅 된 검색어가 다르면 업데이트
    if (props.kword != kword) {
      console.log('상단검색 실행:',props.kword, "props.kword", kword, "kword");
      // 키워드 상태 변수에 업데이트
      chgKword(props.kword);
      // 모듈검색 input창에 같은 값 넣어주기
      $("#schin").val(props.kword);
      // 검색 리스트 만들기 함수 호출
      schList();
    } ////////// if /////////
  }; /////// 초기실행 함수 initFn ///////////

  // 키워드를 받아서 처음 한번 filter검색하는 함수//////////////
  function firstDo (){
    console.log('처음한번만~!',props.kword);
    const firstTemp = catListData.filter(v=>{
      if(v.cname.toLowerCase().indexOf(props.kword.toLowerCase())!==-1) return true;
    })
    
    firstTemp.sort((a,b)=>{
      return a.cname==b.cname?0:a.cname>b.cname?1:-1;
    })
  
    console.log('처음결과:',firstTemp);
    setSelData([firstTemp,2]);
    // 검색건수 상태관리변수 업데이트!
    setCnt(firstTemp.length);
  
    chgKword(props.kword);
  
  } ///////////// firstDo 함수 ////////
  // 한번만 호출
  if(!firstSts.current) {
    firstDo();
    firstSts.current = 1;
  } ////// if ////////

  // 만약 useRef변수 값이 1이면 initFn실행
  if(allow.current) initFn();
  // console.log("allow값", allow.current);

  // 리스트 개수 업데이트 함수
  const chgCnt = (num) => {
    // 출력 개수 변경
    setCntNum(num);
  }; //////// showCnt함수 ///////////

  ////////////////////////////////////
  // 검색 리스트 만들기 함수////////////
  function schList(e){
    // 1. 검색어 읽어오기
    let keyword = $('#schin').val();
    // 2. 데이터 검색하기
    const newList = catListData.filter(v=>{
      if(v.cname.toLowerCase().indexOf(keyword) != -1) return true;

    }); ///////// filter /////////////////
    console.log('검색결과',newList);
    // 3. 검색결과 리스트 업데이트하기
    // 데이터 상태관리변수 업데이트!
    setSelData([newList,2]);
    // 검색건수 상태관리 변수 업데이트
    setCnt(newList.length);
    
  } /////// schList함수 ////////

  // 엔터 키 반응함수
  const enterKey = (e) => {
    if (e.key == "Enter") {
      // 상단키워드 검색 막기
      allow.current = 0;
      // 잠시 후 상태 해제
      setTimeout(() => allow.current = 1, 10);
      // 엔터키만 반영
      let txt = $(e.target).val();
      chgKword(txt);

      // 검색 리스트 만들기 함수호출
      schList();
    } /////////// if //////////////

    // console.log('눌리는중',$(e.target).val());
  }; /////// enterKey함수 ////////

  //////////////////////////////////
  // 체크박스 검색 함수 /////////////
  const chkSearch = (e) => {
    // 1. 체크박스 아이디 : 검색항목의 값(alignment)
    const cid = e.target.id;

    // 2. 체크박스 체크여부 : checked(true/false)
    const chked = e.target.checked;
    console.log(cid,chked);
    // 3. 기존 입력 데이터 가져오기 selData의 첫번째 배열값
    let temp = selData[0];
    // 최종 결과 집합배열 변수
    let lastList = [];
    // 4. 체크박스 체크개수 세기 : 1개 초과 시 배열 합치기
    let num = $('.chkhdn:checked').length;
    // 5. 체크박스 체크유무에 따른 분기
    // (1) 체크박스가 true일때 해당 검색어로 검색하기
    if(chked){
      // 현재 데이터 변수에 담기(검색결과에서 검색하기)
      const nowList = catListData.filter(v=>{
        if(v.alignment == cid) return true;
      }) ; ///// filter //////
      // 체크개수가 1 초과일 때 배열 합치기
      if(num>1){ //스프레스 연산자(...) 사용!
        lastList = [...temp,...nowList];
      }else{
        lastList = nowList;
      }
    }
    // (2) 체크박스가 false일때 해당 검색어로 검색해서 배열 제거하기
    else{
      // for문을 돌면서 배열데이터 중 해당값을 지운다
      for(let i=0; i<temp.length; i++){
        // 데이터 중 alignment항목 값이 cid와 일치하면 삭제
        if(temp[i].alignment == cid){
          // 해당항목 지우기
          // 배열지우기 메서드 : splice(순번,개수)
          temp.splice(i,1);
          // 주의사항! 배열 length가 줄어든다. 반드시 줄임 처리!
          i--;

          // 참고테스트 : 배열삭제 delete는 무엇인가?
          // delete배열지우기는 값만 지우고 주소는 남는다 지운 후 값은 undefined처리
          // delete temp[i]; ->> 리스트 처리 시 에러발생
          // 여기서는 splice를 반드시 사용할 것!
        }
      }
      console.log('삭제처리 된 배열 : temp',temp);
      lastList = temp;
    }
    // 6. 검색결과 리스트 업데이트하기
    setSelData([lastList,2]);
    setCnt(lastList.length);
  }; //////// chkSearch함수 ///////////

  ////////////////////////////
  // 리스트 정렬 함수 /////////
  const sortList = (e) => {
    // 1. 선택 옵션값 0- 오름차순 1- 내림차순
    const optVal = e.target.value;
    console.log(optVal);
    // 2. 재정렬할 데이터를 가져온다 : selData[0]
    let temp = selData[0];

    // 3. 옵션에 따른 정렬 반영하기
    temp.sort((a,b)=>{
      if(optVal ==1){//내림차순
        return a.cname == b.cname? 0:a.cname>b.cname?-1:1; 
      }else if(optVal ==0){//오름차순
        return a.cname == b.cname? 0:a.cname>b.cname?1:-1; 
      } ////// if else 
    }); ///////// sort ///////////
    console.log('정렬 후:',temp, optVal);
    // 4. 데이터 정렬 후 정렬변경 반영하기
    // -> 데이터변경만 하면 정렬이 반영되지 않음
    setSelData([temp,Number(optVal)]);
  };//////// sortList함수 ///////////

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
            <FontAwesomeIcon icon={faSearch} className="schbtn" title="Open search" onClick={schList} ref={fontRef} />
            {/* 입력창 */}
            {/*
              input 요소에서 리액트 value 속성명은 defaultValue를 사용한다->초기값
              value 속성을 쓰면 동적 변경이 이루어 지고 사용자가 입력하지 못하도록
              읽기전용(readOnly)설정이 되어 있어야 한다.
            */}
            <input id="schin" onKeyUp={enterKey} type="text" placeholder="Filter by keyword" defaultValue={kword} />
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
          <h2 className="restit">BROWSE CHARACTERS ({cnt})</h2>
          {/* 2-2. 정렬 선택박스 */}
          <aside className="sortbx">
            {/* name: 값 읽는 속성 */}
            <select name="sel" id="sel" className="sel" onChange={sortList}>
              <option value="0">A-Z</option>
              <option value="1">Z-A</option>
            </select>
          </aside>
          {/* 2-3. 캐릭터 리스트 컴포넌트 */}
          {/* 데이터 상태변수 중 첫번째 값만 보냄 */}
          <SchCatList dt={selData[0]} total = {cnt}/>
        </div>
      </section>
    </>
  );
} ///////// Searching 컴포넌트 ///////////
