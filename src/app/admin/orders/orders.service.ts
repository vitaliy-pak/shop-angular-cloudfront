import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Order } from './order.interface';
import { ApiService } from "../../core/api.service";
import { HttpHeaders } from "@angular/common/http";

@Injectable()
export class OrdersService extends ApiService {
  constructor() {
    super();
  }

  getOrders(): Observable<Order[]> {
    if (!this.endpointEnabled('order')) {
      console.warn(
        'Endpoint "order" is disabled. To enable change your environment.ts config',
      );

      return of([]);
    }

    const authorizationToken = localStorage.getItem('authorization_token');
    let headers = new HttpHeaders();

    if (authorizationToken) {
      headers = headers.set('Authorization', `Basic ${authorizationToken}`);
    }

    const url = this.getUrl('order', '');
    return this.http.get<Order[]>(url, {headers});
  }
}
