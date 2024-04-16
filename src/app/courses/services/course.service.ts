import { Injectable } from "@angular/core";
import { Course } from "../components/course-list/course.model";
import { Observable, of } from "rxjs";

@Injectable({ providedIn: 'root' })
export class CourseService {

  private courses: Course[] = [
    {
      id: '1',
      title: 'Angular for Beginners',
      subtitle: 'Master Angular from scratch!',
      description: 'This course is designed for absolute beginners to Angular.',
      language: ['English'],
      imageUrl: 'https://st-lento.pl/adpics/original/05_2023/18/679eee_korepetycje-matematyka-fizyka-chemia-szkola-podst-i-srednia-zdjecia.jpg',
      instructorId: '123',
      price: 49.99,
      isFree: false,
      studentsEnrolled: ['user1', 'user2'],
      lessons: [],
      userRating : 0.5,
      category: ['Web Development'],
      difficulty: '`Advanced`'
    },
    {
      id: '2',
      title: 'React Crash Course',
      subtitle: 'Learn React in a weekend!',
      description: 'A fast-paced introduction to React fundamentals.',
      language: ['English'],
      imageUrl: 'https://ksiegarnia-edukacyjna.pl/media/catalog/product/cache/324606b3ca4369090c1f620a9fc10c1b/1/5/15918_1.jpg',
      instructorId: '456',
      price: 29.99,
      isFree: false,
      studentsEnrolled: ['user3', 'user4'],
      lessons: [],
      userRating : 0.5,
      category: ['Web Development'],
      difficulty: 'Advanced'
    },{
      id: '3',
      title: 'Vue.js Basics',
      subtitle: 'Discover the power of Vue.js!',
      description: 'An introductory course to Vue.js for beginners.',
      language: ['English'],
      imageUrl: 'https://podkowa-szkola.pl/wp-content/uploads/2022/09/slider_dos%CC%81wiadczenia-7-8-800x445.jpg',
      instructorId: '789',
      price: 39.99,
      isFree: false,
      studentsEnrolled: ['user5', 'user6'],
      lessons: [],
      userRating : 0.5,
      category: ['Web Development'],
      difficulty: 'Advanced'
    },
    {
      id: '4',
      title: 'Node.js Fundamentals',
      subtitle: 'Learn Node.js from scratch!',
      description: 'A comprehensive course covering the fundamentals of Node.js development.',
      language: ['Spanish'],
      imageUrl: 'https://www.fizmatchem-lekcje.pl/wp-content/uploads/2023/02/ekurs-690x570.jpg',
      instructorId: '101112',
      price: 59.99,
      isFree: false,
      studentsEnrolled: ['user7', 'user8'],
      lessons: [],
      userRating : 0.5,
      category: ['Computer Science', 'Web Development'],
      difficulty: 'Beginner'
    },
    {
      id: '5',
      title: 'Node.js Fundamentals',
      subtitle: 'Learn Node.js from scratch!',
      description: 'A comprehensive course covering the fundamentals of Node.js development.',
      language: ['English'],
      imageUrl: 'https://www.fizmatchem-lekcje.pl/wp-content/uploads/2023/02/ekurs-690x570.jpg',
      instructorId: '101112',
      price: 59.99,
      isFree: false,
      studentsEnrolled: ['user7', 'user8'],
      lessons: [],
      userRating : 0.5,
      category: ['Web Development'],
      difficulty: 'Intermediate'
      
    },
    {
      id: '6',
      title: 'Node.js Fundamentals',
      subtitle: 'Learn Node.js from scratch!',
      description: 'A comprehensive course covering the fundamentals of Node.js development.',
      language: ['English'],
      imageUrl: 'https://www.fizmatchem-lekcje.pl/wp-content/uploads/2023/02/ekurs-690x570.jpg',
      instructorId: '101112',
      price: 59.99,
      isFree: false,
      studentsEnrolled: ['user7', 'user8'],
      lessons: [],
      userRating : 0.5,
      category: ['Web Development'],
      difficulty: 'Intermediate'
    },
  ];
    constructor() { }

    getAllCourses() {
      return this.courses; 
    }

    getRandomCourses(numberOfCourses: number): Course[] {
      const randomCourses: Course[] = [];
      const coursesCopy = [...this.courses];
  
      for (let i = 0; i < numberOfCourses; i++) {
        const randomIndex = Math.floor(Math.random() * coursesCopy.length);
        randomCourses.push(coursesCopy.splice(randomIndex, 1)[0]); // Usuwamy wybrany kurs z kopii tablicy
      }
  
      return randomCourses;
    }

    
}