import {IncomingMessageType} from "../http/STOMP/IncomingMessageType";
import {ForecastController} from "./Controllers/ForecastController";
import {TrendController} from "./Controllers/TrendController";
import {PlanningController} from "./Controllers/PlanningController";
import {inject, injectable} from "inversify";
import Websocket from "ws";
import {MessageController} from "./Controllers/MessageController";
import {TodayController} from "./Controllers/TodayController";

@injectable()
export class WebSocketHandler {

    private handlers: { [type: string]: MessageController}

    constructor(
        @inject(ForecastController) private forecastController: ForecastController,
        @inject(TrendController) private trendController: TrendController,
        @inject(PlanningController) private planningController: PlanningController,
        @inject(TodayController) private todayController: TodayController,
    ) {
        this.handlers = {
            [IncomingMessageType.FORECAST]: forecastController,
            [IncomingMessageType.TRENDS]: trendController,
            [IncomingMessageType.PLANNING]: planningController,
            [IncomingMessageType.TODAY]: todayController,
        }
    }
    handle(type: IncomingMessageType):MessageController{
        const handler = this.handlers[type];
        if (handler){
            return handler
        }
        throw new Error(`Not found message type: ${type}`)
    }
}



