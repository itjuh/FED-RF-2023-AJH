// 레오폴드 아이디 패스워드 찾기 페이지
import { Link } from "react-router-dom";
import "../../css/find_member.css";
import $ from "jquery";
import { useState } from "react";

export function FindMember() {
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
  // 페이지 구분 함수
  const addOn = function (e) {
    let target = $(e.currentTarget);
    $(e.currentTarget).addClass("on").siblings().removeClass("on");
    if (target.text() == "＜ ID") {
      // 아이디 누르면 id 박스 열기
      $(".find-box").first().addClass("on").siblings().removeClass("on");
    } else {
      $(".find-box").last().addClass("on").siblings().removeClass("on");
    }
  };
  // validation check 0-fail 1-pass
  // 이름 체크 변수
  const [okName, setOkName] = useState(0);
  // 이메일 체크 변수
  const [okEmail, setOkEmail] = useState(0);
  // 아이디 체크 변수
  const [okId, setOkId] = useState(0);

  const onSubmit = (e, txt) => {
    e.preventDefault();
    let inName = $(".find-name").val();
    let inEmail = $(".find-email").val();
    console.log(inName,inEmail);
    let sameData = "";
    // 값이 없으면 빈값넣기
    if (inName.trim() == null || inEmail.trim() == null) {
      inName = "";
      inEmail = "";
    }
    // 유효성 정규식
    const idValid = /^[a-z]{1}[a-z0-9]{4,19}$/g;
    const nameValid = /^([a-zA-Z]{2,15}|[가-힣]{2,15})$/;
    const emailValid = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
    const nameChk = (data) => {
      if (nameValid.test(data)) {
        console.log('name pass');
        setOkName(1);
      } else {
        setOkName(0);
      } ///////// Name 유효성 /////
    };
    const mailChk = (data)=>{
      if (emailValid.test(data)) {
        console.log('mail pass');
        setOkEmail(1);
      } else {
        setOkEmail(0);
      } ///////// Email 유효성 /////
    };
    const idChk = (data)=>{
      if (idValid.test(data)) {
        console.log('id pass');
        setOkId(1);
      } else {
        setOkId(0);
      } ///////// id 유효성 /////
    }
    if (txt == "id") {
      console.log(inName,inEmail);
      nameChk(inName);
      mailChk(inEmail);
      let data = localStorage.getItem("member");
      // id 찾기
      data = JSON.parse(data);
      // 데이터 일치 조회
      sameData = data.find((v) => {
        if (v.unm == inName) {
          if (v.eml == inEmail) {
            return true;
          }
        }
      });
      console.log(sameData !== undefined ? sameData.uid : sameData);
    } else if (txt == "pw") {
      nameChk(inName);
      mailChk(inEmail);
      idChk(inId);
      let inId = $(".find-id").val();
      if (inId.trim() == null) inId = "";
      
      let data = localStorage.getItem("member");
      // pw 찾기
      data = JSON.parse(data);
      // 데이터 일치 조회
      sameData = data.find((v) => {
        if (v.unm == inName[1]) {
          if (v.eml == inEmail[1]) {
            if (v.uid == inId) {
              return true;
            }
          }
        }
      });
      console.log(sameData !== undefined ? sameData.pwd : sameData);
    }
  };
  return (
    <main className="main in-box row-12">
      {/* 1. 찾기 박스 */}
      <div className="part-box col-16 row-12 ">
        <div className="find-area">
          {/* 1-1. 상단 타이틀 */}
          <h2>Find</h2>
          {/* 2. 상단 찾기 구역 분기버튼 */}
          <div className="btn-area flex-box">
            <button className="id-btn on" onClick={(e) => addOn(e)}>
              ＜ ID
            </button>
            <button className="pw-btn" onClick={(e) => addOn(e)}>
              Password ＞
            </button>
          </div>
          {/* 3. 아이디 찾기 */}
          <div className="find-box find-id-box on">
            <form action="process.php" method="post">
              <ul>
                <li>
                  <span>Enter your infomation and we'll find your id.</span>
                </li>
                <li>
                  {/* 2-1. 이름 */}
                  <label className="label-find">User Name</label>
                  <input
                    className="input-find find-name"
                    type="text"
                    maxLength="20"
                    placeholder="Please enter your Name"
                  />
                </li>
                <li>
                  {/* 2-2. 이메일 */}
                  <label className="label-find">Email</label>
                  <input
                    className="input-find find-email"
                    type="text"
                    maxLength="50"
                    placeholder="Please enter your Email"
                  />
                </li>
                <li>
                  {/* 2-3. 찾기 버튼 */}
                  <button className="submit-find" onClick={(e) => onSubmit(e, "id")}>
                    {" "}
                    Find ＞
                  </button>
                </li>
                <li>
                  {/* 2-4. 회원가입 */}
                  <Link to="/member"> Don't have an account?</Link>
                </li>
              </ul>
            </form>
          </div>
          {/* 4. 비밀번호 찾기 */}
          <div className="find-box find-pw-box">
            <form action="process.php" method="post">
              <ul>
                <li>
                  <span>
                    Password was encrypted safely. <br />
                    Enter your infomation and we'll reset your password.
                  </span>
                </li>
                <li>
                  {/* 4-1. 아이디 */}
                  <label className="label-find">ID</label>
                  <input className="input-find find-id" type="text" maxLength="20" placeholder="Please enter your ID" />
                </li>
                <li>
                  {/* 4-2. 이름 */}
                  <label className="label-find">User Name</label>
                  <input
                    className="input-find find-name"
                    type="text"
                    maxLength="20"
                    placeholder="Please enter your Name"
                  />
                </li>
                <li>
                  {/* 4-3. 이메일 */}
                  <label className="label-find">Email</label>
                  <input
                    className="input-find find-email"
                    type="text"
                    maxLength="50"
                    placeholder="Please enter your Email"
                  />
                </li>
                <li>
                  {/* 4-4. 찾기 버튼 */}
                  <button className="submit-find" onClick={(e) => onSubmit(e, "pw")}>
                    Find ＞
                  </button>
                </li>
                <li>
                  {/* 4-5. 회원가입 */}
                  <Link to="/member"> Don't have an account?</Link>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
} ////////// FindMember 컴포넌트 /////////////
