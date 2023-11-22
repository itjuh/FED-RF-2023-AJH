// Pliot PJ 메인영역 공통 컴포넌트

import { Fashion } from "../pages/Fashion";
import { MainCont } from "../pages/MainCont";

// 라우터 역할을 하는 컴포넌트 ////////////////////
export function MainArea(props){
    // props.page 페이지 속성값으로 main/men/women/style
    return(
        <>
            {/* 메인이면 main 아니면 fashion */}
            {props.page === 'main'?<MainCont />:<Fashion cat={props.page} />}
        </>
    );
} ////////// MainArea 컴포넌트 ///////////
