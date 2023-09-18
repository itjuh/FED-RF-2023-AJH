// 온고롱 서브 주문하기 js - order.js

//domFn객체
const domFn = {
    // 요소선택 함수 ////////////
    qs : (x) => document.querySelector(x),
    qsEl : (el,x) => el.querySelector(x),
    qsa : (x) => document.querySelectorAll(x),
    qsaEl : (el,x) => el.querySelectorAll(x),
    // 이벤트 세팅함수 //////////
    addEvt : (ele,evt,fn) => ele.addEventListener(evt,fn),

}; /////////////////domFn////////////////

// 클릭데이터 가져와서 상품 뿌리기
// 클릭대상 : proceed-list li
const category = domFn.qsa('.step-3>ul>li');
// 바꿀대상 : .step-3>ul>li, .step-3>ul :open,on
// 바꿀대상 : .form-box, prod-box :view
const categoryParent = domFn.qs('.step-3>ul');
const formBox = domFn.qs('.form-box');
const prodBox = domFn.qs('.prod-box');
// 이벤트 설정
category.forEach(ele=>{
    domFn.addEvt(ele,'click',cataOpen);
});
// 데이터 가져오기변수
let atxt = '';

// 3. 누른 카테고리 읽기함수
function cataOpen(){
    let clickCode = this.innerHTML;
    if(this.innerHTML !== this.innerText){ //하위메뉴 있는경우
        console.log(clickCode);
        categoryParent.classList.add("open");
        category.forEach(ele=>{
            ele.classList.remove("on");
            ele.classList.remove("open");
        });
        this.classList.add("on");
    }else{ //하위메뉴 없는 경우
        category.forEach(ele=>{
            ele.classList.remove("on");
            ele.classList.remove("open");
        });
        categoryParent.classList.remove("open");
        this.classList.add("on");
        atxt = clickCode;
        formBox.classList.add("view");
        prodBox.classList.add("view");
    }
    console.log(atxt);
    prodCodeMake(atxt);
} ////////cateOpen함수//////////////
// 상품 데이터 뿌리기
// 대상: .list>ol
let itemBox = domFn.qs('.prod-box .list>ol');
// 코드변수
let cateCode = '';
// 3개 제한 변수
let limitCnt = 0;
function prodCodeMake(atxt){
    for(let x in prod_info){ //x는 속성명
        // console.log(prod_info[x]["prod_tag"]);
        // 태그가 일치하면 꺼내온다
        // 태그 저장배열
        let tagList = prod_info[x]["prod_tag"];
        // 태그 확인하기
        if(sameTag(tagList,atxt)){
            limitCnt++;
            // console.log(prod_info[x]);
            cateCode += `
            <li>
            <div class="partbox">
                <div class="img-box">
                    <img src="${prod_info[x]["src"]}" alt="상품이미지1">
                </div>
                <div class="txt-box">
                    <ul>
                        <li class="prod-name">${prod_info[x]["prod_name"]}</li>
                        <li class="prod-price">${prod_info[x]["prod_price"]}</li>
                    </ul>
                </div>
            </div>
            </li>
            `;
            if(limitCnt == 3) break;
        }///////if//////////
    }///////////for in////////////////////

    itemBox.innerHTML = cateCode;
}/////////제품코드 만들기 함수
// console.log(hCode);
// 데이터 검증 함수
function sameTag(arr,txt){
    for(let x in arr){
        // 배열을 돌면서 태그와 일치하면 true return
        if(txt == arr[x])
        return true;
    }
} //////태그 검증 함수 sameTag///////////


// 옵션 데이터 뿌리기

// 1. 대상선정 : 고정옵션/선택옵션
// 클릭대상 정보로 데이터 뿌릴 곳
const optionImg = domFn.qs('.prod');
// 기본구성품
const basic = domFn.qs('.option-basic>dl');
// 선택옵션
const option = domFn.qsa('.option-select>dl');
// 이벤트 대상
const itemList = domFn.qsa('.list>ol>li');
// 코드 저장변수
let selCode = [];
selCode.length = 4;
// 변수초기화
hCode = '';
// 클릭대상 정보 가져오기
// itemBox 안쪽 li 그대로 코드 저장해서 옮기면 됨
// 박스 누르면 올라오기 
// 대상 .prod-option
const prodOptionBox = domFn.qs('.prod-option');
// 이벤트 설정
itemList.forEach(ele=>{
    domFn.addEvt(ele,'click',sendInfo); 
});

// 고정옵션/선택옵션 뿌리기
for(let x in option_list){
    switch(x){
        case "기본구성품 안내":
            hCode +=
            `
            <dt>${x}</dt>
            <dd>${option_list[x]}</dd>
            `;
            break;
        case "보관 안내":
            hCode +=
            `
            <dt>${x}</dt>
            <dd>${option_list[x]}</dd>
            `;
            break;
        case "맛 선택" :
            selCode[0] =
            `
            <dt>${x}</dt>
            <dd>${depth2(option_list[x])}</dd>
            `;
            break;
        case "사이즈" :
            selCode[1] =
            `
            <dt>${x}</dt>
            <dd>${depth2(option_list[x])}</dd>
            `;
            break;
        case "문구" :
            selCode[2] =
            `
            <dt>${x}(0/15)</dt>
            <dd>
                <input id="message"type="text" placeholder="${option_list[x]}">
            </dd>
            `;
            break;
        case "요청사항" :
            selCode[3] =
            `
            <dt>${x}(0/100)</dt>
            <dd>
                <textarea id="request" cols="30" rows="5" placeholder="${option_list[x]}">
                </textarea>
            </dd>
            `;
            break;
    }////////switch case문///////////////
} /////////for in//////////////////
// console.log(selCode);
option.forEach((ele,idx) =>{
    ele.innerHTML = selCode[idx];
});
basic.innerHTML = hCode;

// 함수 만들기
// 1.서서브 코드구성 함수
function depth2(list){
    let depCode = '';
    for(let x in list){
        // console.log(list[x].name);
        depCode += `
        <div class="details ${list[x].img?'flavor':'size-box'}">
            <div class="${list[x].img?'img-box':'container'}">
                ${list[x].img?`<img src="${list[x].img}" alt="${list[x].alt}">`:`<div class="container"><div class="cylinder"></div></div>`}
            </div>
            <div class="txt-box">
                <span>${list[x].name}</span>
                <span>+${list[x].price}</span>
            </div>
        </div>
        `;
    } ////////for in문///////////
    // console.log('depCode',depCode);
    return depCode;
} //////depth2함수////////////////

// 2. 누른 코드값 읽기함수 
function sendInfo(){
    let clickCode = this.innerHTML;
    // 누른 코드 적용
    optionImg.innerHTML = clickCode;
    prodOptionBox.classList.add('view');
}
