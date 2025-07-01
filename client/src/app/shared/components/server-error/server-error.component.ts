import { Component } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {MatCard} from '@angular/material/card';

@Component({
    selector: 'app-server-error',
    imports: [
        MatCard
    ],
    templateUrl: './server-error.component.html',
    styleUrl: './server-error.component.scss'
})
export class ServerErrorComponent {
    error?: any;

    // NavigationExtras must be used inside the constructor.
    // It can't be accessed in lifetime event, like OnInit().
    constructor(private router: Router) {
        const navigation = this.router.getCurrentNavigation()
        this.error = navigation?.extras.state?.['error']
    }
}
