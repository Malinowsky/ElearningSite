import { Component, Input, OnInit } from '@angular/core'; // Move import to the top

import { Course } from './course.model';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit {
  @Input() courses: Course[] | undefined; 
  filteredCourses: Course[] = [];
  sliderCourses: Course[] = [];
  currentIndex : number= 0;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.fetchCourses();
  }

  fetchCourses() {
    const originalCourses = this.courseService.getAllCourses();
    const shuffledCourses = this.shuffleArray(originalCourses);
    this.courses = shuffledCourses.slice(0, 100);
    this.filteredCourses = this.courses.slice();
    this.sliderCourses = this.courses.slice(0, 10);
  }

  private filterCourses(category: string | null, language: string | null): Course[] {
    let filtered: Course[] = [];

    if (!this.courses) {
      return filtered;
    }

    filtered = this.courses.slice(); // Tworzymy kopię tablicy courses

    if (category) {
      filtered = filtered.filter(course => course.category.includes(category));
    }

    if (language) {
      filtered = filtered.filter(course => course.language.includes(language));
    }
    
    return filtered;
  }

  // Metoda do przemieszania tablicy
  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  

  onCategorySelected(category: string | null) {
    this.filteredCourses = this.filterCourses(category, null);
  }

  onLanguageSelected(language: string | null) {
    this.filteredCourses = this.filterCourses(null, language);
  }
  
  next() {
    if (this.currentIndex < this.filteredCourses.length - 4) {
      this.currentIndex++;
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  shortenTitle(title: string): string {
    return title.length > 13 ? title.slice(0, 13) + '...' : title;
  }

  shouldWrapSubtitle(subtitle: string): boolean {
    return subtitle.length > 20;
  }
}
