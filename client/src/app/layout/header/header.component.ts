import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon'
import { MatBadge } from '@angular/material/badge'
import { MatButton } from '@angular/material/button'
import {Router, RouterLink, RouterLinkActive} from '@angular/router'
import { CartService } from '../../core/services/cart.service';
import {AccountService} from '../../core/services/account.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
      MatIcon,
      MatButton,
      MatBadge,
      RouterLink,
      RouterLinkActive
  ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    cartService = inject(CartService)
    accountService = inject(AccountService)
    private router = inject(Router)

    logout() {
        this.accountService.logout().subscribe({
            next: () => {
                this.accountService.currentUser.set(null)
                this.router.navigateByUrl('')
                    .then(r => console.log("User logged out."))
            }
        })
    }
}
