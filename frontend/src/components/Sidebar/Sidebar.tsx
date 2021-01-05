import React from 'react';
import { NavLink } from 'react-router-dom';
import Styles from './Sidebar.module.css';

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
        </nav>
    )
}