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
const ws_1 = __importDefault(require("../app/ws"));
const chai_1 = __importDefault(require("chai"));
const IncomingMessageType_1 = require("../app/Http/STOMP/IncomingMessageType");
const PlaningType_1 = require("../app/Http/STOMP/PlaningType");
describe('Websocket server', () => {
    beforeEach((done) => {
        ws_1.default.listen(0, 'localhost', done);
    });
    afterEach((done) => {
        ws_1.default.close(done);
    });
    it('it ask for plan for weekend', () => __awaiter(void 0, void 0, void 0, function* () {
        let message = { type: IncomingMessageType_1.IncomingMessageType.PLANNING };
        yield (0, superwstest_1.default)(ws_1.default)
            .ws('/trends')
            .expectText('hello forecast')
            .sendJson(message)
            .expectJson((outputMessage) => {
            let forecast = outputMessage.data;
            chai_1.default.expect(forecast.type).is.equal(PlaningType_1.PlaningType.SUNBATH);
            chai_1.default.expect(forecast.saturday.degrees).to.equal(30);
            chai_1.default.expect(forecast.saturday.condition).to.equal('Sunny');
            chai_1.default.expect(forecast.saturday.filling).to.equal('hot');
            chai_1.default.expect(forecast.sunday.degrees).to.equal(35);
            chai_1.default.expect(forecast.sunday.condition).to.equal('Sunny');
            chai_1.default.expect(forecast.sunday.filling).to.equal('very hot');
        })
            .close()
            .expectClosed();
    }));
});
