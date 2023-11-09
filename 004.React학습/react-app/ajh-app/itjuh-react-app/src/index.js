// index.js는 public/index.html 페이지에 적용되는 컴포넌트다! - root컴포넌트
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
// css 도 불러온다!
import './css/index.css';
import { TopArea } from './dc/layout/TopArea';
import { MainArea } from './dc/layout/MainArea';
import { FooterArea } from './dc/layout/FooterArea';

function App(){
  // 상단 메뉴 클릭 시 메인컨텐츠 변경을 위해 관리변수 useState생성
  const [menu, setMenu] = useState('main');

  // 메뉴 업데이트 함수
  const chgMenu = (data)=>{
    // console.log('메뉴 업데이트',data);
    // data는 클릭한 메뉴명
    setMenu(data);
  }; ///// chgMenu //////////

  return(
    <>
    <TopArea chgFn={chgMenu}/>
    <MainArea cat={menu}/>
    <FooterArea />
    </>
  )
} /////////App /////////////


// 컴포넌트 출력 //////////////////
// root객체 ReactDOM.createRoot() -> root.render(</>)
const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App />);