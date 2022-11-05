"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
    // List all of the Orders
    async index() {
        if (database_1.default) {
            try {
                // Success connect with the database
                const sql = 'SELECT * FROM orders';
                const conn = await database_1.default.connect();
                const result = await conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (error) {
                // Cannot communicate with table Orders
                throw new Error(`Could not get orders. Error: ${error}.`);
            }
        }
        else {
            // Cannot connect with the database
            throw new Error(`Could not connect to the database!`);
        }
    }
    // Retrieve Orders by userId
    async show(user_id) {
        if (database_1.default) {
            try {
                // Success connect with the database
                const sql = 'SELECT * FROM orders WHERE user_id=($1)';
                const conn = await database_1.default.connect();
                const result = await conn.query(sql, [user_id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                // Cannot get userId with table Orders
                throw new Error(`Could not get the order ${user_id}. Error: ${error}.`);
            }
        }
        else {
            // Cannot connect with the database
            throw new Error(`Could not connect to the database!`);
        }
    }
    // Create a new Order
    async create(order) {
        if (database_1.default) {
            try {
                // Success connect with the database
                const sql = 'INSERT INTO orders (quantity, status, user_id, product_id) VALUES ($1, $2, $3, $4) RETURNING *';
                const conn = await database_1.default.connect();
                const result = await conn.query(sql, [
                    order.quantity,
                    order.status,
                    order.user_id,
                    order.product_id
                ]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                // Cannot get userId with table Orders
                throw new Error(`Could not create order of productId ${order.product_id} for the userId ${order.user_id}. Error: ${error}.`);
            }
        }
        else {
            // Cannot connect with the database
            throw new Error(`Could not connect to the database!`);
        }
    }
    // Delete an exist Order
    async delete(order_id) {
        if (database_1.default) {
            try {
                // Success connect with the database
                const sql = 'DELETE FROM orders WHERE user_id=($1)';
                const conn = await database_1.default.connect();
                const result = await conn.query(sql, [order_id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                // Cannot get userId with table Orders
                throw new Error(`Could not delete order ${order_id}. Error: ${error}.`);
            }
        }
        else {
            // Cannot connect with the database
            throw new Error(`Could not connect to the database!`);
        }
    }
}
exports.OrderStore = OrderStore;
