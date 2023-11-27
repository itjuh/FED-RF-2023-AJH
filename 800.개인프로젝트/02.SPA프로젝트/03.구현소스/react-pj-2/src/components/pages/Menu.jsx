import "../../css/menu.css";

export function Menu() {
  const menuData = ["KEYBOARD", "SWITCH", "ROGIN", "JOINUS", "WISHLIST", "CONTANT"];
  return (
    <>
      <main className="main in-box row-12">
        <div className="part-box gnb-menu-area row-10">
          <ul className="gnb-menu-box">
            {menuData.map((v, i) => (
              <li key={i}>
                <a href="#">
                  <span>
                    {v}<b className='typing-area'>{v}</b>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="part-box col-16 row-2"></div>
      </main>
    </>
  );
} ////////// Menu 컴포넌트  ////////////
