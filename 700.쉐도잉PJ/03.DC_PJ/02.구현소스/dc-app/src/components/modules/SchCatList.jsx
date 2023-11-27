// DC PJ 캐릭터 검색결과 리스트 컴포넌트
// 캐릭터 리스트
import { catListData } from "../data/swiper_cat";
// 캐릭터 검색 css
import '../../css/search_cat_list.css';
import { Link } from "react-router-dom";

export function SchCatList(props) {
  // props.word - 데이터 선택 값
  // props.chgCntFn - 개수 보이기 함수
  // 전달 된 검색어 변환
  let kword = props.word.toLowerCase();
  // 선택 데이터
  const selData = catListData.filter(v=>{
    if(v.cname.toLowerCase().indexOf(kword) !== -1) return true;
  });
  // 선택 데이터 개수
  const selCnt = selData.length;
  // 선택 데이터 개수 훅 변수 업데이트
  props.chgCntFn(selCnt);
  console.log(selData,selCnt);
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
