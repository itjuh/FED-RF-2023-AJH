// 메인페이지 메인컨텐츠

import { Banner } from "../modules/Banner";
import { SecIntro } from "../modules/SecIntro";

export function Main(){
    // cat - 메뉴분류
    return(
        <>
        {/* 1. 배너 컴포넌트 */}
        <Banner category={'main'+Math.ceil(Math.random()*3)} />
        {/* 2. 섹션소개 컴포넌트 */}
        <SecIntro />
        </>
    );
} ///////////// Main 구성 컴포넌트 //////////