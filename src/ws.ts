import http from "http";
import Websocket from 'ws';
import {IncomingMessage} from "./Http/STOMP/IncomingMessage";
import {Forecast} from "./models/Forecast";
import {Handler} from "./Ws/Handler";
import {clearInterval} from "timers";

const PORT: number = 3001;
const server = http.createServer();
const wss = new Websocket.Server({server})
const handler = new Handler();

let forecastTimeout:NodeJS.Timeout
let degrees = 1;

wss.on('connection', (ws) => {
    ws.on('message', (message) => {

        let forecastRequest:IncomingMessage = JSON.parse(message.toString())
        console.log(forecastRequest)

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
    forecastTimeout = setInterval(() => {
        degrees++
        ws.send("forecast is now " + degrees)
    }, 1000)

    ws.on("close", () => {
        clearTimeout(forecastTimeout)
    })
})



server.listen(PORT, (): void => {
    console.log('Server is running on:', PORT);
});

process.on('uncaughtException', (error) => {
    console.log(error.message)
})

export default server