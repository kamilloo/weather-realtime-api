import request from 'superwstest';
import server from '../src/ws';
import {IncomingMessage} from "../src/Http/STOMP/IncomingMessage";
import {Forecast} from "../src/models/Forecast";
import Chai from "chai"
import {IncomingMessageType} from "../src/Http/STOMP/IncomingMessageType";
import {OutputMessage} from "../src/Http/STOMP/OutputMessage";
import {Trend} from "../src/models/Trend";
import {TrendType} from "../src/Http/STOMP/TrendType";

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