import { Component, Input } from '@angular/core';
import { Course } from '../course.model';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent {
  @Input() course: Course;

  constructor() {
    this.course = new Course(
      '',
      '',
      '',
      '',
      ['English'], // zmieniamy na tablicę zawierającą pojedynczy string
      '',
      '',
      0,
      false,
      [],
      [],
      0,
      ['Programming', 'Web Development'],
      ['Node.js'],
      'Intermediate',
      new Date(),
      new Date(),
      ['Node.js'],
      10,
      true
    );
  }
}
