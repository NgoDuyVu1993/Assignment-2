"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../models/products");
const verifyToken_1 = __importDefault(require("../middlewares/verifyToken"));
const store = new products_1.ProductStore();
// Function for showing all products function
const indexProducts = async (_request, response) => {
    try {
        const result = await store.index();
        response.json(result);
    }
    catch (error) {
        response.status(500);
        response.json(error);
    }
};
// Function for showing product function
const showProducts = async (request, response) => {
    try {
        const result = await store.show(request.params.id);
        response.json(result);
    }
    catch (error) {
        response.status(500);
        response.json(error);
    }
};
// Function for creating product function
const createProducts = async (request, response) => {
    const product = {
        name: request.body.name,
        price: request.body.price,
        category: request.body.category
    };
    try {
        const result = await store.create(product);
        response.json(result);
    }
    catch (error) {
        response.status(500);
        response.json(error);
    }
};
// Function for deleting product function
const deleteProducts = async (request, response) => {
    try {
        const result = await store.delete(request.params.id);
        response.json(result);
    }
    catch (error) {
        response.status(500);
        response.json(error);
    }
};
const product_rounters = (app) => {
    app.get('/products', verifyToken_1.default, indexProducts);
    app.get('/products/:id', verifyToken_1.default, showProducts);
    app.post('/products', verifyToken_1.default, createProducts);
    app.delete('/product/delete/:id', verifyToken_1.default, deleteProducts);
};
exports.default = product_rounters;
