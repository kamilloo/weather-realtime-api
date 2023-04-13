import {OutputMessage} from "../../http/STOMP/OutputMessage";
import {Forecast} from "../../models/Forecast";
import {IncomingMessageType} from "../../http/STOMP/IncomingMessageType";
import {IncomingMessage} from "../../http/STOMP/IncomingMessage";
import {Trend} from "../../models/Trend";
import {TrendType} from "../../http/STOMP/TrendType";
import {PlaningType} from "../../http/STOMP/PlaningType";
import {Planning} from "../../models/Planning";
import Chai from "chai";
import {MessageController} from "./MessageController";
import {injectable} from "inversify";

@injectable()
export class PlanningController implements MessageController{
    async index(incomingMessageParams: IncomingMessage):Promise<OutputMessage>
    {
        const saturday:Forecast = {
            degrees: 30,
            condition: 'Sunny',
            filling: 'hot',
        }

        const sunday:Forecast = {
            degrees: 35,
            condition: 'Sunny',
            filling: 'very hot',
        }
        const planing = {
            type: PlaningType.SUNBATH,
            saturday: saturday,
            sunday: sunday,
        } as Planning
        return {
            type: IncomingMessageType.PLANNING,
            data: planing,
        } as OutputMessage
    }
}