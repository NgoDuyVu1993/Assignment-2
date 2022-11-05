"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../models/users");
const bcrypt_1 = __importDefault(require("bcrypt"));
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const request = (0, supertest_1.default)(server_1.default);
const user = new users_1.UserStore();
let testUser_1;
const testUser_2 = {
    username: 'test-user-2',
    firstName: 'Milly',
    lastName: 'Alcock',
    password: 'House-of-Dragon'
};
const testUser_3 = {
    username: 'test-user-3',
    firstName: 'Emma',
    lastName: 'Zia D’Arcy',
    password: 'Game-of-Thrones'
};
describe('Test User Model Method Exists', () => {
    beforeAll(async () => {
        testUser_1 = await request.post('/users').send({
            username: 'test-user-1',
            firstName: 'Ngo',
            lastName: 'Duy Vu',
            password: '12312'
        });
    });
    // Test index function exist
    it('Should have an index method', () => {
        expect(user.index).toBeDefined();
    });
    // Test show function exist
    it('Should have a show method', () => {
        expect(user.show).toBeDefined();
    });
    // Test create function exist
    it('Should have a create method', () => {
        expect(user.create).toBeDefined();
    });
    // Test delete function exist
    it('Should have a delete method', () => {
        expect(user.delete).toBeDefined();
    });
    // Test Authenticate function exist
    it('Should have a authenticate method', () => {
        expect(user.authenticate).toBeDefined();
    });
});
describe('Test User Model Method Functional', () => {
    it('Should create the user test-user-2 and encryp password', async () => {
        const spy = spyOn(bcrypt_1.default, 'hashSync').and.callThrough();
        const result = await user.create(testUser_2);
        expect(result.username).toEqual(testUser_2.username);
        expect(spy).toHaveBeenCalled();
    });
    it('Should have user in the table', async () => {
        const result = await user.index();
        expect(result.length).toBeGreaterThan(0);
    });
    it('Should get username test-user-2', async () => {
        const result = await user.show('test-user-2');
        expect(result.username).toEqual('test-user-2');
    });
    it('Should delete test-user-2', async () => {
        await user.delete('test-user-2');
        const result = await user.show('test-user-2');
        expect(result).toBeUndefined(); // Should test-user-2 not exist in the table
    });
});
describe('Test User API Endpoint Response', () => {
    // Test Create New User
    it('Should create a user in the Endpoint', async () => {
        const response = await request
            .post('/users')
            .send(testUser_3)
            .set({ Authorization: JSON.parse(testUser_1.text).token });
        expect(response.status).toEqual(200);
    });
    // Test Get User by username
    it('Should get user by ID in the Endpoint', async () => {
        const response = await request
            .get('/users/test-user-3')
            .set({ Authorization: JSON.parse(testUser_1.text).token });
        const result = JSON.parse(response.text);
        expect(result.username).toEqual('test-user-3');
    });
    // Test Get All Users
    it('Should list product in the Endpoint', async () => {
        const response = await request.get('/users').set({ Authorization: JSON.parse(testUser_1.text).token });
        const result = JSON.parse(response.text);
        expect(result.length).toBeTruthy();
    });
    // Test Authenticate Fail
    it('Should authenticate fail', async () => {
        const result = await user.authenticate(testUser_3.username, 'wrong password');
        expect(result).toBeFalsy();
    });
    // Test Authenticate Pass
    it('Should authenticate an user', async () => {
        const response = await request
            .post('/users/authenticate')
            .send({ username: 'test-user-4', password: 'assignment 2' });
        const result = JSON.parse(response.text);
        expect(result.token).toBeTruthy();
    });
    // Test Delete User by Id
    it('Should return 200 when delete user', async () => {
        const response = await request
            .delete('/users/delete/1')
            .set({ Authorization: JSON.parse(testUser_1.text).token });
        expect(response.statusCode).toBe(200);
    });
});
