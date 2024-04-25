import { Component, Input, OnInit } from '@angular/core'; // Move import to the top

import { Course } from './course.model';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

type CourseFilter = {
  [key: string]: string | null | undefined;
};

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit {
  @Input() courses: Observable<Course[]> | undefined;
  filteredCourses: Course[] = [];
  sliderCourses: Course[] = [];
  currentIndex: number = 0;

  // Define filter variables
  selectedCategory: string | null = null;
  selectedSubcategory: string | null = null;
  selectedLanguage: string | null = null;
  selectedDifficulty: string | null = null;
  selectedInstructor: string | null = null;
  selectedPriceRange: string | null = null;
  selectedRating: string | null = null;
  selectAgeCourse: string | null = null;

  constructor(private router: Router, private courseService: CourseService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.fetchCourses();
  }

  navigateToCourse(course: Course) {
    // Uzyskaj ID kursu
    const courseId = course.id;
    console.log("Course ID:", courseId);
  

    // Przejdź do ścieżki kursu
    this.router.navigate(['/course/'],{relativeTo: this.route});
  }

  fetchCourses() {
    this.courses = this.courseService.getAllCourses(); // Pobranie danych jako Observable<Course[]>
    this.courses.subscribe((data: Course[]) => {
      const originalCourses = data;
      const shuffledCourses = this.shuffleArray(originalCourses);
      this.filteredCourses = shuffledCourses.slice(0, 100);
      this.sliderCourses = shuffledCourses.slice(0, 10);
      this.applyFilters();
    });
  }

  applyFilters() {
    const filters: CourseFilter = {};
  
    if (this.selectedCategory !== undefined) {
      filters['category'] = this.selectedCategory;
    }
    if (this.selectedSubcategory !== undefined) {
      filters['subcategory'] = this.selectedSubcategory;
    }
    if (this.selectedLanguage !== undefined) {
      filters['language'] = this.selectedLanguage;
    }
    if (this.selectedDifficulty !== undefined) {
      filters['difficulty'] = this.selectedDifficulty;
    }
    if (this.selectedInstructor !== undefined) {
      filters['instructor'] = this.selectedInstructor;
    }
    if (this.selectedPriceRange !== undefined) {
      filters['priceRange'] = this.selectedPriceRange;
    }
    if (this.selectedRating !== undefined) {
      filters['rating'] = this.selectedRating;
    }
  
    if (this.selectAgeCourse !== undefined) {
      filters['courseAge'] = this.selectAgeCourse;
    }
  
    this.courseService.filterCourses(
      filters['category'] || null,
      filters['subcategory'] || null,
      filters['language'] || null,
      filters['difficulty'] || null,
      filters['instructor'] || null,
      filters['priceRange'] || null,
      filters['rating'] || null,
      filters['courseAge'] || null,
    ).subscribe((filteredCourses: Course[]) => {
      this.filteredCourses = filteredCourses;
    });
  }
  
  
  
  onCategorySelected(category: string | null | undefined) {
    this.selectedCategory = category !== undefined ? category : null;
    this.applyFilters();
  }
  
  onSubcategorySelected(subcategory: string | null | undefined) {
    this.selectedSubcategory = subcategory !== undefined ? subcategory : null;
    this.applyFilters();
  }
  
  onLanguageSelected(language: string | null | undefined) {
    this.selectedLanguage = language !== undefined ? language : null;
    this.applyFilters();
  }
  
  onDifficultySelected(difficulty: string | null | undefined) {
    this.selectedDifficulty = difficulty !== undefined ? difficulty : null;
    this.applyFilters();
  }
  
  onInstructorSelected(instructor: string | null | undefined) {
    this.selectedInstructor = instructor !== undefined ? instructor : null;
    this.applyFilters();
  }
  
  onPriceRangeSelected(priceRange: string | null | undefined) {
    this.selectedPriceRange = priceRange !== undefined ? priceRange : null;
    this.applyFilters();
  }
  
  onRatingSelected(rating: string | null | undefined) {
    this.selectedRating = rating !== undefined ? rating : null;
    this.applyFilters();
  }
  
  onCourseAgeSelected(courseAge: string | null | undefined) {
    this.selectAgeCourse = courseAge !== undefined ? courseAge : null;
    this.applyFilters();
  }
  

  // Metoda do przemieszania tablicy
  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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
}
