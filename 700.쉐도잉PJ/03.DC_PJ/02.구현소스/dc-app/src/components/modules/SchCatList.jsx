// DC PJ 캐릭터 검색결과 리스트 컴포넌트
// 캐릭터 리스트
import { catListData } from "../data/swiper_cat";
// 캐릭터 검색 css
import '../../css/search_cat_list.css';
import { Link } from "react-router-dom";

export function SchCatList(props) {
  // props.word - 데이터 선택 값
  // 선택 데이터
  const selData = catListData.filter(v=>{
    if(v.cname.toLowerCase().indexOf(props.word) !== -1) return true;
  });
  console.log(selData);
  return (
    <>
      <ul className="clist">
        {selData.map((v, i) => (
          <li key={i}>
            {/* 라우터 데이터 전달은 state속성에 객체로 보낸다 */}
            <Link to="/detail" state={{ cname: v.cname, cdesc: v.cdesc, facts: v.facts }}>
              {/* 캐릭터 이미지 영역 */}
              <img src={v.tmsrc} alt={v.cname} />
              {/* 캐릭터 타이틀 영역 */}
              <h3>{v.cname}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
} /////// SchCatList 컴포넌트 ////////////
