// JS9-3.로컬스토리지JS - js9-3.local_storage.js

//DOM메서드
import dFn from "./dom.js";

// console.log(dFn);

/*************************************************************** 
    [ JS 로컬스토리지 : localStorage ]
    - window하위객체 window.localStorage
    -> window는 주로 생략함!
    -> 개발자 모드 'Application'탭에서 확인 가능

    1. 정의 : 
        브라우저별 로컬 어플리케이션 영역에 저장되는 스트링데이터 저장소(JS API)
    2. 유지 : 같은 PC, 같은 브라우저(재설치없이사용) 일 경우 계속유지됨
        (단, 같은파일일 지라도 여는 경로에 따라 같은 변수도 따로 관리된다! 
            - 기준이 도메인경로/주소)
    3. 특징 : 모드 데이터는 키,값 쌍으로 구성
             데이터값은 반드시 문자형으로 사용됨
    4. 응용 : 데이터로 배열/객체를 사용할 경우 문자형 변환하여 넣고 다시 객체형으로 파싱하여 사용한다!
        (1) 입력시 : JSON.stringify(배열/객체)
        (2) 사용시 : JSON.parse(문자형배열/객체)
        -> JS의 제이슨 데이터 파싱 메서드 : 
            JSON.parse()
        -> JS의 제이슨 형식 데이터를 문자열로 변환하는 메서드:   
            JSON.stringify()
    5. 사용메서드 : 
        (1) 값설정 : setItem(키명,값)
        (2) 값읽기 : getItem(키명)
        (3) 전체지우기 : clear()
        (4) 키번호읽기 : key(순번) -> 0부터 (키이름리턴)
        (5) 개별항목삭제 : removeItem(키명)
        (6) 개수 : length

    [ JS 세션 스토리지 : sessionStorage ]
    -> 로컬스토리지와 세션스토리지의 메서드는 동일함!
    -> 로컬스토리지와 차이점은?
    -> 브라우저가 닫히면 데이터가 사라진다!
    (로컬세션의 개념은 서버세션과 달리 하나의 브라우저탭을
    단위로 한다!)
    -> 서버세션은 접속된 로그인정보세션을 서버에서 관리하는 단위임

    [ JS 로컬 스토리지 / 세션 스토리지 장단점 ]
    (1) 장점: 간단한 프론트엔드 데이터를 DB없이 테스트해보는데 탁월함
    (2) 단점: 데이터의 지속 보장이 없다!
        (그나마 로컬 스토리지는 브라우저 경로가 같고 PC가 같고
        브라우저종류가 같다면 지우기 전까지는 데이터를 유지한다!)


    -> w3 schools 참고
    https://www.w3schools.com/js/js_api_web_storage.asp
***************************************************************/

// [ 1. 로컬 스토리지 연습 ] //////////////////////////////////
// 1. 버튼 기능 이벤트 대상 : .local-box button
const btnLocal = dFn.qsa(".local-box button");
// console.log(btnLocal);
// 2. 버튼의 이벤트 설정
// 2-1. 로컬스토리지 처리 버튼이벤트
btnLocal.forEach((ele) => dFn.addEvt(ele, "click", localSFn));
// 2-2. 개별 로컬 스토리지 삭제 이벤트 설정하기
// 로컬스토리지 키명
const keyName = ["lname", "lrole", "lcat"];
dFn.qsa(".local li").forEach((ele, idx) => {
  ele.onclick = function () {
    localStorage.removeItem(keyName[idx]);
  };
}); ///////////li 클릭 설정 /////////////////
// 3. 함수만들기
function localSFn() {
  // 3-1. 버튼 글자 읽기
  let btxt = this.innerText;
  // console.log('로칼쓰~~',btxt);
  // 3-2. 버튼 별 기능 분기하기
  if (btxt == "처음") {
    // 로컬 스토리지 읽기 : localStorage.getItem(키);
    // 초기값 : null
    // 로컬 스토리지 세팅하기 : localStorage.setItem(키,값);
    localStorage.setItem("lname", "이정재");
    localStorage.setItem("lrole", "박평호역");
    localStorage.setItem("lcat", "조직내 스파이를 색출하는 해외 안기부팀장");

    // 로컬 스토리지.key(순번) -> 키를 return
    console.log("두번째(1) 키는?", localStorage.key(1), "\n전체개수", localStorage.length);

    // console.log("로컬쓰 lname", localStorage.getItem("lname"));
    // console.log("로컬쓰 lrole", localStorage.getItem("lrole"));
    // console.log("로컬쓰 lcat", localStorage.getItem("lcat"));
  } ///////btxt 처음 ////////////
  else if (btxt == "보여줘") {
    dFn.qs(".local .nm").innerText = localStorage.getItem("lname");
    dFn.qs(".local .role").innerText = localStorage.getItem("lrole");
    dFn.qs(".local .cat").innerText = localStorage.getItem("lcat");
  } ///////btxt 보여줘 ////////////
  else if (btxt == "전체삭제") {
    // 개별삭제 : localStorage.removeItem(키);
    // 1. 해당 url로 관리되는 로컬쓰를 모두 지움 : clear();
    localStorage.clear();
    // 2. 업데이트 된 데이터 반영하기
    // 2-1. 리스트에 반영하기
    bindData();
    // 2-2. 수정,선택박스 업데이트
    bindMod();
  } ///////btxt 전체삭제 ////////////
  else if (btxt == "처리") {
    // 1. 객체를 생성하여 로컬스토리지에 넣기!
    // minfo가 없거나 빈 배열이면 makeObj호출
    if (JSON.parse(localStorage.getItem("minfo")).length==0) makeObj();
    // 2. 업데이트 된 데이터 반영하기
    // 2-1. 리스트에 반영하기
    bindData();
    // 2-2. 수정,선택박스 업데이트
    bindMod();
  } ///////btxt 처리 ////////////
  else if (btxt == "업데이트") {
  } ///////btxt 업데이트 ////////////
} //////////localSFn함수/////////////////

// 처음에 바인딩 함수 호출하여 게시판 보이기
bindData();

// 객체가 없으면 로컬스토리지에 생성하기
function makeObj() {
  console.log("배열/객체 만들기!");
  // 게시판 형식의 객체 생성
  let obj = [
    {
      idx: 0,
      tit: "내가 왕이 될 상인가?",
      cont: "이정재형은 진정 왕이십니다!!",
    },
  ];
  // 로컬스토리지에 배열객체 넣기
  // 배열/객체를 넣으면 데이터형 문자값만 입력, 실제객체 전달 안됨
  localStorage.setItem("minfo", obj); //[object Object]
  // 로컬스토리지는 문자형만 받으니까 배열객체를 문자데이터화 해서 넣는다!
  // JSON.stringify(배열||객체);
  localStorage.setItem("minfo", JSON.stringify(obj)); //[object Object]
} //////////// makeObj 함수 ////////////////////

// 화면에 게시판 리스트를 데이터에 맞게 바인딩하기 /////////////
function bindData() {
  // 1. 로컬 스토리지 데이터 : string 데이터타입
  let localData = localStorage.getItem("minfo");
  // console.log(typeof localData); //문자형임

  // 바인딩 데이터 변수
  let bindCode = "";

  // 2. 데이터 존재여부 확인하기
  if (localData) {
    // 문자형을 배열로 형변환 -> JSON.parse()
    localData = JSON.parse(localData); //배열됨
    // console.log(Array.isArray(localData)); //배열형임
    // 배열이니까 map()사용하여 태그 만들기
    bindCode = localData
      .map(
        (v, i) => `
    <tr>
        <td>${v.idx}</td>
        <td>${v.tit}</td>
        <td>${v.cont}</td>
        <td class='del-link'>
          <a href="#" data-idx=${i}>×</a>
        </td>
    </tr>
    `
      )
      .join(""); // 맵조인
  } else {
    bindCode = `
    <tr>
        <td colspan ='4' style='text-align:center;'>데이터가 없습니다.</td>
    </tr>
    `;
  }
  // 3. 화면에 데이터 요소 바인딩 구성
  let hcode = `
        <table>
            <tr>
                <th>번호</th>
                <th>제목</th>
                <th>내용</th>
                <th>삭제</th>
            </tr>
            <!-- 데이터에 따른 반복바인딩 구간 -->
            ${bindCode}
        </table>
    `;

  // 4. 화면출력
  const board = dFn.qs(".board");
  board.innerHTML = hcode;

  // 5. 화면출력 후 지우기 링크 세팅하기
  dFn.qsa(".del-link a").forEach((ele) => {
    dFn.addEvt(ele, "click", () => delRec(ele.getAttribute("data-idx")));
  });
} /////////////// bindData //////////////

//// 입력 처리함수 호출 이벤트 설정하기
dFn.addEvt(dFn.qs("#sbtn"), "click", insData);

// 입력 처리함수 ////////////////////
function insData() {
  // 1. 데이터 읽어오기
  let titData = dFn.qs("#tit").value.trim();
  let contData = dFn.qs("#cont").value.trim();

  // 2. 빈칸처리(trim() 앞뒤공백제거)
  if (titData == "" || contData == "") {
    let msg = "";
    if (titData == "" && contData == "") msg = `제목과 내용을 모두 입력하세요!`;
    else if (contData == "") msg = `내용을 입력하세요!`;
    else msg = `제목을 입력하세요!`;
    alert(msg);
    return;
  } /////////////if///////////////////
  // console.log('입력누름!',titData,contData);
  // 3. 입력처리하기
  // 3-1. 로컬스 데이터 가져오기
  let originData = localStorage.getItem("minfo");
  // 만약 로컬스가 null이면 빈 배열로 생성하기
  if (!originData) {
    localStorage.setItem("minfo", "[]");
    //초기 할당
    originData = localStorage.getItem("minfo");
  }
  // 3-2. 제이슨 파싱
  originData = JSON.parse(originData);
  // 3-3. 자동 증가번호 처리하기
  // 배열을 오름차순으로 정렬하여 맨 끝 배열데이터의 idx를 증가
  let seq = 0;
  if (originData.length != 0) {
    originData.sort((a, b) => {
      return a.idx == b.idx ? 0 : a.idx > b.idx ? 1 : -1;
    });
    // console.log(originData);
    // 마지막 배열 idx 읽어오기
    seq = originData[originData.length - 1].idx;
  }
  // 3-4. 입력 된 데이터 추가하기 : 배열 push() 메서드
  originData.push({
    idx: seq + 1,
    tit: titData,
    cont: contData,
  });
  // 3-4. push된 배열/객체 데이터 문자화하여 로컬스에 넣기
  localStorage.setItem("minfo", JSON.stringify(originData));

  // 4. 업데이트 된 데이터 반영하기
  // 4-1. 리스트에 반영하기
  bindData();
  // 4-2. 수정,선택박스 업데이트
  bindMod();
  console.log(originData);
} /////////// insData함수 ///////////////

/// 삭제 처리함수 /////////////////////
function delRec(idx) {
  console.log("지울순번:", idx);
  // a태그 기본이동 막기
  event.preventDefault();
  // 1-1. 로컬스 데이터 가져오기
  let originData = localStorage.getItem("minfo");
  // 1-2. 제이슨 파싱
  originData = JSON.parse(originData);
  // 2. 특정데이터 배열항목 삭제
  // splice(순번,개수):순번부터 개수만큼지우기 / splice(0):전체삭제
  // 2-1. 삭제 전 최종확인
  // confirm(메세지) 확인:true 취소:false
  if (confirm(`정말 글을 삭제하시겠습니까?`)) {
    // 2-2. 배열삭제
    originData.splice(idx, 1);
    console.log("제거 후 배열:", originData);
    // 2-3. push된 배열/객체 데이터 문자화하여 로컬스에 넣기
    localStorage.setItem("minfo", JSON.stringify(originData));
    // 3. 업데이트 된 데이터 반영하기
    // 3-1. 리스트에 반영하기
    bindData();
    // 3-2. 수정,선택박스 업데이트
    bindMod();
  } ////////// if 지우기 확인//////////////
} ////////// delRec함수 //////////////////

///////////////////////////////////////////////////////
// 데이터 수정하여 반영하기 /////////////////////////////
///////////////////////////////////////////////////////
// 1. 대상선정 
// 1-1. 선택박스 : #sel
const modSel = dFn.qs("#sel");
// 1-2. 제목 입력박스 : #tit2
const modTit = dFn.qs('.mobx #tit2');
// 1-3. 내용 입력박스 : #cont2
const modCont = dFn.qs('.mobx #cont2');
// 1-4. 수정버튼 : #mbtn
const moBtn = dFn.qs('#mbtn');

// 2. 선택박스에 데이터 바인딩하기
// 데이터가 바뀔 때 마다 바뀌어야하므로 함수화!
function bindMod() {
  // 1-1. 로컬스 데이터 가져오기
  let originData = localStorage.getItem("minfo");
  // 만약 로컬스가 null이면 빈 배열로 생성하기
  if (!originData) {
    localStorage.setItem("minfo", "[]");
    //초기 할당
    originData = localStorage.getItem("minfo");
  }
  // 1-2. 제이슨 파싱
  originData = JSON.parse(originData);

  // 2. 선택박스 초기화 : 새로 업데이트 될 때마다 초기화하고 뿌림
  modSel.innerHTML = `<option value="show" disabled selected hidden>항목선택</option>`;
  // 3. idx로 value값,제목으로 항목명 만들기
  originData.forEach((val) => {
    modSel.innerHTML += `
      <option value='${val.idx}'>${val.tit}</option>
    `;
  });
} ///////////bindMod 함수 /////////////
// 최초호출!
bindMod();

// 3. 선택박스 이벤트 설정
dFn.addEvt(modSel,'change',setMod);

// 4. 수정데이터 수정모드에 세팅하기 ////////////
function setMod(){
  // 0. 선택값 변수에 담기
  let optionVal = this.value;
  // 만약 수정 선택박스의 값이 show이면 돌아가!
  // if(optionVal=='show') return; //disabled 해놔서 안전함

  // console.log('수정셋업:',optionVal);
  // 1. 해당 idx의 값을 가지는 배열값을 선택
  // 1-1. 로컬스 데이터 가져오기
  let originData = localStorage.getItem("minfo");
  // 만약 로컬스가 null이면 빈 배열로 생성하기
  if (!originData) {
    localStorage.setItem("minfo", "[]");
    //초기 할당
    originData = localStorage.getItem("minfo");
  } ////////if/////////
  // 1-2. 제이슨 파싱
  originData = JSON.parse(originData);

  // 1-3. 해당 아이디에 배열값 찾기 : find()
  /* 
    let 변수 = 배열.fide(v=>{
      if(v.속성명==키) return true;
    });
  */
  let selRec = originData.find(v=>{
    if(v.idx == optionVal) return true;
  }); ////// find////////
  console.log(selRec);
  // 2. 선택배열값으로 제목 내용 넣기
  modTit.value = selRec.tit;
  modCont.value = selRec.cont;
} ///////// setMod 함수 //////////////

// 5. 수정버튼 클릭 이벤트 설정하기 ////////////
dFn.addEvt(moBtn,'click',modifyData);

// 6. 수정내용 반영 함수만들기 ////////////////
function modifyData(){
  // console.log('수정하러가자',modSel.value);
  
  // 만약 수정 선택박스의 값이 show이면 돌아가!
  if(modSel.value=='show') return;
  // 빈칸처리(trim() 앞뒤공백제거)
  let titData = modTit.value.trim();
  let contData = modCont.value.trim();
  if (titData == "" || contData == "") {
    let msg = "";
    if (titData == "" && contData == "") msg = `제목과 내용을 모두 입력하세요!`;
    else if (contData == "") msg = `내용을 입력하세요!`;
    else msg = `제목을 입력하세요!`;
    alert(msg);
    return;
  } /////////////if///////////////////
  
  // 1. 현재 선택 된 배열의 기본키인 idx 선택
  let selectedIdx = modSel.value;

  // 1-1. 로컬스 데이터 가져오기
  let originData = localStorage.getItem("minfo");
  // 1-2. 제이슨 파싱
  originData = JSON.parse(originData);

  // 2. 배열의 idx값을 찾아서 데이터 업데이트하기
  originData.find(v=>{
    // 배열의 idx값이 selectedIdx와 같으면
    if(v.idx == selectedIdx){
      // 선택 배열값인 객체의 제목과 내용을 다시 넣고 업데이트하기
      v.tit = titData;
      v.cont = contData;
    } /////////if ////////////
  }); /////////find///////////
  console.log(originData);
  
  // 3. push된 배열/객체 데이터 문자화하여 로컬스에 넣기
  localStorage.setItem("minfo", JSON.stringify(originData));

  // 4. 업데이트 된 데이터 반영하기
  // 4-1. 리스트에 반영하기
  bindData();
  // 4-2. 수정,선택박스 업데이트
  bindMod();
  
} ////////// modifyData함수 ////////////////


// ***************************************************************
// [ 2. 세션 스토리지 연습 ] //////////////////////////////////
// 1. 버튼 기능 이벤트 대상 : .session-box button
const btnSession = dFn.qsa(".session-box button");
// console.log(btnSession);
// 2. 버튼의 이벤트 설정
// 2-1. 세션스토리지 처리 버튼이벤트
btnSession.forEach((ele) => dFn.addEvt(ele, "click", sessionFn));
// 2-2. 개별 세션 스토리지 삭제 이벤트 설정하기
dFn.qsa(".session li").forEach((ele, idx) => {
  ele.onclick = function () {
    sessionStorage.removeItem(keyName[idx]);
  };
}); ///////////li 클릭 설정 /////////////////
// 3. 함수만들기
function sessionFn() {
  // 3-1. 버튼 글자 읽기
  let btxt = this.innerText;
  console.log("세션~~", btxt);
  // 3-2. 버튼 별 기능 분기하기
  if (btxt == "처음") {
    // 세션 스토리지 읽기 : sessionStorage.getItem(키);
    // 초기값 : null
    // 세션 스토리지 세팅하기 : sessionStorage.setItem(키,값);
    sessionStorage.setItem("lname", "정우성");
    sessionStorage.setItem("lrole", "김정도역");
    sessionStorage.setItem("lcat", "국내팀 안기부팀장, 박평호와 사이가 나쁨");
    console.log("세션쓰 lname", sessionStorage.getItem("lname"));
    console.log("세션쓰 lrole", sessionStorage.getItem("lrole"));
    console.log("세션쓰 lcat", sessionStorage.getItem("lcat"));
  } ///////btxt 처음 ////////////
  else if (btxt == "보여줘") {
    dFn.qs(".session .nm").innerText = sessionStorage.getItem("lname");
    dFn.qs(".session .role").innerText = sessionStorage.getItem("lrole");
    dFn.qs(".session .cat").innerText = sessionStorage.getItem("lcat");
  } ///////btxt 보여줘 ////////////
  else if (btxt == "전체삭제") {
    // 개별삭제 : sessionStorage.removeItem(키);
    // 해당 url로 관리되는 세션쓰를 모두 지움 : clear();
    sessionStorage.clear();
  } ///////btxt 전체삭제 ////////////
} //////////sessionFn함수/////////////////
