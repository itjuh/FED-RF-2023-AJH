// 공통패션 서브페이지 컨텐츠 컴포넌트 jsx - Fashion.jsx

import { useEffect, useLayoutEffect, useContext, useState } from "react";
// 컨텍스트 API
import { pCon } from "../modules/PliotContext";
// 공통 서브 CSS 불러오기
import "../css/fashion.css";
import { SwiperApp } from "../plugin/SwiperApp";
// 데이터 셋업을 위한 gnb데이터 불러오기
import { gnbData } from "../data/gnb";
import $ from "jquery";
import { NewProdList } from "../modules/NewProdList";
import { ItemDetail } from "../modules/ItemDetail";
// 부드러운 스크롤
import { scrolled, setPos } from "../func/smoothscroll24";
// 리액트용 패럴랙스 - 설치 : npm i react-parallax
// 설명 : https://www.npmjs.com/package/react-parallax
import { Parallax } from "react-parallax";
import { FashionIntro } from "../modules/FashionIntro";

export function Fashion() {
  // 컨텍스트 API
  const myCon = useContext(pCon);
  let pg = myCon.pageName;
  console.log('서브카테고리명',pg);
  // props.cat 서브 카테고리명
  useEffect(() => {
    // 위치 초기화
    // setPos(0);
    // 부드러운 스크롤 호출
    // startSS();-> 이대로 이벤트 연결 시 부드러운 스크롤과 자동스크롤이 중복 됨 : 개별 이벤트 등록

    // 이벤트 설정 시 passive:false 설정의 이유는 기본 설정값은 true이고,
    // window, document, body 이 세가지에 preventDefault() 기본작동막기 할 경우 사용할 수 없도록 설정 된 값이 true이다.
    // 그래서 passive: false를 해야 휠 이벤트에 대한 막기가 가능하다.
    document.addEventListener("mousewheel", scrolled, {
      passive: false,
    });
    // 이전 파이어폭스 브라우저 이벤트 처리
    document.addEventListener("DOMMouseScroll", scrolled, {
      passive: false,
    });
    // 스크롤 바 생성하기
    $("body, html").css({ overflow: "visible" });
    // 로고 클릭 시 페이지 이동 : pageName 변경 -> chgPgName
    $("#logo a").click(() => myCon.chgPgName("main"));
    return () => {
      // 소멸자 구역
      $("body, html").css({
        overflow: "visible",
        overflowX: "hidden",
      });
      // 부드러운 스크롤 삭제
      // 위치 초기화
      // setPos(0);
      document.removeEventListener("mousewheel", scrolled, {
        passive: false,
      });
      document.removeEventListener("DOMMouseScroll", scrolled, {
        passive: false,
      });
      // 등장액션 체크함수 이벤트 제거
      window.removeEventListener('scroll',checkPos);
      // 끌낼 때 이벤트 소멸하기
      $('.gnb a').off('click');
    };
  }, []);

  // 후크 상태변수
  const [item, setItem] = useState("m4");
  // 신상컴포넌트에서 상세컴포넌트로 값을 전달하기 위한
  // 상태변수를 셋팅하여 함수로 이것을 변경하게 해준다
  // 프롭스 펑션 다운~
  const chgItem = (v) => {
    console.log("상품정보 : ", v);
    // 상세박스 업데이트
    setItem(v);
    // 상세박스 슬라이드 애니로 보이기
    $("#bgbx").slideDown(400);
  }; /////////// chgItem /////////

  // 카테고리 변경 시
  useLayoutEffect(()=>{
    // 부드러운 스크롤 위치 초기화
    setPos(0);
    // 실제 상단 이동
    window.scrollTo(0, 0);
    // 상세 페이지 닫기
    $('.bgbx').hide();
    // 메뉴 클릭 시 이동
    $('.gnb a').on('click',e=>{
      e.preventDefault();
      // 아이디 읽어오기
      let cid = $(e.currentTarget).attr('href');
      // 해당 아이디 위치값
      let currentPos = $(cid).offset().top;
      // 해당 위치로 이동 애니메이션
      $('html,body').stop().animate({
        scrollTop:currentPos+'px'
      },600);
      // 부드러운 스크롤 위치값 싱크 맞추기
      setPos(currentPos);
    });

    ///////////////////////////////////
    // 스크롤 등장 액션 ////////////////
    ///////////////////////////////////
    // 초기 : 투명도 0, 아래로 내려감
    // 액션 : 투명도 1, 원래 위치 복귀
    ///////////////////////////////////
    // 등장액션 일괄세팅
    actionClassSet();
    // 등장액션 체크함수 이벤트 설정하기
    window.addEventListener('scroll',checkPos);

  },[pg]);
  // 등장액션 위치체크 및 적용함수
  const checkPos = ()=>{
    // 등장액션 대상은 모두 순회함
    $('.sc-ani').each((idx,ele)=>{
      // 화면 기준 위치값 알아오기
      let currentPos = returnClient(idx);
      // 위치값이 화면의 1/3 위치보다 위로 올라오면 등장!
      if(currentPos < ($(window).height()/3 * 2)){
        $(ele).css({
          opacity:1,
          transform:'translateY(0)',
        }); //// css ///////
      } //////// if ///////////
    }); ////// each ////////
  }; //////// checkPos //////

  // 위치값 리턴함수
  const returnClient = (idx)=>{
    // console.log(idx,'순번');
    return document.querySelectorAll('.sc-ani')[idx]
    .getBoundingClientRect().top;

  }; ///// returnClient /////////
  
  // 등장액션 일괄세팅 함수
  const actionClassSet = () =>{
    // 클래스명은 .sc-ani로 준 모든 요소를 초기화 함
    $('.sc-ani').css({
      opacity: 0,
      transform: 'translateY(20%)',
      transition: '1s ease-in-out',
    });
  }; //////// actionClassSet 함수 /////////

  /////// 리턴코드 ////////////
  return (
    <>
      {/* 1. 배너영역 */}
      <section id="ban" className="page">
        <SwiperApp />
      </section>
      {/* 2. 신상품영역 */}
      <section id="c1" className={"cont c1 sc-ani" + pg}>
        <NewProdList pageName={pg} cat={pg} chgItemFn={chgItem} />
      </section>
      {/* 상세보기박스 */}
      <div id="bgbx">
        <ItemDetail goods={item} cat={pg} chgItemFn={chgItem} />
      </div>
      {/* 3. 패럴랙스 영역 : 리액트용 패럴랙스 적용 */}
      <section id="c2" className="cont">
        <Parallax
          className="c2"
          // 패럴랙스할 배경이미지 설정속성 bgImage
          bgImage={"./images/sub/" + pg + "/02.special.png"}
          // 패럴랙스 이동정도 조정속성 strength
          // 수치범위 :  -500 ~ 1000 -> 높은 숫자는 반대방향
          strength={200}
        >
      <h2 className="c2tit sc-ani">2024 {gnbData[pg][1]}</h2>
      </Parallax>
      </section>
      {/* 4. 단일상품영역 */}
      <section id="c3" className="cont c3">
        <FashionIntro cat="sub" subcat={[pg,0]}/>
      </section>
      {/* 5. 스타일상품영역 */}
      <section id="c4" className="cont c4">
        <FashionIntro cat="sub" subcat={[pg,1]}/>
      </section>
    </>
  );
} /////// MenSub 컴포넌트 /////////
