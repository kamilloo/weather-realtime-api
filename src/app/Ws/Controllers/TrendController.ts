import {OutputMessage} from "../../../Http/STOMP/OutputMessage";
import {Forecast} from "../../models/Forecast";
import {IncomingMessageType} from "../../../Http/STOMP/IncomingMessageType";
import {IncomingMessage} from "../../../Http/STOMP/IncomingMessage";
import {Trend} from "../../models/Trend";
import {TrendType} from "../../../Http/STOMP/TrendType";
import {injectable} from "inversify";
import {MessageController} from "./MessageController";

@injectable()
export class TrendController implements MessageController{
    async index(incomingMessageParams: IncomingMessage):Promise<OutputMessage>
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