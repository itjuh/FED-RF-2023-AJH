// 스위치페이지 Switch page - Switch.jsx
// 스위치 개별 css 적용
import '../../css/switch.css';
import { switchData } from '../data/switchData';

export function Switch() {

  /*
  {
        swname: 스위치이름(영문)
        swkname: 스위치이름
        swdesc: 스위치 간단설명
        swclass: 스위치 클래스
    },
  */

  return (
    <>
      <main className="main in-box row-12">
        <div className="part-box col-16 row-1"></div>
        {/* 스위치 이미지 구역 */}
        <div className="part-box col-16 row-11 prod-area">
          <section className="row-10">
            <dl className="switch-info flex-box row-10">
              {
                switchData.map((v,i)=>
                <div className='switch-box' key={i}>
                  {/* 스위치 이름 */}
                  <dt className='sw-tit'>
                    <h2>{v.swname.split('-')[0]}</h2>
                    <small>{v.swname.split('-')[1]}</small>  
                  </dt>
                  {/* 스위치 이미지 */}
                  <dd className='sw-img'>
                    <figure className={v.swclass}>
                      {/* 더보기 */}
                      <div className="prod-detail-view">view</div>
                    </figure>
                    <figcaption className='ir'>{v.swkname}</figcaption>
                  </dd>
                  <dd className='sw-desc'>{v.swdesc}</dd>
                </div>)
              }
            </dl>
          </section>
        </div>
      </main>
    </>
  );
} ///////// Switch 컴포넌트 /////////////
