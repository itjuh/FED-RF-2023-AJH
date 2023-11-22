// DC PJ 캐릭터 상세 페이지
// -> 캐릭터 리스크로부터 라우팅 이동하여 보이는 페이지

import { Banner } from "../modules/Banner";
import { useLocation } from "react-router-dom";
import { CatList } from '../modules/CatList';
// 캐릭터 상세페이지 css 불러오기
import "../../css/cat_detail.css";

export function CatDetail() {
  // 라우터 호출 시 전달한 값을 받는다!
  // 라우터 전달 값을 받기 위해 useLocation 생성하기
  const loc = useLocation();
  // 구체적으로 state속성 하위 객체 속성명으로 불러오기
  // 1. 캐릭터명
  const cname = loc.state.cname;
  // 2. 캐릭터소개 : ^구분자로 문단나누기
  const cdesc = loc.state.cdesc.split("^");
  // 3. 캐릭터명세 : ^구분자로 문단나누기
  const facts = loc.state.facts.split("^");
  console.log(cname, cdesc, facts);
  return (
    <>
      {/* 1. 배너 컴포넌트 */}
      <Banner category={cname} />
      {/* 2. 상세정보박스 */}
      <div className="detail">
        {/* 2-1. 캐릭터 설명박스 */}
        <div className="desc-box">
          <h2>{cname}</h2>
          <div className="cdesc">
            {cdesc.map((v, i) => (
              <p key={i}>{v}</p>
            ))}
          </div>
        </div>
        {/* 2-2. 캐릭터 명세 */}
        <div className="facts">
          <div>
            <h3>CHARACTER FACTS</h3>
            {/* 명세 배열 테이블로 구성 */}
            <table>
              <tbody>
                {facts.map((v, i) => (
                  <tr key={i}>
                    <td>{v.split(":")[0]}:</td>
                    <td>{v.split(":")[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* 3. 캐릭터 리스트 */}
      <CatList />
    </>
  );
} //////// CatDetail 컴포넌트 /////////////////////
