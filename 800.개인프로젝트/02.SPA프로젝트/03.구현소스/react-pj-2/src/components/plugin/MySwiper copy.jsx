import $ from "jquery";
import "jquery-ui-dist/jquery-ui";
import { useEffect } from "react";

export function MySwiper() {
  /**
   * 1. 드래그 배너 구현하기
   * 요구사항
   * 1) 화면에 5개의 상품이 보여짐
   * 2) 1번 대상은 scale 0.7의 크기로 줄어들고 2번 요소가 덮는 형태
   * 3) 무한 루프 드래그
   * 4) 1/3지점까지 움직이면 이동
   * 5) z-index설정
   * ___________________________
   * 드래그 대상 slider-box
   * 드래그는 Y축 방향만 적용
   * 클릭인지 드래그인이 확인해서 구분하기
   */

  // const tg = document.querySelector('.slider-box');
  // 1. 대상선정 : .dtg는 .slide와 일치함!
  let pos = 0;
  const move = (e)=>{
    // console.log($('.slider-area').position().top,'area pos');
    // console.log($('.slider-box').position().top,'box pos');
    pos -= 1;
    let fipos = 0;
    let sc = 1;
    console.log($('.slider').first().offset().top);
    if($('.slider').first().offset().top < 140){
      fipos = -1 * pos;
      $('.slider').first().css({top:fipos + 'px',scale:'0.8'});
      console.log('2번',$('.slider').first().next().offset().top);
    }else if($('.slider').first().next().offset().top < 140){
      let eq1 = $('.slider:first');
      console.log(eq1);
      $('.slider-box').append(eq1);
      pos = 0;
      $('.slider').last().css({top:'0px',scale:1});
    }
    $(e.currentTarget).css('top', pos+'px');
  }

  return (
    <div className="slider-area">
      <div className="slider-box" onMouseMove={move}>
        <div className="slider">1111111111</div>
        <div className="slider">2222222222</div>
        <div className="slider">3333333333</div>
        <div className="slider">4444444444</div>
        <div className="slider">5555555555</div>
        <div className="slider">6666666666</div>
        <div className="slider">7777777777</div>
        <div className="slider">8888888888</div>
        <div className="slider">9999999999</div>
      </div>
    </div>
  );
}
