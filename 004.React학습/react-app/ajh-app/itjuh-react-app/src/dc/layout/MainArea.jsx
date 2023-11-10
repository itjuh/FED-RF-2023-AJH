// 메인영역 컴포넌트

import { Outlet } from "react-router-dom";

export function MainArea() {
  // cat - 메뉴분류

  // 리턴함수
  return (
    <main className="cont">
      <Outlet />
    </main>
  ); ///////////return//////////////
} /////////// MainArea 컴포넌트 //////////////////
