import {inject, Injectable} from '@angular/core';
import {CartService} from './cart.service';
import {forkJoin, of} from 'rxjs';
import {AccountService} from './account.service';

@Injectable({
  providedIn: 'root'
})

export class InitService {
    private cartService = inject(CartService)
    private accountService = inject(AccountService)

    init() {
        // To retrieve saved cart from database.
        const cartId = localStorage.getItem('cart_id')

        // Observables (cart$) are used to force initializer to wait for
        // asynchronous operations to finish before continuing application setup.
        const cart$ = cartId ? this.cartService.getCart(cartId) : of(null)

        // This function allows to combine many "cold" observables and subscribe to them at the same moment.
        return forkJoin({
            cart: cart$,
            user: this.accountService.getUserInfo()
        })
    }
}
