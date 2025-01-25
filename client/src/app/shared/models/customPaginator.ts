import { MatPaginatorIntl } from '@angular/material/paginator';

export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Elementy na stronę:';
  override nextPageLabel = 'Następna strona';
  override previousPageLabel = 'Poprzednia strona';

  override getRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length === 0 || pageSize === 0) {
      return `0 z ${length}`;
    }
    const startIndex = page * pageSize;
    const endIndex = Math.min(startIndex + pageSize, length);
    return `${startIndex + 1} - ${endIndex} z ${length}`;
  };
}
