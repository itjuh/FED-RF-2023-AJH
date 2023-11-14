// 폰트어썸 아이콘 사용 컴포넌트
import React from "react";
import { faUser, faMagnifyingGlass, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function UserCon(){
    return <FontAwesomeIcon icon={faUser} />
};
function GlassCon(){
    return <FontAwesomeIcon icon={faMagnifyingGlass} />
};
function CartCon(){
    return <FontAwesomeIcon icon={faCartShopping} />  
};

export {UserCon, GlassCon, CartCon};
