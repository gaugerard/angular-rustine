import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
})
export class CreateAccountComponent implements OnInit {
  newAccountForm: FormGroup;
  isLoggedIn = false;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.newAccountForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.newAccountForm.controls;
  }

  onSubmit(): void {
    console.log('a');
    this.submitted = true;

    // stop here if form is invalid
    if (
      this.newAccountForm.invalid ||
      this.f.password.value != this.f.repeatPassword.value
    ) {
      console.log('b');
      return;
    }
    console.log('c');
    this.loading = true;
    this.authenticationService
      .createAccount(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe({
        next: (data) => {
          if (data) {
            this.router.navigate(['/login']);
          } else {
            // get return url from route parameters or default to '/'
            this.router.navigate(['/']);
          }
        },
        error: (error) => {
          this.loading = false;
        },
      });
  }
}
