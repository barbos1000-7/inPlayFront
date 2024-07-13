import React, {useEffect, useState} from 'react';
import Item from "../Item/Item.jsx";
import style from "../Item/Item.module.css";
import ModalWelcome from "../ModalWelcome/ModalWelcome.jsx";

const Content = ({items}) => {
    const [welcome, setWelcome] = useState(false)
    const decrementMinute = () => {
        fetch(`http://localhost:4000/minutesDecrement/${localStorage.getItem('id')}`, {
            method: "get",
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 'minutes null') {
                    location.reload()
                }
                console.log(data, 'data')
            })
            .catch((error) => console.error("Error deleting post:", error));
        setTimeout(() => {
            window.stops ? decrementMinute() : window.stops = true

        }, 60000)
    }
    window.a = 0

    useEffect(() => {
        window.stops = true
        console.log(a)
        if (!window.a) {
            window.a = 1
            decrementMinute()
        }
        return () => {
            window.stops = false
        }
    }, []);

    useEffect(() => {
        setTimeout(()=> {
            setWelcome(true)
        }, 500)
    }, []);
    return (
        <div className={style.content}>
            <div className={style.items}>
                {items[0] ? items.map(e => <Item key={e.eventId._text} item={e}/>) : <div></div>}
            </div>
            {welcome && <ModalWelcome isOpen={welcome} onClose={() => setWelcome(false)}>
                <div className={style.root}>
                    <div className={style.welcome}>
                        <div className={style.left}> License operator {localStorage.getItem('name')}</div>
                        - <span className={style.ok}>successful</span>
                    </div>
                </div>
            </ModalWelcome>}
        </div>);
};

export default Content;