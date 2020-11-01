import {APIGatewayProxyHandler} from 'aws-lambda';
import PRODUCT_LIST from './../constants/list.constant';

// This is a mock service for getting static data. In next tasks, it should be replaced to a real service (e.g. getting data from DB or external service).
const getList = async () => PRODUCT_LIST;

export const getProductsList: APIGatewayProxyHandler = async () => {
    try {
        const list = await getList();

        return {
            statusCode: 200,
            body: list
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
