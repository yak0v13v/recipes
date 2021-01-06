import React, {useEffect, useState} from 'react';
import {UserPage} from "../../components/UserPage/UserPage";
import {getUsers} from "../../api/request";
import {Card} from "../../components/Card/Card";

export const UserUsers: React.FC = () => {
    const [data, setData] = useState<any>();

    useEffect(()=>{
        getUsers().then((res)=>{
            setData(res.data);
        }).catch(()=>{
            alert('Что-то пошло не так');
        })
    }, []);

    return(
        <UserPage>
            {data && data.map((item: any, i: number)=>(
                <Card key={i}
                      title={`${item.name} логин:${item.login} уровень доступа: ${item.role}`}
                />
            ))}
        </UserPage>
    )
}