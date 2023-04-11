import http from "http";
import Websocket from 'ws';
import {IncomingMessage} from "../Http/STOMP/IncomingMessage";
import {Forecast} from "./models/Forecast";
import {Handler} from "./Ws/Handler";
import {JsonParser} from "./Ws/middlewares/JsonParser";

const PORT: number = 3001;
const server = http.createServer();
const wss = new Websocket.Server({server})
const handler = new Handler();

let forecastTimeout:NodeJS.Timeout;
let degrees = 1;

wss.on('connection', (ws) => {
    ws.on('message',async (message) => {


        let forecastRequest:IncomingMessage = (new JsonParser).json(message)
        if (forecastRequest.type !== undefined){
            let controller = handler.handle(forecastRequest.type)
            let forecast = await controller.index(forecastRequest)
            ws.send(JSON.stringify(forecast))
        }
        else {
            ws.send("Today is: 10 degrees")
        }
    })

    ws.send("hello forecast")
    let clientSendMessage = wss.clients.size
    forecastTimeout = setInterval(() => {
        ws.send("forecast is now " + clientSendMessage)
    }, 1000)

    ws.on("close", () => {
        clearTimeout(forecastTimeout)
    })
})

export default server