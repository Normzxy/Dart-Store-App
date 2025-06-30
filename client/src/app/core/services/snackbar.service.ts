import {inject, Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
// MatSnackBar with additional global configuration as a service
export class SnackbarService {

    private snackbar = inject(MatSnackBar);

    error(message: string): void {
        this.snackbar.open(message, 'OK', {
            duration: 5000,
            // Styles .scss class name
            panelClass: ['snackbar-error'],
        })
    }

    success(message: string): void {
        this.snackbar.open(message, 'OK', {
            duration: 5000,
            // Styles .scss class name
            panelClass: ['snackbar-success'],
        })
    }
}
