// 레오폴드 아이디 패스워드 찾기 페이지
export function FindMember() {
  return (
    <main className="main in-box row-12">
      {/* 1. 찾기 박스 */}
      <div className="part-box col-16 row-12 ">
        <div className="find-area">
          {/* 1-1. 상단 타이틀 */}
          <h2>Find id/password</h2>
          {/* 2. 아이디 찾기 */}
          <div className="find-id-box">
            <form action="process.php" method="post">
              <ul>
                <li>
                  {/* 2-1. 이름 */}
                  <label className="label-find-id">User Name</label>
                  <input className="input-find-id" type="text" maxLength="20" placeholder="Please enter your Name" />
                </li>
                <li>
                  {/* 2-2. 이메일 */}
                  <label className="label-find-id">Email</label>
                  <input className="input-find-id" type="text" maxLength="50" placeholder="Please enter your Email" />
                </li>
                <li>
                  {/* 2-3. 찾기 버튼 */}
                  <button>Find</button>
                </li>
              </ul>
            </form>
          </div>
          {/* 2. 비밀번호 찾기 */}
          <div className="find-pw-box">
            <form action="process.php" method="post">
              <ul>
                <li>
                  {/* 2-1. 아이디 */}
                  <label className="label-find">ID</label>
                  <input className="input-find" type="text" maxLength="20" placeholder="Please enter your ID" />
                </li>
                <li>
                  {/* 2-2. 이름 */}
                  <label className="label-find-pw">User Name</label>
                  <input className="input-find-pw" type="text" maxLength="20" placeholder="Please enter your Name" />
                </li>
                <li>
                  {/* 2-3. 이메일 */}
                  <label className="label-find-pw">Email</label>
                  <input className="input-find-pw" type="text" maxLength="50" placeholder="Please enter your Email" />
                </li>
                <li>
                  {/* 2-3. 찾기 버튼 */}
                  <button>Find</button>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
} ////////// FindMember 컴포넌트 /////////////
