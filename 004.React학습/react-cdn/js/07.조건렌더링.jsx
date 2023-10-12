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