// JS4-6.배열의 복사검증
const arrData = [
    
    {
        "idx" : "1",
        "tit" : "This is a Title1",
        "cont" : "I wanna talk to you now1",
        "att" : "",
        "date" : "2023-06-01",
        "writer" : "admin",
        "pwd" : "1111",
        "cnt" : "1"
    },

    {
        "idx" : "2",
        "tit" : "This is a Title2",
        "cont" : "I wanna talk to you now2",
        "att" : "",
        "date" : "2023-06-01",
        "writer" : "admin",
        "pwd" : "1111",
        "cnt" : "1"
    },

    {
        "idx" : "3",
        "tit" : "This is a Title3",
        "cont" : "I wanna talk to you now3",
        "att" : "",
        "date" : "2023-06-01",
        "writer" : "admin",
        "pwd" : "1111",
        "cnt" : "1"
    },

    {
        "idx" : "4",
        "tit" : "This is a Title4",
        "cont" : "I wanna talk to you now4",
        "att" : "",
        "date" : "2023-06-01",
        "writer" : "admin",
        "pwd" : "1111",
        "cnt" : "1"
    },

    {
        "idx" : "5",
        "tit" : "This is a Title5",
        "cont" : "I wanna talk to you now5",
        "att" : "",
        "date" : "2023-06-01",
        "writer" : "admin",
        "pwd" : "1111",
        "cnt" : "1"
    },
];

// 변수에 데이터 얕은 복사(주소 복사)
// const copyData = arrData;
// 변수에 데이터 깊은 복사(값 복사)
const copyData = JSON.parse(JSON.stringify(arrData));

// 카피본 데이터 변경
copyData.some(v=>{
    // idx가 '3'인 항목의 타이틀 변경하기
    if(Number(v.idx) === 3){
        v.tit = '저두 감사합니당~';
        return true;
    } //////// if /////////
}); ///////some //////////

// 카피본 정렬변경 내림차순변경
copyData.sort((x, y) => {
    return Number(x.idx) ==Number( y.idx) ? 0 : Number(x.idx) > Number(y.idx) ? -1 : 1;
});

// 원본과 카피본 확인하기
console.log('원본',arrData,'\n카피본',copyData);

