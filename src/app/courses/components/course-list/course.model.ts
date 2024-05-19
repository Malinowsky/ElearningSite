
import { Timestamp } from 'firebase/firestore';
import { Chapter } from '../chapters/chapters.model';


export class Course {
  id?: string;
  title: string = '';
  subtitle: string = '';
  description: string = '';

  studentsEnrolled: string[] = [];
  instructorId?: string;
  instructorName?: string;

  imageUrl: string = '';
  language: string[] = [];
  createdAt:  Timestamp | Date | undefined;
  updatedAt:  Timestamp | Date | undefined;
  isLive: boolean = false;
  isFree: boolean = false;
  price: number = 0;
  
  userRating: number = 0;
  category: string[] = [];
  subcategory: string[] = [];
  difficulty: string = '';
  hours: number = 0;
  tags: string[] = [];
  chapters: Chapter[] = [];

  constructor(init?: Partial<Course>) {
    Object.assign(this, init);
  }
}