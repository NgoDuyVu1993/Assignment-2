"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../models/orders");
const products_1 = require("../models/products");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const request = (0, supertest_1.default)(server_1.default);
const order = new orders_1.OrderStore();
const products = new products_1.ProductStore();
let testUser;
const orderTest_1 = {
    quantity: 1,
    status: 'Sold',
    user_id: '1',
    product_id: '1'
};
const orderTest_2 = {
    quantity: 4,
    status: 'Out of Stock',
    user_id: 2,
    product_id: '1'
};
const orderUpdate = {
    id: 1,
    quantity: 4,
    status: '',
    user_id: 2,
    product_id: 2,
};
describe('Test Order Model Method Exists', () => {
    beforeAll(async () => {
        await products.create({
            name: "Xiaomi MI 11",
            price: 8000,
            category: "Electronic",
        });
        testUser = await request.post('/users').send({
            username: 'test-user-a',
            firstName: 'Ngo',
            lastName: 'Duy Vu',
            password: '12312'
        });
        // Test User and Product for Update Order function
        let testUser_2 = await request.post('/users').send({
            username: 'test-user-b',
            firstName: 'Hoang',
            lastName: 'Thuy Linh',
            password: 'The Creeking'
        });
        let testProduct = await products.create({
            name: "Nokia",
            price: 4000,
            category: "Electronic",
        });
    });
    afterAll(async () => {
        await request
            .delete('/users/delete/2')
            .set({ Authorization: JSON.parse(testUser.text).token });
    });
    // Test index function exist
    it('Should have an index method', () => {
        expect(order.index).toBeDefined();
    });
    // Test show function exist
    it('Should have a show method', () => {
        expect(order.show).toBeDefined();
    });
    // Test create function exist 
    it('Should have a create method', () => {
        expect(order.create).toBeDefined();
    });
    // Test delete function exist  
    it('Should have a delete method', () => {
        expect(order.delete).toBeDefined();
    });
    //  Update Order  // 
    // Test update order quantity function exist
    it('Should have a updateQuantity method', () => {
        expect(order.updateQuantity).toBeDefined();
    });
    // Test update order userId function exist
    it('Should have a updateUserId method', () => {
        expect(order.updateUserId).toBeDefined();
    });
    // Test update order productId function exist
    it('Should have a updateProductId method', () => {
        expect(order.updateProductId).toBeDefined();
    });
});
describe('Test Order Model Method Functional', () => {
    it('Should create an order', async () => {
        const result = await order.create(orderTest_1);
        expect(result.quantity).toEqual(orderTest_1.quantity);
        expect(result.status).toEqual(orderTest_1.status);
    });
    it('Should have order in the table', async () => {
        const result = await order.index();
        expect(result.length).toBeGreaterThan(0);
    });
    it('Should get product which has userID 1', async () => {
        const result = await order.show(1);
        expect(result.user_id).toEqual(orderTest_1.user_id);
    });
    it('Should Add 4 to the order which has quality 1', async () => {
        await order.updateQuantity(orderUpdate.id, orderUpdate.quantity);
        const check = await order.show(1);
        expect(check.quantity).toEqual(5);
    });
    it('Should Change userId of the order', async () => {
        await order.updateUserId(orderUpdate.id, orderUpdate.user_id);
        const check = await order.show(2);
        expect(check.user_id).toEqual('2');
    });
    it('Should Change productId of the order', async () => {
        await order.updateProductId(orderUpdate.id, orderUpdate.user_id);
        const check = await order.show(2);
        expect(check.product_id).toEqual('2');
    });
    it('Should Delete product which has userID 1', async () => {
        await order.delete(1);
        const result = await order.show(1);
        ;
        expect(result).toBeUndefined();
    });
});
describe('Test Order API Endpoint Response', () => {
    beforeAll(async () => {
        testUser = await request.post('/users').send({
            username: 'test-user-b',
            firstName: 'Joe',
            lastName: 'Rogan',
            password: 'Elon Mush'
        });
        let testUser_2 = await request.post('/users').send({
            username: 'test-user-c',
            firstName: 'Johnny',
            lastName: 'Harris',
            password: 'Energy Crisis'
        });
        let testProduct = await products.create({
            name: "Iphone",
            price: 24000,
            category: "Electronic",
        });
    });
    // Test Create New Order
    it('Should create an order in the Endpoint', async () => {
        const response = await request
            .post('/orders')
            .send(orderTest_2)
            .set({ Authorization: JSON.parse(testUser.text).token });
        expect(response.status).toEqual(200);
    });
    // Test Get Order by Id
    it('Should get order that has userID 2 in the Endpoint', async () => {
        const response = await request
            .get('/orders/2')
            .set({ Authorization: JSON.parse(testUser.text).token });
        const result = JSON.parse(response.text);
        expect(result.quantity).toEqual(5);
        expect(result.status).toEqual('Sold');
        expect(result.user_id).toEqual('2');
    });
    // Test Get All Orders
    it('Should list order in the Endpoint', async () => {
        const response = await request
            .get('/orders/')
            .set({ Authorization: JSON.parse(testUser.text).token });
        const result = JSON.parse(response.text);
        expect(result.length).toBeTruthy();
    });
    // Test Update Order Quantity
    it('Should Update order quantity in the Endpoint', async () => {
        await request
            .post('/orders/update/quantity/')
            .send(orderUpdate)
            .set({ Authorization: JSON.parse(testUser.text).token });
        const response = await request
            .get('/orders/2')
            .set({ Authorization: JSON.parse(testUser.text).token });
        const result = JSON.parse(response.text);
        expect(result.quantity).toEqual(4);
    });
    // Test Update Order UserId
    it('Should Update userId of the order in the Endpoint', async () => {
        await request
            .post('/orders/update/userId/')
            .send(orderUpdate)
            .set({ Authorization: JSON.parse(testUser.text).token });
        const response = await request
            .get('/orders/2')
            .set({ Authorization: JSON.parse(testUser.text).token });
        const result = JSON.parse(response.text);
        expect(result.user_id).toEqual('2');
    });
    // Test Update Order ProductId
    it('Should Update productId of the order in the Endpoint', async () => {
        await request
            .post('/orders/update/productId/')
            .send(orderUpdate)
            .set({ Authorization: JSON.parse(testUser.text).token });
        const response = await request
            .get('/orders/2')
            .set({ Authorization: JSON.parse(testUser.text).token });
        const result = JSON.parse(response.text);
        expect(result.product_id).toEqual('1');
    });
    // Test Delete Order by Id
    it('Should delete a order in the Endpoint', async () => {
        const response = await request
            .delete('/orders/delete/2')
            .set({ Authorization: JSON.parse(testUser.text).token });
        expect(response.status).toEqual(200);
    });
});
