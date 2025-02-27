import NavButton from "./navButton";
import "./Nav.css"
import { useState } from "react";
const NavBar = ({activeNav, setActiveNav}) => {
    return ( 
        <div className="navBar">
            <NavButton setNav={setActiveNav} activeNav={activeNav} id="current">Текущие Задачи</NavButton>
            <NavButton setNav={setActiveNav} activeNav={activeNav} id="complete">Выполнение Задачи</NavButton>
        </div>
     );
}
 
export default NavBar;