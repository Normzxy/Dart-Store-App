import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {MatCard} from '@angular/material/card';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {AccountService} from '../../../core/services/account.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-login',
    imports: [
        ReactiveFormsModule,
        MatCard,
        MatFormField,
        MatInput,
        MatLabel,
        MatButton
    ],
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    private formBuilder = inject(FormBuilder);
    private accountService = inject(AccountService);
    private router = inject(Router);
    private activatedRoute = inject(ActivatedRoute);

    redirectTo = '/shop'
    constructor() {
        // Stores the URL the user attempted to access before being redirected to log in.
        // After a successful login, the user can be redirected back to targeted URL.
        const url = this.activatedRoute.snapshot.queryParams['redirectTo']
        if (url) this.redirectTo = url;
    }

    loginForm = this.formBuilder.group({
        email: [''],
        password: ['']
    })

    onSubmit() {
        this.accountService.login(this.loginForm.value).subscribe({
            next: () => {
                this.accountService.getUserInfo().subscribe({
                    next: () => {
                        this.router.navigateByUrl(this.redirectTo)
                            .then(r => console.log("User logged in."))
                    }
                })
            }
        })
    }
}
