import http from "http";
import Websocket from 'ws';
import {IncomingMessage} from "../Http/STOMP/IncomingMessage";
import {Forecast} from "./models/Forecast";
import {WebSocketHandler} from "./Ws/WebSocketHandler";
import {JsonParser} from "./Ws/middlewares/JsonParser";
import {Container} from "inversify";
import {MessageController} from "./Ws/Controllers/MessageController";
import {ForecastController} from "./Ws/Controllers/ForecastController";
import {ForecastService} from "../forecast/ForecastService";
import {TrendController} from "./Ws/Controllers/TrendController";
import {PlanningController} from "./Ws/Controllers/PlanningController";
import TYPES from "../type";
import {IForecastApi} from "../forecast/contracts/IForecastApi";
import {FakeApi} from "../forecast/fake/FakeApi";
import {DailyForecastParser} from "../forecast/DailyForecastParser";

const server = http.createServer();
const wss = new Websocket.Server({server})

const container = new Container()
container.bind<MessageController>(ForecastController).to(ForecastController);
container.bind<MessageController>(TrendController).to(TrendController);
container.bind<PlanningController>(PlanningController).to(PlanningController);
container.bind<WebSocketHandler>(WebSocketHandler).to(WebSocketHandler)
container.bind<ForecastService>(ForecastService).to(ForecastService)
container.bind<IForecastApi>(TYPES.FakeApi).to(FakeApi)
container.bind<DailyForecastParser>(DailyForecastParser).to(DailyForecastParser)

const handler = container.get<WebSocketHandler>(WebSocketHandler);


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