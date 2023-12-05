// 레오폴드 로그인 페이지
import "../../css/login.css";
import { Link } from "react-router-dom";

export function Login() {
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
                <input className="input-login" type="text" maxLength="20" placeholder="Please enter your ID" />
              </li>
              <li>
                {/* 1-3. 비밀번호 박스 */}
                <label className="label-login">Password</label>
                <input
                  className="input-login"
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
                <button>LOGIN</button>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </main>
  );
}
