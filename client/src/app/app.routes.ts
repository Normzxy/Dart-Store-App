import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ShopComponent } from './features/shop/shop.component';
import { ProductDetailsComponent } from './features/shop/product-details/product-details.component';
import { CartComponent } from './features/cart/cart.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { LoginComponent } from './features/account/login/login.component';
import { RegisterComponent } from './features/account/register/register.component';
import { ContactComponent } from './features/contact/contact.component';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';
import {ServerErrorComponent} from './shared/components/server-error/server-error.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'shop', component: ShopComponent},
    {path: 'shop/:id', component: ProductDetailsComponent},
    {path: 'cart', component: CartComponent},
    {path: 'checkout', component: CheckoutComponent},
    {path: 'account/login', component: LoginComponent},
    {path: 'account/register', component: RegisterComponent},
    {path: 'shared/not-found', component: NotFoundComponent},
    {path: 'shared/server-error', component: ServerErrorComponent},
    {path: 'contact', component: ContactComponent},
    {path: '**', redirectTo: 'not-found', pathMatch: 'full'},
]
