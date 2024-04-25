import { Injectable } from '@angular/core';
import { Course } from '../components/course-list/course.model';
import { Observable, map, of } from 'rxjs';
import { User } from '../../auth/user.model';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';

@Injectable({ providedIn: 'root' })
// export class CourseService {
//   currentUser: User | null = null;

//   private courses: Course[] = [
//     {
//       id: '1',
//       title: 'Mniej niz rok',
//       subtitle: 'Master Angular from scratch!',
//       description: 'This course is designed for absolute beginners to Angular.',
//       language: ['English'],
//       imageUrl:
//         'https://st-lento.pl/adpics/original/05_2023/18/679eee_korepetycje-matematyka-fizyka-chemia-szkola-podst-i-srednia-zdjecia.jpg',
//       instructor: '123',
//       price: 49.99,
//       isFree: false,
//       studentsEnrolled: ['user1', 'user2'],
//       lessons: [],
//       userRating: 0.5,
//       category: ['Web Development'],
//       subcategory: ['Node.js'],
//       difficulty: '`Advanced`',
//       createdAt: new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000),
//       updatedAt: new Date(),
//       tags: ['Angular'],
//       hours: 10,
//       isLive: true,
//     },
//     {
//       id: '2',
//       title: 'React Crash Course',
//       subtitle: 'Learn React in a weekend!',
//       description: 'A fast-paced introduction to React fundamentals.',
//       language: ['English'],
//       imageUrl:
//         'https://ksiegarnia-edukacyjna.pl/media/catalog/product/cache/324606b3ca4369090c1f620a9fc10c1b/1/5/15918_1.jpg',
//       instructor: '456',
//       price: 29.99,
//       isFree: false,
//       studentsEnrolled: ['user3', 'user4'],
//       lessons: [],
//       userRating: 0.5,
//       category: ['Web Development'],
//       subcategory: ['Node.js'],
//       difficulty: 'Advanced',
//       createdAt: new Date(new Date().getTime() - 15 * 24 * 60 * 60 * 1000),
//       updatedAt: new Date(),
//       tags: ['Angular'],
//       hours: 10,
//       isLive: true,
//     },
//     {
//       id: '3',
//       title: 'Vue.js Basics',
//       subtitle: 'Discover the power of Vue.js!',
//       description: 'An introductory course to Vue.js for beginners.',
//       language: ['English'],
//       imageUrl:
//         'https://podkowa-szkola.pl/wp-content/uploads/2022/09/slider_dos%CC%81wiadczenia-7-8-800x445.jpg',
//       instructor: '789',
//       price: 39.99,
//       isFree: false,
//       studentsEnrolled: ['user5', 'user6'],
//       lessons: [],
//       userRating: 0.5,
//       category: ['Web Development'],
//       subcategory: ['Node.js'],
//       difficulty: 'Advanced',
//       createdAt: new Date(
//         new Date().getFullYear(),
//         new Date().getMonth() - 5,
//         new Date().getDate()
//       ),
//       updatedAt: new Date(),
//       tags: ['Angular'],
//       hours: 10,
//       isLive: true,
//     },
//     {
//       id: '4',
//       title: 'Node.js Fundamentals',
//       subtitle: 'Learn Node.js from scratch!',
//       description:
//         'A comprehensive course covering the fundamentals of Node.js development.',
//       language: ['Spanish'],
//       imageUrl:
//         'https://www.fizmatchem-lekcje.pl/wp-content/uploads/2023/02/ekurs-690x570.jpg',
//       instructor: '101112',
//       price: 59.99,
//       isFree: false,
//       studentsEnrolled: ['user7', 'user8'],
//       lessons: [],
//       userRating: 0.5,
//       category: ['Computer Science', 'Web Development'],
//       subcategory: ['Node.js'],
//       difficulty: 'Beginner',
//       createdAt: new Date(
//         new Date().getFullYear() - 365 * 2 * 24 * 60 * 60 * 1000
//       ),
//       updatedAt: new Date(),
//       tags: ['Angular'],
//       hours: 10,
//       isLive: true,
//     },
//     {
//       id: '5',
//       title: 'Node.js Fundamentals',
//       subtitle: 'Learn Node.js from scratch!',
//       description:
//         'A comprehensive course covering the fundamentals of Node.js development.',
//       language: ['English'],
//       imageUrl:
//         'https://www.fizmatchem-lekcje.pl/wp-content/uploads/2023/02/ekurs-690x570.jpg',
//       instructor: '101112',
//       price: 59.99,
//       isFree: false,
//       studentsEnrolled: ['user7', 'user8'],
//       lessons: [],
//       userRating: 0.5,
//       category: ['Web Development'],
//       subcategory: ['Node.js'],
//       difficulty: 'Intermediate',
//       createdAt: new Date(
//         new Date().getFullYear() - 365 * 3 * 24 * 60 * 60 * 1000
//       ),
//       updatedAt: new Date(),
//       tags: ['Angular'],
//       hours: 10,
//       isLive: true,
//     },
//     {
//       id: '6',
//       title: 'Node.js Fundamentals',
//       subtitle: 'Learn Node.js from scratch!',
//       description:
//         'A comprehensive course covering the fundamentals of Node.js development.',
//       language: ['English'],
//       imageUrl:
//         'https://www.fizmatchem-lekcje.pl/wp-content/uploads/2023/02/ekurs-690x570.jpg',
//       instructor: '231',
//       price: 59.99,
//       isFree: false,
//       studentsEnrolled: ['user7', 'user8'],
//       lessons: [],
//       userRating: 0.5,
//       category: ['Web Development'],
//       subcategory: ['Node.js'],
//       difficulty: 'Intermediate',
//       createdAt: new Date(
//         new Date().getFullYear() - 365 * 4 * 24 * 60 * 60 * 1000
//       ),
//       updatedAt: new Date(),
//       tags: ['Angular'],
//       hours: 10,
//       isLive: true,
//     },
//   ];

//   getCourseById(courseId: string): Course | null {
//     const course = this.courses.find(course => course.id === courseId);
//     return course ? course : null;
//   }

//   getAllCourses() {
//     return this.courses;
//   }

//   getRandomCourses(numberOfCourses: number): Course[] {
//     const randomCourses: Course[] = [];
//     const coursesCopy = [...this.courses];

//     for (let i = 0; i < numberOfCourses; i++) {
//       const randomIndex = Math.floor(Math.random() * coursesCopy.length);
//       randomCourses.push(coursesCopy.splice(randomIndex, 1)[0]);
//     }

//     return randomCourses;
//   }
  

//   updateCourse(id: string, updatedCourse: Course): void {
//     const index = this.courses.findIndex(course => course.id === id);
//     if (index !== -1) {
//       this.courses[index] = updatedCourse;
//     } else {
//       console.error(`Course with id ${id} not found.`);
//     }
//   }

//   addCourse(newCourse: Course): void {
//     newCourse.id = (this.courses.length + 1).toString(); // Generate a unique ID
//     this.courses.push(newCourse);
//   }
  

//   public filterCourses(
//     category: string | null,
//     subcategory: string | null,
//     language: string | null,
//     difficulty: string | null,
//     instructor: string | null,
//     priceRange: string | null,
//     rating: string | null,
//     courseAge: string | null
//   ): Course[] {
//     let filtered: Course[] = [];

//     if (!this.courses) {
//       return filtered;
//     }

//     filtered = this.courses.slice(); // Tworzymy kopię tablicy courses

//     filtered = filtered.filter((course) => {
//       if (
//         (category && !this.checkFilter(course, 'category', category)) ||
//         (subcategory &&
//           !this.checkFilter(course, 'subcategory', subcategory)) ||
//         (language && !this.checkFilter(course, 'language', language)) ||
//         (difficulty && !this.checkFilter(course, 'difficulty', difficulty)) ||
//         (instructor && !this.checkFilter(course, 'instructor', instructor)) ||
//         (priceRange && !this.checkFilter(course, 'price', priceRange)) ||
//         (rating && !this.checkFilter(course, 'userRating', rating)) ||
//         (courseAge && !this.checkFilter(course, 'courseAge', courseAge))
//       ) {
//         return false;
//       }
//       return true;
//     });

//     return filtered;
//   }

//   public checkFilter(
//     course: Course,
//     key: string,
//     value: string | null
//   ): boolean {
//     switch (key) {
//       case 'category':
//         return course.category.includes(value as string);
//       case 'subcategory':
//         return course.subcategory.includes(value as string);
//       case 'language':
//         return course.language.includes(value as string);
//       case 'difficulty':
//         return course.difficulty === (value as string);
//       case 'price':
//         return course.price <= parseFloat(value as string);
//       case 'userRating':
//         return course.userRating >= parseFloat(value as string);
//         case 'courseAge':
//           return this.filterCoursesByAge(course.createdAt, value as string);
//       default:
//         return true;
//     }
//   }

//   filterCoursesByAge(createdAt: Date, selectedCourseAge: string | null): boolean {
//     if (!selectedCourseAge) {
//       return true; // Zwracamy true, ponieważ nie ma warunku wieku
//     }
  
//     const today = new Date();
//     let boundaryDate: Date;
  
//     switch (selectedCourseAge) {
//       case '<1w':
//         boundaryDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 dni temu
//         break;
//       case '<1m':
//         boundaryDate = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate()); // 1 miesiąc temu
//         break;
//       case '<6m':
//         boundaryDate = new Date(today.getFullYear(), today.getMonth() - 6, today.getDate()); // 6 miesięcy temu
//         break;
//       case '<1y':
//         boundaryDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()); // 1 rok temu
//         break;
//       case '<2y':
//         boundaryDate = new Date(today.getFullYear() - 2, today.getMonth(), today.getDate()); // 2 lata temu
//         break;
//       case '>3y':
//         boundaryDate = new Date(today.getFullYear() - 3, today.getMonth(), today.getDate()); // 3 lata temu
//         break;
//       default:
//         return false; // Jeśli podano niepoprawny warunek wieku, zwracamy false
//     }
  
//     return createdAt > boundaryDate;
//   }
  

//   shortenTitle(title: string, maxLength: number): string {
//     return title.length > maxLength ? title.slice(0, maxLength) + '...' : title; // Przytnij tytuł do określonej długości
//   }

//   shouldWrapSubtitle(subtitle: string): boolean {
//     return subtitle.length > 20; // Sprawdź, czy podtytuł powinien być zawinięty
//   }
// }
export class CourseService {
  
  private coursesCollection: AngularFirestoreCollection<Course>;

  constructor(private firestore: AngularFirestore) {
    this.coursesCollection = this.firestore.collection<Course>('courses');
  }
  
  updateCourse(courseId: string, updatedCourse: Course): Promise<void> {
    return this.coursesCollection.doc(courseId).set(updatedCourse, { merge: true });
  }

  addCourse(newCourse: Course): Promise<DocumentReference<Course>> {
    return this.coursesCollection.add(newCourse);
  }
  

  getAllCourses(): Observable<Course[]> {
    return this.coursesCollection.valueChanges();
  }

  getCourseById(courseId: string): Observable<Course | undefined> {
    return this.coursesCollection.doc(courseId).valueChanges();
  }

  getRandomCourses(numberOfCourses: number): Observable<Course[]> {
    return this.coursesCollection.valueChanges().pipe(
      map(courses => this.getRandomElementsFromArray(courses, numberOfCourses))
    );
  }

  private getRandomElementsFromArray(array: any[], numberOfElements: number): any[] {
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
    return this.coursesCollection.valueChanges().pipe(
      map(courses => this.applyFilters(courses, category, subcategory, language, difficulty, instructor, priceRange, rating, courseAge))
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
      filteredCourses = filteredCourses.filter(course => course.category.includes(category));
    }

    if (subcategory) {
      filteredCourses = filteredCourses.filter(course => course.subcategory.includes(subcategory));
    }

    if (language) {
      filteredCourses = filteredCourses.filter(course => course.language.includes(language));
    }

    if (difficulty) {
      filteredCourses = filteredCourses.filter(course => course.difficulty === difficulty);
    }

    if (instructor) {
      filteredCourses = filteredCourses.filter(course => course.instructor === instructor);
    }

    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split('-').map(parseFloat);
      filteredCourses = filteredCourses.filter(course => course.price >= minPrice && course.price <= maxPrice);
    }

    if (rating) {
      filteredCourses = filteredCourses.filter(course => course.userRating >= parseFloat(rating));
    }

    if (courseAge) {
      const boundaryDate = this.getBoundaryDate(courseAge);
      filteredCourses = filteredCourses.filter(course => course.createdAt > boundaryDate);
    }

    return filteredCourses;
  }

  private getBoundaryDate(selectedCourseAge: string): Date {
    const today = new Date();
    switch (selectedCourseAge) {
      case '<1w':
        return new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 dni temu
      case '<1m':
        return new Date(today.getFullYear(), today.getMonth() - 1, today.getDate()); // 1 miesiąc temu
      case '<6m':
        return new Date(today.getFullYear(), today.getMonth() - 6, today.getDate()); // 6 miesięcy temu
      case '<1y':
        return new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()); // 1 rok temu
      case '<2y':
        return new Date(today.getFullYear() - 2, today.getMonth(), today.getDate()); // 2 lata temu
      case '>3y':
        return new Date(today.getFullYear() - 3, today.getMonth(), today.getDate()); // 3 lata temu
      default:
        return new Date(); // Jeśli podano niepoprawny warunek wieku, zwracamy datę dzisiejszą
    }
  }

  shortenTitle(title: string, maxLength: number): string {
    return title.length > maxLength ? title.slice(0, maxLength) + '...' : title; // Przytnij tytuł do określonej długości
  }

  shouldWrapSubtitle(subtitle: string): boolean {
    return subtitle.length > 20; // Sprawdź, czy podtytuł powinien być zawinięty
  }
}