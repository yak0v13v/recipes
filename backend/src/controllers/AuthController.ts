import { Request, Response } from 'express';
import { Controller, Get, Put, Post, Delete } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import {UserService} from "../services/UserService";
import * as md5 from "md5";


@Controller('api/v0')
export class AuthController {

    @Post('signup')
    private async signup(req: Request, res: Response) {
        //res.locals?.user
        const { name, login, password, repeatPassword, phoneNumber } = req.body;
        try{
            if(name && login && password && repeatPassword && phoneNumber && password === repeatPassword) {
                await UserService.singUp(name, login, password, phoneNumber);
                return res.status(201).json({"status": `User ${login} created`})
            }
            res.status(400).json({"status": "Not valid json"})
        } catch {
            res.status(400).json({"status": "Some error"})
        }
    }

    @Post('createAdmin')
    private async createAdmin(req: Request, res: Response) {
        const { name, login, password, repeatPassword, phoneNumber } = req.body;
        try{
            if(name && login && password && repeatPassword && phoneNumber && password === repeatPassword) {
                const accessLevel = res.locals.user.access_id;
                if(accessLevel === 1){
                    await UserService.createAdmin(name, login, password, phoneNumber);
                    return res.status(201).json({"status": `Admin ${login} created`})
                } else {
                    res.status(400).json({"status": "Insufficient access"});
                }
            }
            res.status(400).json({"status": "Not valid json"})
        } catch {
            res.status(400).json({"status": "Some error"})
        }
    }


    @Post('login')
    private async login(req: Request, res: Response) {
        const { login, password } = req.body;
        try{
            const data = await UserService.findUserId(login, password);
            const userId = data.rows[0]?.id;
            if(userId){
                const token = md5(new Date().toUTCString() + userId);
                await UserService.login(userId, token);
                res.cookie("token", token, { expires: new Date(Date.now() + 3600000000), maxAge: 3600000000}).status(201).json({
                    "status": "Successfully logged in"
                });
            } else {
                res.status(400).json({"status": "Wrong login or password"})
            }
        } catch {
            res.status(400).json({"status": "Some error"})
        }
    }


    @Post(':msg')
    private postMessage(req: Request, res: Response) {
        Logger.Info(req.params.msg);
        return res.status(400).json({
            error: req.params.msg,
        });
    }


    @Delete(':msg')
    private delMessage(req: Request, res: Response) {
        try {
            throw new Error(req.params.msg);
        } catch (err) {
            Logger.Err(err, true);
            return res.status(400).json({
                error: req.params.msg,
            });
        }
    }
}
