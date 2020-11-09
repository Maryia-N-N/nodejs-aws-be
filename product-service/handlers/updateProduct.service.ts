import { APIGatewayProxyHandler } from 'aws-lambda';
import { log } from '../utils/logger';
import { validateProduct } from '../utils/validator';
import { getClient, close } from '../db/connection';
import wrapResponse from '../utils/response';
import { INSERT_PRODUCT, INSERT_STOCK, } from '../constants/sql';

export const updateProductService: APIGatewayProxyHandler = async (event: any) => {
  const client = getClient();

  log('Init request', event);

  try {
    const body = JSON.parse(event.body);
    const validation = validateProduct(body);

    if (validation.error) {
      return wrapResponse({val: validation.error, event}, 400);
    }

    await client.connect();
    await client.query('BEGIN');

    const {rows: [product]} = await client.query(INSERT_PRODUCT, [body.title, body.description, body.price]);
    const {rows: [stockId]} = await client.query(INSERT_STOCK, [product.id, body.count]);

    await client.query('COMMIT');

    return wrapResponse({productId: product.id, stockId});
  } catch (e) {
    log(`Error occurred [${e.message}]`, event);

    if (client) {
      try {
        await client.query('ROLLBACK');
      } catch (e) {
        log(`Error occurred in rollback [${e.message}]`, event);
      }
    }

    return wrapResponse({message: e.message}, 500);
  } finally {
    close(client);
  }
};
