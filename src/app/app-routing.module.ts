import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SignupTeacherComponent } from './auth/signup-teacher/signup-teacher.component';
import { AuthGuard } from './auth/auth.guard';
import { CourseListComponent } from './courses/components/course-list/course-list.component';

const routes: Routes = [
  {
    path: '',
    component: CourseListComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup/student', component: SignupComponent },
  { path: 'signup/teacher', component: SignupTeacherComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
