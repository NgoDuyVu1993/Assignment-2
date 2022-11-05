CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(150),
    firstName VARCHAR(150),
    lastName VARCHAR(150),
    password VARCHAR(255)
);