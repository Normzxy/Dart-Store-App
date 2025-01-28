import { inject, Injectable } from '@angular/core';
import { CartService } from './cart.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class InitService {
    private cartService = inject(CartService)

    init() {
        // To retrieve saved cart from database.
        const cartId = localStorage.getItem('cart_id')

        // Initializer works with observables, but not with signals.
        // Observable needs to be returned to force initializer to wait for result of retrieval.
        const cart$ = cartId ? this.cartService.getCart(cartId) : of(null)

        return cart$
    }
}