import { Injectable } from '@angular/core';
import { Course } from '../components/course-list/course.model';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { User } from '../../auth/user.model';
import {
  AngularFirestoreCollection,
  AngularFirestore,
  DocumentReference,
} from '@angular/fire/compat/firestore';

export interface Category {
  name: string;
  subcategories: string[];
}

@Injectable({ providedIn: 'root' })
export class CourseService {
  categories = [
    {
      name: 'Programming',
      subcategories: ['JavaScript', 'Python', 'Java', 'C#']
    },
    {
      name: 'Design',
      subcategories: ['Graphic Design', 'UX/UI Design', '3D Modeling']
    },
    {
      name: 'Marketing',
      subcategories: ['Social Media', 'SEO', 'Content Marketing']
    },
    {
      name: 'Business',
      subcategories: ['Entrepreneurship', 'Leadership', 'Negotiation']
    }
  ];
  private categorySource = new BehaviorSubject<string | null>(null);

  languages: string[] = ['English', 'Spanish', 'French'];
  private languageSource = new BehaviorSubject<string | null>(null);

  difficulties: string[] = ['Beginner', 'Intermediate', 'Advanced'];
  private difficultySource = new BehaviorSubject<string | null>(null);
  // difficultySelected = this.difficultySource.asObservable();

  private coursesCollection: AngularFirestoreCollection<Course>;

  constructor(private firestore: AngularFirestore) {
    this.coursesCollection = this.firestore.collection<Course>('courses');
  }

  getCategories() {
    return this.categories;
  }

  getSubcategories(categoryName: string) {
    const category = this.categories.find(category => category.name === categoryName);
    return category ? category.subcategories : [];
  }

  getLanguages(): string[] {
    return this.languages;
  }

  setLanguage(language: string | null) {
    this.languageSource.next(language);
  }

  setDifficulty(difficulty: string | null) {
    this.difficultySource.next(difficulty);
  }

  getDifficulties(): string[] {
    return this.difficulties;
  }

  updateCourse(courseId: string, updatedCourse: Course): Promise<void> {
    return this.coursesCollection
      .doc(courseId)
      .set(updatedCourse, { merge: true });
  }

  addCourse(newCourse: Course): Promise<DocumentReference<Course>> {
    return this.coursesCollection.add(newCourse);
  }

  getAllCourses(): Observable<Course[]> {
    return this.coursesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Course;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
  
  getCourseById(courseId: string): Observable<Course | undefined> {
    return this.coursesCollection.doc<Course>(courseId).valueChanges().pipe(
      map(course => course ? { id: courseId, ...course } : undefined)
    );
  }


  getRandomCourses(numberOfCourses: number): Observable<Course[]> {
    return this.coursesCollection
      .valueChanges()
      .pipe(
        map((courses) =>
          this.getRandomElementsFromArray(courses, numberOfCourses)
        )
      );
  }

  private getRandomElementsFromArray(
    array: any[],
    numberOfElements: number
  ): any[] {
    const shuffledArray = array.sort(() => 0.5 - Math.random());
    return shuffledArray.slice(0, numberOfElements);
  }

  filterCourses(
    category: string | null,
    subcategory: string | null,
    language: string | null,
    difficulty: string | null,
    instructor: string | null,
    priceRange: string | null,
    rating: string | null,
    courseAge: string | null
  ): Observable<Course[]> {
    return this.coursesCollection
      .valueChanges()
      .pipe(
        map((courses) =>
          this.applyFilters(
            courses,
            category,
            subcategory,
            language,
            difficulty,
            instructor,
            priceRange,
            rating,
            courseAge
          )
        )
      );
  }

  private applyFilters(
    courses: Course[],
    category: string | null,
    subcategory: string | null,
    language: string | null,
    difficulty: string | null,
    instructor: string | null,
    priceRange: string | null,
    rating: string | null,
    courseAge: string | null
  ): Course[] {
    let filteredCourses = courses;

    if (category) {
      filteredCourses = filteredCourses.filter((course) =>
        course.category.includes(category)
      );
    }

    if (subcategory) {
      filteredCourses = filteredCourses.filter((course) =>
        course.subcategory.includes(subcategory)
      );
    }

    if (language) {
      filteredCourses = filteredCourses.filter((course) =>
        course.language.includes(language)
      );
    }

    if (difficulty) {
      filteredCourses = filteredCourses.filter(
        (course) => course.difficulty === difficulty
      );
    }

    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split('-').map(parseFloat);
      filteredCourses = filteredCourses.filter(
        (course) => course.price >= minPrice && course.price <= maxPrice
      );
    }

    if (rating) {
      filteredCourses = filteredCourses.filter(
        (course) => course.userRating >= parseFloat(rating)
      );
    }

    if (courseAge) {
      const boundaryDate = this.getBoundaryDate(courseAge);
      filteredCourses = filteredCourses.filter(
        (course) => course.createdAt && course.createdAt > boundaryDate // Added null check here
      );
    }

    return filteredCourses;
  }

  private getBoundaryDate(selectedCourseAge: string): Date {
    const today = new Date();
    switch (selectedCourseAge) {
      case '<1w':
        return new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 dni temu
      case '<1m':
        return new Date(
          today.getFullYear(),
          today.getMonth() - 1,
          today.getDate()
        ); // 1 miesiąc temu
      case '<6m':
        return new Date(
          today.getFullYear(),
          today.getMonth() - 6,
          today.getDate()
        ); // 6 miesięcy temu
      case '<1y':
        return new Date(
          today.getFullYear() - 1,
          today.getMonth(),
          today.getDate()
        ); // 1 rok temu
      case '<2y':
        return new Date(
          today.getFullYear() - 2,
          today.getMonth(),
          today.getDate()
        ); // 2 lata temu
      case '>3y':
        return new Date(
          today.getFullYear() - 3,
          today.getMonth(),
          today.getDate()
        ); // 3 lata temu
      default:
        return new Date(); // Jeśli podano niepoprawny warunek wieku, zwracamy datę dzisiejszą
    }
  }

  shortenTitle(title: string, maxLength: number): string {
    return title.length > maxLength ? title.slice(0, maxLength) + '...' : title; // Przytnij tytuł do określonej długości
  }

  shouldWrapSubtitle(subtitle: string): boolean {
    return subtitle.length > 20; 
  }

  shortenDescription(description: string, maxLength: number): string {
    if (description.length > maxLength) {
      // Truncate the description to the maximum length minus 3 to accommodate the ellipsis
      return description.slice(0, maxLength - 3) + '...';
    } else {
      // Return the original description if it's within the limit
      return description;
    }
  }

}
