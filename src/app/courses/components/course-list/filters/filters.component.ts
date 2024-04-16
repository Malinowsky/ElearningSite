import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  @Output() categorySelected = new EventEmitter<string | null>();
  @Output() languageSelected = new EventEmitter<string | null>();
  @Output() difficultySelected = new EventEmitter<string | null>();
  @Output() instructorSelected = new EventEmitter<string | null>();
  @Output() priceRangeSelected = new EventEmitter<string | null>();
  @Output() ratingSelected = new EventEmitter<string | null>();

  categories: string[] = ['Web Development', 'Computer Science', 'Artificial Intelligence'];
  languages: string[] = ['English', 'Spanish', 'French'];
  difficulties: string[] = ['Beginner', 'Intermediate', 'Advanced'];
  instructors: string[] = ['John Doe', 'Jane Smith', 'Alice Johnson'];
  priceRanges: { label: string, value: string }[] = [
    { label: '$0 - $50', value: '0-50' },
    { label: '$51 - $100', value: '51-100' },
    { label: '$101 - $200', value: '101-200' }
  ];
  ratings: string[] = ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'];

  selectedCategory: string | null = null;
  selectedLanguage: string | null = null;
  selectedDifficulty: string | null = null;
  selectedInstructor: string | null = null;
  selectedPriceRange: string | null = null;
  selectedRating: string | null = null;

  constructor() { }

  onCategoryChange(category: string | null) {
    this.selectedCategory = category;
    this.categorySelected.emit(this.selectedCategory);
  }

  onLanguageChange(language: string | null) {
    this.selectedLanguage = language;
    this.languageSelected.emit(this.selectedLanguage);
  }

  onDifficultyChange(difficulty: string | null) {
    this.selectedDifficulty = difficulty;
    this.difficultySelected.emit(this.selectedDifficulty);
  }

  onInstructorChange(instructor: string | null) {
    this.selectedInstructor = instructor;
    this.instructorSelected.emit(this.selectedInstructor);
  }

  onPriceRangeChange(priceRange: string | null) {
    this.selectedPriceRange = priceRange;
    this.priceRangeSelected.emit(this.selectedPriceRange);
  }

  onRatingChange(rating: string | null) {
    this.selectedRating = rating;
    this.ratingSelected.emit(this.selectedRating);
  }
}

