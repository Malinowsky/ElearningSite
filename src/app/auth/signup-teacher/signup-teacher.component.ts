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
    console.log('Email:', form.value.email);
    console.log('Password:', form.value.password);
    console.log('Name & Surname:', form.value.namesurname);
    console.log('Phone Number:', form.value.phoneNumber);
    console.log('Address:', form.value.address);
    console.log('Date of Birth:', form.value.dateOfBirth);
  
    const email = form.value.email;
    const password = form.value.password;
    const displayName = form.value.namesurname;
    const role = 'teacher';
    const phoneNumber = form.value.phoneNumber;
    const address = form.value.address;
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
