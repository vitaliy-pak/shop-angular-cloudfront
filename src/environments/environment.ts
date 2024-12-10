// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Config } from './config.interface';

export const environment: Config = {
  production: false,
  apiEndpoints: {
    product: 'https://nb8rmwa8bc.execute-api.us-east-1.amazonaws.com/prod/',
    order: 'https://rkbn718t12.execute-api.us-east-1.amazonaws.com/prod/orders',
    import: 'https://rcym8yqo3i.execute-api.us-east-1.amazonaws.com/prod/',
    bff: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
    cart: 'https://rkbn718t12.execute-api.us-east-1.amazonaws.com/prod/cart',
  },
  apiEndpointsEnabled: {
    product: true,
    order: true,
    import: true,
    bff: false,
    cart: true,
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
