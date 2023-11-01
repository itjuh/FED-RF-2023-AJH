// 메인 컴포넌트  - 02.산너머산 JSX

// 산 정보 데이터 불러오기
import { mtInfo } from './02.sub_com/mountain.js';

// 컨텍스트 불러오기
import { 누구냐 } from './02.sub_com/cont_provider.jsx';
// console.log(mtInfo);
// 서브 컴포넌트 불러오기
import 이야기 from './02.sub_com/sub_com.jsx';

/*
    1. props로 데이터를 정리하면

*/

// 메인 컴포넌트
function MyHome(){
    return <MyRoom aa='🌄🗻🌋🏔세계의 산' bb='🏔🌋🗻🌄'/>
} ////////// MyHome 컴포넌트 //////////////////

// 일반적으로 props down할 때 props변수 하나를 써서 넣으면 객체로 받고 꺼낸다.
// {} 중괄호구역(리액트 코드구역)을 쓰면 변수명을 개수만큼 직접 사용 가능하다.
// {aa,bb} 따로따로 받아온다
function MyRoom({aa,bb}){
    return <MyBag cc={aa} dd={bb}/>
} ////////// MyRoom 컴포넌트 //////////////////

function MyBag({cc,dd}){
    return <MyCase ee={cc} ff={dd} />
} ////////// MyBag 컴포넌트 //////////////////

function MyCase({ee,ff}){
    return <MyEnd gg={ee} hh={ff} />
} ////////// MyCase 컴포넌트 //////////////////

function MyEnd({gg,hh}){
    return <div style={{
        padding: '20px', 
        borderRadius: '10px', 
        width: '60%', 
        margin: '20px auto',
        textAlign: 'center',
        fontSize: '40px',
        color:'#fff',
        backgroundImage: 'linear-gradient(to bottom, skyblue, navy)'    
    }}>{ gg + hh }</div>
} ////////// MyEnd 컴포넌트 //////////////////


ReactDOM.render(<MyHome />,document.querySelector('#root1'));


function 큰집(){
    // 데이터 전달 : 산 정보를 할당
    const myData = mtInfo;
    console.log(myData);
    // 상태정보 useState를 사용하여 후크기능 사용
    // 데이터가 업데이트 되면 그것을 사용하는 컴포넌트도 업데이트 된다
    // 산 이름을 상태변수 후크로 설정한다.
    const [myVal, setMyVal] = React.useState('백두산');

    // 상태변수를 업데이트 하는 함수를 생성
    const changeMyVal = (val) => {
        setMyVal(val);
        console.log('업데이트 됨 val : ',val);
    }; ///////////changeMyVal 함수////////////////////

    // provider(공급자) 의 value속성명은 정해진 것!
    // 여기에 할당하여 메인 컴포넌트의 변수를 공유한다!
    return(
        <누구냐.Provider value={{myVal,changeMyVal,myData}}>
            <할아버지 />
        
        </누구냐.Provider>
    );
}

function 할아버지(){
    return(<아버지 />);
}
function 아버지(){
    return(<아들 />);
}
function 아들(){
    return(<손녀 />);
}
function 손녀(){
    return(<이야기 />);
}

/// 산 정보 내용 출력하기 /////////
ReactDOM.render(<큰집 />,document.querySelector('#root2'));
