import { db } from '../db';

class OtherService {
    async getUser(user_id: number){
        return await db.query('SELECT id, name, access_id, phone_number FROM users WHERE id=$1', [user_id]);
    }

    async getCategories(){
        return await db.query('SELECT * FROM categories');
    }

    async addCategory(name:string){
        return await db.query('INSERT INTO categories VALUES ($1)', [name]);
    }

    async updateCategory(id: number, name: string){
        return await db.query('UPDATE categories SET category=$1 WHERE id=$2', [name, id]);
    }
}

const instance = new OtherService();

export { instance as OtherService };
