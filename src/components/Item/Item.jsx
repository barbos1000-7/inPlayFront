import React, {useState} from "react";
import style from "./Item.module.css";
import Modal from "../Modal/Modal";
import Video from "../video/Video.jsx";

const Item = ({item}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const convertTime12to24 = (time12h) => {

        const [time, modifier] = time12h.split(' ');

        let [hours, minutes] = time.split(':');

        if (hours === '12') {
            hours = '00';
        }

        if (modifier === 'PM') {
            hours = parseInt(hours, 10) + 12;
        }

        return `${hours}:${minutes}`;
    }
    return (
        <>
            <li className={style.item}>
                <div>{item.homeTeam._text ? item.homeTeam._text : 'team'} vs {item.awayTeam._text ? item.awayTeam._text : 'team'}</div>
                <div>{item.sport._text}</div>
                <div
                    className={style.live}>{item.startDate._text.split(' ')[0] + ' ' + convertTime12to24(item.startDate._text.split(' ')[1] + ' ' + item.startDate._text.split(' ')[2])}
                    <span style={{color: 'rgb(253, 82, 74)', marginLeft: '15px'}}>{item.live && 'live'}</span>

                </div>
                {item.live?<button className={style.btn} onClick={openModal}>
                    Play
                </button> : <div  className={style.identif}> </div>}
            </li>
            {isModalOpen && <Modal isOpen={isModalOpen} onClose={closeModal}>
                <Video url={item.rtmpLink._text}/>
                {/*<video src='https://gemetalkued.beget.app/movies.m3u8' />*/}
            </Modal>}
        </>
    );
};

export default Item;
