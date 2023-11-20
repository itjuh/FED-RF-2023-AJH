// 메인페이지 코믹스컨텐츠

import { Banner } from "../modules/Banner";
import { VidIntro } from "../modules/VidIntro";

export function Comics(){
    // cat - 메뉴분류
    return(
        <>
        {/* 2. 배너 컴포넌트 */}
        <Banner category='COMICS' />
        {/* 1. 비디오소개 컴포넌트 
        :cat - 페이지 분류명 cls - 클래스명(배경on/off)*/}
        <VidIntro cat='COMICS' cls='on'/>
        </>
    );
} ///////////// Comics 구성 컴포넌트 //////////