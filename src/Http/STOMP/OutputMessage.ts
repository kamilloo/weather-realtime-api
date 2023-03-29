import {IncomingMessageType} from "./IncomingMessageType";

export interface OutputMessage {
    type: IncomingMessageType,
    data?: {}
    error?: {}
}