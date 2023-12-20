// 상품상세보기 컴포넌트

import { useEffect } from "react";
import $ from "jquery";
// 신상품 데이터 가져오기
import gdata from "../data/glist_item";
import { useContext } from "react";
import { pCon } from "./PliotContext";

export function ItemDetail({ goods, cat, chgItemFn }) {
  // goods - 상품 아이템정보(속성코드)
  // cat - 카테고리
  const myCon = useContext(pCon);
  let temp;
  // 카트 상태 업데이트 변수
  const useCart = () => {
    // 1. 선택 된 상품의 수량 조절하기
    /*
    데이터 구성
    {idx:'상품유일키',cat:'카테고리',ginfo:'상품정보',num:'선택상품수'}
    -> 기존 선택 데이터는 selData에 담김// 여기에 num 추가
    */
    // num항목 추가 : 값은 #sum의 value값
    selData.num = $("#sum").val();
    console.log("카트호출!", selData, !localStorage.getItem("cart"));
    let localData;
    // 2. 로컬스토리지에 담기
    if (!localStorage.getItem("cart")) {
      // 데이터 없는 경우
      // selData가 객체형이므로 배열에 넣어줌
      localData = [];
      temp = selData;
    } else {
      // 기존 카트 있는 경우
      localData = localStorage.getItem("cart");
      // 객체변환
      localData = JSON.parse(localData);
      // 기존 데이터에서 ginfo 일치하면 안넣기
      temp = localData.find((v) => {
        if (v.idx === selData.idx) return true;
      }); //////// find /////////
    }
    if (!temp) {
      myCon.flag.current = true;
      localData.push(selData);
      localStorage.setItem("cart", JSON.stringify(localData));
      // 쇼핑카트 버튼 초기화
      $("#mycart")
        .removeClass("on")
        .delay(2000) // 트랜지션 딜레이시간
        .fadeIn(300, function () {
          //페이드 애니 후
          $(this).addClass("on");
        }); ///// fadeIn ////////
      myCon.setTransData(localData);
      myCon.setCartSts(1);
    } else {
      alert("이미 선택하신 아이템 입니다.");
      // 중복있음 : 메세지 띄우기, 데이터 안넣기
    }
    // localData 변환값 변수에 담기:CartList 컴포넌트 전달용
  }; //////// useCart 함수 ////////////

  const selData = gdata.find((v) => {
    // 카테고리와 상품코드가 둘다 일치
    if (v.cat === cat && v.ginfo[0] === goods) return true;
  });
  // console.log('선택데이터',selData);
  // selData에 담긴 기존 객체데이터와 상품개수 항목이 추가 된 객체를 만들고
  // 이것을 로컬스에 저장한다
  // 전체 데이터를 셋업하기 위한 항목은 ginfo임
  const ginfo = selData.ginfo;

  // 선택 데이터 : 전체데이터[분류명][상품코드].split('^')
  //-> 개별상품 배열이 된다
  // [상품명, 상품코드, 가격]
  // const selData = newProdData[cat][goods].split('^');
  // const selData = newProdData[cat][goods];
  // let cnt = setPrice(selData[2]);
  // console.log('선택데이터',selData);
  // function setPrice(v) {
  //   let prevCnt = v.split(',')[0];
  //   let nextCnt = v.split(',')[1].split('원')[0];
  //   let cnt = Number(prevCnt+nextCnt);
  //   return cnt;
  // }
  // 숫자세팅 함수
  function addCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  // 아이템 리스트 만들기 함수
  const makeList = () => {
    // 코드 담을 배열
    let temp = [];
    // 만들 개수만큼 반복
    for (let i = 0; i < 6; i++) {
      temp[i] = (
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              chgItemFn("m" + (i + 1));
            }}
            key={i}
          >
            <img src={"./images/goods/" + cat + "/m" + (i + 1) + ".png"} alt="신상품" />
          </a>
      );
    } /////// for //////////
    // JSX를 담은 배열을 리턴 -> 자동 태그 변환
    return temp;
  }; /////// makeList ///////////

  // 닫기함수 //
  const closebox = (e) => {
    e.preventDefault();
    $("#bgbx").slideUp(400);
  };
  // 랜더링 후 실행구역
  useEffect(() => {
    // 숫자 출력 input
    const sum = $("#sum");
    // 수량 증감 이미지버튼
    const numBtn = $(".chg_num img");
    numBtn.click((e) => {
      // 이미지 순번 : 0-증가 1-감소
      let seq = $(e.currentTarget).index();
      // 기존 값 읽기
      let num = Number(sum.val());
      if (seq) {
        num--;
        if (num < 1) num = 1;
      } else {
        num++;
      }
      // 값 대입
      sum.val(num);
      // 총 합계 반영
      // $('#total').text(addCommas(cnt*num)+'원');
      $("#total").text(addCommas(ginfo[3] * num) + "원");
    });
  }, []);
  // 리랜더링 후 실행구역
  useEffect(() => {
    $("#sum").val(1);
    $("#total").text(addCommas(ginfo[3]) + "원");
  });
  // 수량 증감함수 /////////

  return (
    <>
      <a href="#" className="cbtn" onClick={closebox}>
        <span className="ir">닫기버튼</span>
      </a>
      <div id="imbx">
        <div className="inx">
          <section className="gimg">
            <img src={"./images/goods/" + cat + "/" + goods + ".png"} alt="큰 이미지" />
            <div className="small">
              {makeList()}
              {/* <a href="#">
                <img src="./images/goods/men/m1.png" alt="썸네일 이미지" />
                <img src="./images/goods/men/m2.png" alt="썸네일 이미지" />
                <img src="./images/goods/men/m3.png" alt="썸네일 이미지" />
                <img src="./images/goods/men/m4.png" alt="썸네일 이미지" />
                <img src="./images/goods/men/m5.png" alt="썸네일 이미지" />
                <img src="./images/goods/men/m6.png" alt="썸네일 이미지" />
              </a> */}
            </div>
          </section>
          <section className="gdesc scbar">
            <h1>HOME &gt; {cat.toUpperCase()}</h1>
            <div>
              <ol>
                <li>
                  <img src="./images/dx_ico_new-28143800.gif" alt="new버튼" />
                </li>
                <li id="gtit">{ginfo[1]}</li>
                <li>
                  <img src="./images/icon_type02_social01.gif" alt="페이스북" />
                  <img src="./images/icon_type02_social02.gif" alt="트위터" />
                  <img src="./images/icon_mail02.gif" alt="이메일" />
                  <img src="./images/btn_source_copy.gif" alt="URL복사" />
                </li>
                <li>
                  <span>판매가</span>
                  <span id="gprice">{addCommas(ginfo[3])}원</span>
                </li>
                <li>
                  <span>적립금</span>
                  <span>
                    <img src="./images/icon_my_m02.gif" alt="적립금" />
                    {addCommas(ginfo[3] * 0.05)}(5%적립)원
                  </span>
                </li>
                <li>
                  <span>무이자할부</span>
                  <span>
                    부분 무이자 할부 혜택
                    <img src="./images/view_btn_nointerest_card.gif" alt="무이자카드보기" />
                  </span>
                </li>
                <li>
                  <span>상품코드</span> <span id="gcode">{ginfo[2]}</span>
                </li>
                <li>
                  <span>사이즈</span> <span>95 100 105 110</span>
                </li>
                <li>
                  <span>구매수량</span>
                  <span>
                    <input type="text" id="sum" defaultValue="1" />
                    <b className="chg_num">
                      <img src="./images/cnt_up.png" alt="증가" />
                      <img src="./images/cnt_down.png" alt="감소" />
                    </b>
                  </span>
                </li>
                <li>
                  <span>컬러</span> <span></span>
                </li>
                <li>
                  <span>권장계절</span> <span>여름</span>
                </li>
                <li className="tot">
                  <span>총합계</span> <span id="total">{addCommas(ginfo[3])}원</span>
                </li>
              </ol>
            </div>
            <div>
              <button className="btn btn1">BUY NOW</button>
              <button className="btn" onClick={useCart}>
                SHOPPING CART
              </button>
              <button className="btn">WISH LIST</button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
} /////////// ItemDetail 컴포넌트 ///////////
