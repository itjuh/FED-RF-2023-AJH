// 데이터 유형에 맞게 만들기 ////////////

const key = ['switch-bu','switch-br','switch-sl','switch-lr','switch-cl','switch-sr','switch-bk'];
const x = [
    ["FC900RBTPD", "코랄 블루", "178000", "keyboard1","co-rd",'co-bu'],
    ["FC750RBTPD", "코랄 블루", "175000", "keyboard2","co-rd",'co-bu'],
    ["FC900RBTPD", "밀크 터쿼이즈", "178000", "keyboard3","co-ye",'co-bu'],
    ["FC750RBTPD", "밀크 터쿼이즈", "175000", "keyboard4","co-ye",'co-bu'],
    ["FC900RBTPD", "그레이 블루", "178000", "keyboard5","co-gy",'co-bu'],
    ["FC750RBTPD", "그레이 블루", "175000", "keyboard6","co-gy",'co-bu'],
    ["FC900RBTPD", "화이트 투톤", "178000", "keyboard7","co-wt",'co-gy'],
    ["FC750RBTPD", "화이트 투톤", "175000", "keyboard8","co-wt",'co-gy'],
    ["FC900RBTPD", "그레이 퍼플", "178000", "keyboard9","co-gy",'co-bk'],
    ["FC750RBTPD", "그레이 퍼플", "175000", "keyboard10","co-gy",'co-bk'],
    ["FC900RBTPD", "라이트 핑크", "178000", "keyboard11","co-wt",'co-rd'],
    ["FC750RBTPD", "라이트 핑크", "175000", "keyboard12","co-wt",'co-rd'],
    ["FC900RBTPD", "화이트 민트", "178000", "keyboard13","co-wt",'co-bu'],
    ["FC750RBTPD", "화이트 민트", "175000", "keyboard14","co-wt",'co-bu'],
    ["FC900RBTPD", "화이트 그레이", "178000", "keyboard15","co-wt",'co-gy'],
    ["FC750RBTPD", "화이트 그레이", "175000", "keyboard16","co-wt",'co-gy'],
    ["FC900RBTPD", "다크 블루", "178000", "keyboard17","co-bk",'co-gy'],
    ["FC750RBTPD", "다크 블루", "175000", "keyboard18","co-bk",'co-gy'],
    ["FC900RBTPD", "차콜 블루", "178000", "keyboard19","co-gy",'co-bk'],
    ["FC750RBTPD", "차콜 블루", "175000", "keyboard20","co-gy",'co-bk'],
    ["FC900RBTPD", "애쉬 옐로우", "178000", "keyboard21","co-gy",'co-bk'],
    ["FC750RBTPD", "애쉬 옐로우", "175000", "keyboard22","co-gy",'co-bk'],
    ["FC900RBTPD", "화이트 블루스타", "178000", "keyboard23","co-wt",'co-rd'],
    ["FC750RBTPD", "화이트 블루스타", "175000", "keyboard24","co-wt",'co-rd'],
    ["FC900RBTPD", "블랙 ", "178000", "keyboard25","co-bk",'co-bk'],
    ["FC750RBTPD", "블랙 ", "175000", "keyboard26","co-bk",'co-bk'],
    ["FC900RBTPD", "스웨디시 화이트", "178000", "keyboard27","co-bu",'co-ye'],
    ["FC750RBTPD", "스웨디시 화이트", "175000", "keyboard28","co-bu",'co-ye'],
    ["NP900RBTPD", "화이트 투톤", "178000", "keyboard29","co-wt",'co-gy'],
    ["NP900RBTPD", "차콜 블루", "178000", "keyboard30","co-gy",'co-bk'],
    ["NP900RBTPD", "그레이 블루", "178000", "keyboard31","co-gy",'co-bu'],
    ["NP750RBTPD", "그레이 블루", "175000", "keyboard32","co-gy",'co-bu'],
    ["FC980MBTPD", "화이트 투톤", "182500", "keyboard33","co-wt",'co-gy'],
    ["FC980MBTPD", "화이트 블루스타", "182500", "keyboard34","co-wt",'co-rd'],
    ["FC980MBTPD", "애쉬 옐로우", "182500", "keyboard35","co-gy",'co-bk'],
    ["FC980MBTPD", "그레이 블루", "182500", "keyboard36","co-gy",'co-bu'],
    ["FC980MPD", "화이트 투톤", "155000", "keyboard37","co-wt",'co-gy'],
    ["FC980MPD", "화이트 블루스타", "155000", "keyboard38","co-wt",'co-rd'],
    ["FC980MPD", "애쉬 옐로우", "155000", "keyboard39","co-gy",'co-ye'],
    ["FC980MPD", "블랙 ", "155000", "keyboard40","co-bk",'co-bk'],
    ["FC980MPD", "그레이 블루", "155000", "keyboard41","co-gy",'co-bu'],
    ["FC980C", "화이트 ", "265000", "keyboard42","co-wt",'co-gy'],
    ["FC900RPD", "화이트 투톤", "149500", "keyboard43","co-wt",'co-gy'],
    ["FC900RPD", "화이트 그레이", "149500", "keyboard44","co-wt",'co-gy'],
    ["FC900RPD", "블랙 ", "149500", "keyboard45","co-bk",'co-bk'],
    ["FC900RPD", "다크 블루", "149500", "keyboard46","co-bk",'co-bk'],
    ["FC900RPD", "그레이 블루", "149500", "keyboard47","co-gy",'co-bu'],
    ["FC900ROE", "블랙 퍼플", "149500", "keyboard48","co-bk",'co-bk'],
  ];

// rdm[아이템개수]
let rdm = (x) => Math.floor(Math.random()*x);
let bb = '';
for(let i=10;i<48;i++){
bb += `

  keyboard${i+1}: {
    code: "${x[i][0]}",
    sub: "${x[i][1]}",
    type: "keyboard",
    img: [
      { isrc: "./images/keyboard888/01.jpg", ialt: "image1" },
      { isrc: "./images/keyboard888/02.jpg", ialt: "image2" },
      { isrc: "./images/keyboard888/03.jpg", ialt: "image3" },
      { isrc: "./images/keyboard1/04.jpg", ialt: "must-read" },
      { isrc: "./images/keyboard888/05.jpg", ialt: "info1" },
    ],
  },

`

// bb += `
//     {
//         "src" : "${x[i][3]}",
//         "idx" : "${i+1}",
//         "code" : "${x[i][0]}",
//         'sub' : "${x[i][1]}",
//         "array" : "${x[i][0].toString().substr(2,3)}",
//         "color" : ["${x[i][4]}","${x[i][5]}"],
//         "switch" : ["${key[rdm(6)]}","${key[rdm(6)]}","${key[rdm(6)]}"],
//         "cost" : "${x[i][2]}",
//     },
//  `;
// bb += `
//     {
//         "idx":"${x}",
//         "gname":"${gname[rdm(4)]}",
//         "category":"${category[rdm(3)]}",
//         "gprice":"${gprice[rdm(5)]}",
//     },
// `;
}

console.log(bb);

