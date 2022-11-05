"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../users");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
const user = new users_1.UserStore();
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
        expect(user.index).toBeDefined();
    });
    it('Should have a show method', () => {
        expect(user.show).toBeDefined();
    });
    it('Should have a create method', () => {
        expect(user.create).toBeDefined();
    });
    it('Should have a delete method', () => {
        expect(user.delete).toBeDefined();
    });
    // it('Create method should add a user', async() => {
    //     const result = await user.create({
    //         username: 'full_stack_user',
    //         firstName: 'Jack',
    //         lastName: 'Sarrow',
    //         password: 'password123'
    //     });
    //     expect(result).toBeTrue();
    // });
});
