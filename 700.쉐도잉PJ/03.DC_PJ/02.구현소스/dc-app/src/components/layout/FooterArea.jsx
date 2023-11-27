// 하단영역 컴포넌트
import { Logo } from "../modules/Logo";
// 링크데이터
import { bmData } from "../data/bmenu";
import { memo } from "react";

// export function FooterArea() {
export const FooterArea = memo(()=>{
  // 컴포넌트 호출 확인
  console.log('FooterArea 컴포넌트 호출!!!');

  /* 
  아주 간단한 컴포넌트 메모이제이션 하기!!
   1. 함수형 컴포넌트 export function 컴포넌트 명(){}
   2. 변수 할당형 컴포넌트 export const 컴포넌트 명 = ()=>{}
   3. 위의 2번을 메모이제이션 한다 export const 컴포넌트 명 = memo(()=>{}) 
  */

  // 리턴코드 ///////////////////////////////
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
}); ///////// FooterArea 컴포넌트 ////////////
