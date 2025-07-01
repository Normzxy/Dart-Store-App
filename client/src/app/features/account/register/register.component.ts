import {Component, inject} from '@angular/core';
import {MatCard} from '@angular/material/card';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {AccountService} from '../../../core/services/account.service';
import {Router} from '@angular/router';
import {SnackbarService} from '../../../core/services/snackbar.service';
import {NgIf} from '@angular/common';

@Component({
    selector: 'app-register',
    imports: [
        ReactiveFormsModule,
        MatCard,
        MatFormField,
        MatLabel,
        MatInput,
        MatButton,
        MatError,
        NgIf
    ],
    templateUrl: './register.component.html',
    standalone: true,
    styleUrl: './register.component.scss'
})
export class RegisterComponent {
    private formBuilder = inject(FormBuilder)
    private accountService = inject(AccountService)
    private router = inject(Router);
    private snackbar = inject(SnackbarService);
    validationErrors?: string[];

    registerForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
    })

    onSubmit() {
        this.accountService.register(this.registerForm.value).subscribe({
            next: () => {
                this.snackbar.success('Zarejestrowano pomyślnie. Zaloguj się.');
                this.router.navigateByUrl('/account/login')
                    .then(() => "User redirected to login page.");
            },
            error: errors =>this.validationErrors = errors
        })
    }
}
