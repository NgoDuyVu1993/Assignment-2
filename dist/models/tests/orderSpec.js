"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../orders");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
const order = new orders_1.OrderStore();
let testUser;
describe('Order Model', () => {
    beforeAll(async () => {
        testUser = await request.post('/users').send({
            username: 'test-user',
            firstName: 'Ngo',
            lastName: 'Duy Vu',
            password: '12312'
        });
    });
    it('Should have an index method', () => {
        expect(order.index).toBeDefined();
    });
    it('Should have a show method', () => {
        expect(order.show).toBeDefined();
    });
    it('Should have a create method', () => {
        expect(order.create).toBeDefined();
    });
    it('Should have a delete method', () => {
        expect(order.delete).toBeDefined();
    });
    // it('Create method should add an order', async() => {
    //     const result = await order.create({
    //         id: 1,
    //         quantity: 1,
    //         status: "Expired",
    //         user_id: 1,
    //     });
    //     expect(result).toEqual([{
    //         id: 1,
    //         quantity: 1,
    //         status: "Expired",
    //         user_id: 1,
    //     }]);
    // })
});
