// 메인페이지 Main KeyboardList page - Main.jsx

import { optionData } from "../data/optionData";
import { Options } from "../modules/Options";
import { BoardList } from "../modules/BoardList";
// 메인페이지 css
import "../../css/main.css";

export function Main() {

  return (
    <>
      <main className="main in-box row-12">
        {/* 2-1. 제품 정렬옵션 */}
        <div className="part-box col-16 row-1">
          <div className="progress-area col-6">
            <ul className="flex-box">
              {
                optionData[0].top.map((v, i) => 
                  <li key={i} className={i==0?"on":''}>
                    <h2>{v}</h2>
                  </li>
                )
              }
            </ul>
            <div className="progress-bar"></div>
          </div>
        </div>
        {/* 2-2. 옵션 선택 시 세부옵션 */}
        <Options />
        {/* 2-2. 제품 리스트 */}
        <div className="part-box col-16 row-10 prod-area">
        <BoardList />
        </div>
      </main>
    </>
  );
} ////////// Main컴포넌트 //////////////
