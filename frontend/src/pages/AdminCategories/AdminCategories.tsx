import React, {useEffect, useState} from 'react';
import {AdminPage} from "../../components/AdminPage/AdminPage";
import {deleteCategory, getCategories } from "../../api/request";
import {Card} from "../../components/Card/Card";
import {useHistory} from 'react-router-dom';

export const AdminCategories: React.FC = () => {
    const [data, setData] = useState<any>();
    const history = useHistory();

    useEffect(()=>{
        getCategories().then((res)=>{
            setData(res.data);
        }).catch(()=>{
            alert('Что-то пошло не так');
        })
    }, []);

    const deleteHandler = (id: number) => {
        const isConfirmed = window.confirm('Вы уверены что хотите удалить?')

        if(isConfirmed) {
            deleteCategory(id).then(()=>{
                getCategories().then((res)=>{
                    setData(res.data);
                });
                alert('Успешно удалено');
            }).catch(()=>{
                alert('Ошибка при удалении');
            })
        }
    }

    const editHandler = (id: number) => {
        history.push(`/admin/categories/edit/${id}`)
    }

    return(
        <AdminPage>
            {data && data.map((item: any, i: number)=>(
                <Card key={i}
                      title={`ID: ${item.id} - ${item.category}`}
                      onClickDelete={() => {deleteHandler(item.id)}}
                      onClickEdit={() => {editHandler(item.id)}}
                      canEdit
                      canDelete/>
            ))}
        </AdminPage>

    )
}