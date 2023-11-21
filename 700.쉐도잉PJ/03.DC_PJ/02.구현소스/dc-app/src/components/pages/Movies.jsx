// 메인페이지 무비 컨텐츠

import { Banner } from "../modules/Banner";
import { VidIntro } from "../modules/VidIntro";
import { VidSwipe } from "../modules/VidSwipe";

export function Movies(){
    // cat - 메뉴분류
    return(
        <>
        {/* 1. 비디오소개 페이지 배너 */}
        <Banner category='MOVIES' />
        {/* 2. 비디오소개 컴포넌트 
        :cat - 페이지 분류명 cls - 클래스명(배경on/off)*/}
        <VidIntro cat='MOVIES' cls='on'/>
        {/* 3. 비디오소개 스와이퍼 */}
        <VidSwipe cat='movies' />
        </>
    );
} ///////////// Movies 구성 컴포넌트 //////////