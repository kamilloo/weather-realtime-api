"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const superwstest_1 = __importDefault(require("superwstest"));
const ws_1 = __importDefault(require("../ws"));
const chai_1 = __importDefault(require("chai"));
const IncomingMessageType_1 = require("../Http/STOMP/IncomingMessageType");
describe('Websocket server', () => {
    beforeEach((done) => {
        ws_1.default.listen(0, 'localhost', done);
    });
    afterEach((done) => {
        ws_1.default.close(done);
    });
    it('it ask for current degree with day', () => __awaiter(void 0, void 0, void 0, function* () {
        let message = { type: IncomingMessageType_1.IncomingMessageType.FORECAST };
        yield (0, superwstest_1.default)(ws_1.default)
            .ws('/forecast')
            .expectText('hello forecast')
            .sendJson(message)
            .expectJson((outputMessage) => {
            let forecast = outputMessage.data;
            chai_1.default.expect(forecast.degrees).is.equal(10);
            chai_1.default.expect(forecast.filling).is.equal('warming');
            chai_1.default.expect(forecast.condition).is.equal('cloudy');
        })
            .close()
            .expectClosed();
    }));
});
