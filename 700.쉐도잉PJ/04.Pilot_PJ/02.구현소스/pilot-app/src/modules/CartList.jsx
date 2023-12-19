// Pilot PJ 장바구니 리스트 컴포넌트

// 장바구니 리스트 CSS 불러오기
import { memo, useEffect } from "react";
import "../css/cartlist.css";
// 제이쿼리
import $ from "jquery";
import { useState } from "react";
import { useRef } from "react";
import { Fragment } from "react";

// 전달 값 변경 시 리랜더링 하기 위해 메모이제이션 적용
export const CartList = memo(({ data, flag }) => {
  console.log("업뎃 상태값 :", flag.current);
  // 로컬스토리지 데이터를 props로 전달 받는다
  // console.log(JSON.parse(localStorage.getItem('cart')));
  // let data = JSON.parse(localStorage.getItem("cart"));
  // 화면 리랜더링을 위한 상태관리 변수 설정
  /**  1. 현재 페이지 번호 pgNum */
  const [pgNum, setPgNum] = useState(1);
  // 2. 변경 데이터 변수
  const [cartData, setCartData] = useState(data);
  // 3. 리랜더링 강제적용 상태변수
  const [force, setForse] = useState(null);
  /**
   * [ 공통변수 ]
   * 1. 페이지 단위 수: 페이지당 레코드수
   */
  const PAGE_BLOCK = 5;

  console.log("받은데이터", data, "\n기존데이터", cartData, "\n유지데이터");
  // 카트 컴포넌트의 데이터의 상태관리로 컴포넌트 리랜더링을 위함
  // 외부데이터 업데이트는 외부에서 온 경우만!!
  if (cartData !== data && flag.current) setCartData(data);

  // 데이터 개수
  const cntData = cartData.length;
  // 총 합계 변수
  let totalFee = 0;
  // 총 합계 세팅함수
  const totalSet = () => {
    cartData.forEach((v) => {
      totalFee += v.ginfo[3] * v.num;
    });
  };
  totalSet();
  function addCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  // 리스트 보이기 함수 //////////
  const showList = () => {
    $("#cartlist").animate(
      {
        right: "0",
      },
      600
    );
  }; //////// showList ///////

  // 리스트 숨기기 함수 /////////
  const hideList = (e) => {
    e.preventDefault();
    $("#cartlist").animate(
      {
        right: "-61%",
      },
      600
    );
  }; //////// showList ///////
  // 리스트 삭제 함수 /////////
  const delList = (e) => {
    flag.current = false;
    let confMsg = "👔👕👖🩳👗정말 삭제하시겠습니까?😭😥😱";
    //confirm() 확인-true / 취소-false 리턴
    if (window.confirm(confMsg)) {
      const selIdx = $(e.target).attr("data-idx");
      let result = cartData.filter((v) => {
        if (v.idx !== selIdx) return true;
      });
      localStorage.setItem("cart", JSON.stringify(result));
      // 전체 데이터 업데이트로 리랜더링
      setCartData(result);
    }
  };
  // 증감 반영 함수
  const chgNum = (e) => {
    // 이벤트 대상
    const tg = $(e.target);
    // 이벤트 대상 입력창
    const tgInput = tg.parent().siblings(".item-cnt");
    // 입력창 숫자
    let tgCnt = Number(tgInput.val());
    console.log("증감반영", tg.prop("alt"));
    tgInput.focus();
    // 증감체크
    if (tg.prop("alt") === "증가") {
      // 증가
      tgCnt++;
      if (tgCnt < 1) tgCnt = 1;
    } else {
      // 감소
      tgCnt--;
      if (tgCnt > 99) tgCnt = 99;
    }
    // 화면반영
    tgInput.val(tgCnt);
  }; ///////// chgNum ///////////
  // 반영버튼 클릭 시 데이터 업데이트 하기
  const goResult = (e) => {
    let tg = $(e.currentTarget);
    let cidx = tg.attr("data-idx");
    console.log("결과 나와주세요!!!📢");
    // 데이터 리랜더링 중복실행막기
    flag.current = false;
    // 해당 데이터 업데이트 하기
    // forEach로 돌리면 중간에 맞을 경우 return할 수 없음!
    // 일반 for문으로 해야 return 또는 continue를 사용 가능

    // ->>> some() 이라는 메서드가 있다!!!
    // return true로 조건에 처리시
    // for문을 빠져나옴(return과 유사)
    // return false로 조건 처리시 for문을 해당순번
    // 제외하고 계속 순회함(continue와 유사!)
    // 참고: https://www.w3schools.com/jsref/jsref_some.asp

    // [Array some() 메서드 테스트] //////
    // cartData.some((v) => {
    //   console.log('some테스트상단:',v.idx);
    //   // if(v.idx==17){return true;} // -> for문 break 유사
    //   if(v.idx==17){return false;} // -> for문 continue 유사
    //   console.log('some테스트하단:',v.idx);
    // });

    // 클릭시 'data-idx'값에 업데이트할 요소 idx번호 있음!->cidx
    cartData.some((v, i) => {
      // 해당순번 업데이트하기
      if (v.idx == cidx) {
        // 업데이트 하기 ///
        cartData[i].num = tg.prev().val();

        // some 메서드 이므로 true 리턴시 순회종료!
        return true;
      } ///// if ///////
    });

    // 로컬스 데이터 업데이트!!!
    localStorage.setItem("cart", JSON.stringify(cartData));

    // 전체 데이터 업데이트 하면 모두 리랜더링되게 하자!
    setCartData(cartData);

    // 그러나 기존 배열 자체가 추가/삭제되지 않는 한
    // 배열데이터가 업데이트 된 것으로 인식되지 않는다.
    // 따라서 강제 리랜더링되게 상태값을 설정하여 이 값을 변경
    setForse(Math.random());
  }; ///////// goResult함수 ////////
  /**
   * 함수명 : bindList
   * 기능 : 페이지별 리스트 생성하여 바인딩
   */
  const bindList = () => {
    /**
     * 페이지 시작 번호 : (pgNum-1)*PAGE_BLOCK
     * 페이지 종료 번호 : pgNum*PAGE_BLOCK
     */
    const tempData = [];
    cartData.sort((a, b) => {
      return Number(a.idx) == Number(b.idx) ? 0 : Number(a.idx) > Number(b.idx) ? -1 : 1;
    });
    let initSeq = (pgNum - 1) * PAGE_BLOCK;
    let lastSeq = pgNum * PAGE_BLOCK;
    // 데이터 선별용 for
    for (let i = initSeq; i < lastSeq; i++) {
      if (i == cntData) break; // 마지막 페이지 한계수
      tempData.push(cartData[i]); // 코드 푸쉬
    }
    // 데이터 없는 경우 출력
    if (cartData.length === 0) {
      return (
        <tr>
          <td colSpan="8">There is no data.</td>
        </tr>
      );
    }
    // 데이터 있는 경우 출력
    else {
      return tempData.map((v, i) => (
        <tr key={i}>
          {/* 상품 */}
          <td>
            <img src={"images/goods/" + v.cat + "/" + v.ginfo[0] + ".png"} alt="item" />
          </td>
          {/* 번호 */}
          <td>{initSeq+i+1}</td>
          {/* 상품명 */}
          <td>{v.ginfo[1]}</td>
          {/* 상품코드 */}
          <td>{v.ginfo[2]} </td>
          {/* 단가 */}
          <td>{addCommas(v.ginfo[3])}원</td>
          {/* 수량 */}
          <td className="cnt-part">
            <div>
              <span>
                <input type="text" className="item-cnt" value={v.num} readOnly/>
                <button className="btn-insert" onClick={goResult} data-idx={v.idx}>
                  반영
                </button>
                <b className="btn-cnt">
                  <img src="./images/cnt_up.png" alt="증가" onClick={chgNum} />
                  <img src="./images/cnt_down.png" alt="감소" onClick={chgNum} />
                </b>
              </span>
            </div>
          </td>
          {/* 합계 */}
          <td>{addCommas(v.ginfo[3] * v.num)}원</td>
          {/* 삭제 */}
          <td>
            <button className="cfn" data-idx={v.idx} onClick={delList}>
              ×
            </button>
          </td>
        </tr>
      ));
    }
  }; ///////// bindList /////////
  /**
   * 함수명 : pagingLink
   * 기능 : 페이징
   */
  const pagingLink = () => {
    // 페이징 블록 만들기 ///
    /**
     * 1. 전체 레코드 : cntData
     * 2. 페이지 단위 : PAGE_BLOCK
     * 3. 남은 블록 : blockPad
     * 4. 전체 페이지 번호 : blockPad===0?blockCnt:blockCnt+1
     */
    const blockCnt = Math.floor(cntData / PAGE_BLOCK);
    const blockPad = cntData % PAGE_BLOCK;
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
    // bindList(); ->>> pgNum사용으로 리랜더링
  }; /////// chgList 함수 ///////////

  useEffect(() => {
    // 카트 버튼 보이기
    $("#mycart")
      .removeClass("on")
      .fadeIn(300, function () {
        //페이드 애니 후
        $(this).addClass("on");
      }); ///// fadeIn ////////
  }, []); ///// useEffect 구역 ///////
  // 리턴코드 //////////////////
  return (
    <>
      <section id="cartlist">
        <a href="#" className="cbtn cbtn2" onClick={hideList}>
          <span>닫기버튼</span>
        </a>
        <table>
          <caption>
            <h1> 카트 리스트</h1>
          </caption>
          <tbody>
            <tr>
              <th>상품</th>
              <th>번호</th>
              <th>상품명</th>
              <th>상품코드</th>
              <th>단가</th>
              <th>수량</th>
              <th>합계</th>
              <th>삭제</th>
            </tr>
            {bindList()}
            <tr>
              <td colSpan="6">총합계 :</td>
              <td>{addCommas(totalFee)}원</td>
              <td></td>
            </tr>
          </tbody>
          {/* 하단 페이징 표시부분 */}
          <tfoot>
            <tr>
              <td colSpan="8" className="paging">
                {/* 페이징번호 위치  */}
                {pagingLink()}
              </td>
            </tr>
          </tfoot>
        </table>
      </section>
      {/* 카트 버튼 구역 */}
      <div id="mycart" onClick={showList}>
        {/* 카트 이미지 */}
        <img src="./images/mycart.gif" title={cntData+"개의 상품이 있습니다."} />
        {/* 카트상품 개수 출력 박스 */}
        <div className="cntBx">{cntData}</div>
      </div>
    </>
  );
}); ////////////// CartList 컴포넌트 /////////
