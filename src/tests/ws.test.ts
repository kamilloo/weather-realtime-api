import request from 'superwstest';
import server from '../app/ws';

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
            .expectText('hello forecast')
            .close()
            .expectClosed();
    });
});