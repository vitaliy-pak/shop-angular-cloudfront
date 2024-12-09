import { Config } from './config.interface';

export const environment: Config = {
  production: true,
  apiEndpoints: {
    product: 'https://nb8rmwa8bc.execute-api.us-east-1.amazonaws.com/prod/',
    order: ' https://xbs2z78ef6.execute-api.us-east-1.amazonaws.com/prod/orders',
    import: 'https://rcym8yqo3i.execute-api.us-east-1.amazonaws.com/prod/',
    bff: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
    cart: 'https://xbs2z78ef6.execute-api.us-east-1.amazonaws.com/prod/cart',
  },
  apiEndpointsEnabled: {
    product: true,
    order: true,
    import: true,
    bff: false,
    cart: true,
  },
};
