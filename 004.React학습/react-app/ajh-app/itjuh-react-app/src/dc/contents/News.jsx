// 메인페이지 뉴스 컨텐츠

import { Banner } from "./Banner";

export function News(){
    // cat - 메뉴분류
    return(
        <>
        <h1 style={{textAlign:'center'}}>뉴스 페이지</h1>
        <Banner category='NEWS' />
        </>
    );
} ///////////// News 구성 컴포넌트 //////////