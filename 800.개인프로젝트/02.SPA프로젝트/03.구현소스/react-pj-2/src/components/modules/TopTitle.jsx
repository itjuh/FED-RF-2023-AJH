import { memo, useContext } from "react";
import { LeoCon } from "./LeopoldContext";

// 상단 타이틀 컴포넌트
export const TopTitle = memo(()=>{
  let myCon = useContext(LeoCon);
  // myCon.titVal - 타이틀
  // (서브페이지는 타이틀 2개를 ^구분자로 연결)
  const isSub = myCon.titVal.indexOf('^');
  if(isSub != -1) myCon.titVal = myCon.titVal.split('^');
  return (
    <div className="part-box col-6">
      <div className="top-title">
        {
          isSub != -1 &&
          <>
          <h2>{myCon.titVal[0]}</h2>
          <small>{myCon.titVal[1]}</small>
          </>
        }
        {
          isSub == -1 &&
          <h2>{myCon.titVal}</h2>
        }
      </div>
    </div>
  );
}); ////// TopTitle 컴포넌트 //////////
