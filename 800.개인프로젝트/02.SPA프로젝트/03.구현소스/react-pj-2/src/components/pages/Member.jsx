// 레오폴드 회원가입 jsx
import "../../css/member.css";
import { Link } from "react-router-dom";

export function Member() {
  return (
    <main className="main in-box row-12">
      {/* 1. 회원가입 박스 */}
      <div className="part-box col-16 row-12 ">
        <div className="member-area">
          {/* 1-1. 상단 타이틀 */}
          <h2>
            LEOPOLD
            <br />
            Join Us
          </h2>
          <form action="process.php" method="post">
            <ul>
              <li>
                {/* 1-2. 아이디 박스 */}
                <label className="label-member">ID</label>
                <input className="input-member" type="text" maxLength="20" placeholder="Please enter your ID" />
                {/* 오류메세지 */}
                <div className="msg">
                  <small style={{ color: "red", fontSize: "10px" }}></small>
                </div>
              </li>
              <li>
                {/* 1-3. 비밀번호 박스 */}
                <label className="label-member">Password</label>
                <input
                  className="input-member"
                  type="password"
                  maxLength="20"
                  placeholder="Please enter your Password"
                />
              </li>
              <li>
                {/* 1-4. 비밀번호 확인 */}
                <label className="label-member">Confirm Password</label>
                <input
                  className="input-member"
                  type="password"
                  maxLength="20"
                  placeholder="Please enter your Confirm Password"
                />
              </li>
              <li>
                {/* 1-5. 이름 */}
                <label className="label-member">User Name</label>
                <input className="input-member" type="text" maxLength="20" placeholder="Please enter your Name" />
              </li>
              <li>
                {/* 1-6. 이메일 */}
                <label className="label-member">Email</label>
                <input className="input-member" type="text" maxLength="50" placeholder="Please enter your Email" />
              </li>
              <li>
                {/* 1-7. 로그인링크 */}
                Are you already a member?
                <Link to="/login"> Log In</Link>
              </li>
              <li>
                {/* 1-8. 버튼 */}
                <button className="submit-member">SUBMIT</button>
              </li>
            </ul>
          </form>
        </div>
      </div>
      <div className="part-box col-16 row-1"></div>
    </main>
  );
}
