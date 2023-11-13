// 메인 페이지 JS - index.js
import React, { useState } from 'react';
import { createRoot, ReactDOM } from 'react-dom/client';
import { TopArea } from './layout/TopArea';
import { MainArea } from './layout/MainArea';
import { FooterArea } from './layout/Footer';

// 페이지 공통 CSS
import './css/common.css'

// 최상위 Root 컴포넌트 ////////////
function App(){
  // 페이지 변경용 후크 상태변수 설정
  const [pageName, setPageName] = useState('main');

  // 후크변수 변경함수
  const chgPgName = x => setPageName(x);
  return(
    <>
      <TopArea chgFn={chgPgName}/>
      <MainArea page={pageName}/>
      <FooterArea />
    </>
  )
} ///////// App 컴포넌트 /////////////

const root = createRoot(document.querySelector('#root'));
root.render(<App />);

