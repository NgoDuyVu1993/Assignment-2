import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import user_routers from './handlers/users';
import product_rounters from './handlers/products';
import order_routes from './handlers/orders';

const app: express.Application = express();
const address: string = '0.0.0.0:3000';

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  res.send('Storefront backend is working!');
});

user_routers(app);
product_rounters(app);
order_routes(app);


app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
