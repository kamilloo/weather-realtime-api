import {IncomingMessageType} from "../Http/STOMP/IncomingMessageType";
import {ForecastController} from "./Controllers/ForecastController";
import {TrendController} from "./Controllers/TrendController";
import {PlanningController} from "./Controllers/PlanningController";
import {inject, injectable} from "inversify";
import Websocket from "ws";
import {MessageController} from "./Controllers/MessageController";

@injectable()
export class WebSocketHandler {

    private handlers: { [type: string]: MessageController}

    constructor(
        @inject(ForecastController) private forecastController: ForecastController,
        @inject(TrendController) private trendController: TrendController,
        @inject(PlanningController) private planningController: PlanningController,
    ) {
        this.handlers = {
            [IncomingMessageType.FORECAST]: forecastController,
            [IncomingMessageType.TRENDS]: trendController,
            [IncomingMessageType.PLANNING]: planningController
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



