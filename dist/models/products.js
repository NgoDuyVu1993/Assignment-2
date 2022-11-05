"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class ProductStore {
    // List all of Products
    async index() {
        if (database_1.default) {
            // Success connect with the database
            try {
                const sql = 'SELECT * FROM products';
                const conn = await database_1.default.connect();
                const result = await conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (error) {
                // Cannot communicate with table Products
                throw new Error(`Could not get products. Error: ${error}.`);
            }
        }
        else {
            // Cannot connect with the database
            throw new Error(`Could not connect to the database!`);
        }
    }
    // Retrieve Products by Id
    async show(id) {
        if (database_1.default) {
            try {
                const sql = 'SELECT * FROM products WHERE id = ($1)';
                const conn = await database_1.default.connect();
                const result = await conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Could not get the product ${id}. Error: ${error}.`);
            }
        }
        else {
            // Cannot connect with the database
            throw new Error(`Could not connect to the database!`);
        }
    }
    // Create a new Product
    async create(product) {
        if (database_1.default) {
            try {
                const sql = 'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *';
                const conn = await database_1.default.connect();
                const result = await conn.query(sql, [
                    product.name,
                    product.price,
                    product.category
                ]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Could not create the product ${product.name}. Error: ${error}.`);
            }
        }
        else {
            throw new Error(`Could not connect to the database!`);
        }
    }
    // Delete an exist Product
    async delete(id) {
        if (database_1.default) {
            try {
                const sql = 'DELETE FROM products WHERE id = ($1)';
                const conn = await database_1.default.connect();
                const result = await conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Could not delete product with id ${id}. Error: ${error}.`);
            }
        }
        else {
            throw new Error(`Could not connect to the database!`);
        }
    }
}
exports.ProductStore = ProductStore;
