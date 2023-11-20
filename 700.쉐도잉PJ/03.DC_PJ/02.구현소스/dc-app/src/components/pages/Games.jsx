// 메인페이지 게임 컨텐츠

import { Banner } from "../modules/Banner";
import { VidIntro } from "../modules/VidIntro";

export function Games(){
    // cat - 메뉴분류
    return(
        <>
        <Banner category='GAMES' />
        {/* 1. 비디오소개 컴포넌트 
        :cat - 페이지 분류명 cls - 클래스명(배경on/off)*/}
        <VidIntro cat='GAMES' cls='on'/>
        </>
    );
} ///////////// Games 구성 컴포넌트 //////////