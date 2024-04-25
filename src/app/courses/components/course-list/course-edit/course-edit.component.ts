import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CourseService } from '../../../services/course.service';
import { Course } from '../course.model';


@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit {
  courseId: string;
  course: Course = {} as Course; // Inicjalizacja właściwości course jako pustego obiektu

  constructor(private route: ActivatedRoute, private courseService: CourseService) {
    this.courseId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadCourse();
  }

  loadCourse(): void {
    const loadedCourse = this.courseService.getCourseById(this.courseId);
    if (loadedCourse !== null) {
      this.course = loadedCourse;
    } else {
      console.error(`Course with id ${this.courseId} not found.`);
      // Potencjalnie tutaj można dodać przekierowanie na stronę błędu 404
    }
  }

  saveChanges(): void {
    this.courseService.updateCourse(this.courseId, this.course);
    // Możesz dodać odpowiednie działania po zapisaniu zmian, np. powrót do listy kursów
  }
}