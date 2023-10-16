// 미니언즈 좀비 탈출 애니 구현 JS - main.js

/*********************************** 

[ 요구사항정리 ]
1. 버튼을 클릭하여 미니언즈가
순서대로 특정위치로 이동하며
메시지를 보여준다
2. 각 위치별 좀비를 등장시킨다
3. 맨윗층에서 탈출할때 헬기를 사용한다

[ 변경대상 ]
1. 주인공 미니언즈
2. 좀비 미니언즈들
3. 주사기
4. 헬기

[ 이벤트와 이벤트대상  ]
1. 이벤트 : 클릭이벤트
2. 이벤트대상 : 버튼들
3. 기능구분 : 버튼글자(지시사항)

***********************************/

// 0. 주인공들 변수에 할당!
// (1) 미니언즈
const mi = $(".mi");
// (2) 건물 li
const room = $(".building li");
// (3) 버튼들
const btns = $(".btns button");
// (4) 메세지박스
const msg = $(".msg");
// (5) 좀비, 주사기 요소 변수처리
let mz1 = `<img src="./images/mz1.png" alt="좀비1" class="mz">`; //좀비1
let mz2 = `<img src="./images/mz2.png" alt="좀비2" class="mz">`; //좀비2
let zom = `<img src="./images/zom.png" alt="좀비들" class="mz">`; //좀비들
let inj = `<img src="./images/inj.png" alt="주사기" class="inj">`; //주사기
// (6) 메세지 배열 세팅
const msgTxt = [
  `도와줘요!!!`, // 0번방
  `이제 곧 탈출이닷!`, // 1번방
  `이제 조금만 더<br>가면 탈출이닷!`, // 2번방
  `어서 윗층으로 가자!`, // 3번방
  [
    ["무", "무.", "무.서", "무.서.", "무.서.워", "무.서.워.", "무.서.워..", "무.서.워..."],
    `아~악! 물렸다!<br>어서 치료주사방으로!`,
  ], // 4번방
  "", // 5번방
  [`여긴없겠지?`, `그래도 무서우니<br>윗층으로 가자!`], // 6번방
  [`여긴없겠지?`, `악, 여기도!!!`], // 7번방
  "와~! 아늑하다!<br>옆방으로 가보자!", // 8번방
  "악;;;;!!! 좀비<br>어서 피하자!!!", // 9번방
];

// console.log('대상들:',mi,room,btns,msg);

// 1. 건물 각 방에 번호넣기 + 좀비/주사기 넣기
// 대상: room
// 사용 제이쿼리 메서드
// (1) each((idx,ele)=>{}); : 요소의 개수만큼 순서대로 돌아줌
// (2) append(요소) : 선택요소 내부에 자식요소 추가하기(이동)
room.each((idx, ele) => {
  // console.log(idx,ele);
  // 1. 각 방에 숫자로 순번 넣기
  $(ele).text(idx);
  // 2. 좀비/주사기 넣기
  switch (idx) {
    case 9:
      $(ele).append(mz1);
      break;
    case 7:
      $(ele).append(mz2);
      break;
    case 2:
      $(ele).append(inj);
      break;
    case 1:
      $(ele).append(zom);
      break;
  } ///////////switch case
}); /////////each메서드///////////////////

// 좀비는 모두 숨기기
$(".mz").hide();
// 시간없는 hide()는 display:none처리함! 시간넣으면 애니메이션
// document.querySelectorAll('.mz').forEach(ele=>ele.style.display='none');
// 이걸 짧게 쓸 수 있음

// 2. 버튼세팅하기
// 대상 : btns
btns.hide().first().show();
// btns.hide().eq(8).show();
// 버튼들.숨겨().처음건().보여줘()

// 3. 미니언즈 공통 기능 함수 ///////////////////////////////
// (1) ele 클릭 된 버튼요소
// (2) seq 이동할 li 순번
// (3) fn 이동 후 실행할 함수(콜백함수)
const actMini = (ele, seq, fn) => {
  // 원리: 이동 할 li방 위치값을 읽은 후 이동하기
  // 0. 메세지 숨기기
  msg.fadeOut(300);
  $(ele).slideUp(500); //누른버튼

  // 1. 위치값 읽기 : seq에 방 번호를 보냄
  let myRoom = room.eq(seq);
  // 위치값 배열변수
  let pos = [];
  // 제이쿼리 위치값 정보 메서드 : offset()
  // 하위속성 : offset().top / offset().left
  // 제이쿼리로 가로 세로 크기정보 메서드 : width() / height()
  // top위치값
  pos[0] = myRoom.offset().top;
  // left 위치값 : 방 중앙위치 보정
  // 방위치(왼쪽끝)+방크기의 절반-미니언즈 절반
  pos[1] = myRoom.offset().left + myRoom.width() / 2 - mi.width() / 2;
  console.log(pos);

  // 2. 이동하기
  // 대상: mi
  // animate({CSS설정},시간,이징,콜백함수)
  mi.animate(
    {
      top: pos[0] + "px",
      left: pos[1] + "px",
    },
    800,
    "easeOutElastic",
    fn
  ); //////animate/////////////
}; ///////////////actMini에 익명함수 할당///////////////////

// 다음버튼 보이기 함수
const showNextBtn = (ele) => {
  $(ele).next().delay(1000).slideDown(500);
}; ////////////// showNextBtn 함수 /////////////////

// 4. '들어가기' 버튼 클릭 시//////////////////////////
btns
  .first()
  .click(function () {
    // 버튼별 콜백함수 만들기 //////////////
    let fn = () => {
      // 메세지변경(1초후 .3초동안)
      msg.html(msgTxt[8]).delay(1000).fadeIn(300);
      console.log("미니언즈 콜백함수:", this);
      // 다음버튼 보이기
      showNextBtn(this);
    };
    // 미니언즈 공통함수 호출
    actMini(this, 8, fn);
  })
  // 5. 옆방으로 버튼 클릭 /////////////////
  .next()
  .click(function () {
    // 버튼별 콜백함수 만들기 //////////////
    let fn = () => {
      // 좀비 나타나기(2초후)
      room
        .eq(9)
        .find(".mz")
        .delay(1000)
        .fadeIn(
          400,
          //fadeIn 콜백함수
          () => {
            // 메세지변경(1초후 .3초동안)
            msg.html(msgTxt[9]).css({ left: "-90%" }).fadeIn(300);
            console.log("미니언즈 콜백함수:", this);
            // 다음버튼 보이기
            showNextBtn(this);
          }
        ); /////////fadeIn 콜백함수 /////////////
    };
    // 미니언즈 공통함수 호출
    actMini(this, 9, fn);
  })
  // 6. '윗층으로 도망가' 버튼 클릭 /////////////////
  .next()
  .click(function () {
    // 버튼별 콜백함수 만들기 //////////////
    let fn = () => {
      // 메세지보이기
      msg.html(msgTxt[7][0]).fadeIn(300);
      // 좀비보이기
      // find() 자손선택/children() 직계선택
      room
        .eq(7)
        .find(".mz")
        .delay(1000)
        .fadeIn(400, () => {
          // 메세지 변경
          msg.text(msgTxt[7][1]);
          // 다음버튼 보이기
          showNextBtn(this);
        }); /////////fadeIn 콜백함수 /////////////
    };
    // 미니언즈 공통함수 호출
    actMini(this, 7, fn);
  })
  // 7. '다시 옆방으로!' 버튼 클릭
  .next()
  .click(function () {
    // 버튼별 콜백함수 만들기 //////////////
    let fn = () => {
      // 첫번째 메세지보이기
      msg
        .html(msgTxt[6][0])
        .css({ left: "90%" })
        .fadeIn(300)
        // delay를 주기위해 fadeIn을 한 번 더 줌
        .delay(1000)
        .fadeIn(200, () => {
          // 메세지 변경
          msg.html(msgTxt[6][1]);
          // 다음버튼 보이기
          showNextBtn(this);
        }); //////// fadeIn 콜백함수 //////////
    };
    // 미니언즈 공통함수 호출
    actMini(this, 6, fn);
  })
  // 8. '무서우니 윗층으로!' 버튼 클릭
  .next()
  .click(function () {
    // 버튼별 콜백함수 만들기 //////////////
    let fn = () => {
      // 무.서.워...메세지 뿌리기(3차원배열)
      msg
        .html(msgTxt[4][0][0])
        .css({ left: "-90%" })
        .fadeIn(200)
        .delay(500)
        .fadeIn(200, () => msg.html(msgTxt[4][0][1]))
        .delay(500)
        .fadeIn(200, () => msg.html(msgTxt[4][0][2]))
        .delay(500)
        .fadeIn(200, () => msg.html(msgTxt[4][0][3]))
        .delay(500)
        .fadeIn(200, () => msg.html(msgTxt[4][0][4]))
        .delay(500)
        .fadeIn(200, () => msg.html(msgTxt[4][0][5]))
        .delay(500)
        .fadeIn(200, () => msg.html(msgTxt[4][0][6]))
        .delay(500)
        .fadeIn(200, () => msg.html(msgTxt[4][0][7]))
        .delay(500)
        .fadeIn(200, () => {
          // 무서워 대사 후 좀비 출현
          room
            .eq(7)
            .find(".mz")
            .animate(
              {
                //윗층으로 올라옴 li 높이값 만큼
                bottom: room.eq(7).height() + "px",
              },
              500,
              "easeOutElastic"
            )
            .delay(500) //기다림
            .animate(
              {
                //달려들기 : right값을 width만큼
                right: room.eq(7).width() * 1.2 + "px",
              },
              1000,
              "easeOutBounce",
              () => {
                //좀비물린 후 대사
                msg.html(msgTxt[4][1]);
                // 미니언즈 이미지 흑백변경
                mi.find("img").css({ filter: "grayscale(100%)" });
                //미니언즈 좀비 이미지 변경(1.2초후)
                setTimeout(() => {
                  // 이미지 변경 전 크기조정
                  mi.css({ transform: "scale(0.9) translateX(-22%)" });
                  mi.find("img")
                    // 이미지 변경
                    .attr("src", "images/mz1.png");
                  // 다음버튼 보이기
                  showNextBtn(this);
                }, 1200); ///////setTimeout///////////
              }
            ); //////animate////////
        }); ///////////////fadeIn///////////
    };
    // 미니언즈 공통함수 호출
    actMini(this, 4, fn);
  })
  // 9. '치료주사방으로!' 버튼 클릭
  .next()
  .click(function () {
    // 버튼별 콜백함수 만들기 //////////////
    let fn = () => {
      // 주사기 돌리기(animate는 트랜스폼 적용 안됨!)
      $(".inj")
        .css({ zIndex: "9999" })
        .delay()
        .animate(
          {
            rotate: "-150deg", //반시계방향 회전
            /*
            jquery.rotate.js 는
            jQuery animate메서드에 transform rotate를 사용할 수 있도록 
            해주는 플러그인임! -> 제이쿼리 라이브러리 아래에 위치
            [ 사용법(animate css설정에 씀)-> rotate:"각도deg" ]
            */
          },
          500,
          "easeInOutCirc",
          () => {
            // 주사기 회전 후 콜백함수
            // 주사놓기
            $(".inj").css({ right: "20px", transition: ".5s" });
            setTimeout(() => {
              // 미니언즈 이미지 변경하기
              // attr(속성명,값) -> 값 설정
              // attr(속성명) -> 값 읽어오기
              mi.find("img")
                .attr("src", "images/m2.png") //이미지 변경
                .css({ filter: "grayscale(0%)" }); //색상복원
              // 주사기 없애기
              $(".inj").hide();

              // 대사 2번방
              msg.html(msgTxt[2]).fadeIn(200).css({ left: "90%" });
              // 다음버튼 보이기
              showNextBtn(this);
            }, 900); ///////setTimeout
          }
        ); ///////////animate///////////////
    }; /////////콜백함수////////////////
    // 미니언즈 공통함수 호출
    actMini(this, 2, fn);
  })
  // 10. '3번방으로!' 버튼 클릭
  .next()
  .click(function () {
    // 버튼별 콜백함수 만들기 //////////////
    let fn = () => {
      // 메세지보이기
      msg.html(msgTxt[3]).fadeIn(300);
      // 미니언즈 위치 중앙잡기
      //   mi.css({ transform: "scale(0.9) translateX(0)" });
      // 다음버튼 보이기
      showNextBtn(this);
    }; /////////콜백함수////////////////
    // 미니언즈 공통함수 호출
    actMini(this, 3, fn);
  })
  // 11. '1번방으로!' 버튼 클릭
  .next()
  .click(function () {
    // 버튼별 콜백함수 만들기 //////////////
    let fn = () => {
      // 메세지보이기
      msg.html(msgTxt[1]).fadeIn(300);
      // 다음버튼 보이기
      showNextBtn(this);
    }; /////////콜백함수////////////////
    // 미니언즈 공통함수 호출
    actMini(this, 1, fn);
  })
  // 12. '헬기를 호출!' 버튼 클릭
  .next()
  .click(function () {
    // 버튼별 콜백함수 만들기 //////////////
    let fn = () => {
      // 메세지보이기
      msg.html(msgTxt[0]).fadeIn(300);
      // 단체좀비 나타나기
      room
        .eq(1)
        .find(".mz")
        .fadeIn()
        .delay(500)
        .animate(
          {
            //달려들기 : right값을 width만큼
            right: room.eq(0).width() + "px",
          },
          3300,
          "easeOutCirc"
        ); ///////단체좀비 animate
      // 헬리콥터 나타나기
      // 같은대상일 경우 animate을 계속 주면 큐에 쌓여서 계속 작동함
      $(".heli").animate({
        left: "26%",
        rotate: '15deg'
      },3000,'easeOutQuart').animate({
        left: "23%",
        rotate: '0deg'
      },800,'easeOutElastic',
      //()=>{ // 헬기이동완료 후 콜백함수
      function(){ // 헬기이동완료 후 콜백함수(this ->function(){}사용시)
        //헬기 이미지 바꾸기
        $(this).attr('src','images/heli2.png');
        //원본 미니 사라지기
        mi.hide();
      })
      .delay(500)
      .animate({
        // 헬기타고 도망가기
        left: '65%',
        rotate:'10deg'
      },4000,'easeInOutSine',
      function(){ // 애니 후 콜백함수
        // 조종사 좀비되기
        $(this).attr('src','images/heli3.png');
      })
      .animate({
        // 헬기 화면 끝까지 나가기
        left: '110%' 
      },10000,'linear',
      ()=>{ // 헬기 나간 후
        // 간판 떨어지기
        let tit = $('.tit');
        // 1단계: 클래스 on주기
        tit.addClass('on');
        // 2단계: 클래스 on2주기(3초 후)
        setTimeout(()=>{
            tit.addClass('on2');
        },3000);
        // 건물 무너지기 : 간판 떨어진 후 (6초 후)
        // 건물 흔들리고 무너지기 - 클래스 on
        setTimeout(()=>{
            // parent() -> 부모요소인 .building
            // -> JS의 parentElement와 유사함
            room.parent() //부모요소 올라가기
            .addClass('on');  
        },6000);
        // 추가구현 : 시간(6초+건물기다리고 무너진시간 8초)+
        // 건물 무너진후 좀비 하나 올라와 오른쪽으로 사라지기
        setTimeout(()=>{
            room.parent()
            .attr('style','transform: rotate(0) !important')
            // 1. 9번방 좀시 지표로 올라오기: 3초동안
            .find('.mz')
            .eq(2)
            .animate({
                bottom:'597%'
                // 3. 기다리기(3초)
            },3000).delay(3000).animate({
                // 3. 오른쪽으로 나가기(5초)
                right:'-200%',
                bottom:'560%'
            },5000,()=>{ //마지막 좀비 퇴장 후
                // body에 addpend하여 태그 출력하기
                // THE END
                $('body').append('<h1 class="ending">THE END</h1>');
                $('.ending').css({
                    position:'fixed',
                    top:'50%',
                    left:'50%',
                    transform: 'translate(-50%, -50%)',
                    margin: 0,
                    paddind: 0,
                    color: '#fff',
                    fontSize: '20vh',
                    textShadow: '1px 1px 5px #000',
                    fontFamily: 'Vladimir script',
                    
                }).hide()
                .fadeIn(1000)
                .animate({
                    color:'red'
                },1000);
            });
        },15000);
      });///////////animate
    }; /////////콜백함수////////////////
    // 미니언즈 공통함수 호출
    actMini(this, 0, fn);
  }); /////////모든 버튼 마무리/////////////
// 간판에 마우스 오버/아웃시 색상 변경하기
// hover(함수1,함수2)
// -> 오버 시 호출함수1,아웃 시 호출함수2
$('.tit').hover(
    function(){ //오버
        $(this).css({
            backgroundColor:'black',
            color:'red'
        }) //////////css
    },function(){ //아웃
        $(this).css({
            backgroundColor:'coral',
            color:'lightyellow'
        }) //////////css
    }); ///////hover메서드

/* 기존구성
// 4. '들어가기' 버튼 클릭 시//////////////////////////
btns.first()
    .click(function(){ // 하위 이벤트 함수 this의 의미때문에 아래의 화살표 함수를 사용하지 않음
    // .click(()=>{ 
        // 이동하기
        // 원리: 이동 할 li방 위치값을 읽은 후 이동하기

        // 0. 메세지 숨기기
        msg.fadeOut(300);
        $(this).slideUp(500); //누른버튼

        // 1. 위치값 읽기
        let myRoom = room.eq(8);
        // 위치값 배열변수
        let pos = [];
        // top위치값
        pos[0] = myRoom.offset().top;
        // left 위치값 : 방 중앙위치 보정
        // 방위치(왼쪽끝)+방크기의 절반-미니언즈 절반
        pos[1] = myRoom.offset().left + myRoom.width()/2 - mi.width()/2;
        console.log(pos);

        // 2. 이동하기
        // 대상: mi
        // animate({CSS설정},시간,이징,콜백함수)
        mi.animate({
            top: pos[0]+'px',
            left: pos[1]+'px'
        },800,"easeOutElastic",
        // 콜백함수
        ()=>{ // this가 싸고있는 btns로 올라감
        // function(){ this가 mi를 대상찍음 : this가 mi를 대상으로 하지 않도록 화살표함수를 사용함
            // 메세지변경(1초후 .3초동안)
            msg.html(`와~! 아늑하다!<br>옆방으로 가보자!`)
            .delay(1000)
            .fadeIn(300);
            console.log('미니언즈 콜백함수:',this);
            // 다음버튼 보이기
            $(this).next().delay(1000).slideDown(500);
        }); //////animate/////////////

    }); ////////들어가기 버튼 종료///////////////////
*/
