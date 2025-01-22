import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./layout/header/header.component";
import { HttpClient } from '@angular/common/http';
import { Product } from './shared/models/product';
import { ApiResponse, Pagination } from './shared/models/pagination';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

// Implements OnInit in order to make HTTP request in initialization event.
// Construction is considered a bit to early to do that, but it's possible as well.
export class AppComponent implements OnInit{
  // Injects HTTP client.
  private http = inject(HttpClient);

  // Provides connection with API bacend server.
  baseUrl = 'Https://localhost:5001/api/'

  title = '180Shopper';

  products: Product[] = [];

  ngOnInit(): void {
    // Connects with API server and subscibes to it (starts to listen).
    this.http.get<ApiResponse<Product>>(this.baseUrl + 'products')
      .subscribe({
      // {} for observable object.
      // Observable object - sequence of items
      // that arrive asynchronously over time.
      next: response => {
        console.log('Full API response: ', response);
        this.products = response.value.data;
      },
      error: error => console.log(error),
      complete: () => console.log('complete')
    })
  }
}