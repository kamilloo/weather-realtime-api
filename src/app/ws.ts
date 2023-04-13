import http from "http";
import Websocket from 'ws';
import {IncomingMessage} from "./http/STOMP/IncomingMessage";
import {Forecast} from "./models/Forecast";
import {WebSocketHandler} from "./ws/WebSocketHandler";
import {JsonParser} from "./ws/middlewares/JsonParser";
import {Container} from "inversify";
import TYPES from "../type";
import container from "../bidings";

const server = http.createServer();
const wss = new Websocket.Server({server})

const handler = container.get<WebSocketHandler>(WebSocketHandler);

let forecastTimeout:NodeJS.Timeout;

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
    }, 10000)

    ws.on("close", () => {
        clearTimeout(forecastTimeout)
    })
})

export default server