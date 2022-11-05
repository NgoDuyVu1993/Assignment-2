"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../products");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
const product = new products_1.ProductStore();
let testUser;
describe('Product Model', () => {
    beforeAll(async () => {
        testUser = await request.post('/users').send({
            username: 'test-user',
            firstName: 'Ngo',
            lastName: 'Duy Vu',
            password: '12312'
        });
    });
    it('Should have an index method', () => {
        expect(product.index).toBeDefined();
    });
    it('Should have a show method', () => {
        expect(product.show).toBeDefined();
    });
    it('Should have a create method', () => {
        expect(product.create).toBeDefined();
    });
    it('Should have an delete method', () => {
        expect(product.delete).toBeDefined();
    });
    // it('Create method should add a product', async() =>{
    //     const result = await product.create({
    //         id: 1,
    //         name: "Samsung Galaxy S10",
    //         price: 14000,
    //         category: 'Electronic',
    //     });
    // });
});
