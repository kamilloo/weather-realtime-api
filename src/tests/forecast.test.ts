import "reflect-metadata";
import request from 'superwstest';
import server from '../app/ws';
import {IncomingMessage} from "../Http/STOMP/IncomingMessage";
import {Forecast} from "../app/models/Forecast";
import Chai from "chai"
import {IncomingMessageType} from "../Http/STOMP/IncomingMessageType";
import {OutputMessage} from "../Http/STOMP/OutputMessage";
import {FillingType} from "../forecast/descriptors/FillingType";
import {ConditionType} from "../forecast/descriptors/ConditionType";

describe('Websocket server', () => {
    beforeEach((done) => {
        server.listen(0, 'localhost', done);
    });

    afterEach((done) => {
        server.close(done);
    });

    it ('it sent default forecast when ask invalid', async () => {
        let message = "invalid ask"

        await request(server)
            .ws('/forecast')
            .expectText("hello forecast")
            .sendText(message)
            .expectText("Today is: 10 degrees")
            .close()
            .expectClosed()
    });

    it ('it ask for current degree with day', async () => {
        let message = {
            type: IncomingMessageType.FORECAST,
            params: {
                date: '2000-01-01'
            }
        } as IncomingMessage;
        await request(server)
            .ws('/forecast')
            .expectText('hello forecast')
            .sendJson(<any>message)
            .expectJson((outputMessage:OutputMessage) => {
                let forecast:Forecast = <Forecast>outputMessage.data;
                Chai.expect(forecast.degrees).is.equal(11.1)
                Chai.expect(forecast.filling).is.equal(FillingType.MODERATE)
                Chai.expect(forecast.condition).is.equal(ConditionType.SUN)
            })
            .close()
            .expectClosed();
    });
});