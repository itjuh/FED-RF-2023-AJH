// 보그 PJ - 공통모듈 JS : common.js

// DOM 메서드
import dFn from './dom.js';
// 상단, 하단 공통데이터 불러오기
import tData from './data/com.module.js';

console.log(tData, dFn);

// 공통영역 html넣기
// 대상선정 : .common-area
const commonArea = dFn.qsa('.common-area');
// html넣기
commonArea[0].innerHTML = tData['top-area'];
commonArea[1].innerHTML = tData['footer-area'];


