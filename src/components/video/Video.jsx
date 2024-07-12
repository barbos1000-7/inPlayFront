import React from 'react';
import {toast} from "react-toastify";
import {useClipboard} from "use-clipboard-copy";
import style from "../Modal/Modal.module.css";

const Video = ({url}) => {

    const clipboard = useClipboard();

    const handleClick = React.useCallback(
        () => {
            clipboard.copy(url); // programmatically copying a value
            toast.success('You copy link!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        },
        [clipboard.copy]
    );
    return (
        <div className={style.body} id="body">
            <div className={style.contentText}>
                To access the live broadcast of the selected match, click on the button below and paste the link
                into the video player.
            </div>
            <div className={style.we}>Attention, this video stream is intended exclusively for betting operators of the
                network.
            </div>
            <button className={style.btn2} onClick={handleClick}>
                link
            </button>
        </div>
    );
};

export default Video;