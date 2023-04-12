import {IncomingMessage} from "../../../Http/STOMP/IncomingMessage";
import {OutputMessage} from "../../../Http/STOMP/OutputMessage";

export interface MessageController {
    index(incomingMessageParams: IncomingMessage):Promise<OutputMessage>
}