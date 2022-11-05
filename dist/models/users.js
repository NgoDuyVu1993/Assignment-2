"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = process.env.SALT_ROUNDS;
const pepper = process.env.BCRYPT_PASSWORD;
class UserStore {
    // List all of the Orders
    async index() {
        if (database_1.default) {
            try {
                // Success connect with the database
                const sql = 'SELECT * FROM users';
                const conn = await database_1.default.connect();
                const result = await conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (error) {
                // Cannot communicate with table Users
                throw new Error(`Could not get users. Error: ${error}.`);
            }
        }
        else {
            // Cannot connect with the database
            throw new Error(`Could not connect to the database!`);
        }
    }
    // Retrieve Users by username
    async show(username) {
        if (database_1.default) {
            // Success connect with the database
            try {
                const sql = 'SELECT * FROM users WHERE username = ($1)';
                const conn = await database_1.default.connect();
                const result = await conn.query(sql, [username]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                // Cannot communicate with table Users
                throw new Error(`Could not get the user ${username}. Error: ${error}.`);
            }
        }
        else {
            // Cannot connect with the database
            throw new Error(`Could not connect to the database!`);
        }
    }
    // Create a new User
    async create(user) {
        if (database_1.default) {
            // Success connect with the database
            try {
                const sql = 'INSERT INTO users (username, firstName, lastName, password) VALUES ($1, $2, $3, $4) RETURNING *';
                const conn = await database_1.default.connect();
                const hash = bcrypt_1.default.hashSync(user.password + pepper, parseInt(saltRounds));
                const result = await conn.query(sql, [
                    user.username,
                    user.firstName,
                    user.lastName,
                    hash
                ]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                // Cannot communicate with table Users
                throw new Error(`Could not create user ${user.firstName} ${user.firstName}. Error: ${error}.`);
            }
        }
        else {
            // Cannot connect with the database
            throw new Error(`Could not connect to the database!`);
        }
    }
    // Delete an User by id
    async delete(id) {
        if (database_1.default) {
            // Success connect with the database
            try {
                const sql = 'DELETE FROM users WHERE username = ($1)';
                const conn = await database_1.default.connect();
                const result = await conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                // Cannot communicate with table Users
                throw new Error(`Could not delete the user with id ${id}. Error:  ${error}.`);
            }
        }
        else {
            // Cannot connect with the database
            throw new Error(`Could not connect to the database!`);
        }
    }
    // Authenticate by username and password for login
    async authenticate(username, password) {
        if (database_1.default) {
            try {
                const sql = 'SELECT password FROM users WHERE username=($1)';
                const conn = await database_1.default.connect();
                const result = await conn.query(sql, [username]);
                conn.release();
                if (result.rows.length > 0) {
                    // Check Password Length
                    const user = result.rows[0];
                    const password_checker = bcrypt_1.default.compareSync(password + pepper, user.password);
                    if (password_checker) {
                        console.log('The credential was Successfully to verify!');
                        return user;
                    }
                    else {
                        console.log('The credential was Failed to verify!');
                        return null;
                    }
                }
                return null;
            }
            catch (error) {
                // Cannot Authenticate User
                throw new Error(`Could not Authenticate user ${username}. Error:  ${error}.`);
            }
        }
        else {
            // Cannot connect with the database
            throw new Error(`Could not connect to the database!`);
        }
    }
}
exports.UserStore = UserStore;
