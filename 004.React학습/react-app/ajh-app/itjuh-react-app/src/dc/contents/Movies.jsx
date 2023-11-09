// 메인페이지 무비 컨텐츠

import { Banner } from "./Banner";

export function Movies(props){
    // cat - 메뉴분류
    return(
        <>
        <h1 style={{textAlign:'center'}}>무비 페이지</h1>
        <Banner category={props.cat} />
        </>
    );
} ///////////// Movies 구성 컴포넌트 //////////