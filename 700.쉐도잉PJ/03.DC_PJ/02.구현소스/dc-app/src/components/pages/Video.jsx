// 비디오페이지 메인 컴포넌트

import { VidIntro } from "../modules/VidIntro";

// 바디오페이지 메인 컴포넌트 //
export function Video(){
    return(
        <>
        {/* 1. 비디오소개 컴포넌트 
        :cat - 페이지 분류명 cls - 클래스명(배경on/off)*/}
        <VidIntro cat='VIDEO' cls='on'/>
        </>
    );
} ////////// Video 컴포넌트 ///////////
