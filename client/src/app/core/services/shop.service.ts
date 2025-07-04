import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pagination } from '../../shared/models/pagination';
import { Product } from '../../shared/models/product';
import { ShopParams } from '../../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
// Any properties that are stored iniside a service
// are going to be available for the lifetime of an app.
export class ShopService {
    // Provides connection with API bacend server.
    baseUrl = 'https://localhost:5001/api/'

    // Injects HTTP client.
    private http = inject(HttpClient);

    types: string[] = []
    brands: string[] = []

    getProducts(shopParams: ShopParams) {
        // Represents a query string, currently empty.
        let params = new HttpParams();

      // Appends brands=brand1,brand2...
      if(shopParams.brands.length > 0) {
        params = params.append('brands', shopParams.brands.join(','))
      }

      if(shopParams.types.length > 0) {
        params = params.append('types', shopParams.types.join(','))
      }

      if(shopParams.search) {
        params = params.append('search', shopParams.search)
      }

      params = params.append('sort', shopParams.sort)
      params = params.append('pageSize', shopParams.pageSize)
      params = params.append('pageIndex', shopParams.pageNumber)

      return this.http.get<Pagination<Product>>(this.baseUrl + 'products', {params})
    }

    // Subscribed in shop component, beacuse shop parameters are specified there.
    getProduct(id: number) {
      return this.http.get<Product>(this.baseUrl + 'products/' + id)
    }

    getBrands() {
      // Execute only once when shop component loads up (it's disposed afterwards).
      if (this.brands.length > 0) return;
      return this.http.get<string[]>(this.baseUrl + 'products/brands').subscribe({
        next: response => this.brands = response,
      })
    }

    getTypes() {
      // Execute only once when shop component loads up (it's disposed afterwards).
      if (this.types.length > 0) return;
      return this.http.get<string[]>(this.baseUrl + 'products/types').subscribe({
        next: response => this.types = response,
      })
    }
}
