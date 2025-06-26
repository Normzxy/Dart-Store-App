import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Cart, CartItem } from '../../shared/models/cart';
import { Product } from '../../shared/models/product';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
    private http = inject(HttpClient)
    baseUrl = environment.apiUrl

    // Any component can listen to that signal.
    cart = signal<Cart | null>(null)

    // Computed signal creates new property based on a signal.
    itemCount = computed(() => {
        return this.cart()?.items.reduce(
            (sum, item) => sum + item.quantity, 0)
    })

    totals = computed(() => {
        const cart = this.cart()
        if (!cart) return null

        const subtotal = cart.items.reduce(
            (sum, item) => sum + item.price * item.quantity, 0)

        const shipping = 12

        return {
            subtotal,
            shipping,
            total: subtotal + shipping
        }
    })

    getCart(id: string)
    {
        return this.http.get<Cart>(
            // Pipe allows to edit observable and to return it.
            // There is no subscribe method, so observable can still be returned.
            // Its needed to be returned in init service.
            this.baseUrl + 'cart?id=' + id).pipe(
                map(cart => {
                    this.cart.set(cart)
                    return cart
                })
            )
    }

    setCart(cart: Cart) {
        return this.http.post<Cart>(
            this.baseUrl + 'cart', cart).subscribe({
                next: cart => this.cart.set(cart)})
    }

    addItemToCart(item: CartItem | Product, quantity = 1) {
        const cart = this.cart() ?? this.createCart()
        if(this.isProduct(item)) {
            item = this.mapProductToCartItem(item)
        }
        cart.items = this.addOrUpdateItem(cart.items, item, quantity)
        this.setCart(cart)
    }

    removeItemFromCart(productId: number, quantity = 1) {
        const cart = this.cart()
        if (!cart) return
        const index = cart.items.findIndex(x => x.productId === productId)
        if (index !== -1) {
            if (cart.items[index].quantity > quantity) {
                cart.items[index].quantity -= quantity
            } else {
                cart.items.splice(index, 1)
            }

            if (cart.items.length === 0) {
                this.deleteCart()
            } else {
                this.setCart(cart)
            }
        }
    }

    deleteCart() {
        this.http.delete(this.baseUrl + 'cart?id=' + this.cart()?.id).subscribe({
            next: () => {
                localStorage.removeItem('cart_id')
                this.cart.set(null)
            }
        })
    }

    private addOrUpdateItem(
        items: CartItem[], item: CartItem, quantity: number): CartItem[] {
            const index = items.findIndex(x => x.productId === item.productId)
            if (index === -1) {
                item.quantity = quantity
                items.push(item)
            } else {
                items[index].quantity += quantity
            }
        return items
    }

    private mapProductToCartItem(item: Product): CartItem {
        return {
            productId: item.id,
            productName: item.name,
            price: item.price,
            quantity: 0,
            pictureUrl: item.pictureUrl,
            brand: item.brand,
            type: item.type
        }
    }

    private isProduct(item: CartItem | Product)
        // Returns boolean, but now item is known and can be used.
        : item is Product {
            return (item as Product).id !== undefined
    }

    private createCart(): Cart {
        const cart = new Cart()
        // To retreive
        localStorage.setItem('cart_id', cart.id)
        return cart
    }
}
