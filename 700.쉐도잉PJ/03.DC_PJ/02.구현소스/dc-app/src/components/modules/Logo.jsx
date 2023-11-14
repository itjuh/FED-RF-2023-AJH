// DC.com 로고 컴포넌트
import React from "react";
import { isrc } from "../data/imgSrc";

export const Logo = (props)=>{
    // props.logoStyle : 상단, 하단 구분
    // 객체형 스타일 적용
    const myStyle = {
        top : {width:"45px",
        height:"45px",
        marginRigth:'30px',
        borderRadius:"50%"},
        bottom : {
        height:"80px",
        borderRadius:"50%"}
    };

    const myImg = {
        top : '45px',
        bottom : '81px'
    }
    // 자식컴포넌트 처리용 함수
    const nayaLogo = (txt) => {
        console.log(txt);
    }; ///////// nayaLogo ///////////

    // 코드리턴
    return(
     <h1 style={myStyle[props.logoStyle]} onClick={()=>nayaLogo('나 로고야')}>
        <img src={isrc.logo} alt='DC logo' style={{width: myImg[props.logoStyle]}}/>
     </h1>
    );
}; ///////// Logo 컴포넌트 ///////////