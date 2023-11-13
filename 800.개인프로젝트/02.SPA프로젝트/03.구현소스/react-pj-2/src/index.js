// index.js는 public/index.html 페이지에 적용되는 컴포넌트다! - root컴포넌트
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App(){
  return(
    <BrowserRouter>
      <Routes>
      </Routes>
    </BrowserRouter>
  )
} /////////App /////////////

// 컴포넌트 출력 //////////////////
// root객체 ReactDOM.createRoot() -> root.render(</>)
const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App />);