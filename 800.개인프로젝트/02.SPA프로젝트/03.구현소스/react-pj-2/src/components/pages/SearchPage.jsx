// 레오폴드 검색페이지 컴포넌트
import { useLocation } from 'react-router-dom';
import { Searching } from '../modules/Searching';
import '../../css/search.css';

export function SearchPage(){
    // 라우터 전달값 받기
    const loc = useLocation();
    // 넘어온 키워드 받기
    let keyword;
    // 전달 값이 있는 경우에만 읽게함
    if(loc.state) keyword = loc.state.keyword;
    console.log(keyword);
    return <>
    <main className="main in-box row-12 row-s-13">
      {/* 검색 박스 */}
      <div className="part-box col-16 row-12 row-s-13">
        <div className="searching-area">
          {/* 1. 상단부 */}
          {/* 1-1. 상단 타이틀 */}
          <h2>Search Result</h2>
          {/* 2. 검색 영역 */}
          {/* <Searching kword={keyword}/> */}
          <Searching keyword={keyword} />
        </div>
      </div>
    </main>
    </>
} // SearchPage ////////////////