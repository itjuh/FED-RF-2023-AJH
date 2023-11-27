// Pliot PJ 신상품 컴포넌트

export function NewProdList(props) {
  // props.cat 카테고리 분류명
  const makeList = () =>{
    let temp = [];
    for(let i=0;i<9;i++){
        temp[i] = (<li key={i} className={"m"+(i+1)}>
        <a href="#">
          <img src={"./images/goods/"+props.cat+"/m"+(i+1)+".png"} alt="신상품" />
        </a>
      </li>)
    } /////// for //////////
    return temp;
  }; /////// makeList ///////////

  // 리턴코드
  return (
    <>
      <h2 className="c1tit">
        NEW MEN'S ARRIVAL
        <button>전체리스트</button>
      </h2>
      <div className="flowbx">
        <ul>
        {makeList}
        </ul>
      </div>
    </>
  );
} ////////// NewProdList 컴포넌트 //////////////
