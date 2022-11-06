import { Order, OrderStore } from '../models/orders';
import { ProductStore } from '../models/products';
import supertest from 'supertest';
import app from '../server';

const request = supertest(app);
const order = new OrderStore();
const products = new ProductStore();
let testUser: { text: string };

const orderTest_1: Order = {
  quantity: 1,
  status: 'Sold',
  user_id: '1',
  product_id: '1'
};

const orderTest_2: Order = {
  quantity: 4,
  status: 'Out of Stock',
  user_id: 2,
  product_id: '1'
};

describe('Test Order Model Method Exists', () => {
  beforeAll(async () => {
    await products.create({
      name: "Xiaomi MI 11",
      price: 8000,
      category: "Electronic",
    });

    testUser = await request.post('/users').send({
      username: 'test-user-a',
      firstName: 'Ngo',
      lastName: 'Duy Vu',
      password: '12312'
    });
  });

  // Test index function exist
  it('Should have an index method', () => {
    expect(order.index).toBeDefined();
  });

  // Test show function exist
  it('Should have a show method', () => {
    expect(order.show).toBeDefined();
  });

  // Test create function exist 
  it('Should have a create method', () => {
    expect(order.create).toBeDefined();
  });

  // Test delete function exist  
  it('Should have a delete method', () => {
    expect(order.delete).toBeDefined();
  });

  // Test update order quantity function exist
  it('Should have a updateQuantity method', () => {
    expect(order.updateQuantity).toBeDefined();
  });
  
  // Test update order userId function exist
  it('Should have a updateUserId method', () => {
    expect(order.updateUserId).toBeDefined();
  });
  
  // Test update order productId function exist
  it('Should have a updateProductId method', () => {
    expect(order.updateProductId).toBeDefined();
  });  
});

describe('Test Order Model Method Functional', () => {
  it('Should create an order', async () => {
    const result = await order.create(orderTest_1);
    expect(result.quantity).toEqual(orderTest_1.quantity);
    expect(result.status).toEqual(orderTest_1.status);
  });

  it('Should have order in the table', async () => {
    const result = await order.index();
    expect(result.length).toBeGreaterThan(0);
  });

  it('Should get product which has userID 1', async () => {
    const result = await order.show(1);
    expect(result.user_id).toEqual(orderTest_1.user_id);
  });

  it('Should Delete product which has userID 1', async () => {
    await order.delete(1);
    const result = await order.show(1);;
    expect(result).toBeUndefined();
  });
});

describe('Test Order API Endpoint Response', () => {
  beforeAll(async () => {
    testUser = await request.post('/users').send({
      username: 'test-user-b',
      firstName: 'Joe',
      lastName: 'Rogan',
      password: 'Elon Mush'
    });
  });

  // Test Create New Order
  it('Should create an order in the Endpoint', async () => {
    const response = await request
      .post('/orders')
      .send(orderTest_2)
      .set({ Authorization: JSON.parse(testUser.text).token });
    expect(response.status).toEqual(200);
  });

  // Test Get Order by Id
  it('Should get order that has userID 2 in the Endpoint', async () => {
    const response = await request
      .get('/orders/2')
      .set({ Authorization: JSON.parse(testUser.text).token });
    const result = JSON.parse(response.text);
    expect(result.quantity).toEqual(4);
    expect(result.status).toEqual('Out of Stock');
    expect(result.user_id).toEqual('2');
  });

  // Test Get All Orders
  it('Should list order in the Endpoint', async () => {
    const response = await request
      .get('/orders/')
      .set({ Authorization: JSON.parse(testUser.text).token });
    const result = JSON.parse(response.text);
    expect(result.length).toBeTruthy();
  });

  // Test Delete Order by Id
  it('Should delete a order in the Endpoint', async () => {
    const response = await request
      .delete('/orders/delete/2')
      .set({ Authorization: JSON.parse(testUser.text).token });
    expect(response.status).toEqual(200);
  });
});
