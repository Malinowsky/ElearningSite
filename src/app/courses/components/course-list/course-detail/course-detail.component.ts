import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../course.model';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
})
export class CourseDetailComponent implements OnInit {
  course: Course | null = null;

  constructor(private route: ActivatedRoute, private courseService: CourseService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const courseId = params['id'];
      this.courseService.getCourseById(courseId);
    });
  }
}