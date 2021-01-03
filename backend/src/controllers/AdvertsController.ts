import { Request, Response } from 'express';
import { Controller, Get, Put, Post, Delete } from '@overnightjs/core';
import {AdvertsService} from "../services/AdvertsService";


@Controller('api/v0')
export class AdvertsController {

    @Get('obyavlenie')
    private async getAdverts(req: Request, res: Response) {
        try {
            const {category, priceFrom, priceUp} = req.query;
            if(category && category !== '0') {
                const data = await AdvertsService.getAdvertsByCategoryAndPrice({category, before: priceFrom, after: priceUp});
                const adverts = data.rows;
                res.status(200).json(adverts);
            } else if (priceFrom || priceUp){
                const data = await AdvertsService.getAdvertsBetweenPrice({before: priceFrom, after: priceUp});
                const adverts = data.rows;
                res.status(200).json(adverts);
            } else {
                const data = await AdvertsService.getAdverts();
                const adverts = data.rows;

                res.status(200).json(adverts);
            }
        } catch  {
            res.status(400).json({"status": "Some error"});
        }
    }

    @Get('findObyavlenie')
    private async findAdverts(req: Request, res: Response) {
        try {
            const {search} = req.query;

            const data = await AdvertsService.findAdverts(`${search}`);
            const adverts = data.rows;
            res.status(200).json(adverts);

        } catch (e) {
            console.log(e);
            res.status(400).json({"status": "Some error"});
        }
    }

    @Get('obyavlenie/:id')
    private async getAdvertById(req: Request, res: Response) {
        try {
            const data = await AdvertsService.getAdvertById(req.params.id);

            if(data.rows.length !== 0) {
                const advert = data.rows[0];
                res.status(200).json(advert);
            } else {
                res.status(404).json({"status": "Not found"});
            }
        } catch  {
            res.status(400).json({"status": "Some error"});
        }
    }

    @Put('obyavlenie')
    private async addAdvert(req: Request, res: Response) {
        try {
            const { user_id } = res.locals?.user;

            if(user_id){
                const { title, category_id, description, price, img } = req.body;
                await AdvertsService.addAdvert(user_id, title, category_id, description, price, img);
                res.status(201).json({"status": "Successfully created"});
            } else {
                res.status(401).json({"status": "Unauthorized"});
            }
        } catch {
            res.status(400).json({"status": "Some error"});
        }
    }

    @Post('obyavlenie/:id')
    private async updateAdvert(req: Request, res: Response){
        try {
            const { user_id } = res.locals?.user;

            if(user_id){
                const { title, category_id, description, price, img } = req.body;

                await AdvertsService.updateAdvert(Number(req.params.id), user_id, title, category_id, description, price, img);
                res.status(200).json({"status": "Successfully updated"});
            } else {
                res.status(400).json({"status": "Some error"});
            }
        } catch {
            res.status(400).json({"status": "Some error"});
        }
    }

    @Delete('obyavlenie/:id')
    private async deleteAdvert(req: Request, res: Response){
        try {
            const { user_id } = res.locals?.user;

            if(user_id) {
                await AdvertsService.deleteAdvert(user_id, Number(req.params.id));
                res.status(200).json({"status": "Successfully deleted"})
            } else {
                res.status(400).json({"status": "Some error"});
            }
        } catch {
            res.status(400).json({"status": "Some error"});
        }
    }

    @Get('myObyavlenie')
    private async getMyAdverts(req: Request, res: Response){
        try {
            const user_id = res.locals?.user?.user_id;

            if(user_id) {
                const data = await AdvertsService.getMyAdverts(user_id);
                res.status(200).json(data.rows);
            } else {
                res.status(401).json({"status": "Unauthorized"});
            }
        } catch(e) {
            console.log(e);
            res.status(400).json({"status": "Some error"});
        }
    }
}
