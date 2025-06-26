import { Component, inject, input } from '@angular/core';
import { CartItem } from '../../../shared/models/cart';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../../core/services/cart.service';

@Component({
    selector: 'app-cart-item',
    imports: [
        RouterLink,
        MatIcon,
        MatButton,
        CurrencyPipe
    ],
    templateUrl: './cart-item.component.html',
    standalone: true,
    styleUrl: './cart-item.component.scss'
})

export class CartItemComponent {
    cartService = inject(CartService)

    item = input.required<CartItem>();

    // Those methods could be put in cartService as well.
    incrementQuantity() {
        this.cartService.addItemToCart(this.item())
    }

    decrementQuantity() {
        this.cartService.removeItemFromCart(this.item().productId)
    }

    removeItemFromCart() {
        this.cartService.removeItemFromCart(this.item().productId, this.item().quantity)
    }
}
