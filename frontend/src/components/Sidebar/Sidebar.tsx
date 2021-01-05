import React from 'react';
import { Link } from 'react-router-dom';
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
                <Link key={i} className={Styles.link} to={item.link}>{item.name}</Link>
            ))}
        </nav>
    )
}