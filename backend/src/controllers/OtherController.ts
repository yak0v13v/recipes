import { Request, Response } from 'express';
import { Controller, Get, Put, Post, Delete } from '@overnightjs/core';
import {OtherService} from "../services/OtherService";
import {AdvertsService} from "../services/AdvertsService";


@Controller('api/v0')
export class OtherController {

    @Get('user')
    private async getUser(req: Request, res: Response) {
        try {
            if(res.locals.user && res.locals.user.user_id){

                const user_id = res.locals.user.user_id;

                const data = await OtherService.getUser(user_id);
                const user = data.rows[0];
                res.status(200).json(user);
            } else {
                res.status(401).json({"status": "Unauthorized"});
            }
        } catch  {
            res.status(400).json({"status": "Some error"});
        }
    }

    @Get('categories')
    private async getCategory(req: Request, res: Response) {
        try {
            const data = await OtherService.getCategories();
            res.status(200).json(data.rows)
        } catch  {
            res.status(400).json({"status": "Some error"});
        }
    }

    @Put('categories')
    private async addCategory(req: Request, res: Response) {
        try {
            const accessLevel = res.locals.user.access_id;
            if(accessLevel === 1){
                await OtherService.addCategory(req.body.name);
                res.status(201).json({"status": "Success created"});
            } else {
                res.status(400).json({"status": "Insufficient access"});
            }
        } catch  {
            res.status(400).json({"status": "Some error"});
        }
    }

    @Post('categories/:id')
    private async updateCategory(req: Request, res: Response) {
        try {
            const accessLevel = res.locals.user.access_id;
            if(accessLevel === 1){
                await OtherService.updateCategory(Number(req.params.id), req.body.name);
                res.status(200).json({"status": "Success updated"});
            } else {
                res.status(400).json({"status": "Insufficient access"});
            }
        } catch  {
            res.status(400).json({"status": "Some error"});
        }
    }
}
