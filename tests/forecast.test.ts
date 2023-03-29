import request, {ReceivedMessage} from 'superwstest';
import server from '../src/ws';
import {Message} from "../src/Http/STOMP/Message";
import {Forecast} from "../src/models/Forecast";
import Chai from "chai"

describe('Websocket server', () => {
    beforeEach((done) => {
        server.listen(0, 'localhost', done);
    });

    afterEach((done) => {
        server.close(done);
    });

    it ('it ask for current degree with day', async () => {
        let message = {day: 'monday'} as Message;
        await request(server)
            .ws('/forecast')
            .expectText('hello forecast')
            .sendJson(<{}>message)
            .expectJson((forecast:Forecast) => {
                Chai.expect(forecast.degrees).is.equal(10)
                Chai.expect(forecast.filling).is.equal('warming')
                Chai.expect(forecast.condition).is.equal('cloudy')

            })
            .close()
            .expectClosed();
    });
});