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
const chai_1 = require("chai");
const app_1 = __importDefault(require("../app/app"));
const supertest_1 = require("supertest");
describe("Index Test", () => {
    it('should POST /api/todo v2', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield (0, supertest_1.agent)(app_1.default)
                .post('/api/todo').send({ todo: "first todo" });
            (0, chai_1.expect)(res.status).to.equal(200);
            (0, chai_1.expect)(res.body).not.to.be.empty;
            (0, chai_1.expect)(res.body.data).not.to.be.empty;
            (0, chai_1.expect)(res.body.data).to.be.an("object");
            (0, chai_1.expect)(res.body.error).to.be.empty;
        });
    });
    it('should GET /api/todo', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield (0, supertest_1.agent)(app_1.default).get('/api/todo');
            (0, chai_1.expect)(res.status).to.equal(200);
            (0, chai_1.expect)(res.body).not.to.be.empty;
            (0, chai_1.expect)(res.body.data).not.to.be.empty;
            (0, chai_1.expect)(res.body.data.message).to.be.equal('Hello');
            (0, chai_1.expect)(res.body.error).to.be.null;
        });
    });
});
