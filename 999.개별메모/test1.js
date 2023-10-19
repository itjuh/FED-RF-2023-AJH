const dFn = {
  qs: (x) => document.querySelector(x),
  qsEl: (el, x) => el.querySelector(x),
  qsa: (x) => document.querySelectorAll(x),
  qsaEl: (el, x) => el.querySelectorAll(x),

  // 이벤트셋팅함수
  addEvt: (ele, evt, fn) => ele.addEventListener(evt, fn),
};

// 제품 데이터
// ['제품코드','색상명','가격','이미지']로 구성
const prodData2 = [["FC900RBTPD", "코랄 블루", "178000", "keyboard1"]];
const prodData = [
  ["FC900RBTPD", "코랄 블루", "178000", "keyboard1"],
  ["FC750RBTPD", "코랄 블루", "175000", "keyboard2"],
  ["FC900RBTPD", "밀크 터쿼이즈", "178000", "keyboard3"],
  ["FC750RBTPD", "밀크 터쿼이즈", "175000", "keyboard4"],
  ["FC900RBTPD", "그레이 블루", "178000", "keyboard5"],
  ["FC750RBTPD", "그레이 블루", "175000", "keyboard6"],
  ["FC900RBTPD", "화이트 투톤", "178000", "keyboard7"],
  ["FC750RBTPD", "화이트 투톤", "175000", "keyboard8"],
  ["FC900RBTPD", "그레이 퍼플", "178000", "keyboard9"],
  ["FC750RBTPD", "그레이 퍼플", "175000", "keyboard10"],
  ["FC900RBTPD", "라이트 핑크", "178000", "keyboard11"],
  ["FC750RBTPD", "라이트 핑크", "175000", "keyboard12"],
  ["FC900RBTPD", "화이트 민트", "178000", "keyboard13"],
  ["FC750RBTPD", "화이트 민트", "175000", "keyboard14"],
  ["FC900RBTPD", "화이트 그레이", "178000", "keyboard15"],
  ["FC750RBTPD", "화이트 그레이", "175000", "keyboard16"],
  ["FC900RBTPD", "다크 블루", "178000", "keyboard17"],
  ["FC750RBTPD", "다크 블루", "175000", "keyboard18"],
  ["FC900RBTPD", "차콜 블루", "178000", "keyboard19"],
  ["FC750RBTPD", "차콜 블루", "175000", "keyboard20"],
  ["FC900RBTPD", "애쉬 옐로우", "178000", "keyboard21"],
  ["FC750RBTPD", "애쉬 옐로우", "175000", "keyboard22"],
  ["FC900RBTPD", "화이트 블루스타", "178000", "keyboard23"],
  ["FC750RBTPD", "화이트 블루스타", "175000", "keyboard24"],
  ["FC900RBTPD", "블랙 ", "178000", "keyboard25"],
  ["FC750RBTPD", "블랙 ", "175000", "keyboard26"],
  ["FC900RBTPD", "스웨디시 화이트", "178000", "keyboard27"],
  ["FC750RBTPD", "스웨디시 화이트", "175000", "keyboard28"],
  ["NP900RBTPD", "화이트 투톤", "178000", "keyboard29"],
  ["NP900RBTPD", "차콜 블루", "178000", "keyboard30"],
  ["NP900RBTPD", "그레이 블루", "178000", "keyboard31"],
  ["NP750RBTPD", "그레이 블루", "175000", "keyboard32"],
  ["FC980MBTPD", "화이트 투톤", "182500", "keyboard33"],
  ["FC980MBTPD", "화이트 블루스타", "182500", "keyboard34"],
  ["FC980MBTPD", "애쉬 옐로우", "182500", "keyboard35"],
  ["FC980MBTPD", "그레이 블루", "182500", "keyboard36"],
  ["FC980MPD", "화이트 투톤", "155000", "keyboard37"],
  ["FC980MPD", "화이트 블루스타", "155000", "keyboard38"],
  ["FC980MPD", "애쉬 옐로우", "155000", "keyboard39"],
  ["FC980MPD", "블랙 ", "155000", "keyboard40"],
  ["FC980MPD", "그레이 블루", "155000", "keyboard41"],
  ["FC980C", "화이트 ", "265000", "keyboard42"],
  ["FC900RPD", "화이트 투톤", "149500", "keyboard43"],
  ["FC900RPD", "화이트 그레이", "149500", "keyboard44"],
  ["FC900RPD", "블랙 ", "149500", "keyboard45"],
  ["FC900RPD", "다크 블루", "149500", "keyboard46"],
  ["FC900RPD", "그레이 블루", "149500", "keyboard47"],
  ["FC900ROE", "블랙 퍼플", "149500", "keyboard48"],
];

///////////////////////////////////////
// 키보드 데이터 뿌리기

// 대상 :.prod-box
const prodBox = dFn.qs(".prod-box");
let hcode = "";

function makeFn() {
  prodData.forEach((ele) => {
    hcode += `
            <div class='prod-item'>
                <img src='./image_prod/${ele[3]}.jpg' alt='${ele[1]} 이미지'>
                <span>${ele[0]}</span>
            </div>
        `;
  }); /////////forEach //////////

  prodBox.innerHTML = hcode;
} /////////makeFn 함수 /////////////

makeFn();

// 키보드 회전시키기
// 대상: prod-item
// var o = t.className,
//   e = t.images,
//   f = t.distance,
//   y = t.isIntro,
//   C = void 0 !== y && y,
//   p = t.animationDelay,
//   b = t.scaleAmount,
//   g = t.productClassName,
//   v = void 0 === g ? "" : g,
//   h = t.handleLoad,
//   m = void 0 === h ? null : h,
//   _ = t.exitIntro,
//   k = void 0 !== _ && _,
//   D = (0, r.useState)(!1),
//   B = D[0],
//   w = D[1],
//   x = (0, r.useState)({}),
//   A = x[0],
//   P = x[1],
//   S = (0, r.useState)(0),
//   O = S[0],
//   L = S[1],
//   E = (0, r.useRef)([]),
//   T = (0, r.useRef)(),
//   j = (0, i._)();
// (0, u.Z)(function () {
//   var t = T.current.getBoundingClientRect();
//   P(t);
// }, []);

// function rotateProd() {
// // 15개 기준
// // 회전각도 :  270deg += 360/data.length * data.index (오른쪽 가운데부터 정렬)
// // let x = (2*3.14)/15 하나씩 더해줌 원주율을 나눠주는 작업
// // 위치이동값 top (너비/2 + (너비/2 - 박스/2)*math.cos(x) - 박스/2)
// // 위치이동값 left (높이/2 + (높이/2 - 박스/2)*math.sin(x) - 박스/2)
//   for (var t = (2 * Math.PI) / E.current.length, o = 0, e = A.width, n = A.height, r = 0; r < E.current.length; r++) {
//     var i = E.current[r],
//       a = Math.round(e / 2 + (e / 2 - O / 2) * Math.cos(o) - O / 2),
//       u = Math.round(n / 2 + (e / 2 - O / 2) * Math.sin(o) - O / 2);
//     if (
//       (i.style.setProperty("--rotate", f ? "".concat(270 + r * f, "deg") : 0),
//       i.style.setProperty("--top", "".concat(u, "px")),
//       i.style.setProperty("--left", "".concat(a, "px")),
//       r >= E.current.length - 1)
//     ) {
//       if ((m && m(), !C || B)) return;
//       w(!0),
//         j.set({
//           scale: b,
//           opacity: 0,
//         }),
//         j.start({
//           scale: 1,
//           opacity: 1,
//           transition: {
//             duration: 1.5,
//             ease: [0.25, 0.46, 0.45, 0.94],
//             delay: p,
//           },
//         });
//     }
//     o += t;
//   }
// }
