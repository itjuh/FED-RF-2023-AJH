// 메인페이지 시리즈페이지 메인 컨텐츠

import { Banner } from "../modules/Banner";
import { VidIntro } from "../modules/VidIntro";
import { VidSwipe } from "../modules/VidSwipe";

export function Series(){
    // cat - 메뉴분류
    return(
        <>
        {/* 1. 비디오소개 페이지 배너 */}
        <Banner category='SERIES' />
        {/* 2. 비디오소개 컴포넌트 
        :cat - 페이지 분류명 cls - 클래스명(배경on/off)*/}
        <VidIntro cat='MOVIES' cls='on'/>
        {/* 3. 비디오소개 스와이퍼 */}
        <VidSwipe cat='movies' />
        </>
    );
} ///////////// Series 구성 컴포넌트 //////////