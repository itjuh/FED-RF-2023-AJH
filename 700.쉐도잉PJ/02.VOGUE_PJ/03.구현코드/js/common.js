// 보그 PJ - 공통모듈 JS : common.js

// DOM 메서드
import dFn from './dom.js';
// 상단, 하단 공통데이터 불러오기
import tData from './data/com.module.js';
// 부드러운 스크롤 모듈
import { startSS, setPos } from './smoothscroll23.js';

// [1] 부드러운 스크롤 적용 ////////////
startSS();

console.log(tData, dFn);

// [2] 상단 하단 공통모듈 넣기
// html넣기
// 대상선정 : .common-area
const commonArea = dFn.qsa('.common-area');
// html넣기 [0]상단,[1]하단
commonArea[0].innerHTML = tData['top-area'];
commonArea[1].innerHTML = tData['footer-area'];

