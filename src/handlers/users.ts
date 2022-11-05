import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/users';
import verifyAuthToken from '../middlewares/verifyToken';
import jwt from 'jsonwebtoken';

const store = new UserStore();

// Function for showing all users function
const indexUsers = async (_request: Request, response: Response) => {
  try {
    const result = await store.index();
    response.json(result);
  } catch (error) {
    response.status(401);
    response.json(error);
  }
};

// Function for showing user function
const showUsers = async (request: Request, response: Response) => {
  try {
    const result = await store.show(request.params.username);
    response.json(result);
  } catch (error) {
    response.status(401);
    response.json(error);
  }
};

// Function for creating user function
const createUsers = async (request: Request, response: Response) => {
  const user: User = {
    username: request.body.username,
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    password: request.body.password
  };
  try {
    const result = await store.create(user);
    var token = jwt.sign({ user: result }, process.env.TOKEN_SECRET as string);
    response.json({ ...result, token: `Token ${token}` });
  } catch (error) {
    response.status(401);
    response.json(error);
  }
};

// Function for deleting user function
const deleteUsers = async (request: Request, response: Response) => {
  try {
    const result = await store.delete(request.params.id);
    response.json(result);
  } catch (error) {
    response.status(401);
    response.json(error);
  }
};

// Function for authenticate
const authenticate = async (request: Request, response: Response) => {
  try {
    const result = await store.authenticate(
      request.params.username,
      request.params.password
    );
    var token = jwt.sign({ user: result }, process.env.TOKEN_SECRET as string);
    response.json({ ...result, token: `Token ${token}` });
  } catch (error) {
    response.status(401);
    response.json(error);
  }
};

const user_routers = (app: express.Application) => {
  app.get('/users', indexUsers);
  app.get('/users/:username', verifyAuthToken, showUsers);
  app.post('/users', createUsers);
  app.post('/users/authenticate', authenticate);
  app.delete('/users/delete/:id', verifyAuthToken, deleteUsers);
};

export default user_routers;