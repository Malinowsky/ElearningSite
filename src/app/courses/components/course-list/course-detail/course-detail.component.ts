import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Course } from '../course.model';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { Observable } from 'rxjs/internal/Observable';
import { filter } from 'rxjs/internal/operators/filter';
import { DatePipe } from '@angular/common';
import { Timestamp } from 'firebase/firestore';
import { AuthService } from '../../../../auth/auth.service';
import { User } from '../../../../auth/user.model';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
})
export class CourseDetailComponent implements OnInit {
  user$: Observable<User | null>;
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private datePipe: DatePipe,
    private authService: AuthService,
  ) {
    this.user$ = this.authService.user.asObservable();
  }
  course$: Observable<Course | undefined> | undefined;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const courseId = params['id'];
      this.course$ = this.courseService
        .getCourseById(courseId)
        .pipe(filter((course) => course !== undefined));
    });
  }

  

  formatDate(timestamp: Timestamp | Date | null | undefined): string | null {
    if (timestamp === null || timestamp === undefined) {
      return null;
    }

    const date =
      timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;

    return this.datePipe.transform(date, 'medium');
  }

  shortenTitle(title?: string): string {
    return title ? this.courseService.shortenTitle(title, 25) : ''; 
  }

  shortenSubtitle(subtitle?: string): string {
    return subtitle ? this.courseService.shortenTitle(subtitle, 50) : ''; 
  }

  shortenDescription(description?: string): string {
    return description ? this.courseService.shortenTitle(description, 100) : '';
  }
}
