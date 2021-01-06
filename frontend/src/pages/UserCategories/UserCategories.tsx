import React, {useEffect, useState} from 'react';
import {UserPage} from "../../components/UserPage/UserPage";
import { getCategories } from "../../api/request";
import {Card} from "../../components/Card/Card";

export const UserCategories: React.FC = () => {
    const [data, setData] = useState<any>();

    useEffect(()=>{
        getCategories().then((res)=>{
            setData(res.data);
        }).catch(()=>{
            alert('Что-то пошло не так');
        })
    }, []);

    return(
        <UserPage>
            {data && data.map((item: any, i: number)=>(
                <Card key={i}
                      title={`ID: ${item.id} - ${item.category}`}/>
            ))}
        </UserPage>

    )
}