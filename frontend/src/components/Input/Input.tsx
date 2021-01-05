import React, {ChangeEvent} from 'react';
import Styles from './Input.module.css';

type Props = {
    type: string;
    placeholder?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<Props> = ({type, placeholder, onChange}) => {
    return <input type={type} placeholder={placeholder} className={Styles.input} onChange={onChange}/>
}