import { APIGatewayProxyHandler } from 'aws-lambda';
import { PRODUCTS } from '../constants/sql';
import { getClient, close } from '../db/connection';
import { log } from '../utils/logger';
import wrapResponse from '../utils/response';

export const getProductsListService: APIGatewayProxyHandler = async (event) => {
  const client = getClient();

  log('Init request', event);

  try {
    await client.connect();
    const {rows} = await client.query(PRODUCTS);

    log(`Data was found [${rows.length}]`, event);

    return wrapResponse(rows);
  } catch (e) {
    log(`Error occurred [${e.message}]`, event);

    return wrapResponse({message: e.message}, 500);
  } finally {
    close(client);
  }
};
