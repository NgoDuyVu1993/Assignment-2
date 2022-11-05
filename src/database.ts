import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config(); // Initializes the environment variable

const {
  POSTGRES_HOST,
  POSTGRES_DB_DEV,
  POSTGRES_TEST_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  ENV
} = process.env;

let client: Pool = new Pool();
console.log(ENV);

if (ENV === 'test') {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_TEST_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
  });
}

if (ENV === 'dev') {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB_DEV,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
  });
}

export default client;
