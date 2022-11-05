import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/products';
import verifyAuthToken from '../middlewares/verifyToken';

const store = new ProductStore();

// Function for showing all products function
const indexProducts = async (_request: Request, response: Response) => {
  try {
    const result = await store.index();
    response.json(result);
  } catch (error) {
    response.status(401);
    response.json(error);
  }
};

// Function for showing product function
const showProducts = async (request: Request, response: Response) => {
  try {
    const result = await store.show(request.params.id);
    response.json(result);
  } catch (error) {
    response.status(401);
    response.json(error);
  }
};

// Function for creating product function
const createProducts = async (request: Request, response: Response) => {
  const product: Product = {
    name: request.body.name,
    price: request.body.price,
    category: request.body.category
  };

  try {
    const result = await store.create(product);
    response.json(result);
  } catch (error) {
    response.status(401);
    response.json(error);
  }
};

// Function for deleting product function
const deleteProducts = async (request: Request, response: Response) => {
  try {
    const result = await store.delete(request.params.id);
    response.json(result);
  } catch (error) {
    response.status(401);
    response.json(error);
  }
};

const product_rounters = (app: express.Application) => {
  app.get('/products', indexProducts);
  app.get('/products/:id', showProducts);
  app.post('/products', verifyAuthToken, createProducts);
  app.delete('/product/delete/:id', verifyAuthToken, deleteProducts);
};

export default product_rounters;
