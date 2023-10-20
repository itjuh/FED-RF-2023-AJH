// 데이터 유형에 맞게 만들기 ////////////

// let category = ["man","woman",'kids']
// let gname = ['반스캐쥬얼','반스어얼리','반스뉴진스','올드반스'];
// let gprice = ['49000','59000','69000','79000','89000'];

// [여성의류 데이터 생성]
let category = ["modern","casual"];
let gname = ["워닝드레스","워스비버든","코코샤스넬라","포코로와드"];
let gprice = ["123000","224000","253000","340000","520000"];


// rdm[아이템개수]
let rdm = (x) => Math.floor(Math.random()*x);
let bb = '';
for(let x=0;x<19;x++){

bb += `
    {
        "idx":"${x}",
        "gname":"${gname[rdm(4)]}",
        "category":"${category[rdm(3)]}",
        "gprice":"${gprice[rdm(5)]}",
    },
`;
}

console.log(bb);

