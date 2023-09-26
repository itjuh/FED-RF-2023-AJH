// 배열메서드 js - js4-3.array_method.js

// DOM메서드 호출
import dFn from "./dom.js";

console.log(dFn);

// 0. 기본정보 세팅 ////////////////////////////////
// (1) 배열변수 선언과 할당
const fruit = ["배", "사과", "용과", "딸기"];

// (2) 과일명과 배경이미지명을 매칭함 -> 객체
const frObj = {
  배: "fruits_01",
  사과: "fruits_02",
  용과: "fruits_14",
  딸기: "fruits_09",
  두리안: "fruits_17",
  바나나: "fruits_15",
  수박: "fruits_12",
  파인애플: "fruits_13",
  망고: "fruits_24",
  오렌지: "fruits_03",
  체리: "fruits_05",
  멜론: "fruits_11",
  블루베리: "fruits_20",
  레몬: "fruits_04",
}; ////////// frObj 객체 /////

// 1. 요구사항 :
//     배열에 과일 정보를 담아서 과일주세요 버튼 클릭 시
//    과일 이미지 요소를 화면에 출력해준다.
//    배열 구성을 수정, 삭제 등 배열메서드로 변경 할 수 있게 한다.

// 2. 대상선정 :
// 2-1. 이벤트 대상 : .mbtn(기능버튼)
const mbtn = dFn.qsa(".mbtn");
// 2-2. 변경 대상 : .showit(배열정보출력) .cont(과일출력)
const showIt = dFn.qs(".showit");
const cont = dFn.qs(".cont");
// 2-3. 변경 대상2 : #anum(선택과일콤보박스) #sel(전체과일콤보박스)
const sel = dFn.qs("#sel");
const anum = dFn.qs("#anum");
// 2-4. 수집 대상 : #delnum(지울갯수)
const delNum = dFn.qs('#delnum');
console.log("수집확인", mbtn, showIt, cont, sel, anum, delNum);

// 3-1. 기본 배열변수 출력하기 함수 ///////////////
const showArray = () => (showIt.innerText = fruit.join("🙋‍♀️"));
// 처음배열 출력함수 최초 호출
showArray();

// .join은 전체배열을 사이 구분자를 넣고 문자열을 출력
// 3-2. 전체과일 콤보박스 바인딩
// 대상: #sel / 데이터: frObj {}

// frObj.forEach(ele=>console.log(ele)); 에러남 객체는 이걸로 못 돌림
// // 셀 저장 변수
// let opTag = "";
// for (let x in frObj) {
//   console.log(x); //x는 속성
//   // 내용넣기
//   opTag += `<option>${x}</option>`;
// } //////////for in ///////////////
// 전체과일 콤보박스 바인딩

/* 
[ 객체의 속성(키 값)을 배열 변환 ]
객체형식 -> {키:값}
객체의 키를 배열로 변환하는 Object 객체 메서드: key()

1. 객체의 키를 배열로 : Object.key(객체);
2. 객체의 값을 배열로 : Object.key(객체).map(v=>객체[v]);

static object : Object, Array 
처음에 생성할 때 new 키워드가 필요없음
*/
// 1. 객체의 키를 배열로
sel.innerHTML = Object.keys(frObj).map(val=>`<option>${val}</option>`).join('');
// 2. 객체의 값을 배열로
// console.log(Object.keys(frObj).map(v=>frObj[v]));

// 3-3. 선택과일 콤보박스 바인딩하기
// 대상: #anum / 데이터: fruit []
// 과일주세요 버튼을 누르면 재 바인딩 해야하므로 함수로 만든다.
const bindCombo = ()=>{
    anum.innerHTML = fruit.map((val,idx)=>`<option value='${idx}'>${val}</option>`).join('');
};
// 선택과일 콤보박스 바인딩함수 최초호출
bindCombo();

// 4. 이벤트 설정하기
mbtn.forEach((ele) => {
  dFn.addEvt(ele, "click", showFruit);
});

// 5. 함수만들기///////////////////////
// showFruit : 배열을 조작하여 과일을 화면에 출력
function showFruit() {
  // this - 버튼 자신
  let btxt = this.innerText;
  console.log("나야나", btxt);
  switch (btxt) {
    case "과일주세요~!":
      // 출력박스에 배열 정보로 태그넣기
      // 구조 : ul>li
      // 코드 변수
      let hcode = "<ul>";
      // 과일배열만큼 돌면서 만들기
      fruit.forEach((val) => {
        hcode += `
            <li style="background:url(./addimg/${frObj[val]}.png) no-repeat center/cover">
                ${val}
            </li>
        `;
      });
      hcode += "</ul>";
      // 출력박스에 태그 넣기
      cont.innerHTML = hcode;
      break; //////////과일주세요///////////

    case "뒷배열추가요~!":
      // 변경대상 : fruit 배열
      // 수집대상 : #sel박스 => 값은 value
      fruit.push(sel.value);
      // console.log(fruit);
      break; //////////뒷배열추가///////////

    case "앞배열추가요~!":
      // 변경대상 : fruit 배열
      // 앞 배열 삭제 메서드 unshift()
      fruit.unshift(sel.value);
      break; /////////앞배열추가////////////

    case "뒷배열삭제요~!":
      // 변경대상 : fruit 배열
      // 뒷 배열 삭제 메서드 pop()
      fruit.pop();
      break; ////////뒷배열삭제/////////////

    case "앞배열삭제요~!":
      // 변경대상 : fruit 배열
      // 앞 배열 삭제 메서드 shift()
      fruit.shift();
      break; ////////앞배열삭제////////////

    case "중간배열삭제":
      // splice(잇다, 이어붙이다)
      // 중간배열 삭제 메서드
      // 삭제 시: 
      //  splice(순번) -> 순번부터 뒤를 모두 삭제
      //  splice(순번, 개수) -> 순번부터 개수만큼 삭제
      // 변경대상 : fruit 배열
        fruit.splice(anum.value,delNum.value);
        console.log('지울순번:',anum.value,delNum.value);
      break; /////////중간배열삭제/////////

    case "중간배열삽입":
      // splice(잇다, 이어붙이다)
      // 중간배열 삽입 메서드
      // 삽입 시: 
      //  splice(순번,0,넣을값,넣을값,....)
      // -> 순번뒤에 0을 쓰고 그 뒤에 값을 쓰면 
      // -> 선택 순번 앞으로 배열값이 삽입 됨
      // 변경대상 : fruit 배열
      fruit.splice(anum.value,0,sel.value);
      break; /////////중간배열삽입/////////
  } //////////switch case문///////////////
  // 배열 화면찍기 함수호출
  showArray();
  // 선택배열 콤보박스 바인딩 함수 호출
  bindCombo();
} //////////// showFruit /////////////////
