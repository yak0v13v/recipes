import { Request, Response, NextFunction } from "express";
import { db } from '../db'

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;

    if(token){
        try {
            const data = await db.query('SELECT * FROM users JOIN auth ON users.id = auth.user_id WHERE auth.token=$1', [token]);
            res.locals.user = data.rows[0];
        } catch(e) {
            console.log(e.stack);
        }
    }
    next()
};
