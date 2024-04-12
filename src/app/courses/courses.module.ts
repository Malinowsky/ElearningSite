import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseListComponent } from './components/course-list/course-list.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { CourseComponent } from './components/course-list/course/course.component';



@NgModule({
  declarations: [
    CourseListComponent,
    AddCourseComponent,
    CourseComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoursesModule { }
