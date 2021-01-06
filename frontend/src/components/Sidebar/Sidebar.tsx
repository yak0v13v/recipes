import React from 'react';
import { NavLink } from 'react-router-dom';
import Styles from './Sidebar.module.css';
import {BASE_URL} from "../../api/request";

type Props = {
    links: {
        name: string;
        link: string;
    }[];
}

export const Sidebar: React.FC<Props> = ({links}) => {
    return (
        <nav className={Styles.container}>
            {links.map((item, i)=>(
                <NavLink key={i} className={Styles.link} to={item.link} activeClassName={Styles.activeLink}>{item.name}</NavLink>
            ))}
            <div className={Styles.link} onClick={()=>{
                window.open(BASE_URL + '/sql', '_blank')
            }}>Экспорт Базы Данных</div>
        </nav>
    )
}