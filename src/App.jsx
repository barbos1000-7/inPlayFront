import {useEffect, useState} from "react";
import "./App.css";
import Header from "./components/Header/Header";
import AuthForm from "./components/Auth/AuthForm";
import convert from 'xml-js';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Content from "./components/Content/Content.jsx";

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
const App = () => {
    const [auth, setAuth] = useState(false);
    const [items, setItems] = useState([])



    const checkLogin = async (login, password) => {
        const response = await fetch("https://in-play-back.vercel.app/");
        const users = await response.json();
        const isAuthenticated = users.find(user => user.title === login && user.description === password);
        console.log(isAuthenticated, 'user')
        localStorage.setItem('id', isAuthenticated.id)
        localStorage.setItem('name', isAuthenticated.title)
        setAuth(!!isAuthenticated);
    };



    useEffect(() => {
        fetch("/xml.xml")
            .then(res => res.text())
            .then(data => {
                const xml = JSON.parse(convert.xml2json(data, {compact: true, spaces: 4}));
                const time = new Date().toLocaleTimeString('ru-RU', {timeZone: 'Europe/Moscow'}).split(':')
                const data4 = new Date().toLocaleDateString('ru-RU', {timeZone: 'Europe/Moscow'}).split('.')
                const trueData = new Date(data4[2], data4[1] - 1, data4[0], time[0], time[1]).getTime()

                setItems(xml.schedule.events.event.map(item => {
                    let data2 = item.startDate._text.split(' ')[0].split('/')
                    let time2 = (convertTime12to24(item.startDate._text.split(' ')[1] + ' ' + item.startDate._text.split(' ')[2])).split(':')
                    const trueData2 = new Date(data2[2], data2[0] - 1, data2[1], time2[0], time2[1]).getTime()
                    const diff = Math.ceil(((trueData - trueData2) / (1000 * 3600 * 24)) * 24 * 10)
                    if (diff > 21) {
                        return undefined
                    } else if (diff > 0) {
                        return {...item, live: true}
                    } else return item
                }).filter(a => !!a))
            })
            .catch(err => console.log(err));
    }, [])
    const [min, setMin] = useState()

    useEffect(() => {

        if (items[0]) {
            setItems(items.map(item => {
                let data2 = item.startDate._text.split(' ')[0].split('/')
                let time2 = (convertTime12to24(item.startDate._text.split(' ')[1] + ' ' + item.startDate._text.split(' ')[2])).split(':')
                const trueData2 = new Date(data2[2], data2[0] - 1, data2[1], time2[0], time2[1]).getTime()
                const diff = Math.ceil(((trueData - trueData2) / (1000 * 3600 * 24)) * 24 * 10)
                if (diff > 21) {
                    return undefined
                } else if (diff > 0) {
                    return {...item, live: true}
                } else return item
            }).filter(a => !!a))
        }
    }, [])

    useEffect(() => {
        fetch(`https://in-play-back.vercel.app//minutes/${localStorage.getItem('id')}`)
            .then(res => res.text())
            .then(data => {
                console.log(data)
                setMin(JSON.parse(data).minutes)
            })
            .catch(err => console.log(err));
    }, [auth])

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                progressStyle={{
                    color: 'red',
                }}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="dark"
            />
            <Header />
            {auth ?
                <Content  items={items} min={min}/>
                :
                <AuthForm checkLogin={checkLogin}/>}
        </>
    );
};

export default App;
