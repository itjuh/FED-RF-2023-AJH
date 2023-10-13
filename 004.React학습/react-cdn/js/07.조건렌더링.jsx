// 07.리액트 : 조건렌더링 + 리스트렌더링

/*****************************************
1. if문을 사용하여 조건부 렌더링하기
- 리액트에서는 조건부로 구성요소를 랜더링 할 수 있다.
*****************************************/

// 선택적으로 로딩하도록 컴포넌트를 2개 만들기

// 1번 컴포넌트
function MakeDeveloper(){
    return<h1>나는 개발자야</h1>;
} ////////////MakeDev 컴포넌트 ///////////////

// 2번 컴포넌트
function LostDeveloper(){
    return<h1>개발자가 뭐지?</h1>;
} ////////////LostDeveloper 컴포넌트 ///////////////

// 3번 컴포넌트
function MakeImg(props){
    return<img
        src={props.isrc}
        alt={props.ialt}
        title={props.itit}/>;
} ///////////MakeImg 컴포넌트////////////////

// 셋팅할 변수 : isDev, isrc, ialt, itit

// 출력 메인 컴포넌트
function Developer(props){
    const isNow = props.isDev; // true/false 

    // 조건문
    if(isNow){
        return(
            <React.Fragment>
                {/* MakeDeveloper컴포넌트 선택적 출력하기 */}
                <MakeDeveloper />
                <MakeImg 
                    isrc={props.isrc}
                    ialt={props.ialt}
                    itit={props.itit}/>
            </React.Fragment>
        )
    } ////////////if/////////////

    //if문 걸리면 위에서 return되고 나감
    //else 없어도 됨
    return(
        <React.Fragment>
            {/* MakeDeveloper컴포넌트 선택적 출력하기 */}
            <LostDeveloper />
            <MakeImg 
                isrc={props.isrc}
                ialt={props.ialt}
                itit={props.itit}/>
        </React.Fragment>
    )
} //////////developer 컴포넌트 /////////////////

// 이미지경로 배열
const devImg = [
    "https://cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/HYAONH6EGJBKIU5CJWWF343MKE.jpg",
    "https://img3.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202208/24/BoiledMovie/20220824133926904mopw.png"
];

// 컴포넌트 호출하기 : 개발자 찍기
ReactDOM.render(
<Developer 
    isDev={true} 
    isrc={devImg[0]} 
    itit='프론트엔드 개발자 공유입니다'
    ialt='개발자 공유'/>
    ,document.querySelector('#root1'));
// 컴포넌트 호출하기 : 비 개발자 찍기
ReactDOM.render(
<Developer 
    isDev={false} 
    isrc={devImg[1]} 
    itit='개발자가 뭡니까?'
    ialt='주먹왕 마동석'/>
    ,document.querySelector('#root2'));

/********************************************** 
    2. if문이 아닌 조건 표현하기
    -> 조건식 && JSX표현식
    조건이 true일때만 && 뒤의 JSX표현식이 출력됨!
**********************************************/
// 개발자들 취향을 알아보자

// 2-1. 제목을 찍기 위한 타이틀 컴포넌트
function Title(props){ // 컴포넌트 호출 시 tit를 셋팅함
    return <h1>👨‍🔧개발자👩‍🔧가 좋아하는 {props.tit}</h1>;
} /////////// Title 컴포넌트 ///////////////

// 음식리스트
const foods = ["스파게티🍝","짜파게티🍜","냉면🍲","짜장면🥡","마라탕🥘"];
// const foods = [];
// 2-2. 반복리스트를 위한 컴포넌트
function FoodList(props){   // 음식명은 fname에 담아서 전달~
    return <li>개발자는 {props.fname} 좋아해!</li>;
} /////////// FoodList 컴포넌트 /////////////

// 2-3. 개발자 음식 출력 컴포넌트
function DevWishList(props){ //wlist 속성에 담에서 보내준다
    //위시 리스트 담기
    const myFood = props.wlist;
    //코드리턴
    return(
        <React.Fragment>
            <Title tit="음식" />
            {/* 음식 위시리스트의 길이가 0보다 클때만 출력 */}
            {
                myFood.length > 0 &&
                <div>
                    <h2>개발자가 좋아하는 음식은 모두 {myFood.length}가지 입니다.</h2>
                    <ul>
                        <li>
                            {
                                //배열변수.map() 메서드 사용
                                //map(v=>바로 리턴 컴포넌트)
                                //리액트 map()은 JS map()과 달리 join()필요없음
                                myFood.map(x=><FoodList fname={x} />)
                            }
                        </li>
                    </ul>
                </div>
            }
            {/* 음식 위시리스트가 없는 경우
                다른 경우의 출력은 별도의 JSX 출력 중괄호 구역에 코딩한다! */}
            {
                myFood.length == 0 &&
                <h2>아직 좋아하는 음식 리스트가 업데이트 되지 않았습니다.😥😥</h2>
            }
        </React.Fragment>
    );
} /////// developerWishList 컴포넌트 //////////

// 컴포넌트 출력하기
ReactDOM.render(<DevWishList wlist={foods} />,document.querySelector('#root3'));