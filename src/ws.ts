import http from "http";
import Websocket from 'ws';
import {IncomingMessage} from "./Http/STOMP/IncomingMessage";
import {Forecast} from "./models/Forecast";
import {Handler} from "./Ws/Handler";


const server = http.createServer();
const wss = new Websocket.Server({server})
const handler = new Handler();
wss.on('connection', (ws) => {
    ws.on('message', (message) => {

        let forecastRequest:IncomingMessage = JSON.parse(message.toString())
        if (forecastRequest.type !== undefined){
            let controller = handler.handle(forecastRequest.type)
            let forecast = controller.index(forecastRequest)
            ws.send(JSON.stringify(forecast))
        }
        else {
            ws.send("Today is: 10 degrees")
        }
    })

    ws.send("hello forecast")
})

export default server