// 메인페이지 게임 컨텐츠

import { Banner } from "./Banner";

export function Games(props){
    // cat - 메뉴분류
    return(
        <>
        <h1 style={{textAlign:'center'}}>게임 페이지</h1>
        <Banner category={props.cat} />
        </>
    );
} ///////////// Games 구성 컴포넌트 //////////