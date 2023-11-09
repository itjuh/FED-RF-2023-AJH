// 메인페이지 코믹스컨텐츠

import { Banner } from "./Banner";

export function Comics(props){
    // cat - 메뉴분류
    return(
        <>
        <h1 style={{textAlign:'center'}}>코믹스 페이지</h1>
        <Banner category={props.cat} />
        </>
    );
} ///////////// Comics 구성 컴포넌트 //////////