import http from "http";
import Websocket from 'ws';
import {IncomingMessage} from "../Http/STOMP/IncomingMessage";
import {Forecast} from "./models/Forecast";
import {Handler} from "./Ws/Handler";
import {clearInterval} from "timers";
import {constants} from "os";

const PORT: number = 3001;
const server = http.createServer();
const wss = new Websocket.Server({server})
const handler = new Handler();

let forecastTimeout:NodeJS.Timeout;
let degrees = 1;

wss.on('connection', (ws) => {
    ws.on('message', (message) => {

        const json = function (raw:Websocket.RawData){
            try {
                return JSON.parse(raw.toString())
            }
            catch (err){
                console.error(err)
                return {}
            }
        }
        let forecastRequest:IncomingMessage = json(message)
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
    let clientSendMessage = wss.clients.size
    forecastTimeout = setInterval(() => {
        ws.send("forecast is now " + clientSendMessage)
    }, 1000)

    ws.on("close", () => {
        clearTimeout(forecastTimeout)
    })
})

export default server