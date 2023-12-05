// 레오폴드 아이디 패스워드 찾기 페이지
import { Link } from "react-router-dom";
import "../../css/find_member.css";
import $ from "jquery";

export function FindMember() {
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
                  <input className="input-find" type="text" maxLength="20" placeholder="Please enter your Name" />
                </li>
                <li>
                  {/* 2-2. 이메일 */}
                  <label className="label-find">Email</label>
                  <input className="input-find" type="text" maxLength="50" placeholder="Please enter your Email" />
                </li>
                <li>
                  {/* 2-3. 찾기 버튼 */}
                  <button> Find ＞</button>
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
                  <input className="input-find" type="text" maxLength="20" placeholder="Please enter your ID" />
                </li>
                <li>
                  {/* 4-2. 이름 */}
                  <label className="label-find">User Name</label>
                  <input className="input-find" type="text" maxLength="20" placeholder="Please enter your Name" />
                </li>
                <li>
                  {/* 4-3. 이메일 */}
                  <label className="label-find">Email</label>
                  <input className="input-find" type="text" maxLength="50" placeholder="Please enter your Email" />
                </li>
                <li>
                  {/* 4-4. 찾기 버튼 */}
                  <button>Find ＞</button>
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
