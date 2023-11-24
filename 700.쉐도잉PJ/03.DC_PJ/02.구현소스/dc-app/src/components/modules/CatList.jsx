// DC PJ 캐릭터 리스트 컴포넌트
import '../../css/cat_list.css';
import { SwiperCat } from '../plugin/SwiperCat';
/*
Root >
  section.cat-swbox >
    h2.tit + 스와이퍼컴포넌트(<SwiperCat />)

    -> 스와이퍼 컴포넌트 구조정의
    스와이퍼 리스트 >
      a링크(<Link to />) > 
        (section.sw-inbox2 > img) + (div.cat-tit2 > h3)
*/
export function CatList(props){
    return(
        <>
        <section className="cat-swbox">
            {/* 1. 모듈타이틀 */}
            <h2 className="tit">WHO'S WHO: THE JUSTICE LEAGUE</h2>
            {/* 2. 스와이퍼 컴포넌트 */}
            <SwiperCat />
        </section>
        </>
    );
} ///////// CatList 컴포넌트 ////////////