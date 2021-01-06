import React, {useState} from 'react';
import Styles from './AddRecipe.module.css';
import {AdminPage} from "../../components/AdminPage/AdminPage";
import {Input} from "../../components/Input/Input";
import {Button} from "../../components/Button/Button";
import {addRecipe} from "../../api/request";

export const AddRecipe: React.FC = () => {
    const [data, setData] = useState<{title?: string, description?: string, img?: string, category_id?: string}>({});

    const addHandler = () => {
        if(data.title && data.description && data.category_id && data.img){
            addRecipe({title: data.title, description: data.description, img: data.img, category_id: data.category_id}).then(()=>{
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
            <h2>Добавить рецепт</h2>
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
            <Button onClick={addHandler}>Добавить</Button>
        </AdminPage>
    )
}