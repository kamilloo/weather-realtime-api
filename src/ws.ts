import http from "http";
import Websocket from 'ws';
import {Message} from "./Http/STOMP/Message";
import {Forecast} from "./models/Forecast";


const server = http.createServer();
const wss = new Websocket.Server({server})
wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        let forecastRequest:Message = JSON.parse(message.toString())
        if (forecastRequest.day){
            const forecast = {
                degrees: 10,
                filling: 'warming',
                condition: 'cloudy'
            } as Forecast
            ws.send(JSON.stringify(forecast))
        }
        else if (message.toString() == "What is today degrees?"){
            ws.send("Today is: 10 degrees")
        }
        else {
            ws.send(`echo ${message}`)
        }
    })

    ws.send("hello forecast")
})

export default server