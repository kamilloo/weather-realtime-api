import {OutputMessage} from "../../../Http/STOMP/OutputMessage";
import {Forecast} from "../../models/Forecast";
import {IncomingMessageType} from "../../../Http/STOMP/IncomingMessageType";
import {IncomingMessage} from "../../../Http/STOMP/IncomingMessage";
import {ForecastService} from "../../../forecast/ForecastService";
import {ForecastDate} from "../../models/DTO/ForecastDate";

export class ForecastController {
    constructor(protected readonly forecast:ForecastService) {
    }
    index(incomingMessageParams: IncomingMessage):OutputMessage
    {
        let forecastDate:ForecastDate = incomingMessageParams.params;
        const forecast = this.forecast.daily(forecastDate)
        return {
            type: IncomingMessageType.FORECAST,
            data: forecast,
        } as OutputMessage
    }
}