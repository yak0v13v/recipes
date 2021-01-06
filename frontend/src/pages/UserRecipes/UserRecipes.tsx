import React, {useEffect, useState} from 'react';
import {getRecipes} from "../../api/request";
import {Card} from "../../components/Card/Card";
import {UserPage} from "../../components/UserPage/UserPage";
import Styles from "../Recipes/Recipes.module.css";

export const UserRecipes: React.FC = () => {
    const [data, setData] = useState<any>();
    const [idOrder, setIdOrder] = useState(false);
    const [alp, setAlp] = useState(false);

    useEffect(()=>{
        getRecipes().then((res)=>{
            setData(res.data);
        }).catch(()=>{
            alert('Что-то пошло не так');
        })
    }, []);

    return(
        <UserPage>
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
                      />
            ))}
        </UserPage>

    )
}