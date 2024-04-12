// teacher-signup.component.ts
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-teacher-signup',
  templateUrl: './signup-teacher.component.html',
  styleUrls: ['./signup-teacher.component.scss'],
})
export class SignupTeacherComponent implements OnInit {
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    const role = 'teacher';
    this.isLoading = true;


    this.authService.signup(email, password, role).subscribe(
      resData => {
        this.successMessage = 'You have been successfully sign up.';
        this.errorMessage = '';
        this.isLoading = false;
      },
      errorMessage => {
        this.errorMessage = errorMessage;
        this.successMessage = '';
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
