import {IncomingMessageType} from "../Http/STOMP/IncomingMessageType";
import {ForecastController} from "./Controllers/ForecastController";

export class Handler {
    handle(type: IncomingMessageType):ForecastController{
        return new ForecastController()
    }
}