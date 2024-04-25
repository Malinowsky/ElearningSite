import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseListComponent } from './components/course-list/course-list.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { CourseDetailComponent } from './components/course-list/course-detail/course-detail.component';
import { SharedModule } from '../shared/shared.module';
import { FiltersComponent } from './components/course-list/filters/filters.component';
import { CourseEditComponent } from './components/course-list/course-edit/course-edit.component';
import { CourseItemComponent } from './components/course-list/course-item/course-item.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CourseListComponent,
    AddCourseComponent,
    CourseDetailComponent,
    CourseEditComponent,
    FiltersComponent,
    CourseItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ]
})
export class CoursesModule { }
