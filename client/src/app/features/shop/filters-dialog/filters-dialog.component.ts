import { Component, inject } from '@angular/core'
import { ShopService } from '../../../core/services/shop.service'
import { MatDivider } from '@angular/material/divider'
import { MatSelectionList, MatListOption } from '@angular/material/list'
import { MatButton } from '@angular/material/button'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-filters-dialog',
  standalone: true,
  imports: [
    MatDivider,
    MatSelectionList,
    MatListOption,
    MatButton,
    FormsModule
  ],
  templateUrl: './filters-dialog.component.html',
  styleUrl: './filters-dialog.component.scss'
})
export class FiltersDialogComponent {
  shopService = inject(ShopService)
    //After .open in shop.component is opneded, dependencies are taken by those variables.
  private dialogRef = inject(MatDialogRef<FiltersDialogComponent>)
  data = inject(MAT_DIALOG_DATA)

  selectedBrands: string[] = this.data.selectedBrands;
  selectedTypes: string[] = this.data.selectedTypes;

  // Data is visible in observable (.afterClosed in shop.component).
  applyFilters() {
    this.dialogRef.close({
      selectedBrands: this.selectedBrands,
      selectedTypes: this.selectedTypes
    })
  }
}
