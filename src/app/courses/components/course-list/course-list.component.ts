import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from './course.model';


@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  courses$: Observable<Course[]> | undefined;

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courses$ = this.courseService.getCourses();
  }
}