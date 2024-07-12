import style from "./Header.module.css";
import {useEffect, useState} from "react";
import convert from "xml-js";

const Header = () => {

    return (
        <>
            <header className={style.header}>
                <div  className={style.title}><span style={{cursor: 'pointer'}}  onClick={()=> location.reload()}> fast operation in play TV stream</span></div>
                <div className={style.logout}><span   style={{cursor: 'pointer'}} onClick={()=> location.reload()}> Log Out</span> </div>
            </header>
        </>
    );
};

export default Header;
