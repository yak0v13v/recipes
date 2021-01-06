import React from 'react';
import { Sidebar } from '../Sidebar/Sidebar';
import Styles from './AdminPage.module.css';

const data = [
    {
        name: 'Рецепты',
        link: '/admin/recipes'
    },
    {
        name: 'Добавить рецепт',
        link: '/admin/recipes/add'
    },
    {
        name: 'Категории',
        link: '/'
    },
    {
        name: 'Добавить категорию',
        link: '/'
    }
]

export const AdminPage: React.FC = ({children}) => {
    return(
        <>
            <Sidebar links={data}/>
            <main className={Styles.main}>
                {children}
            </main>
        </>
    )
}