// 메인페이지 메인컨텐츠

import { Banner } from "../modules/Banner";

export function Main(){
    // cat - 메뉴분류
    return(
        <>
        <h1 style={{textAlign:'center'}}>메인 페이지</h1>
        <Banner category={'main'+Math.ceil(Math.random()*3)} />
        </>
    );
} ///////////// Main 구성 컴포넌트 //////////