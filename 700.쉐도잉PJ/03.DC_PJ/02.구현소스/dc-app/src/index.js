// index.js는 public/index.html 페이지에 적용되는 컴포넌트다! - root컴포넌트
// css 도 불러온다!
import './css/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Main } from './components/pages/Main';
import { Character } from './components/pages/Character';
import { Comics } from './components/pages/Comics';
import { Movies } from './components/pages/Movies';
import { Games } from './components/pages/Games';
import { News } from './components/pages/News';
import { Video } from './components/pages/Video';
import { SwiperApp } from './components/plugin/SwiperApp';
import { CatDetail } from './components/pages/CatDetail';
import { Series } from './components/pages/Series';
import { SchPage } from './components/pages/SchPage';
// import { SwiperApp } from './components/plugin/pages/SwiperApp';

/********************************************* 
    [ 리액트 라우터 ]
    -> 컴포넌트를 연결하여 특정 이벤트에 모듈을
    변경해주는 중계역할을 함
    1. <BrowserRouter> - 라우터 Root
    2. <Routes> - 개별 라우터를 묶어주는 역할
    3. <Route> - 개별 라우터
        (속성)
            (1) path : 경로를 지정함
                    (Link의 to속성 경로와 일치함!)
            (2) element : 연결할 컴포넌트 지정

        (하위 라우트 만들기)
            <Route path="/">
                <Route />
                <Route />
                <Route />
            </Route>
    4. 라우터를 구성하는 컴포넌트는 자체적으로
    내보내기 셋팅을 해야한다!
    -> export default 라우터 컴포넌트

    [ 리액트 라우터 흐름 ]
    1. index.js에 라우터 중앙 세팅
    2. Layout.jsx에 레이아웃 컴포넌트를 루트로 선택
    3. 상단영역 Gnb에 <Link to> 셋팅
    4. 메인영역에 <Outlet /> 셋팅
*********************************************/

// 라우터 구성 컴포넌트 : 스스로 내보내기 필수!
// 레이아웃 컴포넌트를 라우터에 입혀서 화면에 출력해야하기 때문에 내보내기 셋팅이 필수임.
export default function App(){
  
  return(
    <BrowserRouter>
      <Routes>
        {/* 중요!! 레이아웃 컴포넌트를 루트로 설정!! */}
        <Route path='/' element={<Layout />}>
          {/* 하위 라우트 세팅 */}
          {/* path대신 index만 쓰면 첫 페이지로 로딩함! 
          -> path는 Layout.jsx에서 Link to='/'에 해당하는 세팅임 */}
          <Route index element={<Main />} />
          <Route path='characters' element={<Character />} />
          <Route path='comics' element={<Comics />} />
          <Route path='movies' element={<Movies />} />
          <Route path='series' element={<Series />} />
          <Route path='games' element={<Games />} />
          <Route path='news' element={<News />} />
          <Route path='video' element={<Video />} />
          <Route path='board' element={<SwiperApp />} />
          <Route path='detail' element={<CatDetail />} />
          <Route path='schpage' element={<SchPage />} />
          {/* <Route path='board' element={<SwiperApp />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
} /////////App /////////////


// 컴포넌트 출력 //////////////////
// root객체 ReactDOM.createRoot() -> root.render(</>)
const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App />);