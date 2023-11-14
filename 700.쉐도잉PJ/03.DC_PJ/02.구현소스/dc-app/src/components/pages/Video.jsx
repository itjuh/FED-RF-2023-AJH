// 비디오페이지 메인 컴포넌트

import { isrc } from "../data/imgSrc";


// 바디오페이지 메인 컴포넌트 //
export function Video(){
    return(
        <>
        <h1 style={{textAlign:'center'}}>비디오 페이지</h1>
        <iframe src={isrc.video} />
        </>
    );
} ////////// Video 컴포넌트 ///////////
