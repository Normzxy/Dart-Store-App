import { Component, inject, OnInit } from '@angular/core';
import { ShopService } from '../../../core/services/shop.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../shared/models/product';
import { CurrencyPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDivider } from '@angular/material/divider';
import { MatButton } from '@angular/material/button';
import { CartService } from '../../../core/services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-product-details',
    imports: [
      CurrencyPipe,
      MatIcon,
      MatFormField,
      MatInput,
      MatLabel,
      MatButton,
      MatDivider,
      FormsModule
    ],
    templateUrl: './product-details.component.html',
    styleUrl: './product-details.component.scss'
})

export class ProductDetailsComponent implements OnInit {
    private shopService = inject(ShopService)
    private activatedRoute = inject(ActivatedRoute)
    private cartService = inject(CartService)

    product? : Product
    quantityInCart = 0
    quantity = 1

    ngOnInit(): void {
        this.loadProduct()
    }

    loadProduct() {
        // Snapshot doen't follow state changes like subscription.
        const id = this.activatedRoute.snapshot.paramMap.get('id')
        if (!id) return
        this.shopService.getProduct(+id).subscribe({
          next: response => {
              this.product = response
              this.updateQuantityInCart()
          },
          error: error => console.log(error)
        })
    }

    updateCart() {
        if (!this.product) return
        if (this.quantity > this.quantityInCart) {
            const itemsToAdd = this.quantity - this.quantityInCart
            this.cartService.addItemToCart(this.product, itemsToAdd)
            this.quantityInCart += itemsToAdd
        } else {
            const itemsToRemove = this.quantityInCart - this.quantity
            this.cartService.removeItemFromCart(this.product.id, itemsToRemove)
            this.quantityInCart -= itemsToRemove
        }
    }

    updateQuantityInCart() {
        this.quantityInCart = this.cartService.cart()?.items
            .find(x => x.productId === this.product?.id)?.quantity || 0

        this.quantity = this.quantityInCart || 1
    }
}