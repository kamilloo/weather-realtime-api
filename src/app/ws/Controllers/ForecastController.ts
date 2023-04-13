import {OutputMessage} from "../../http/STOMP/OutputMessage";
import {Forecast} from "../../models/Forecast";
import {IncomingMessageType} from "../../http/STOMP/IncomingMessageType";
import {IncomingMessage} from "../../http/STOMP/IncomingMessage";
import {ForecastService} from "../../../forecast/ForecastService";
import {ForecastDate} from "../../models/DTO/ForecastDate";
import {inject, injectable} from "inversify";
import {MessageController} from "./MessageController";

@injectable()
export class ForecastController implements MessageController {
    constructor(@inject(ForecastService) protected readonly forecast:ForecastService) {
    }
    async index(incomingMessageParams: IncomingMessage):Promise<OutputMessage>
    {
        let forecastDate:ForecastDate = incomingMessageParams.params;
        const forecast = await this.forecast.daily(forecastDate)
        return {
            type: IncomingMessageType.FORECAST,
            data: forecast,
        } as OutputMessage
    }
}