// 메인페이지 메인컨텐츠

import { Banner } from "../modules/Banner";
import { SecIntro } from "../modules/SecIntro";
import { VidIntro } from "../modules/VidIntro";
import { VidSwipe } from "../modules/VidSwipe";

export function Main(){
    // cat - 메뉴분류
    return(
        <>
        {/* 1. 배너 컴포넌트 */}
        <Banner category={'main'+Math.ceil(Math.random()*3)} />
        {/* 2. 섹션소개 컴포넌트 */}
        <SecIntro />
        {/* 3. 비디오소개 컴포넌트 
        :cat - 페이지 분류명 cls - 클래스명(배경on/off)*/}
        <VidIntro cat='main' cls='off'/>
        {/* 4. 비디오스와이프 컴포넌트 */}
        <VidSwipe tit='LATEST TRAILERS, CLIPS & MORE'/>
        </>
    );
} ///////////// Main 구성 컴포넌트 //////////