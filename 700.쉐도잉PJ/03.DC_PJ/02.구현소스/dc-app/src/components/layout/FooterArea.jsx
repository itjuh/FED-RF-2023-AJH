// 하단영역 컴포넌트
import { Logo } from "../modules/Logo";
// 링크데이터
import { bmData } from "../data/bmenu";
export function FooterArea() {
  
  return (
    <footer className="info">
      <ul>
        {/* 1. 하단 로고 */}
        <li>
          <Logo logoStyle="bottom" />
        </li>
        {/* 2. 하단 링크박스 */}
        <li>
            <ol className="bmenu">
                {bmData.map((v,i)=><li key={i}>
                    <a href={v.link} target='_blank'>{v.txt.toUpperCase()}</a>
                </li>)}
            </ol>
        </li>
        {/* 3. 권한 정보 */}
        <li>
            © & ™ DC. ALL RIGHTS RESERVED
        </li>
      </ul>
    </footer>
  ); //////// return //////////
} ///////// FooterArea 컴포넌트 ////////////
