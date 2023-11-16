// 메인 페이지 컨텐츠 컴포넌트 jsx - MainCont.jsx
import { useEffect } from "react";
import { Banner } from "../modules/Banner";

// 페이지별 자동 스크롤 js 가져오기
import { autoScroll } from "../func/jquery-autoScroll";
// 드래그 배너 js불러오기
import { dragBanner } from "../func/drag_banner";


export function MainCont(){
    // 메인 페이지일때만 자동 스크롤 기능 적용 함
    useEffect(()=>{ //랜더링 후 한 번만 적용!
        console.log('랜더링완료');
        // 자동스크롤 호출
        autoScroll();
        // 드래그 배너 호출
        dragBanner();

    },[]); //////// useEffect ///////////////

    return(
        <>
            {/* 1. 배너페이지 */}
            <section id='ban' className="page" 
            style={{background:'lightblue'}}>
                <Banner />
            </section>
            <section className="page" 
            style={{background:'lightcoral'}}>
                
            </section>
            <section className="page" 
            style={{background:'lightgreen'}}>
                
            </section>
            <section className="page" 
            style={{background:'lightseagreen'}}>
                
            </section>
            <section className="page" 
            style={{background:'lightpink'}}>
                
            </section>
        </>
    )
} /////// MainCont 컴포넌트 /////////