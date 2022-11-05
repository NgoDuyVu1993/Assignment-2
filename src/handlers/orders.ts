import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/orders';
import verifyAuthToken from '../middlewares/verifyToken';

const store = new OrderStore();

// Function for showing all orders function
const indexOrders = async (_request: Request, response: Response) => {
  try {
    const result = await store.index();
    response.json(result);
  } catch (error) {
    response.status(401);
    response.json(error);
  }
};

// Function for showing order function
const showOrders = async (request: Request, response: Response) => {
  try {
    const result = await store.show(request.params.id);
    response.json(result);
  } catch (error) {
    response.status(401);
    response.json(error);
  }
};

// Function for creating order function
const createOrders = async (request: Request, response: Response) => {
  const order: Order = {
    quantity: request.body.quantity,
    status: request.body.status,
    user_id: request.body.user_id,
    product_id: request.body.product_id
  };
  try {
    const result = await store.create(order);
    response.json(result);
  } catch (error) {
    response.status(401);
    response.json(error);
  }
};

// Function for deleting order function
const deleteOrders = async (request: Request, response: Response) => {
  try {
    const result = await store.delete(request.body.id);
    response.json(result);
  } catch (error) {
    response.status(401);
    response.json(error);
  }
};

const order_routes = (app: express.Application) => {
  app.get('/orders/', indexOrders);
  app.get('/orders/:id', showOrders);
  app.post('/orders', verifyAuthToken, createOrders);
  app.delete('/orders/delete/:id', verifyAuthToken, deleteOrders);
};

export default order_routes;