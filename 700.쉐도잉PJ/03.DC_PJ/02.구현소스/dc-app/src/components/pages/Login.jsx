// DC PJ 로그인 page 컴포넌트
// 디자인은 회원가입과 동일
import { useState } from "react";
import "../../css/member.css";
// 로컬스 데이터 초기화 함수
import { initData } from "../func/mem_fn";

import $ from "jquery";

export function Login() {
  // [1] 상태관리변수 //////////////////////////
  // 1. 아이디 변수
  const [userId, setUserId] = useState("");
  // 2. 비밀번호 변수
  const [pwd, setPwd] = useState("");
  // [2] 에러상태관리 변수 //////////////////////////////
  // -> 에러 상태값 초기값은 에러아님
  // 1. 아이디 변수
  const [userIdError, setUserIdError] = useState(false);
  // 2. 비밀번호 변수
  const [pwdError, setPwdError] = useState(false);
  // [ 아이디 관련 메세지 프리셋 ]
  const msgId = ["This is a required entry", "ID does not exist"];
  // [ 비밀번호 관련 메세지 프리셋 ]
  const msgPwd = ['This is a required entry',"Password doesn't match"];
  // [3] 에러메세지 상태관리 변수 /////////////////////
  const [idMsg, setIdMsg] = useState(msgId[0]);
  const [pwdMsg, setPwdMsg] = useState(msgPwd[0]);
  //[ 유효성 검사 함수 ] //////////////////////////////
  // 1. ID 유효성 검사
  const changeUserId = (e) => {
    // 1-1.빈값 체크
    if (e.target.value !== "") setUserIdError(false);
    else {
      // 메세지 띄우기
      setIdMsg(msgId[0]);
      // 에러상태 변경하기
      setUserIdError(true);
    }
    // 입력값 반영하기
    setUserId(e.target.value);
  }; /////// changeUserId 함수 //////////
  // 2. PW 유효성 검사
  const changePwd = (e) => {
    // 1-1.빈값 체크
    if (e.target.value !== "") setPwdError(false);
    else {
      // 메세지 띄우기
      setPwdMsg(msgPwd[0]);
      // 에러상태 변경하기
      setPwdError(true);
    }
    // 입력값 반영하기
    setPwd(e.target.value);
  }; /////// changeUserId 함수 //////////
  // 3. 전체 유효성 검사 함수 ////////////
  const totalValid = () => {
    // 1) 모든 입력창 확인 후 상태변수 전환 -> 입력 전 상태는 false
    if (!userId) setUserIdError(true);
    if (!pwd) setPwdError(true);
    // 2) 전체 통과 시 true
    // 통과조건 -> 빈값아님 && 에러변수 false
    if (userId && pwd) return true;
    else return false;
  }; ///////// totalValid ////////////
  // 4. 서브밋 기능 함수 ////////////////////
  const onSubmit = (e) => {
    // 기본 이동 막기
    e.preventDefault();
    // 4-2. 유효성 검사 전체 통과 시 ////////
    if (totalValid()) {
      // 같은 아이디 검사 상태변수
      let isNot = true;
      initData();
      // 로컬스 mem-data 확인하기
      let memData = localStorage.getItem("mem-data");
      // 로컬스 데이터 객체화
      memData = JSON.parse(memData);
      memData.forEach(v=>{
        // 같은 아이디가 있는가?
        if(v['uid']===userId){
            console.log('아이디 일치');
            // 아이디 에러상태 업데이트
            setUserIdError(false);
            isNot = false;
            // 비밀번호 일치여부
            if(v['pwd']===pwd){
                console.log('비밀번호 일치');
                // 패스워드 에러상태 업데이트
                setPwdError(false);
                isNot = false;
            }else{
                console.log('비밀번호 불일치');
                // 메세지 업데이트
                setPwdMsg(msgPwd[1]);
                // 패스워드 에러상태 업데이트
                setPwdError(true);
            }
        }
      }); ///////// forEach ////////
      if(isNot){
        console.log('아이디 불일치');
        // 아이디가 다를 때 메세지 보이기
        setIdMsg(msgId[1]);
        // 아이디 에러상태 업데이트
        setUserIdError(true);
      } ////// if ///////
    }
    // 4-3. 유효성 검사 실패 //////////
    else {
      console.log("실패");
    }
  }; /////// onSubmit 함수 ////////
  return (
    <div className="outbx">
      {/* 모듈코드 */}
      <section className="membx" style={{ minHeight: "300px" }}>
        <h2>LOG IN</h2>
        <form method="post" action="process.php">
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
                    <small style={{ color: "red", fontSize: "10px" }}>{pwdMsg}</small>
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
          </ul>
        </form>
      </section>
    </div>
  );
} /////////// Login //////////////
