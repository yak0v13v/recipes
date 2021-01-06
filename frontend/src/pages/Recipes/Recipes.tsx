import React, {useEffect, useState} from 'react';
import Styles from './Recipes.module.css';
import {AdminPage} from "../../components/AdminPage/AdminPage";
import {deleteRecipe, getRecipes} from "../../api/request";
import {Card} from "../../components/Card/Card";
import {useHistory} from 'react-router-dom';

export const Recipes: React.FC = () => {
    const [data, setData] = useState<any>();
    const [idOrder, setIdOrder] = useState(false);
    const [alp, setAlp] = useState(false);
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
            <div className={Styles.filters}>
                <b>Сортировать:</b> <button onClick={()=>{
                    setIdOrder(!idOrder);
                }}>по возрастанию id</button>
            </div>
            <div className={Styles.filters}>
                <b>Фильтр:</b> <button onClick={()=>{
                setAlp(!alp)
            }}>только напитки</button>
            </div>
            {data && data.sort((a:any, b: any)=>{
                if(idOrder){
                    return a.id - b.id
                }

                return true;

            }).filter((item: any)=>{
                if(alp) {
                    return item.category_id === 2;
                }

                return true
            }).map((item: any, i: number)=>(
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