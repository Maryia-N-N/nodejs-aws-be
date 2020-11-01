import {APIGatewayProxyHandler} from 'aws-lambda';

import PRODUCT_LIST from './../constants/list.constant';

// This is a mock service for getting static data. In next tasks, it should be replaced to a real service (e.g. getting data from DB or external service).
const getById = async (productId: string) => PRODUCT_LIST.find(({id}) => id === productId);

export const getProductsByIdService: APIGatewayProxyHandler = async (event) => {
    try {
        const productId = event.queryStringParameters.productId;

        console.log('productId', productId);

        if (productId) {
            const product = await getById(productId);

            if (product) {
                return {
                    statusCode: 200,
                    body: product
                };
            }

            return {
                statusCode: 404,
                body: {
                    message: 'No product id was found.'
                }
            };
        }

        return {
            statusCode: 400,
            body: {
                message: 'No product id was provided.'
            }
        };
    } catch (e) {
        return {
            statusCode: 500,
            body: {
                message: e.message
            }
        };
    }
};
