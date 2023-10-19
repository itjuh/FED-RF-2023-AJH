// 01.공유신발 JSX
import myData from './data.js';


// 메인컴포넌트 ///////////////////////
// 메인의 의미는? - 다른구성요소 컴포넌트들을 모아서 최종적으로 랜더링하는 구성 컴포넌트
function MainComponent(){
    
    return(
        <React.Fragment>
            {/* 1. 타이틀 */}
            <h1 className='tit'>공유가 신고 다닌다는!</h1>
            {/* 2. 내용박스 */}
            <section>
                {/* 2-1. 서브타이틀 */}
                <h2>공유는 오늘도 멋집니다.</h2>
                {/* 2-2. 이미지 */}
                <img src='./images/vans/gongyoo.jpg' alt='앉아있는 공유' />
            </section>
            {/* 3. 상품리스트 박스 */}
                <div className="gwrap">
                <GoodsComponent />
                </div>
        </React.Fragment>
    );

} //////////// MainComponent 컴포넌트 ////////////////////
// console.log(myData);

// 상품 html 코드구성 컴포넌트 ///////////////////////
function GoodsComponent(){
    
    return myData.map(v=>(
            <ol class="glist">
                <li>
                    <img src={"./images/vans/vans_"+v.idx+".jpg"} alt="신발" />
                </li>
                <li>{v.gname}</li>
                <li>가격: {v.gprice}원</li>
            </ol>
    ));

} //////////// GoodsComponent 컴포넌트 ////////////////////

// 메인컴포넌트 출력하기
ReactDOM.render(<MainComponent />,document.querySelector('#root'));