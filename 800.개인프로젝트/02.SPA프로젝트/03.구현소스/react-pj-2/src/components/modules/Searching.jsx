// 레오폴드 검색 모듈

import { useState } from "react";
import { filterBoardData } from "../data/boardData";
import { switchData } from "../data/switchData";
import { useNavigate } from "react-router-dom";

export function Searching({ keyword }) {
  console.log("서칭 키워드", keyword);

  /**
   * [ 상태관리 변수 ]
   * prodResultCount
   * switchResultCount
   */
  const [prodCount, setProdCount] = useState(3);
  const [switchCount, setSwitchCount] = useState(3);
  /**
   * filterBoardData : code / sub / cost
   * switchData : swname / swkname
   */
  let boardSearch = filterBoardData.filter((v) => {
    // code검색
    if (v["code"].toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
      return true;
      // 한국어검색
    } else if (v["sub"].toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
      return true;
      // 가격검색
    } else if (v["cost"].toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
      return true;
    }
  });
  // 검색결과 처리
  let switchSearch = switchData.filter((v) => {
    if (v.swname.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
      return true;
    } else if (v.swkname.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
      return true;
    } else if (v.swdesc.toLowerCase().indexOf(keyword.toLowerCase()) !== -1){
      return true;
    } else if (v.swuse.toLowerCase().indexOf(keyword.toLowerCase()) !== -1){
      return true;
    }
  });
  console.log("boardSearch 결과\n", boardSearch, "\nswitchSearch 결과\n", switchSearch);
  // 검색결과 수량처리
  const settingCount = (target) => {
    if (target === 0) {
      let num = prodCount + 3;
      if (num >= boardSearch.length) num = boardSearch.length;
      setProdCount(num);
    } else if(target === 1) {
      let num = switchCount + 3;
      if (num >= switchSearch.length) num = switchSearch.length;
      setSwitchCount(num);
    }
  };
  // 숫자 회계처리
  function addCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  // 스위치 페이지 링크연결
  const nav = useNavigate();
  function goNav(link,txt){
    nav(link,{state:{name:txt}});
  }
  return (
    <>
      <section className="searching-box">
        <div className="searching-in-box scbar row-10 row-s-11">
          {/* 검색창 상단부 */}
          <table className="searching-table product-result">
            <caption>
              {/* 제품 : 00건 */}
              Product :{boardSearch.length !== 0 && <> {boardSearch.length} items </>}
              {boardSearch.length === 0 && <> 0 item </>}
            </caption>

            <tbody>
              <tr>
                {/* 2-1. 이미지 */}
                <th>Image</th>
                {/* 2-2. 제품정보 */}
                <th>Product Infomation</th>
                {/* 2-3. 가격 */}
                <th>Price</th>
                {/* 2-4. 페이지 이동 */}
                <th>View</th>
              </tr>
              {boardSearch.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ fontFamily: "KOFIHDrLEEJWTTF-B", fontSize: "1.4rem", padding: "10px 0" }}>
                    There is no result...
                  </td>
                </tr>
              )}
              {boardSearch.length > 0 &&
                boardSearch.map(
                  (v, i) =>
                    i < prodCount && (
                      <tr key={i} className={v.src}>
                        {/* 2-1. 이미지 */}
                        <td>
                          <img src={"./images/image_prod2/" + v.src + ".png"} alt={v.src + "이미지"} />
                        </td>
                        {/* 2-2. 제품정보 */}
                        <td>
                          <span>
                            {v.code} - {v.sub}
                            {<>- {v.array} design keyboard</>}
                          </span>
                        </td>
                        {/* 2-3. 가격 */}
                        <td>
                          <span>￦{addCommas(v.cost)}</span>
                        </td>
                        {/* 2-4. 페이지 이동 */}
                        <td>
                          <button className="view-detail"
                          onClick={()=>goNav('/subboard',v.src)}
                          >View<small> detail </small>↗</button>
                        </td>
                      </tr>
                    ) // map
                )}
            </tbody>
            <tfoot>
              <tr>
                {boardSearch.length > prodCount && (
                  <td colSpan={4}>
                    <button className="view-more-btn" onClick={() => settingCount(0)}>
                      View more...
                    </button>
                  </td>
                )}
              </tr>
            </tfoot>
          </table>
          {boardSearch.length === 0 && <div style={{ height: "100px" }}></div>}
          <table className="searching-table switch-result">
            {/* 검색창 상단부 */}
            <caption>
              {/* 스위치 : 00건 */}
              Switch :{switchSearch.length !== 0 && <> {switchSearch.length} items </>}
              {switchSearch.length === 0 && <> 0 item </>}
            </caption>

            <tbody>
              <tr>
                {/* 2-1. 이미지 */}
                <th>Image</th>
                {/* 2-2. 제품정보 */}
                <th>Switch Infomation</th>
                {/* 2-3. 용도 */}
                <th>Use</th>
                {/* 2-4. 페이지 이동 */}
                <th>View</th>
              </tr>
              {switchSearch.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ fontFamily: "KOFIHDrLEEJWTTF-B", fontSize: "1.4rem", padding: "10px 0" }}>
                    There is no result...
                  </td>
                </tr>
              )}
              {switchSearch.length > 0 &&
                switchSearch.map(
                  (v, i) =>
                    i < switchCount && (
                      <tr key={i}>
                        {/* 2-1. 이미지 */}
                        <td>
                          <img
                            src={
                              "./images/switch_prod/" +
                              v.swname.split("-")[0] +
                              "_" +
                              v.swname.split("-")[1] +
                              "/01.png"
                            }
                            alt={v.swkname + "이미지"}
                          />
                          <img
                            src={
                              "./images/switch_prod/" +
                              v.swname.split("-")[0] +
                              "_" +
                              v.swname.split("-")[1] +
                              "/02.png"
                            }
                            alt={v.swkname + "이미지"}
                          />
                        </td>
                        {/* 2-2. 제품정보 */}
                        <td>
                          <span>{v.swname}({v.swkname}) : {v.swdesc}</span>
                        </td>
                        {/* 2-3. 용도 */}
                        <td>
                          <span>{v.swuse}</span>
                        </td>
                        {/* 2-4. 페이지 이동 */}
                        <td>
                          <button className="view-detail"
                          onClick={()=>goNav('/subswitch',v.swname)}>
                            View<small> detail </small>↗
                          </button>
                        </td>
                      </tr>
                    ) // map
                )}
            </tbody>
            <tfoot>
              <tr>
                {switchSearch.length > switchCount && (
                  <td colSpan={4}>
                    <button className="view-more-btn" onClick={() => settingCount(1)}>
                      View more...
                    </button>
                  </td>
                )}
              </tr>
            </tfoot>
          </table>
        </div>
      </section>
    </>
  );
} /////// Searching /////////
