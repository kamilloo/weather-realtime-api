import request from 'superwstest';
import server from '../ws';
import {IncomingMessage} from "../Http/STOMP/IncomingMessage";
import {Forecast} from "../models/Forecast";
import Chai from "chai"
import {IncomingMessageType} from "../Http/STOMP/IncomingMessageType";
import {OutputMessage} from "../Http/STOMP/OutputMessage";
import {Trend} from "../models/Trend";
import {TrendType} from "../Http/STOMP/TrendType";
import {Planning} from "../models/Planning";
import {PlaningType} from "../Http/STOMP/PlaningType";

describe('Websocket server', () => {
    beforeEach((done) => {
        server.listen(0, 'localhost', done);
    });

    afterEach((done) => {
        server.close(done);
    });

    it ('it ask for plan for weekend', async () => {
        let message = {type: IncomingMessageType.PLANNING} as IncomingMessage;
        await request(server)
            .ws('/trends')
            .expectText('hello forecast')
            .sendJson(<{}>message)
            .expectJson((outputMessage:OutputMessage) => {
                let forecast:Planning = <Planning>outputMessage.data;
                Chai.expect(forecast.type).is.equal(PlaningType.SUNBATH)
                Chai.expect(forecast.saturday.degrees).to.equal(30 )
                Chai.expect(forecast.saturday.condition).to.equal('Sunny' )
                Chai.expect(forecast.saturday.filling).to.equal('hot' )
                Chai.expect(forecast.sunday.degrees).to.equal(35 )
                Chai.expect(forecast.sunday.condition).to.equal('Sunny' )
                Chai.expect(forecast.sunday.filling).to.equal('very hot' )
            })
            .close()
            .expectClosed();
    });
});