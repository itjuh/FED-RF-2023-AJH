// 메인페이지 메인컨텐츠

import { Banner } from "./Banner";

export function Main(props){
    // cat - 메뉴분류
    return(
        <>
        <h1 style={{textAlign:'center'}}>메인 페이지</h1>
        <Banner category={props.cat} />
        </>
    );
} ///////////// Main 구성 컴포넌트 //////////