"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../models/products");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const request = (0, supertest_1.default)(server_1.default);
const product = new products_1.ProductStore();
let testUser;
const productTest_1 = {
    name: "Nokia",
    price: 8000,
    category: "Electronic",
};
const productTest_2 = {
    name: "Samsung Galaxy",
    price: 12000,
    category: "Electronic",
};
describe('Test Product Model Method Exists', () => {
    beforeAll(async () => {
        testUser = await request.post('/users').send({
            username: 'test-user',
            firstName: 'Ngo',
            lastName: 'Duy Vu',
            password: '12312'
        });
    });
    // Test index function exist
    it('Should have an index method', () => {
        expect(product.index).toBeDefined();
    });
    // Test show function exist
    it('Should have a show method', () => {
        expect(product.show).toBeDefined();
    });
    // Test create function exist
    it('Should have a create method', () => {
        expect(product.create).toBeDefined();
    });
    // Test delete function exist
    it('Should have an delete method', () => {
        expect(product.delete).toBeDefined();
    });
});
describe('Test Product Model Method Functional', () => {
    it('Should create a product', async () => {
        const result = await product.create(productTest_1);
        expect(result.name).toEqual(productTest_1.name);
    });
    it('Should have product in the table', async () => {
        const result = await product.index();
        expect(result.length).toBeGreaterThan(0);
    });
    it('Should get product which has ID 1', async () => {
        const result = await product.show(2);
        expect(result?.name).toEqual(productTest_1.name);
    });
    it('Should Delete product which has ID 4', async () => {
        product.delete(4);
        const result = await product.index();
        expect(result.length).toEqual(3);
    });
});
describe('Test Product API Endpoint Response', () => {
    // Test Create New Product
    it('Should create a product in the Endpoint', async () => {
        const response = await request
            .post('/products')
            .send(productTest_2)
            .set({ Authorization: JSON.parse(testUser.text).token });
        expect(response.status).toEqual(200);
    });
    // Test Get Product by Id
    it('Should get product by ID in the Endpoint', async () => {
        const response = await request
            .get('/products/3')
            .set({ Authorization: JSON.parse(testUser.text).token });
        const result = JSON.parse(response.text);
        expect(result.name).toEqual('Iphone');
        expect(result.price).toEqual(24000);
        expect(result.category).toEqual('Electronic');
    });
    // Test Get All Product
    it('Should list product in the Endpoint', async () => {
        const response = await request
            .get('/products/')
            .set({ Authorization: JSON.parse(testUser.text).token });
        const result = JSON.parse(response.text);
        expect(result.length).toBeTruthy();
    });
    // Test Delete Product by Id
    it('Should delete a product in the Endpoint', async () => {
        const response = await request
            .delete('/product/delete/3')
            .set({ Authorization: JSON.parse(testUser.text).token });
        expect(response.status).toEqual(200);
    });
});
