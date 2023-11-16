// Pilot PJ 드래그(스와이프) 배너 기능 함수
// 제이쿼리 가져오기
import $ from "jquery";
window.jQuery = $;
require("jquery-ui-dist/jquery-ui");
require("jquery-ui-touch-punch/jquery.ui.touch-punch");

export function dragBanner() {
  // 대상 : .slide, .cover
  const slide = $(".slide");
  // 커버
  const cover = $(".cover");
  // 블릿
  const indic = $(".bindic li");
  // console.log(indic);

  // 드래그 기능 넣기
  slide.draggable({ axis: "x" });
  slide.on("dragstop", function () {
    // 광드래그 막기 커버
    cover.show();

    // 비교를 위한 슬라이드위치/윈도우가로
    let pos = slide.offset().left;
    let winW = $(window).width();
    let gap = winW / 24;

    // 차이값
    let diff = -pos - winW;
    // let absDiff = Math.abs(diff);
    // 결과해석 양수는 왼쪽으로 이동(정방향)
    // 음수는 오른쪽으로 이동(역방향)
    // console.log("방향:", diff, "차이값:", absDiff);

    // 이동하기
    if (diff > gap)
      slide.animate({ left: "-200%" }, 800, "easeOutQuint", () => {
        //맨앞 li 맨 뒤로 이동
        slide.append(slide.find("li").first()).css({ left: "-100%" });
        // 커버 제거
        cover.hide();
        // 글자 등장
        showTit();
      });
    else if (diff < -gap)
      slide.animate({ left: "0%" }, 800, "easeOutQuint", () => {
        //맨뒤 li 맨 앞로 이동
        slide.prepend(slide.find("li").last()).css({ left: "-100%" });
        // 커버 제거
        cover.hide();
        // 글자 등장
        showTit();
      });
    else
      slide.animate({ left: "-100%" }, 800, "easeOutQuint", () => {
        // 커버 제거
        cover.hide();
      }); // 제자리로
    // 블릿변경함수 호출
    chgIndic(diff, gap);
  }); /////// 드래그 종료 시 슬라이드 위치

  // 블릿변경 함수
  const chgIndic = (diff, gap) => {
    // 블릿 변경 -> ban 클래스 번호만 가지고 오면 됨
    let selSeq = diff > gap ? 2 : diff < -gap ? 0 : 1;
    // 변경할 블릿 번호 : 왼쪽 이동 시 2번 블릿이 활성화, 오른쪽 이동 시 0번 블릿이 활성화
    // 선택 순번의 클래스
    let selCls = slide.find("li").eq(selSeq).attr("class");
    // console.log('클래스명:',selCls);
    // console.log('블릿순번:',selCls.substr(3,)-1);
    // 슬라이드 순번(클래스명의 숫자 - 1)
    let indicSeq = selCls.substr(3) - 1;
    // let indicSeq = Number(selCls.substr(3,))-1; 과거에는 형변환 필수!!

    // 해당순번 블릿 클래스 'on'넣기 나머지 빼기
    indic.eq(indicSeq).addClass("on").siblings().removeClass("on");
  }; //////// chgIndic 함수 /////////////

  ///////////////////////////////////////
  ////// 각 배너 등장 타이틀 셋팅 /////////
  ///////////////////////////////////////
  let banTxt = {
    ban1: "Men's Season<br>Collection",
    ban2: "2023 Special<br>Collection",
    ban3: "GongYoo<br>Collection",
    ban4: "T-Shirt<br>Collection",
    ban5: "Shoes<br>Collection",
    ban6: "Wind Jacket<br>Collection",
  }; ///////////// banTxt객체 //////////////

  // 배너 글자 등장 함수 ///////////////////
  const showTit = () => {
    // 항상 이동 후 배너는 1번째 순번임
    const currBan = slide.find("li").eq(1);

    // 현재 배너 클래스 읽기
    const currCls = currBan.attr("class");

    // 기존 h2 태그는 삭제
    $(".btit").remove();

    // console.log("글자등장 슉", banTxt[currCls]);
    // 타이틀을 현재 배너에 추가함
    currBan.append(`<h2 class='btit'>${banTxt[currCls]}</h2>`);
    // 타이틀 left위치 변수처리
    // ban2, ban3만 오른쪽위치
    let lval = "30%";
    if (currCls === "ban2" || currCls === "ban3") lval = "70%";

    // css/ animate 코드
    currBan
      .find(".btit")
      .css({
        position: "absolute",
        top: "55%", // 약간아래
        left: lval,
        transform: "translate(-50%,-50%)",
        font: "bold 4.5vmax Verdana",
        color: "#fff",
        textShadow: "1px 1px 3px #777",
        whiteSpace: "nowrap",
        opacity: 0, // 처음에 투명
        userSelected: 'none',
      })
      .animate(
        {
          top: "50%",
          opacity: 1,
        },
        1000,
        "easeInOutQuart"
      );
  }; ///////// showTit 함수 /////////////

  // 첫 배너 등장 호출
  setTimeout(showTit, 1000);
} ////////// dragBanner 함수 //////////////
