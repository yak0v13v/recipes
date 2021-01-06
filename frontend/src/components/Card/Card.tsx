import React from 'react';
import deleteIcon from "../../images/Delete.svg";
import editIcon from '../../images/Edit.svg';
import Styles from "./Card.module.css";

type Props = {
    img?: string;
    title: string;
    canDelete?: boolean;
    canEdit?: boolean;
    onClickDelete?: VoidFunction;
    onClickEdit?: VoidFunction;
}

export const Card: React.FC<Props> = ({img, title, canDelete, onClickDelete, canEdit, onClickEdit}) => {
    return(
        <div className={Styles.card}>
            {img && <img src={img} alt={title}/>}
            <span>{title}</span>
            <div className={Styles.edit}>
                {canEdit && <img src={editIcon} alt="edit" onClick={onClickEdit}/>}
                {canDelete && <img src={deleteIcon} alt="delete" onClick={onClickDelete}/>}
            </div>
        </div>
    )
}