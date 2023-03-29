import {IncomingMessageType} from "./IncomingMessageType";

export interface IncomingMessage {
    type: IncomingMessageType,
    params: {
        day: string
    }
}