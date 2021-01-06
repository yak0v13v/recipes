import React from 'react';
import { Sidebar } from '../Sidebar/Sidebar';
import Styles from './UserPage.module.css';

const data = [
    {
        name: 'Рецепты',
        link: '/user/recipes'
    },
    {
        name: 'Категории',
        link: '/user/categories'
    },
    {
        name: 'Пользователи',
        link: '/user/users'
    }
]

export const UserPage: React.FC = ({children}) => {
    return(
        <>
            <Sidebar links={data}/>
            <main className={Styles.main}>
                {children}
            </main>
        </>
    )
}