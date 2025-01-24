import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ShopService } from '../../core/services/shop.service';
import { ProductItemComponent } from "./product-item/product-item.component";
import { MatDialog } from '@angular/material/dialog';
import { FiltersDialogComponent } from './filters-dialog/filters-dialog.component';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatListOption, MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { ShopParams } from '../../shared/models/shopParams';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Pagination } from '../../shared/models/pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    ProductItemComponent,
    MatMenu,
    MatSelectionList,
    MatListOption,
    MatMenuTrigger,
    MatPaginator,
    FormsModule
],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {
  // Service is active throughout the application life cycle.
  // Coponents are being created and disposed as soon as they aren't needed.
  // It's better to create HTTP connection from service.
  private shopService = inject(ShopService)

  private dialogService = inject(MatDialog)

  products?: Pagination<Product>

  sortOptions = [
    {name: 'A-Z', value: 'name'},
    {name: 'Cena: rosnąco', value: 'priceAsc'},
    {name: 'Cena: malejąco', value: 'priceDsc'},
  ]

  pageSizeOptions = [5, 10, 15, 20]

  shopParams = new ShopParams()

  ngOnInit(): void {
    this.initializeShop();
  }

  initializeShop() {
    this.shopService.getBrands();
    this.shopService.getTypes();
    this.getProducts();
  }

  getProducts() {
    // Connects with API server and subscibes to it (starts to listen).
    this.shopService.getProducts(this.shopParams).subscribe({
      // {} for observable object.
      // Observable object - sequence of items that arrive asynchronously over time.
      next: response => this.products = response,
      error: error => console.error(error)
    })
  }

  onSearchChange() {
    this.shopParams.pageNumber = 1
    this.getProducts()
  }

  handlePageEvent(event: PageEvent) {
    this.shopParams.pageNumber = event.pageIndex + 1
    this.shopParams.pageSize = event.pageSize
    this.getProducts()
  }

  onSortChange(event: MatSelectionListChange) {
    // Technically it's list with only one element, so first item needs to be grabbed.
    const selectedOption = event.options[0]
    if(selectedOption) {
      this.shopParams.sort = selectedOption.value;
      this.shopParams.pageNumber = 1
      this.getProducts();
    }
  }

  openFiltersDialog() {
    const dialogRef = this.dialogService.open(FiltersDialogComponent, {
      minWidth: '500px',
      data: {
        selectedBrands: this.shopParams.brands,
        selectedTypes: this.shopParams.types
      }
    });
    dialogRef.afterClosed().subscribe({
      next: result => {
        if(result) {
          this.shopParams.brands = result.selectedBrands
          this.shopParams.types = result.selectedTypes
          this.shopParams.pageNumber = 1
          this.getProducts()
        }
      }
    })
  }
}
