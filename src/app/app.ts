import "reflect-metadata";
import express, { Application, Request, Response } from 'express';
import {json} from "body-parser";
import ws from "./ws";
const app: Application = express();
import appConfig from "../config/app.config";

app.use(json())
app.get('/api/forecast', (req: Request, res: Response): void => {
    res.json({
        data: {
           message: "Hello"
        },
        error: null
    });
});
app.listen(appConfig.port, (): void => {
    console.log('Server is running on:', appConfig.port);
});

ws.listen(appConfig.port_ws, (): void => {
    console.log('WS Server is running on:', appConfig.port_ws);
});

export default app