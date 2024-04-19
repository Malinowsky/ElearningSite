import { User } from '../../../auth/user.model';
import { Lesson } from '../lessons/lesson.model';

export class Course {
  constructor(
    public id: string,
    public title: string,
    public subtitle: string,
    public description: string,
    public language: string[],
    public imageUrl: string,
    public instructor: string,
    public price: number,
    public isFree: boolean,
    public studentsEnrolled: string[], // Tablica ID studentów zapisanych na kurs
    public lessons: Lesson[], // Tablica lekcji kursu
    public userRating: number,
    public category: string[],
    public subcategory: string[],
    public difficulty: string,
    public createdAt: Date,
    public updatedAt: Date,
    public tags: string[],
    public hours: number,
    public isLive: boolean,
  ) {}
}
