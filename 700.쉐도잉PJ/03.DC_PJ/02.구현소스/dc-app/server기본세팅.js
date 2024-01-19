// server.js 파일은 express서버에서 구동을 위한 기본설정을 읽는 파일

// express 기본 모듈 import 
const express = require('express');
// 서버 경로를 위한 import
const path = require('path');
// 서버 역할을 위한 express 생성자 메서드 호출
const app = express();

// 기본 포트 연결하기
app.listen(8080, function(){
    console.log('8080포트로 연결 됨!');
});

// 서버 루트폴더 정적연결하기(루트 정하기)
app.use(express.static(path.join(__dirname,'/build')));
// app.use(express.static(path.join('디렉토리명','루트경로')));
// -> SPA에서 빌드하면 배포용 소스가 build폴더에 생성되므로
// 이 배포용 폴더를 루트로 잡으면 편하다!
// ->> SPA 앱 빌드시 유의사항 ************
// package.json파일에
// home:'http://localhost:8080'를 등록하여 사용함!!!!
// localhost === 127.0.0.1

// 첫 페이지 설정하기 -> url로 쳐서 들어가는 경로를 설정하기
// ->get방식으로 연결하기 때문에 get()메서드 사용!!
// app.get('첫페이지 루트경로',function(요청,응답){});
app.get('/',function(request,response){
    // 내부 전달값은 처음이 요청, 두번째가 응답
    // 첫 페이지는 요청에 대한 응답임!!
    // 서버입장에서는 파일을 내려보내야 브라우저에서 다운받음. 그래서 sendFile()메서드 사용
    // sendFile(path.join('디렉토리명','첫페이지루트'));
    response.sendFile(path.join(__dirname,'/build/index.html'));
});