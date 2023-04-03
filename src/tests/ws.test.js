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
describe('Websocket server', () => {
    beforeEach((done) => {
        ws_1.default.listen(0, 'localhost', done);
    });
    afterEach((done) => {
        ws_1.default.close(done);
    });
    it('communicates via websockets', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, superwstest_1.default)(ws_1.default)
            .ws('/path/ws')
            .expectText('hello forecast')
            .close()
            .expectClosed();
    }));
});
