// 메인 페이지 컨텐츠 컴포넌트 jsx - MainCont.jsx
import { useEffect } from "react";
import { Banner } from "../modules/Banner";

// 페이지별 자동 스크롤 js 가져오기
import { autoScroll } from "../func/jquery-autoScroll";
// 제이쿼리 가져오기
import $ from 'jquery';
window.jQuery = $;
require('jquery-ui-dist/jquery-ui');
require('jquery-ui-touch-punch/jquery.ui.touch-punch');

export function MainCont(){
    // 메인 페이지일때만 자동 스크롤 기능 적용 함
    useEffect(()=>{ //랜더링 후 한 번만 적용!
        console.log('랜더링완료');
        // 자동스크롤 호출
        // autoScroll();

        // 대상 : .slide, .cover
        const slide = $('.slide');
        const cover = $('.cover');
        
        // 드래그 기능 넣기
        slide.draggable({axis:'x'});
        slide.on('dragstop',function(){
            // 광드래그 막기 커버
            cover.show();

            // 비교를 위한 슬라이드위치/윈도우가로
            let pos = slide.offset().left;
            let winW = $(window).width();
            let gap = winW/24;
            
            // 차이값
            let diff = -pos - winW;
            let absDiff = Math.abs(diff);
            // 결과해석 양수는 왼쪽으로 이동(정방향)
            // 음수는 오른쪽으로 이동(역방향)
            console.log('방향:',diff,'차이값:',absDiff);
            
            // 이동하기
            if(diff > gap) slide.animate({left:'-200%'},800,'easeOutQuint',()=>{
                //맨앞 li 맨 뒤로 이동
                slide.append(slide.find('li').first()).css({left:'-100%'});
                // 커버 제거
                cover.hide();
            });
            else if(diff < -gap) slide.animate({left:'0%'},800,'easeOutQuint',()=>{
                //맨뒤 li 맨 앞로 이동
                slide.prepend(slide.find('li').last()).css({left:'-100%'})
                // 커버 제거
                cover.hide();
            });
            else slide.animate({left:'-100%'},800,'easeOutQuint',()=>{
                // 커버 제거
                cover.hide();
            }); // 제자리로
            

        }); /////// 드래그 종료 시 슬라이드 위치

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