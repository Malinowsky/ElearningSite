import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../../auth/auth.guard';
import { CourseListComponent } from './course-list.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CourseItemComponent } from './course-item/course-item.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'course', pathMatch: 'full',
  },
  {
    path: 'course',
    component: CourseListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'course/:id',
    component: CourseDetailComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'item',
        component: CourseItemComponent,
      },
    ],
  },
  {
    path: 'course/edit/:id',
    component: CourseEditComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
