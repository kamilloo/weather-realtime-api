import request from 'superwstest';
import server from '../ws';
import {IncomingMessage} from "../Http/STOMP/IncomingMessage";
import {Forecast} from "../models/Forecast";
import Chai from "chai"
import {IncomingMessageType} from "../Http/STOMP/IncomingMessageType";
import {OutputMessage} from "../Http/STOMP/OutputMessage";
import {Trend} from "../models/Trend";
import {TrendType} from "../Http/STOMP/TrendType";

describe('Websocket server', () => {
    beforeEach((done) => {
        server.listen(0, 'localhost', done);
    });

    afterEach((done) => {
        server.close(done);
    });

    it ('it ask for current trends in periods', async () => {
        let message = {type: IncomingMessageType.TRENDS} as IncomingMessage;
        await request(server)
            .ws('/trends')
            .expectText('hello forecast')
            .sendJson(<{}>message)
            .expectJson((outputMessage:OutputMessage) => {
                let forecast:Trend = <Trend>outputMessage.data;
                Chai.expect(forecast.type).is.equal(TrendType.RISING)
                Chai.expect(forecast.days).is.length(2)
                Chai.expect(forecast.days.shift()?.degrees).to.equal(10 )
                Chai.expect(forecast.days.shift()?.degrees).to.equal(12 )
            })
            .close()
            .expectClosed();
    });
});