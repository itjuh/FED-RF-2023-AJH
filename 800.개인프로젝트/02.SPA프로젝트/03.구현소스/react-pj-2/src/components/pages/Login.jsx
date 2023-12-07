// 레오폴드 로그인 페이지
import { useContext, useState } from "react";
import "../../css/login.css";
import { Link, useNavigate } from "react-router-dom";
import { LeoCon } from "../modules/LeopoldContext";
import $ from "jquery";
import { link } from "../data/link";

export function Login() {
  const initData = () => {
    if (localStorage.getItem("member") === null) {
      let sample = [
        {
          idx: 0,
          uid: "sample",
          pwd: "sample11!!",
          unm: "sampledata",
          eml: "jh.2144.9679@gmail.com",
        },
      ];
      localStorage.setItem("member", JSON.stringify(sample));
    }
  }; ////////// initData() ////////////////
  // validation check 0-fail 1-pass
  // 아이디 체크 변수
  const [okId, setOkId] = useState(0);
  // 비밀번호 체크 변수
  const [okPw, setOkPw] = useState(0);
  // 컨텍스트
  const myCon = useContext(LeoCon);
  // 링크 데이터
  let linkData;
  // 페이지 이동용
  const nav = useNavigate();
  const goNav = () => {
    linkData = link[8];
    nav(linkData.link);
    // 타이틀 변경
    myCon.chgTit(linkData.tit);
  };
  const msgBox = (bool,txt) => {
    if (bool) {
      $(".message-tit span").text("😀Success - "+txt);
      $(".message-cont").text("You are logged in. Go to the main page.");
      $(".message-box").fadeIn(30);
      let btns = $(".message-box button");
      btns.click(function () {
        $(".message-box").fadeOut(30);
        goNav();
      });
    } else {
      $(".message-tit span").text("😢Failed - "+txt);
      $(".message-cont").text("You are checked your information.");
      $(".message-box").fadeIn(30);
      let btns = $(".message-box button");
      btns.click(function () {
        $(".message-box").fadeOut(30);
      });
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    // 데이터 유효성 넣기
    let inId = $(".log-id").val();
    let inPw = $(".log-pw").val();
    // 값이 없으면 빈값넣기
    if(inId.trim() == null || inPw.trim() == null){
      inId = '';
      inPw = '';
    }
    const idValid = /^[a-z]{1}[a-z0-9]{4,19}$/g;
    const pWValid = /^.*(?=^.{5,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    if (idValid.test(inId)) {
      setOkId(1);
    } else {
      setOkId(0);
    } ///////// id 유효성 /////
    if (pWValid.test(inPw)) {
      setOkPw(1);
    } else {
      setOkPw(0);
    } ///////// pw 유효성 /////
    if (localStorage.getItem("member") === null) {
      msgBox(false,'notdata');
      return;
    }// 유효성검사 통과 못하면 return;
    else if (okId==0 || okPw==0) {
      msgBox(false,'vaild');
      return;
    }
    else{
      let data = localStorage.getItem("member");
      data = JSON.parse(data);
      // 데이터 일치 조회
      data.find((v) => {
        if (v.uid == inId) {
          if (v.pwd == inPw) {
            sessionStorage.setItem("loginMem", JSON.stringify([v.uid]));
            msgBox(true, v.uid);
          }
        }
      });
      if (sessionStorage.getItem("loginMem") === null) {
        msgBox(false,'notsame');
      }
    } //////// if-else local exist //////////
  }; ///////// onSubmit 함수 //////////////
  return (
    <main className="main in-box row-12">
      {/* 1. 로그인 박스 */}
      <div className="part-box col-16 row-12 ">
        <div className="login-area">
          {/* 1-1. 상단 타이틀 */}
          <h2>
            LEOPOLD
            <br />
            Log-In
          </h2>
          <form action="process.php" method="post">
            <ul>
              <li>
                {/* 1-2. 아이디 박스 */}
                <label className="label-login">ID</label>
                <input className="input-login log-id" type="text" maxLength="20" placeholder="Please enter your ID" />
              </li>
              <li>
                {/* 1-3. 비밀번호 박스 */}
                <label className="label-login">Password</label>
                <input
                  className="input-login log-pw"
                  type="password"
                  maxLength="20"
                  placeholder="Please enter your Password"
                />
              </li>
              <li>
                {/* 1-4. 아이디 분실 */}
                <Link to="/find"> Did you forget id?</Link>
              </li>
              <li>
                {/* 1-5. 비밀번호 분실 */}
                <Link to="/find"> Did you forget password?</Link>
              </li>
              <li>
                {/* 1-6. 회원가입 */}
                <Link to="/member"> Don't have an account?</Link>
              </li>
              <li>
                {/* 1-7. 로그인 버튼 */}
                <button className="submit-login" onClick={onSubmit}>
                  LOGIN
                </button>
              </li>
            </ul>
          </form>
        </div>
      </div>
      <div className="message-box">
        <div className="message-wrap">
          <div className="message-tit">
            <span></span>
            <button>×</button>
          </div>
          <div className="message-cont" style={{ lineHeight: "2" }}></div>
          <div className="message-btns">
            <button>Confirm</button>
          </div>
        </div>
      </div>
    </main>
  );
}
