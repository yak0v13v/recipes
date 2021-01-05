import React, {useEffect, useState} from 'react';
import Styles from './Recipes.module.css';
import {AdminPage} from "../../components/AdminPage/AdminPage";
import {deleteRecipe, getRecipes} from "../../api/request";
import {Card} from "../../components/Card/Card";
import {useHistory} from 'react-router-dom';

export const Recipes: React.FC = () => {
    const [data, setData] = useState<any>();
    const history = useHistory();

    useEffect(()=>{
        getRecipes().then((res)=>{
            setData(res.data);
        }).catch(()=>{
            alert('Что-то пошло не так');
        })
    }, []);

    const deleteHandler = (id: number) => {
        const isConfirmed = window.confirm('Вы уверены что хотите удалить?')

        if(isConfirmed) {
            deleteRecipe(id).then(()=>{
                getRecipes().then((res)=>{
                    setData(res.data);
                });
                alert('Успешно удалено');
            }).catch(()=>{
                alert('Ошибка при удалении');
            })
        }
    }

    const editHandler = (id: number) => {
        history.push(`/admin/recipes/edit/${id}`)
    }

    return(
        <AdminPage>
            {data && data.map((item: any, i: number)=>(
                <Card key={i}
                      img={item.img}
                      title={item.title}
                      onClickDelete={() => {deleteHandler(item.id)}}
                      onClickEdit={() => {editHandler(item.id)}}
                      canEdit
                      canDelete/>
            ))}
        </AdminPage>

    )
}