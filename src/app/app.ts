import express, { Application, Request, Response } from 'express';
import {json} from "body-parser";
import ws from "./ws";

const app: Application = express();

const PORT: number = 3001;

app.use(json())

app.get('/api/todo', (req: Request, res: Response): void => {
    res.json({
        data: {
           message: "Hello"
        },
        error: null
    });
});
app.listen(PORT, (): void => {
    console.log('Server is running on:', PORT);
});

ws.listen(PORT, (): void => {
    console.log('Server is running on:', PORT);
});

export default app