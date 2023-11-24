// DC PJ 검색결과 페이지 컴포넌트 - SchPage.jsx

import { Searching } from "../modules/Searching";
import { useLocation } from 'react-router-dom';

export function SchPage(){
    // 라우터 전달값 받기
    const loc = useLocation();
    // 넘어온 키워드 받기
    let keyword;
    // 전달 값이 있는 경우에만 읽게함
    if(loc.state) keyword = loc.state.keyword;
    console.log(keyword);
    return(
        <>
            <h1 className='tit'>Search Result</h1>
            <Searching kword={keyword}/>
        </>
    )
} ///////// SchPage 컴포넌트 ///////////