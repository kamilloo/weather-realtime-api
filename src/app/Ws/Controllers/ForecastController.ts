import {OutputMessage} from "../../Http/STOMP/OutputMessage";
import {Forecast} from "../../models/Forecast";
import {IncomingMessageType} from "../../Http/STOMP/IncomingMessageType";
import {IncomingMessage} from "../../Http/STOMP/IncomingMessage";

export class ForecastController {
    index(incomingMessageParams: IncomingMessage):OutputMessage
    {
        const forecast = {
            degrees: 10,
            filling: 'warming',
            condition: 'cloudy'
        } as Forecast
        return {
            type: IncomingMessageType.FORECAST,
            data: forecast,
        } as OutputMessage
    }
}