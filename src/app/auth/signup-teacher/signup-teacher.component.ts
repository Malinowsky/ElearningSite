// teacher-signup.component.ts
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../user.model';

@Component({
  selector: 'app-teacher-signup',
  templateUrl: './signup-teacher.component.html',
  styleUrls: ['./signup-teacher.component.scss'],
})
export class SignupTeacherComponent implements OnInit {
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  isStudent: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      if (user && user.role === 'student') {
        console.log('Użytkownik zmienił rolę na studenta.');
        this.isStudent = true;
      } else {
        console.log('Użytkownik zmienił rolę na nauczyciela.');
        this.isStudent = false;
      }
    });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    console.log('Form value:', form.value); // Dodaj ten log
    const email = form.value.email;
    const password = form.value.password;
    const displayName = form.value.namesurname;
    const role = 'teacher';
    const phoneNumber = form.value.phoneNumber;
    const address = {
      street: form.value.street, // Pobierz wartość pola Street
      city: form.value.city, // Pobierz wartość pola City
      postalCode: form.value.postalCode // Pobierz wartość pola Postal Code
    };
    const dateOfBirth = form.value.dateOfBirth;

    this.isLoading = true;

    console.log('Signup Data:', {
      email,
      password,
      displayName,
      role,
      phoneNumber,
      address,
      dateOfBirth
    });

    this.authService
      .signup(
        email,
        password,
        role,
        displayName,
        phoneNumber,
        address,
        dateOfBirth
      )
      .subscribe(
        (resData) => {
          this.successMessage = 'You have successfully become a teacher.';
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
