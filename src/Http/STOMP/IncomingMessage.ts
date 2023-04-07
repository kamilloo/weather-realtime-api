import {IncomingMessageType} from "./IncomingMessageType";

export interface IncomingMessage {
    type: IncomingMessageType,
    params: {
        date: string
    }
}