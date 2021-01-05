import React, {useEffect, useState} from 'react';
import {AdminPage} from "../../components/AdminPage/AdminPage";
import {useParams} from 'react-router-dom';
import {getRecipe, updateRecipe} from "../../api/request";
import {Input} from "../../components/Input/Input";
import {Button} from "../../components/Button/Button";
import Styles from './EditRecipe.module.css';

export const EditRecipe: React.FC = () => {
    const [data, setData] = useState<{id: string | number, title?: string, description?: string, img?: string, category_id?: string}>();
    const param: {id: string} = useParams();

    useEffect(()=>{
        getRecipe(param.id).then((res)=>{
            setData(res.data);
        }).catch(()=>{alert('Что-то пошло не так')});
    },[param.id])

    if(!data) {
        return null;
    }

    const updateHandler = (id: number | string) => {
        updateRecipe(id, {title: data.title, description: data.description, img: data.img, category_id: data.category_id}).then(()=>{
            getRecipe(param.id).then((res)=>{
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
            <div className={Styles.h3}>Заголокок</div>
            <Input type="text" className={Styles.input} value={data.title} onChange={(e)=>{
                setData({...data, title: e.target.value});
            }}/>
        </div>
        <div>
            <div className={Styles.h3}>Описание</div>
            <Input type="text" className={Styles.input} value={data.description} onChange={(e)=>{
                setData({...data, description: e.target.value});
            }}/>
        </div>
        <div>
            <div className={Styles.h3}>SRC изображения</div>
            <Input type="text" className={Styles.input} value={data.img} onChange={(e)=>{
                setData({...data, img: e.target.value});
            }}/>
        </div>
        <div>
            <div className={Styles.h3}>ID категории</div>
            <Input type="number" className={Styles.input} value={data.category_id} onChange={(e)=>{
                setData({...data, category_id: e.target.value});
            }}/>
        </div>
        <Button onClick={()=>{updateHandler(data.id)}}>Обновить</Button>
    </AdminPage>
}