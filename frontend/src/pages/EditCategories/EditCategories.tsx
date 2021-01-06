import React, {useEffect, useState} from 'react';
import {AdminPage} from "../../components/AdminPage/AdminPage";
import {useParams} from 'react-router-dom';
import {getCategory, updateCategory} from "../../api/request";
import {Input} from "../../components/Input/Input";
import {Button} from "../../components/Button/Button";
import Styles from './EditCategories.module.css';

export const EditCategory: React.FC = () => {
    const [data, setData] = useState<{id: string | number, category?: string}>();
    const param: {id: string} = useParams();

    useEffect(()=>{
        getCategory(param.id).then((res)=>{
            setData(res.data);
        }).catch(()=>{alert('Что-то пошло не так')});
    },[param.id])

    if(!data) {
        return null;
    }

    const updateHandler = (id: number | string) => {
        updateCategory(id, {category: data.category}).then(()=>{
            getCategory(param.id).then((res)=>{
                setData(res.data);
            });
            alert('Успешно обновлено');
        }).catch(()=>{
            alert('Ошибка при обновлении');
        })
    }

    return <AdminPage>
        <h2>Обновить рецепт</h2>
        <div>
            <div className={Styles.h3}>Название категории</div>
            <Input type="text" className={Styles.input} value={data.category} onChange={(e)=>{
                setData({...data, category: e.target.value});
            }}/>
        </div>
        <Button onClick={()=>{updateHandler(data.id)}}>Обновить</Button>
    </AdminPage>
}