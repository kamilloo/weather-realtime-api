import request from 'superwstest';
import server from '../src/ws';

describe('Websocket server', () => {
    beforeEach((done) => {
        server.listen(0, 'localhost', done);
    });

    afterEach((done) => {
        server.close(done);
    });

    it('communicates via websockets', async () => {
        await request(server)
            .ws('/path/ws')
            .expectText('hello')
            .sendText('foo')
            .expectText('echo foo')
            .sendText('abc')
            .expectText('echo abc')
            .close()
            .expectClosed();
    });
});