import { APIGatewayProxyHandler } from 'aws-lambda';

export const updateProductService: APIGatewayProxyHandler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({event})
  };
};
