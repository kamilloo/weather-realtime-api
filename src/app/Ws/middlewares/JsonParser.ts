import Websocket from "ws";

export class JsonParser {
     public json = function (raw:Websocket.RawData){
        try {
            return JSON.parse(raw.toString())
        }
        catch (err){
            return {}
        }
    }
}