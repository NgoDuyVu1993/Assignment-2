"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../models/orders");
const verifyToken_1 = __importDefault(require("../middlewares/verifyToken"));
const store = new orders_1.OrderStore();
// Function for showing all orders function
const indexOrders = async (_request, response) => {
    try {
        const result = await store.index();
        response.json(result);
    }
    catch (error) {
        response.status(500);
        response.json(error);
    }
};
// Function for showing order function
const showOrders = async (request, response) => {
    try {
        const result = await store.show(request.params.id);
        response.json(result);
    }
    catch (error) {
        response.status(500);
        response.json(error);
    }
};
// Function for creating order function
const createOrders = async (request, response) => {
    const order = {
        quantity: request.body.quantity,
        status: request.body.status,
        user_id: request.body.user_id,
        product_id: request.body.product_id
    };
    try {
        const result = await store.create(order);
        response.json(result);
    }
    catch (error) {
        response.status(500);
        response.json(error);
    }
};
// Function for deleting order function
const deleteOrders = async (request, response) => {
    try {
        const result = await store.delete(request.body.id);
        response.json(result);
    }
    catch (error) {
        response.status(500);
        response.json(error);
    }
};
//  Update Existing order function  //
// Add quantity to an existing product
const updateOrderQuantity = async (request, response) => {
    try {
        const result = await store.updateQuantity(request.body.id, request.body.quantity);
        response.json(result);
    }
    catch (error) {
        response.status(500);
        response.json(error);
    }
};
// Update new UserId  to an existing product
const updateOrderUserId = async (request, response) => {
    try {
        const result = await store.updateUserId(request.body.id, request.body.user_id);
        response.json(result);
    }
    catch (error) {
        response.status(500);
        response.json(error);
    }
};
// Update new UserId  to an existing product
const updateOrderProductId = async (request, response) => {
    try {
        const result = await store.updateProductId(request.body.id, request.body.product_id);
        response.json(result);
    }
    catch (error) {
        response.status(500);
        response.json(error);
    }
};
const order_routes = (app) => {
    app.get('/orders/', verifyToken_1.default, indexOrders);
    app.get('/orders/:id', verifyToken_1.default, showOrders);
    app.post('/orders', verifyToken_1.default, createOrders);
    app.delete('/orders/delete/:id', verifyToken_1.default, deleteOrders);
    app.post('/orders/update/quantity/', verifyToken_1.default, updateOrderQuantity);
    app.post('/orders/update/userId/', verifyToken_1.default, updateOrderUserId);
    app.post('/orders/update/productId/', verifyToken_1.default, updateOrderProductId);
};
exports.default = order_routes;
