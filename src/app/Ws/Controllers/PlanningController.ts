import {OutputMessage} from "../../Http/STOMP/OutputMessage";
import {Forecast} from "../../models/Forecast";
import {IncomingMessageType} from "../../Http/STOMP/IncomingMessageType";
import {IncomingMessage} from "../../Http/STOMP/IncomingMessage";
import {Trend} from "../../models/Trend";
import {TrendType} from "../../Http/STOMP/TrendType";
import {PlaningType} from "../../Http/STOMP/PlaningType";
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