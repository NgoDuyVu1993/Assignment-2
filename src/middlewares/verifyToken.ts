import { Express, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization!;
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET!);
    next();
  } catch (err) {
    res.status(401);
    res.json(`Access denied, invalid token ${err}`);
    return;
  }
};

export default verifyAuthToken;
