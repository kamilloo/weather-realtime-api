import {IncomingMessage} from "../../http/STOMP/IncomingMessage";
import {OutputMessage} from "../../http/STOMP/OutputMessage";

export interface MessageController {
    index(incomingMessageParams: IncomingMessage):Promise<OutputMessage>
}