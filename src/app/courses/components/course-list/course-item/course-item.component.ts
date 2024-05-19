import { Component, Input } from '@angular/core';
import { Course } from '../course.model';
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrl: './course-item.component.scss'
})
export class CourseItemComponent {
  @Input() course?: Course;
  @Input() id?: number;

  constructor(private courseService: CourseService) { }

  shortenTitle(title?: string): string {
    return title ? this.courseService.shortenTitle(title, 17) : ''; // Przytnij tytuł do 17 znaków
  }

  shortenSubtitle(subtitle?: string): string {
    return subtitle ? this.courseService.shortenTitle(subtitle, 50) : ''; // Przytnij tytuł do 17 znaków
  }

  shouldWrapSubtitle(subtitle?: string): boolean {
    return subtitle ? this.courseService.shouldWrapSubtitle(subtitle) : false; // Sprawdź, czy podtytuł powinien być zawinięty
  }
}
