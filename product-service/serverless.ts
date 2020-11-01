import type {Serverless} from 'serverless/aws';

const serverlessConfiguration: Serverless = {
    service: {
        name: 'product-service'
    },
    frameworkVersion: '2',
    custom: {
        webpack: {
            webpackConfig: './webpack.config.js',
            includeModules: true
        }
    },
    plugins: ['serverless-webpack'],
    provider: {
        name: 'aws',
        runtime: 'nodejs12.x',
        stage: 'dev',
        region: 'eu-west-1',
        apiGateway: {
            minimumCompressionSize: 1024
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1'
        }
    },
    functions: {
        getProductsList: {
            handler: 'handler.getProductsListService',
            events: [
                {
                    http: {
                        method: 'get',
                        path: 'products'
                    }
                }
            ]
        },
        getProductsById: {
            handler: 'handler.getProductsByIdService',
            events: [
                {
                    http: {
                        method: 'get',
                        path: 'products/{productId}'
                    }
                }
            ]
        }
    }
};

module.exports = serverlessConfiguration;
