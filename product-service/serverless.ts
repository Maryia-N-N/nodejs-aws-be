import type { Serverless } from 'serverless/aws';

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
      PG_HOST: 'aws-app-db-instance.czjxngfrqbsp.eu-west-1.rds.amazonaws.com',
      PG_PORT: 5432,
      PG_DATABASE: 'aws_app_db',
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
    },
    updateProduct: {
      handler: 'handler.updateProductService',
      events: [
        {
          http: {
            method: 'post',
            path: 'products'
          }
        }
      ]
    }
  }
};

module.exports = serverlessConfiguration;
