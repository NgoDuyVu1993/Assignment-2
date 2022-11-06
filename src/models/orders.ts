import client from '../database';

export type Order = {
  id?: number | string;
  quantity: number;
  status: string;
  user_id: number | string;
  product_id: number | string;
};

export type OrderUpdate = {
  id: number | string;
  quantity: number;
  status: string;
  user_id: number | string;
  product_id: number | string;
};


export class OrderStore {
  // List all of the Orders
  async index(): Promise<Order[]> {
    if (client) {
      try {
        // Success connect with the database
        const sql = 'SELECT * FROM orders';
        const conn = await client.connect();
        const result = await conn.query(sql);
        conn.release();
        return result.rows;
      } catch (error) {
        // Cannot communicate with table Orders
        throw new Error(`Could not get orders. Error: ${error}.`);
      }
    } else {
      // Cannot connect with the database
      throw new Error(`Could not connect to the database!`);
    }
  }

  // Retrieve Orders by userId
  async show(user_id: string | number): Promise<Order> {
    if (client) {
      try {
        // Success connect with the database
        const sql = 'SELECT * FROM orders WHERE user_id=($1)';
        const conn = await client.connect();
        const result = await conn.query(sql, [user_id]);
        conn.release();
        return result.rows[0];
      } catch (error) {
        // Cannot get userId with table Orders
        throw new Error(`Could not get the order ${user_id}. Error: ${error}.`);
      }
    } else {
      // Cannot connect with the database
      throw new Error(`Could not connect to the database!`);
    }
  }

  // Create a new Order
  async create(order: Order): Promise<Order> {
    if (client) {
      try {
        // Success connect with the database
        const sql =
          'INSERT INTO orders (quantity, status, user_id, product_id) VALUES ($1, $2, $3, $4) RETURNING *';
        const conn = await client.connect();
        const result = await conn.query(sql, [
          order.quantity,
          order.status,
          order.user_id,
          order.product_id
        ]);
        conn.release();
        return result.rows[0];
      } catch (error) {
        // Cannot get userId with table Orders
        throw new Error(
          `Could not create order of productId ${order.product_id} for the userId ${order.user_id}. Error: ${error}.`
        );
      }
    } else {
      // Cannot connect with the database
      throw new Error(`Could not connect to the database!`);
    }
  }

  // Delete an exist Order
  async delete(order_id: string | number): Promise<Order> {
    if (client) {
      try {
        // Success connect with the database
        const sql = 'DELETE FROM orders WHERE user_id=($1)';
        const conn = await client.connect();
        const result = await conn.query(sql, [order_id]);
        conn.release();
        return result.rows[0];
      } catch (error) {
        // Cannot get userId with table Orders
        throw new Error(`Could not delete order ${order_id}. Error: ${error}.`);
      }
    } else {
      // Cannot connect with the database
      throw new Error(`Could not connect to the database!`);
    }
  }


  // Update product quantity of existing order
  async updateQuantity(order_id: string | number, quantiy: number): Promise<Order> {
    if (client) {
        try {
          const sql = 'UPDATE orders SET quantity=quantity+($1) WHERE id=($2)';
          console.log(quantiy);
          console.log(order_id);
          const conn = await client.connect();
          const result = await conn.query(sql, [quantiy, order_id]);
          conn.release();
          return result.rows[0];
        } catch (error) {
          throw new Error(`Could not update order ${order_id} with the new quantity. Error: ${error}.`);
        }
    } else {
      throw new Error(`Could not connect to the database!`);
    }
  }
  

  // Update an existing order with new user_id
  async updateUserId(order_id: string | number, user_id: string | number ): Promise<Order>  {
    if (client) {
      try {
        const sql = 'UPDATE orders SET user_id=($1) WHERE id=($2)';
        const conn = await client.connect();
        const result = await conn.query(sql, [user_id, order_id]);
        conn.release();
        return result.rows[0];        
      } catch (error) {
        throw new Error(`Could not update order ${order_id} with userId ${user_id}. Error: ${error}.`);
      } 
    } else {
      throw new Error(`Could not connect to the database!`);        
    }
  }

  // Update an existing order with new product_id
  async updateProductId(order_id: string | number, product_id: string | number ): Promise<Order>  {
    if (client) {
      try {
        const sql = 'UPDATE orders SET product_id=($1) WHERE id=($2)';
        const conn = await client.connect();
        const result = await conn.query(sql, [product_id, order_id]);
        conn.release();
        return result.rows[0];        
      } catch (error) {
        throw new Error(`Could not update order ${order_id} with productId ${product_id}. Error: ${error}.`);
      } 
    } else {
      throw new Error(`Could not connect to the database!`);        
    }
  }


}