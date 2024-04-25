import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    this.authService.login(email, password).subscribe(
      (resData) => {
        this.successMessage = 'You have been successfully logged in.';
        this.errorMessage = '';
        this.isLoading = false;
      },
      (errorMessage) => {
        this.errorMessage = errorMessage;
        this.successMessage = '';
        this.isLoading = false;
      }
    );

    form.reset();
  }

}
