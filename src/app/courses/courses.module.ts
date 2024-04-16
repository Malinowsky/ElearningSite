import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseListComponent } from './components/course-list/course-list.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { CourseComponent } from './components/course-list/course/course.component';
import { SharedModule } from '../shared/shared.module';
import { FiltersComponent } from './components/course-list/filters/filters.component';



@NgModule({
  declarations: [
    CourseListComponent,
    AddCourseComponent,
    CourseComponent,
    FiltersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class CoursesModule { }
