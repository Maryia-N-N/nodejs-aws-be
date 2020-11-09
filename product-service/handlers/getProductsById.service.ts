import { APIGatewayProxyHandler } from 'aws-lambda';
import { PRODUCT_BY_ID } from '../constants/sql';
import { getClient, close } from '../db/connection';
import { log } from '../utils/logger';
import wrapResponse from '../utils/response';

export const getProductsByIdService: APIGatewayProxyHandler = async (event) => {
  const client = getClient();

  log('Init request', event);

  try {
    const {productId} = event.pathParameters;

    if (productId) {
      await client.connect();
      const {rows} = await client.query({text: PRODUCT_BY_ID, values: [productId]});

      if (rows[0]) {
        return wrapResponse(rows[0]);
      }

      return wrapResponse({message: `Product was not found with the following id: ${productId}`}, 404);
    }

    return wrapResponse({message: 'No product id was provided.'}, 400);
  } catch (e) {
    log(`Error occurred [${e.message}]`, event);

    return wrapResponse({message: e.message}, 500);
  } finally {
    close(client);
  }
};
