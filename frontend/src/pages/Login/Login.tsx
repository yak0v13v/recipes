import React, { useState} from 'react';
import {Input} from "../../components/Input/Input";
import Styles from './Login.module.css';
import {Button} from "../../components/Button/Button";
import {useHistory} from 'react-router-dom';
import {getLogin} from "../../api/request";


export const Login: React.FC = () => {
    const history = useHistory()
    const [login, setLogin] = useState<string>();
    const [password, setPassword] = useState<string>();

    const loginHandler = () => {
        if(login && password){

            getLogin().then(()=>{
                if(login === 'admin' && password === 'admin') {
                    history.replace('/admin');
                }else if(login === 'user' && password === 'user') {
                    history.replace('/user');
                } else {
                    alert('Неверный логин или пароль');
                }
            }).catch(()=>{
                alert('Сервер не доступен. Попробуйте позже. Если ошибка повторится напишите на почту: yak0v13v@yandex.com')
            });
        } else {
            alert('Введите логин и пароль')
        }
    }

    return <div className={Styles.container}>
        <div className={Styles.title}>Рецепты</div>
        <Input type="login" placeholder="Логин" onChange={(e)=>{setLogin(e.target.value)}}/>
        <Input type="password" placeholder="Пароль" onChange={(e)=>{setPassword(e.target.value)}}/>
        <Button onClick={loginHandler}>войти</Button>
    </div>
}