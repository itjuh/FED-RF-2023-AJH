// Pilot PJ 메인페이지 배너 컴포넌트
// 배너용 css
import '../css/banner.css';

export function Banner() {
  // 배너 리스트 개수
  const BAN_CNT = 6
  // 리스트 생성 함수
  const makeList = (gubun) => {
    // gubun : 1-배너/ 0-블릿
    // for문을 돌려서 태그를 직접 생성 할 때 배열에 담아서 map사용
    let hcode = [];
    for(let i=0; i<BAN_CNT; i++){
      if(gubun){ // 배너코드
        hcode[i] = <li key={i} className={'ban'+(i==0?'6':i)}><span class="ir">{'배너'+(i==0?'6':i)}</span></li>
      }else{ // 불릿코드
        hcode[i] = <li key={i} className={i==0?'on':""}><a href="#"><span class="bld">블릿</span></a></li>
      }
    }
    // console.log(hcode);
    // 코드리턴
    return hcode;
  }; ///////// makeList함수 ////////////
  return (
    <>
      <ul className="slide">
        {/* 배열로 태그를 받아서 map처리함, jsx문법은 태그를 string으로 저장하지 않으므로 바로 출력할 수 없음 */}
        {makeList(1).map(v=>v)}
      </ul>
      <ol className="bindic">
        {makeList(0).map(v=>v)}
      </ol>
      <div className="cover"></div>
    </>
  );
} //////////// Banner 컴포넌트 ///////////////
