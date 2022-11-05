CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    quantity INTEGER,
    status VARCHAR(50),
    user_id BIGINT REFERENCES users(id),
    product_id BIGINT REFERENCES products(id)
);