# Dabase Schema
Database Schema of Storefront project
![Dabase Schema](https://github.com/ngoduyvu/Udacity_fullstack/blob/main/Assignment%202/img/Store%20front%20Database%20Schema.JPG)
# API Requirements
## API Endpoints
### User
- Index [GET]: '/users'
- Show [GET][token required]: '/users/:username'
- Create [POST][token required]: '/users'
- Authenticate [POST]: '/users/authenticate'
- Destroy [DELETE][token required]:'/users/delete/:id'

### Products
- Index [GET]: '/products'
- Show [GET]: 'products/:id'
- Create [POST][token required]: '/products'
- Destroy [DELETE][token required]:'/product/delete/:id'

### Orders
- Index [GET]: '/orders/'
- Show [GET]: '/orders/:id'
- Create [POST][token required]: '/orders'
- Destroy [DELETE][token required]:'/orders/delete/:id'
## Data Shapes
### User
- id: SERIAL PRIMARY KEY,
- firstName: VARCHAR(150),
- lastName: VARCHAR(150),
- password: VARCHAR(255)

### Products
- id: SERIAL PRIMARY KEY,
- name: VARCHAR(255),
- price: INTEGER,
- category: VARCHAR(150)
### Orders
- id: SERIAL PRIMARY KEY,
- quantity: INTEGER,
- status: VARCHAR(50),
- user_id: BIGINT REFERENCES users(id),
- product_id: BIGINT REFERENCES products(id)

