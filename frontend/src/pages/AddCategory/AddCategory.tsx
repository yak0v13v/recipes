import React, {useState} from 'react';
import {AdminPage} from "../../components/AdminPage/AdminPage";
import {Input} from "../../components/Input/Input";
import {Button} from "../../components/Button/Button";
import {addCategory} from "../../api/request";
import Styles from './AddCategory.module.css';

export const AddCategory: React.FC = () => {
    const [data, setData] = useState<{category?: string}>({});

    const addHandler = () => {
        if(data.category){
            addCategory({category: data.category}).then(()=>{
                alert('Успешно добавлено');
            }).catch(()=>{
                alert('Ошибка при добавлении');
            });
        } else {
            alert('Заполните все поля');
        }
    }

    return(
        <AdminPage>
            <h2>Добавить категорию</h2>
            <div>
                <div className={Styles.h3}>Заголокок</div>
                <Input type="text" className={Styles.input} value={data.category} onChange={(e)=>{
                    setData({...data, category: e.target.value});
                }}/>
            </div>
            <Button onClick={addHandler}>Добавить</Button>
        </AdminPage>
    )
}