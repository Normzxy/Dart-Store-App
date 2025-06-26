import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home',
    imports: [
        RouterLink,
        MatButton
    ],
    templateUrl: './home.component.html',
    standalone: true,
    styleUrl: './home.component.scss'
})

export class HomeComponent {

}
