import { db } from '../db';
import md5 from 'md5'

class UserService {
    async singUp(name: string, login: string, password: string, phoneNumber: string){
        return await db.query('INSERT INTO users (name, login, password, phone_number) VALUES ($1, $2, $3, $4)',
            [name, login, password, phoneNumber]);
    }

    async findUserId(login: string, password: string){
        return await db.query('SELECT id FROM users WHERE login=$1 AND password=$2', [login, password]);
    }

    async login(userId: number, token: string){
        const expire = '2020-03-10 11:49:15 +0000';

        return await db.query('INSERT INTO auth (user_id, token, expire) VALUES ($1, $2, $3)',
            [userId, token, expire]);
    }

    async createAdmin(name: string, login: string, password: string, phoneNumber: string){
        return await db.query('INSERT INTO users (name, login, password, phone_number, access_id) VALUES ($1, $2, $3, $4, 1)',
            [name, login, password, phoneNumber]);
    }
}

const instance = new UserService();

export { instance as UserService };
