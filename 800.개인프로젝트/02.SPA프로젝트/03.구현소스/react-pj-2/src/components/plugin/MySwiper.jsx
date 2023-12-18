import $ from "jquery";
import "jquery-ui-dist/jquery-ui";
import { useEffect } from "react";

export function MySwiper() {
  const go = ()=>{
    console.log('호출',$('.slider-box'));

  }
  useEffect(() => {
    $(".slider-box").draggable({
      axis: "y",
    });
  });
  return (
    <div className="slider-area">
      <div className="blank-box"></div>
      <div className="slider-box" onMouseOver={go}>
        <div className="slider"></div>
        <div className="slider"></div>
        <div className="slider"></div>
        <div className="slider"></div>
        <div className="slider"></div>
        <div className="slider"></div>
        <div className="slider"></div>
        <div className="slider"></div>
        <div className="slider"></div>
      </div>
    </div>
  );
}
