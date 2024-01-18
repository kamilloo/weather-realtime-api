import "reflect-metadata";
import request from 'superwstest';
import server from '../app/ws';
import {IncomingMessage} from "../app/http/STOMP/IncomingMessage";
import {Forecast} from "../app/models/Forecast";
import Chai from "chai"
import {IncomingMessageType} from "../app/http/STOMP/IncomingMessageType";
import {OutputMessage} from "../app/http/STOMP/OutputMessage";
import {FillingType} from "../forecast/descriptors/FillingType";
import {ConditionType} from "../forecast/descriptors/ConditionType";

describe('Today forecast', () => {
    beforeEach((done) => {
        server.listen(0, 'localhost', done);
    });

    afterEach((done) => {
        server.close(done);
    });

    it ('it return current weather with day', async () => {
        let message = {
            type: IncomingMessageType.TODAY,
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