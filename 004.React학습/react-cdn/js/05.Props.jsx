// 05. 리맥트 Props

/********************************************************** 
    [ 리액트 Props ]
    1. 리액트 구성요소에 전달되는 인수다!(전달변수,파라미터)
    2. HTML 속성을 통해서 구성요소에 전달된다
    3. props는 속성이다.
    4. JS 함수에 셋팅되는 전달변수와 HTML속성과 동일함
    5. 컴포넌트로 보내기 위해서는 HTML속성과 동일한 구문사용
**********************************************************/

// 자기차를 소개하는 컴포넌트1 ///////////////////////////////
function Car(props){
    // 일반함수에서는 파라미터를 여러개 작성하였으나, 
    // 컴포넌트에서는 전달하는 props하나로 여러개 사용 가능!
    // 사용법 : props.속성명
    // 컴포넌트에서 미리 세부속성명을 정하여 호출하는 곳에서 
    // 같은 이름의 속성으로 값을 담아 보내준다.

    return(
        <React.Fragment>
            <h2>나의 차는 {props.brand}입니다.</h2>
        </React.Fragment>
    ); ////////return
} ////////////Car 컴포넌트 ///////////////////////

// 자동차 상세정보 출력 컴포넌트
function Detail(props){
    return(
        <React.Fragment>
            <h2>모델명은 {props.brand.model}이고 <br />
            차량 색상은 {props.brand.color}입니다.</h2>
            {/* 이미지 출력 */}
            <img src="./images/ray.png" alt="기아레이" 
             style={props.brand.opt} />
            {/* 이미지출력
                인라인 스타일시트 넣기 형식:
                <태그 style={{객체형식}} />
                ->{속성:값}에서 값은 문자형으로 세팅
            */}
        </React.Fragment>
    ); ///////return
} //////////////////Detail 컴포넌트////////////////

// 브랜드별 차를 소개하는 컴포넌트 /////////////////
function Brand(){
    return(
        <React.Fragment>
            <h1>당신의 차는 무슨차죠?</h1>
            <Car brand='기아레이'/>
            {/* 다른 컴포넌트 호출 */}
        </React.Fragment>
    ); ///////return
} ////////////Brand 컴포넌트 ////////////////////

// 추가질문으로 자동차 정보를 자세히 기술하는 컴포넌트
function AskMore(props){ //props.num 배열데이터 순번
    // 다른 컴포넌트에서도 사용할 경우 컴포넌트 바깥쪽 전역구역에 코드를 넣는다
    // 옵션 배열변수 세팅
    const carInfo = [
        {
            color:'라잇블루',
            model:'2023년형',
            opt:{filter:'hue-rotate(0deg)'}
        },
        {
            color:'녹차그린',
            model:'2020년형',
            opt:{filter:'hue-rotate(221deg)'}
        },
        {
            color:'럭셔리 와인',
            model:'2020년형',
            opt:{filter:'hue-rotate(109deg)',transform: 'rotateY(180deg)'}
        },
    ];
    return(
        <React.Fragment>
            <h1>더 자세히 알려주시겠어요?</h1>
            <Detail brand={carInfo[props.num]} />
        </React.Fragment>
        // 파란색{}는 전달변수
        // 노란색{}는 전달변수가 객체형
    );
} ////////// AskMore 컴포넌트 ///////////////////

ReactDOM.render(
    <div>
        <Brand />
        <AskMore num="0" />
        <AskMore num="1" />
        <AskMore num="2" />
    </div>
,document.querySelector('#root1'));