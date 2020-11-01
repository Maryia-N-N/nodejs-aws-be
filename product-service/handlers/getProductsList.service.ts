import {APIGatewayProxyHandler} from 'aws-lambda';
import PRODUCT_LIST from './../constants/list.constants';
import {SHARED_ATTRIBUTES} from '../constants/sharedAttributes.constants';

// In the following tasks, it should be replaced with a real service (for example, getting data from a database or an external service).
const getList = async () => PRODUCT_LIST;

export const getProductsListService: APIGatewayProxyHandler = async () => {
	try {
		const list = await getList();

		return {
			statusCode: 200,
			body: JSON.stringify(list),
			...SHARED_ATTRIBUTES
		};
	} catch (e) {
		return {
			statusCode: 500,
			body: JSON.stringify({
				message: e.message
			}),
			...SHARED_ATTRIBUTES
		};
	}
};
