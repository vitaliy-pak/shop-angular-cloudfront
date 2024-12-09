import { BehaviorSubject, Observable } from 'rxjs';
import { ProductCheckout } from "../products/product.interface";
import { inject, Injectable } from "@angular/core";
import { ProductsService } from "../products/products.service";
import { CartService } from "./cart.service";
import { takeUntilDestroyed, toObservable } from "@angular/core/rxjs-interop";
import { ApiService } from "../core/api.service";
import { HttpHeaders } from "@angular/common/http";
import { ShippingInfo } from "./shipping-info.interface";

@Injectable({
  providedIn: 'root',
})
export class CheckoutService extends ApiService {
  private readonly productsService = inject(ProductsService);

  private cartProducts$ = new BehaviorSubject<ProductCheckout[]>([]);

  constructor(private readonly cartService: CartService) {
    super();

    toObservable(this.cartService.cart).pipe(takeUntilDestroyed()).subscribe(cart => {
      this.updateCheckoutProducts(cart);
    });
  }

  private updateCheckoutProducts(cart: Record<string, number>): void {
    if (Object.keys(cart).length === 0) {
      this.cartProducts$.next([]);
    } else {
      this.productsService.getProductsForCheckout(Object.keys(cart)).subscribe(products => {
        const newProducts = products.map(product => ({
          ...product,
          orderedCount: cart[product.id],
          totalPrice: +(cart[product.id] * product.price).toFixed(2),
        }));
        this.cartProducts$.next(newProducts);
      });
    }
  }

  getProductsForCheckout(): Observable<ProductCheckout[]> {
    return this.cartProducts$.asObservable();
  }

  checkout(shippingInfo: ShippingInfo) {
    const url = this.getUrl('cart', 'checkout');
    const authorizationToken = localStorage.getItem('authorization_token');
    let headers = new HttpHeaders();

    if (authorizationToken) {
      headers = headers.set('Authorization', `Basic ${authorizationToken}`);
    }

    return this.http.post<any>(url, {address: shippingInfo}, {
      headers
    });
  }
}
