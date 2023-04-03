import {OutputMessage} from "../../Http/STOMP/OutputMessage";
import {Forecast} from "../../models/Forecast";
import {IncomingMessageType} from "../../Http/STOMP/IncomingMessageType";
import {IncomingMessage} from "../../Http/STOMP/IncomingMessage";
import {Trend} from "../../models/Trend";
import {TrendType} from "../../Http/STOMP/TrendType";

export class TrendController {
    index(incomingMessageParams: IncomingMessage):OutputMessage
    {
        const trend = {
            type: TrendType.RISING,
            days: [
                {
                    degrees: 10
                },
                {
                    degrees: 12
                },
            ],
        }
        return {
            type: IncomingMessageType.TRENDS,
            data: trend,
        } as OutputMessage
    }
}