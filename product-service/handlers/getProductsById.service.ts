import {APIGatewayProxyHandler} from 'aws-lambda';
import PRODUCT_LIST from './../constants/list.constants';

// In the following tasks, it should be replaced with a real service (for example, getting data from a database or an external service).
const getById = async (productId: string) => PRODUCT_LIST.find(({id}) => id === productId);

export const getProductsByIdService: APIGatewayProxyHandler = async (event) => {
	try {
		const {productId} = event.pathParameters;

		if (productId) {
			const product = await getById(productId);

			if (product) {
				return {
					statusCode: 200,
					body: JSON.stringify(product)
				};
			}

			return {
				statusCode: 404,
				body: JSON.stringify({
					message: `Product was not found with the following id: ${productId}`
				})
			};
		}

		return {
			statusCode: 400,
			body: JSON.stringify({
				message: 'No product id was provided.'
			})
		};
	} catch (e) {
		return {
			statusCode: 500,
			body: JSON.stringify({
				message: e.message
			})
		};
	}
};
