import request from 'superwstest';
import server from '../ws';
import {IncomingMessage} from "../Http/STOMP/IncomingMessage";
import {Forecast} from "../models/Forecast";
import Chai from "chai"
import {IncomingMessageType} from "../Http/STOMP/IncomingMessageType";
import {OutputMessage} from "../Http/STOMP/OutputMessage";

describe('Websocket server', () => {
    beforeEach((done) => {
        server.listen(0, 'localhost', done);
    });

    afterEach((done) => {
        server.close(done);
    });

    it ('it ask for current degree with day', async () => {
        let message = {type: IncomingMessageType.FORECAST} as IncomingMessage;
        await request(server)
            .ws('/forecast')
            .expectText('hello forecast')
            .sendJson(<{}>message)
            .expectJson((outputMessage:OutputMessage) => {
                let forecast:Forecast = <Forecast>outputMessage.data;
                Chai.expect(forecast.degrees).is.equal(10)
                Chai.expect(forecast.filling).is.equal('warming')
                Chai.expect(forecast.condition).is.equal('cloudy')
            })
            .close()
            .expectClosed();
    });
});