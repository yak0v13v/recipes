import React, {ChangeEvent} from 'react';
import cx from 'classnames';
import Styles from './Input.module.css';

type Props = {
    type: string;
    placeholder?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    value?: string | number;
    className?: string;
}

export const Input: React.FC<Props> = ({type, placeholder, onChange, value, className}) => {
    const classes = cx(Styles.input, className);

    return <input type={type} placeholder={placeholder} className={classes} onChange={onChange} value={value}/>
}