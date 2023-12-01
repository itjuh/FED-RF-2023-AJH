// DC PJ 회원가입 page 컴포넌트

// 회원가입 css 불러오기
import { useState } from "react";
import "../../css/member.css";
import { Link } from "react-router-dom";
// 로컬스토리지 생성 JS
import { clearData, initData } from "../func/mem_fn";

export function Member() {
  // 회원가입 페이지 요구사항
  // -> 각 입력 항목별로 유효성 검사 시행
  // -> 특이사항  : 글자를 입력할 때 마다 검사 + submit버튼 작동 시 검사

  // [1] 상태관리변수 //////////////////////////
  // 1. 아이디 변수
  const [userId, setUserId] = useState("");
  // 2. 비밀번호 변수
  const [pwd, setPwd] = useState("");
  // 3. 비밀번호 확인 변수
  const [chkPwd, setChkPwd] = useState("");
  // 4. 이름 변수
  const [userName, setUserName] = useState("");
  // 5. 이메일 변수
  const [email, setEmail] = useState("");

  // [2] 에러상태관리 변수 //////////////////////////////
  // -> 에러 상태값 초기값은 에러아님
  // 1. 아이디 변수
  const [userIdError, setUserIdError] = useState(false);
  // 2. 비밀번호 변수
  const [pwdError, setPwdError] = useState(false);
  // 3. 비밀번호 확인 변수
  const [chkPwdError, setChkPwdError] = useState(false);
  // 4. 이름 변수
  const [userNameError, setUserNameError] = useState(false);
  // 5. 이메일 변수
  const [emailError, setEmailError] = useState(false);

  // [ 아이디 관련 메세지 프리셋 ]
  const msgId = ["User ID must contain a minimum of 5 characters", "This ID is already in use!", "That's a great ID!"];
  // [ 기타 메세지 프리셋 ]
  const msgEtc = {
    // 비밀번호
    pwd: "5 to 15 digits in the form of special characters, characters, and numbers",
    // 비밀번호 확인
    chkPwd: "Password verification does not match",
    // 필수입력)
    req: "This is a required entry",
    // 이메일
    email: "Please enter a valid email format",
  }; ///////// msgEtc
  // [3] 에러메세지 상태관리 변수 /////////////////////
  const [idMsg, setIdMsg] = useState(msgId[0]);

  ////////////////////////////////////////////////////
  //[ 유효성 검사 함수 ] //////////////////////////////
  // 1. ID 유효성 검사
  const changeUserId = (e) => {
    // 1) 아이디 유효성 검사 정규식(중요! 따옴표로 싸지 말 것!!)
    const valid = /^[A-Za-z0-9+]{5,}$/;
    // 2) 입력 값 확인 : 이벤트가 발생한 요소
    // console.log(e.target.value);
    // 3) 에러아님 상태 if문
    // 조건 : 유효성검사 결과가 에러인가? false / true
    // 검사방법 : 정규식.test() -> 정규식 검사결과 return메서드
    // 결과 : true이면 에러상태값 false(에러없음)
    if (valid.test(e.target.value)) {
      // 검사통과
      // 1. 사용중인 아이디 검사(로컬스 셋팅 후 추가)
      // 로컬스토리지 체크함수 호출(없으면 생성)
      initData();
      // 1) 로컬스토리지 변수 할당
      let memData = localStorage.getItem("mem-data");
      // 2) 로컬스토리지 객체 변환
      memData = JSON.parse(memData);
      // 3) 기존 아이디가 있으면 상태값 false로 업데이트
      let isOk = true;
      // 4) 검사 시작
      memData.forEach((v) => {
        // 기존아이디와 같은 경우 찾기
        if (v.uid === e.target.value) {
          // 메세지 변경
          setIdMsg(msgId[1]);
          // 아이디 에러 상태값 업데이트
          setUserIdError(true);
          // 존재여부
          isOk = false;
        }
      }); /////// forEach ////////
      // 5) 기존 아이디 없는 경우
      if (isOk) {
        // 메세지 변경
        setIdMsg(msgId[0]);
        // 6)최종 결과 반영하기
        setUserIdError(false);
      }
    } else {
      // 에러상태
      setUserIdError(true);
    } /////// if else
    // 4) 실제 userId 상태변수 값이 업데이트 되어야만 화면에 출력 됨
    setUserId(e.target.value);
  }; /////// changeUserId 함수 //////////
  // 2. PW 유효성 검사
  const changePwd = (e) => {
    // 1) 유효성 검사 정규식(중요! 따옴표로 싸지 말 것!!)
    const valid = /^.*(?=^.{5,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    // 2) 입력 값 확인 : 이벤트가 발생한 요소
    // console.log(e.target.value);
    // 3) 에러상태값 변경
    if (valid.test(e.target.value)) setPwdError(false);
    else setPwdError(true);
    // 4) 입력 값 반영하기
    setPwd(e.target.value);
  }; /////// changePwd 함수 //////////
  // 3. PW확인 유효성 검사
  const changeChkPwd = (e) => {
    // 1) 비밀번호 입력 내용과 일치여부 확인
    if (pwd === e.target.value) setChkPwdError(false);
    else setChkPwdError(true);

    // 2) 입력 값 반영하기
    setChkPwd(e.target.value);
  }; /////// changeChkPwd 함수 //////////
  // 4. 사용자이름 유효성 검사
  const changeUserName = (e) => {
    // 1) 입력 값 확인 : 이벤트가 발생한 요소
    // console.log(e.target.value);
    // 2) 에러상태값 변경
    if (e.target.value !== "") setUserNameError(false);
    else setUserNameError(true);
    // 3) 입력 값 반영하기
    setUserName(e.target.value);
  }; /////// changeUserName 함수 //////////
  // 5. 이메일 유효성 검사
  const changeEmail = (e) => {
    // 1) 유효성 검사
    const vaild =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    // 2) 에러상태값 변경
    if (vaild.test(e.target.value)) setEmailError(false);
    else setEmailError(true);
    // 3) 입력 값 반영하기
    setEmail(e.target.value);
  }; /////// changeEmail 함수 //////////
  // 6. 전체 유효성 검사 체크 함수 ///////////////
  const totalValid = () => {
    // 1) 모든 입력창 확인 후 상태변수 전환 -> 입력 전 상태는 false
    if (!userId) setUserIdError(true);
    if (!pwd) setPwdError(true);
    if (!chkPwd) setChkPwdError(true);
    if (!userName) setUserNameError(true);
    if (!email) setEmailError(true);
    // 2) 전체 통과 시 true
    // 통과조건 -> 빈값아님 && 에러변수 false
    if (
      userId &&
      pwd &&
      chkPwd &&
      userName &&
      email &&
      !userIdError &&
      !pwdError &&
      !chkPwdError &&
      !userNameError &&
      !emailError
    )
      return true;
    else return false;
  }; /////////// totalValid 함수 ///////////////
  // 7. submit 기능함수
  const onSubmit = (e) => {
    // 1) submit 기본이동 막기
    e.preventDefault();
    // 2. 유효성 검사 전체 통과 시
    if (totalValid()) {
      // 통과
      // alert('ok!');
      // 회원가입 정보를 로컬스토리지에 저장하기

      // 로컬스토리지 체크함수 호출
      initData();
      // 1. 로컬스토리지 변수 할당
      let memData = localStorage.getItem("mem-data");
      // 2. 로컬스토리지 객체 변환
      memData = JSON.parse(memData);
      // 3. 새로운 데이터 구성하기
      let newData = {
        idx: memData.length + 1,
        uid: userId,
        pwd: pwd,
        unm: userName,
        eml: email,
      };
      // 4. 데이터 추가하기 : 배열에 데이터 추가하기 push()
      memData.push(newData);
      localStorage.setItem("mem-data", JSON.stringify(memData));
      // 5. 로그인 페이지로 이동(라우터 이동)
      document.querySelector(".sbtn").innerText = "넌 이제 회원인거야~";
    } else {
      // 불통과
      alert("please fill the forms");
    }
  }; ///////// onSubmit 함수 //////////////

  return (
    <div className="outbx">
      {/* 회원가입 모듈코드 */}
      <section className="membx">
        <h2>Join Us</h2>
        <form action="process.php" method="post">
          <ul>
            <li>
              {/* 1. 아이디 */}
              <label>ID : </label>
              <input
                type="text"
                maxLength="20"
                placeholder="Please enter your ID"
                value={userId}
                onChange={changeUserId}
              />
              {
                // 에러일 경우 메세지 출력
                userIdError && (
                  <div className="msg">
                    <small style={{ color: "red", fontSize: "10px" }}>{idMsg}</small>
                  </div>
                )
              }
              {
                // 에러 아닐 경우 메세지 출력
                // 조건 후가 : userId가 입력 전일때 안보임!
                !userIdError && userId && (
                  <div className="msg">
                    <small style={{ color: "green", fontSize: "10px" }}>{msgId[2]}</small>
                  </div>
                )
              }
            </li>
            <li>
              {/* 2. 패스워드 */}
              <label>Password : </label>
              <input
                type="password"
                maxLength="20"
                placeholder="Please enter your Password"
                value={pwd}
                onChange={changePwd}
              />
              {
                // 에러일 경우 메세지 출력
                pwdError && (
                  <div className="msg">
                    <small style={{ color: "red", fontSize: "10px" }}>{msgEtc.pwd}</small>
                  </div>
                )
              }
            </li>
            <li>
              {/* 3. 패스워드확인 */}
              <label>Confirm Password : </label>
              <input
                type="password"
                maxLength="20"
                placeholder="Please enter your Confirm Password"
                value={chkPwd}
                onChange={changeChkPwd}
              />
              {
                // 에러일 경우 메세지 출력
                chkPwdError && (
                  <div className="msg">
                    <small style={{ color: "red", fontSize: "10px" }}>{msgEtc.chkPwd}</small>
                  </div>
                )
              }
            </li>
            <li>
              {/* 4. 이름 */}
              <label>User Name : </label>
              <input
                type="text"
                maxLength="20"
                placeholder="Please enter your Name"
                value={userName}
                onChange={changeUserName}
              />
              {
                // 에러일 경우 메세지 출력
                userNameError && (
                  <div className="msg">
                    <small style={{ color: "red", fontSize: "10px" }}>{msgEtc.req}</small>
                  </div>
                )
              }
            </li>
            <li>
              {/* 5. 이메일 */}
              <label>Email : </label>
              <input
                type="text"
                maxLength="50"
                placeholder="Please enter your Email"
                value={email}
                onChange={changeEmail}
              />
              {
                // 에러일 경우 메세지 출력
                emailError && (
                  <div className="msg">
                    <small style={{ color: "red", fontSize: "10px" }}>{msgEtc.email}</small>
                  </div>
                )
              }
            </li>
            <li style={{ overflow: "hidden" }}>
              {/* 6. 버튼 */}
              <button className="sbtn" onClick={onSubmit}>
                SUBMIT
              </button>
            </li>
            <li>
              {/* 7. 로그인링크 */}
              Are you already a Member?
              <Link to="/login"> LOG IN</Link>
            </li>
          </ul>
        </form>
      </section>
    </div>
  );
}
