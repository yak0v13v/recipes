import * as bodyParser from 'body-parser';
import * as controllers from './controllers';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';

import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';

// @ts-ignore
import * as dotenv from 'dotenv';
import {checkAuth} from "./middlewares/auth";


class ExampleServer extends Server {

    private readonly SERVER_STARTED = 'Example server started on port: ';


    constructor() {
        super(true);
        this.app.use(cors({
            origin: 'http://coursework.std-228.ist.mospolytech.ru',
            credentials: true,

        }));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(cookieParser());
        this.app.use(checkAuth);
        this.setupControllers();
        dotenv.config();
    }


    private setupControllers(): void {
        const ctlrInstances = [];
        for (const name in controllers) {
            if (controllers.hasOwnProperty(name)) {
                const controller = (controllers as any)[name];
                ctlrInstances.push(new controller());
            }
        }
        super.addControllers(ctlrInstances);
    }


    public start(port: number): void {
        this.app.get('/', (req, res) => {
            res.send('Houston, we have a problem!');
        });
        this.app.listen(port, () => {
            Logger.Imp(this.SERVER_STARTED + port);
        });
    }
}

export default ExampleServer;
