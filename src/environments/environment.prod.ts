import { Config } from './config.interface';

export const environment: Config = {
  production: true,
  apiEndpoints: {
    product: 'https://nb8rmwa8bc.execute-api.us-east-1.amazonaws.com/prod/',
    order: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
    import: 'https://rcym8yqo3i.execute-api.us-east-1.amazonaws.com/prod/',
    bff: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
    cart: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
  },
  apiEndpointsEnabled: {
    product: true,
    order: false,
    import: true,
    bff: false,
    cart: false,
  },
};
