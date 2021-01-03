import { db } from '../db';

class AdvertsService {
    async getAdverts(){
        return await db.query('SELECT A.id, A.created, A.title, A.description, A.price, A.img, A.user_id, U.name AS user_name, C.category, U.phone_number FROM adverts AS A JOIN users AS U ON A.user_id = U.id  JOIN categories AS C ON A.category_id = C.id');
    }

    async getAdvertById(id: string){
        return await db.query('SELECT A.id, A.created, A.title, A.description, A.price, A.img, A.user_id, U.name AS user_name, C.category, U.phone_number FROM adverts AS A JOIN users AS U ON A.user_id = U.id  JOIN categories AS C ON A.category_id = C.id WHERE A.id=$1', [id])
    }

    async getMyAdverts(userId: number){
        return await db.query('SELECT A.id, A.created, A.title, A.description, A.price, A.img, A.user_id, U.name AS user_name, C.category, U.phone_number FROM adverts AS A JOIN users AS U ON A.user_id = U.id  JOIN categories AS C ON A.category_id = C.id WHERE U.id=$1', [userId])
    }

    async addAdvert(user_id: number, title: string, category_id: number, description: string, price: number, img: string){
        return await db.query('INSERT INTO adverts (user_id, title, category_id, description, price, img) VALUES ($1, $2, $3, $4, $5, $6)', [user_id, title, category_id, description, price, img]);
    }

    async updateAdvert(advertId: number, user_id: number, title: string, category_id: number, description: string, price: number, img: string){
        return await db.query('UPDATE adverts SET title=$1, category_id=$2, description=$3, price=$4, img=$5 WHERE id=$6', [title, category_id, description, price, img, advertId]);
    }

    async deleteAdvert(user_id: number, advertId: number){
        return await db.query('DELETE FROM adverts WHERE id=$1 AND user_id=$2', [advertId, user_id]);
    }

    // @ts-ignore
    async getAdvertsByCategoryAndPrice({category, before: beforeRaw, after: afterRaw}){
        const before = beforeRaw || 0;
        const after = afterRaw || 999999999;
        return await db.query('SELECT A.id, A.created, A.title, A.description, A.price, A.img, A.user_id, U.name AS user_name, C.category, U.phone_number FROM adverts AS A JOIN users AS U ON A.user_id = U.id  JOIN categories AS C ON A.category_id = C.id WHERE A.price >= $2 AND A.price <= $3 AND A.category_id = $1', [category, before, after]);
    }

    // @ts-ignore
    async getAdvertsBetweenPrice({before: beforeRaw, after: afterRaw}){
        const before = beforeRaw || 0;
        const after = afterRaw || 999999999;
        return await db.query('SELECT A.id, A.created, A.title, A.description, A.price, A.img, A.user_id, U.name AS user_name, C.category, U.phone_number FROM adverts AS A JOIN users AS U ON A.user_id = U.id  JOIN categories AS C ON A.category_id = C.id WHERE A.price >= $1 AND A.price <= $2', [before, after]);
    }

    async findAdverts(string = '') {
        return await db.query(`SELECT A.id, A.created, A.title, A.description, A.price, A.img, A.user_id, U.name AS user_name, C.category, U.phone_number FROM adverts AS A JOIN users AS U ON A.user_id = U.id  JOIN categories AS C ON A.category_id = C.id WHERE LOWER(A.title) SIMILAR to LOWER('%${string}%')`);
    }
}

const instance = new AdvertsService();

export { instance as AdvertsService };
