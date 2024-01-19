// server.js 파일은 express서버에서 구동을 위한 기본설정을 읽는 파일
// multer추가 version

// express 기본 모듈 import
const express = require("express");
// 서버 경로를 위한 import
const path = require("path");
// 서버 역할을 위한 express 생성자 메서드 호출
const app = express();

// 멀터 미들웨어를 불러온다 > 왜? 파일전송 처리를 위해!!
const multer = require("multer");

// 멀터를 이용하여 업로드 셋업하기 (생성자 메서드 호출)
// multer()에 업로드 할 폴더위치를 정해준다.
// dest속성에 값으로 세팅(폴더가 없으면 만들어 줌)=>나중에는 만들어주지 않음
// 커스터마이징 없이 기본 dest로 업로드 위치를 세팅하면 폴더를 자동으로 만들어 줌
// 기본 경로만 사용한 방식 :
// const upload = multer({ dest: "build/uploads/" });

// 그...러...나.... 파일명이 겹쳐지므로 이것을 커스터마이징 하여 변경하게 되면!! 
// 자동으로 폴더를 생성해주지 않아 우리가 uploads라는 폴더를 생성해주어야 한다.
// -> 배포 시 이 폴더가 생기도록 SPA개발 폴더 public아래에 uploads 폴더를 만들어준다.
// 파일명을 내가 원하는 원래 이름으로 들어가도록 변경한다.
// 멀터 스토리지의 저장소를 사용함!
const storage = multer.diskStorage({
    // 폴더경로 설정(dest설정은 지워준다.)
    destination: function(req,file,setPath){
        // 콜백함수에 변수 넘김 setPath('에러시','저장물리경로');
        setPath(null,"build/uploads/");
        // 여기에 파일을 지정하면 자동으로 업로드 파일이 생성되지 않음
    },
    // 파일명이 원래 이름으로 들어가도록 변경하기
    filename: function(req,file,setName){
        // 콜백함수에 변수넘김 setName('에러시','저장이름');
        setName(null,file.originalname);
        // 내부 전달 2번째 값에 파일정보가 들어오고
        // originalname속성은 파일명+확장자가 들어가있다.
    }
});
// 파일명을 변경한 방식 :
// 변경 된 정보가 반영되도록 스토리지를 담기
// storage property에 변수 storage담기 
// const upload = multer({ storage: storage });
const upload = multer({ storage: storage });

// 파일 업로드는 POST방식으로 진행함!
// ->>첫 항목은 루트 아래에 있는 업로드 관련 post전송을 선택하는 것. /upload는 폴더명이 아니고 작업명임
// ->>두번째 항목은 전송 종류를 설정. 파일전송은 'file'
// ->>세번째 항목은 내부 전달변수인 요청,응답에 대한 함수
app.post("/upload", upload.single("file"), (req, res) => {
  console.log(req.file);
});

// 기본 포트 연결하기
app.listen(8080, function () {
  console.log("8080포트로 연결 됨!");
});

// 서버 루트폴더 정적연결하기(루트 정하기)
app.use(express.static(path.join(__dirname, "/build")));
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
app.get("/", function (request, response) {
  // 내부 전달값은 처음이 요청, 두번째가 응답
  // 첫 페이지는 요청에 대한 응답임!!
  // 서버입장에서는 파일을 내려보내야 브라우저에서 다운받음. 그래서 sendFile()메서드 사용
  // sendFile(path.join('디렉토리명','첫페이지루트'));
  response.sendFile(path.join(__dirname, "/build/index.html"));
});
