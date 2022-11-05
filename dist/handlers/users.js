"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../models/users");
const verifyToken_1 = __importDefault(require("../middlewares/verifyToken"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store = new users_1.UserStore();
// Function for showing all users function
const indexUsers = async (_request, response) => {
    try {
        const result = await store.index();
        response.json(result);
    }
    catch (error) {
        response.status(401);
        response.json(error);
    }
};
// Function for showing user function
const showUsers = async (request, response) => {
    try {
        const result = await store.show(request.params.username);
        response.json(result);
    }
    catch (error) {
        response.status(401);
        response.json(error);
    }
};
// Function for creating user function
const createUsers = async (request, response) => {
    const user = {
        username: request.body.username,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        password: request.body.password
    };
    try {
        const result = await store.create(user);
        var token = jsonwebtoken_1.default.sign({ user: result }, process.env.TOKEN_SECRET);
        response.json({ ...result, token: `Token ${token}` });
    }
    catch (error) {
        response.status(401);
        response.json(error);
    }
};
// Function for deleting user function
const deleteUsers = async (request, response) => {
    try {
        const result = await store.delete(request.params.id);
        response.json(result);
    }
    catch (error) {
        response.status(401);
        response.json(error);
    }
};
// Function for authenticate
const authenticate = async (request, response) => {
    try {
        const result = await store.authenticate(request.params.username, request.params.password);
        var token = jsonwebtoken_1.default.sign({ user: result }, process.env.TOKEN_SECRET);
        response.json({ ...result, token: `Token ${token}` });
    }
    catch (error) {
        response.status(401);
        response.json(error);
    }
};
const user_routers = (app) => {
    app.get('/users', indexUsers);
    app.get('/users/:username', verifyToken_1.default, showUsers);
    app.post('/users', createUsers);
    app.post('/users/authenticate', authenticate);
    app.delete('/users/delete/:id', verifyToken_1.default, deleteUsers);
};
exports.default = user_routers;
