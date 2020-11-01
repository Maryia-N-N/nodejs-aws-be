import LIST from '../constants/list.constants';
import {getProductsListService} from '../handlers/getProductsList.service';

test('should return list of products', async () => {
    const response = await getProductsListService();

    expect(response).toEqual({
        body: JSON.stringify(LIST),
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    });
});
