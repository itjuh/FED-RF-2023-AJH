// DC PJ 캐릭터 검색결과 리스트 컴포넌트
// 캐릭터 검색 css
import '../../css/search_cat_list.css';
import { Link } from "react-router-dom";

export function SchCatList({dt,total}) {
  // props.dt - 검색 된 배열데이터
  // props.total - 검색 된 배열데이터 개수

  // 선택 데이터
  const selData = dt;
  // 선택 데이터 개수
  const selCnt = total;
  // console.log(selData,selCnt);
  return (
    <>
      {
        selCnt !== 0 &&
        <ul className="clist">
        {
          selData.map((v, i) => (
            <li key={i}>
              {/* 라우터 데이터 전달은 state속성에 객체로 보낸다 */}
              <Link to="/detail" state={{ cname: v.cname, cdesc: v.cdesc, facts: v.facts }}>
                {/* 캐릭터 이미지 영역 */}
                <img src={v.tmsrc} alt={v.cname} />
                {/* 캐릭터 타이틀 영역 */}
                <h3>{v.cname}</h3>
              </Link>
            </li>
          ))
        }
        </ul>
      }
      {
        // 선택 데이터가 0개
        selCnt === 0 &&
        <h2 style={{textAlign:'center'}}>
          Sorry, we don't have any matches for that. But there's plenty more to see on DC!
        </h2>
      }
    </>
  );
} /////// SchCatList 컴포넌트 ////////////
