import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./layout/header/header.component";
import { ShopComponent } from "./features/shop/shop.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

// Implements OnInit in order to make HTTP request in initialization event.
// Construction is considered a bit to early to do that, but it's possible as well.

export class AppComponent {
  title = '180Shopper'
}
