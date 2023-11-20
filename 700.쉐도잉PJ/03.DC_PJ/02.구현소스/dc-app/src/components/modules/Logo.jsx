// DC.com 로고 컴포넌트
import React from "react";
import { isrc } from "../data/imgSrc";
import { dcCon } from "./dcContext";
import { useContext } from "react";

// import { useNavigate } from 'react-router-dom';

export const Logo = (props)=>{
    // props.logoStyle : 상단, 하단 구분

    // 컨텍스트 API 사용하기
    const myCon = useContext(dcCon);

    // 라우터 이동 메서드 셋팅하기 : useNavigate()
    // const goNav = useNavigate();
    // 사용법 : 반드시 useNavigate()메서드를 변수에 담아 이동할 라우터 주소를 쓰면 이동한다
    // 예) goNav('/news') -> 뉴스페이지로 이동
    // 예) goNav('/) -> 첫페이지 이동
    // 이동주소는 대소문자 구분하지 않음

    // 객체형 스타일 적용
    const myStyle = {
        top : {width:"45px",
        height:"45px",
        marginRigth:'30px',
        borderRadius:"50%",
        cursor:'pointer'},
        bottom : {
        height:"80px",
        borderRadius:"50%"}
    };

    const myImg = {
        top : '45px',
        bottom : '81px'
    }
    // 자식컴포넌트 처리용 함수
    // const nayaLogo = () => {
    //     // console.log(txt);
    //     // 라우터 이동하기
    //     goNav('/');
    // }; ///////// nayaLogo ///////////

    // 코드리턴
    return(
     <h1 style={myStyle[props.logoStyle]} onClick={()=>myCon.chgPg('/')}>
        <img src={isrc.logo} alt='DC logo' style={{width: myImg[props.logoStyle]}}/>
     </h1>
    );
}; ///////// Logo 컴포넌트 ///////////