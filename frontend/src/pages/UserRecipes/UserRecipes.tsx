import React, {useEffect, useState} from 'react';
import {getRecipes} from "../../api/request";
import {Card} from "../../components/Card/Card";
import {UserPage} from "../../components/UserPage/UserPage";

export const UserRecipes: React.FC = () => {
    const [data, setData] = useState<any>();

    useEffect(()=>{
        getRecipes().then((res)=>{
            setData(res.data);
        }).catch(()=>{
            alert('Что-то пошло не так');
        })
    }, []);

    return(
        <UserPage>
            {data && data.map((item: any, i: number)=>(
                <Card key={i}
                      img={item.img}
                      title={item.title}
                      />
            ))}
        </UserPage>

    )
}