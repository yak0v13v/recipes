import React from 'react';
import Styles from './Button.module.css';

type Props = {
    onClick?: VoidFunction;
}

export const Button: React.FC<Props> = ({children, onClick}) => {
    return <button className={Styles.button} onClick={onClick}>
        {children}
    </button>
}