import React, {useEffect} from "react";
import style from "./Modal.module.css";


const Modal = ({isOpen, onClose, children}) => {
//localStorage.getItem('id')

    return (
        <div className={style.modalOverlay} onClick={onClose}>
            <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
                {children}
                <button className={style.btn} onClick={onClose}>
                    <img src={'/close.svg'}  alt={'close'} />
                </button>
            </div>
        </div>
    );
};

export default Modal;
