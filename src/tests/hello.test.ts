import {expect} from 'chai';
import app from '../app';
import {agent as request} from 'supertest';


describe("Index Test", () => {
    it('should POST /api/todo v2', async function () {
        const res = await request(app)
            .post('/api/todo').send({todo: "first todo"});
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body.data).not.to.be.empty;
        expect(res.body.data).to.be.an("object");
        expect(res.body.error).to.be.empty;
    });
    it('should GET /api/todo', async function () {
        const res = await request(app).get('/api/todo');
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body.data).not.to.be.empty;
        expect(res.body.data.message).to.be.equal('Hello');
        expect(res.body.error).to.be.null;
    });

});

