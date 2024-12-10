import { computed, Injectable, signal } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ApiService } from "../core/api.service";
import { debounceTime, distinctUntilChanged, Subject } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: 'root',
})
export class CartService extends ApiService {
  #cart = signal<Record<string, number>>({});
  cart = this.#cart.asReadonly();

  totalInCart = computed(() => {
    const values = Object.values(this.cart());
    return values.reduce((acc, val) => acc + val, 0);
  });

  private cartUpdated = new Subject<Record<string, number>>();

  constructor() {
    super();
    this.fetchCart();
    this.initializeCartUpdater();
  }

  private initializeCartUpdater(): void {
    this.cartUpdated.pipe(
      debounceTime(500),
      distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
      takeUntilDestroyed()
    ).subscribe(() => {
      this.updateCart();
    });
  }

  private fetchCart(): void {
    const url = this.getUrl('cart', '');
    const authorizationToken = localStorage.getItem('authorization_token');
    let headers = new HttpHeaders();

    if (authorizationToken) {
      headers = headers.set('Authorization', `Basic ${authorizationToken}`);
    }

    this.http.get<any>(url, {
      headers
    }).subscribe({
      next: (response) => {
        this.#cart.set(response.data?.cart?.items?.reduce((acc: Record<string, number>, item: any) => {
          acc[item.productId] = item.count;
          return acc;
        }, {} as Record<string, number>) || {})
      },
      error: (error) => console.error('Failed to fetch cart', error),
    });
  }

  private updateCart(): void {
    const url = this.getUrl('cart', '');
    const authorizationToken = localStorage.getItem('authorization_token');
    let headers = new HttpHeaders();

    if (authorizationToken) {
      headers = headers.set('Authorization', `Basic ${authorizationToken}`);
    }

    this.http.put(url, Object.entries(this.cart()).map(([id, count]) => ({productId: id, count: count})), {headers})
      .subscribe({
        error: (error) => console.error('Failed to update cart', error),
      });
  }

  addItem(id: string): void {
    this.updateCount(id, 1);
    this.cartUpdated.next(this.cart());
  }

  removeItem(id: string): void {
    this.updateCount(id, -1);
    this.cartUpdated.next(this.cart());
  }

  empty(): void {
    this.#cart.set({});
    this.fetchCart();
  }

  private updateCount(id: string, type: 1 | -1): void {
    const currentCart = this.cart();
    const updatedCart = {...currentCart};

    updatedCart[id] = (updatedCart[id] || 0) + type;

    if (updatedCart[id] <= 0) {
      delete updatedCart[id];
    }

    this.#cart.set(updatedCart);
    this.cartUpdated.next(this.cart());
  }
}
