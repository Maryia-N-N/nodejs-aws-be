import {getProductsByIdService} from '../handlers/getProductsById.service';

test('should return product if id was passed', async () => {
    const request = {pathParameters: {productId: '9d410614a67246d3b00c820add51ec0d'}};
    const response = await getProductsByIdService(request);

    expect(response).toEqual({
        body: JSON.stringify({
            id: '9d410614a67246d3b00c820add51ec0d',
            title: 'Манчкин: Подземелье',
            description: '"Манчкин: Подземелье" – это самостоятельная настольная игра, действие которое происходит в мире популярной карточной игры "Манчкин".',
            price: 70
        }),
        statusCode: 200
    });
});

test('should return error message with 404 status code if product was not found', async () => {
    const request = {pathParameters: {productId: 'testId'}};
    const response = await getProductsByIdService(request);

    expect(response).toEqual({
        body: JSON.stringify({
            message: 'Product was not found with the following id: testId'
        }),
        statusCode: 404
    });
});

test('should return error message with 400 status code if product id was not provided', async () => {
    const request = {pathParameters: {}};
    const response = await getProductsByIdService(request);

    expect(response).toEqual({
        body: JSON.stringify({
            message: 'No product id was provided.'
        }),
        statusCode: 400
    });
});
