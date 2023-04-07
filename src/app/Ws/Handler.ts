import {IncomingMessageType} from "../../Http/STOMP/IncomingMessageType";
import {ForecastController} from "./Controllers/ForecastController";
import {TrendController} from "./Controllers/TrendController";
import {PlanningController} from "./Controllers/PlanningController";

export class Handler {
    handle(type: IncomingMessageType):ForecastController{
        switch (type) {
            case IncomingMessageType.FORECAST:
                return new ForecastController()
            case IncomingMessageType.TRENDS:
                return new TrendController()
            case IncomingMessageType.PLANNING:
                return new PlanningController()
        }

        throw new Error(`Not found message type: ${type}`)
    }
}