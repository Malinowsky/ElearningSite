import { Component, Output, EventEmitter } from '@angular/core';
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent {
  @Output() categorySelected = new EventEmitter<string | null>();
  @Output() languageSelected = new EventEmitter<string | null>();
  @Output() difficultySelected = new EventEmitter<string | null>();
  @Output() instructorSelected = new EventEmitter<string | null>();
  @Output() priceRangeSelected = new EventEmitter<string | null>();
  @Output() subcategorySelected = new EventEmitter<string | null>();
  @Output() ratingSelected = new EventEmitter<string | null>();
  @Output() courseAgeSelected = new EventEmitter<string | null>(); 


  categories = [
    {
      name: 'Programowanie',
      subcategories: ['JavaScript', 'Python', 'Java', 'C#'],
    },
    {
      name: 'Projektowanie graficzne',
      subcategories: ['Photoshop', 'Illustrator', 'InDesign'],
    },
    // Inne kategorie...
  ];

  instructors: string[] = ['John Doe', 'Jane Smith', 'Alice Johnson'];
  priceRanges: { label: string; value: string }[] = [
    { label: '$0 - $50', value: '0-50' },
    { label: '$51 - $100', value: '51-100' },
    { label: '$101 - $200', value: '101-200' },
  ];

  ratings: { label: string; value: string }[] = [
    { label: '1 Star', value: '1' },
    { label: '2 Stars', value: '2' },
    { label: '3 Stars', value: '3' },
    { label:  '4 Stars', value: '4' },
    { label: '5 Stars', value: '5' },
  ];

  courseAges: { label: string; value: string }[] = [
    { label: 'Less than a week', value: '<1w' },
    { label: 'Less than a month', value: '<1m' },
    { label: 'Less than 6 months', value: '<6m' },
    { label: 'Less than a year', value: '<1y' },
    { label: 'Less than 2 years', value: '<2y' },
    { label: 'More than 3 years', value: '>3y' },
  ];

  selectedCategory: string | null = null;
  selectedLanguage: string | null = null;
  selectedDifficulty: string | null = null;
  selectedInstructor: string | null = null;
  selectedPriceRange: string | null = null;
  selectedRating: string | null = null;
  selectedSubcategory: string | null = null;
  selectedCourseAge: string | null = null;
  languages: string[] | undefined;
  difficulties: string[] | undefined;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.languages = this.courseService.getLanguages();
    this.difficulties = this.courseService.getDifficulties();
    // Inicjalizacja innych danych z serwisu
}

  getCategory(categoryName: string) {
    return (
      this.categories.find((category) => category.name === categoryName) || {
        subcategories: [],
      }
    );
  }

  onCategoryChange(category: string | null) {
    this.selectedCategory = category;
  }

  onLanguageChange(language: string | null) {
    this.selectedLanguage = language;
  }

  onDifficultyChange(difficulty: string | null): void {
    this.courseService.setDifficulty(difficulty);
}

  onInstructorChange(instructor: string | null) {
    this.selectedInstructor = instructor;
  }

  onPriceRangeChange(priceRange: string | null) {
    this.selectedPriceRange = priceRange;
  }

  onRatingChange(rating: string | null) {
    this.selectedRating = rating;
  }

  onCourseAgeChange(courseAge: string | null) {
    this.selectedCourseAge = courseAge;
  }

  searchCourses() {
    let filtersChanged = false;

    // Sprawdzanie zmian w filtrach i emisja zdarzeń
    if (this.selectedCategory !== null) {
      this.categorySelected.emit(this.selectedCategory);
      filtersChanged = true;
    }

    if (this.selectedSubcategory !== null) {
      this.subcategorySelected.emit(this.selectedSubcategory);
      filtersChanged = true;
    }

    if (this.selectedLanguage !== null) {
      this.languageSelected.emit(this.selectedLanguage);
      filtersChanged = true;
    }

    if (this.selectedDifficulty !== null) {
      this.difficultySelected.emit(this.selectedDifficulty);
      filtersChanged = true;
    }

    if (this.selectedInstructor !== null) {
      this.instructorSelected.emit(this.selectedInstructor);
      filtersChanged = true;
    }

    if (this.selectedPriceRange !== null) {
      this.priceRangeSelected.emit(this.selectedPriceRange);
      filtersChanged = true;
    }

    if (this.selectedRating !== null) {
      this.ratingSelected.emit(this.selectedRating);
      filtersChanged = true;
    }

    // Sprawdzenie wieku kursu
    if (this.selectedCourseAge !== null) {
      this.courseAgeSelected.emit(this.selectedCourseAge);
      filtersChanged = true;
    }

    if (!filtersChanged) {
      console.log("No filters changed. Not emitting any events.");
    }
}

  
  
}
