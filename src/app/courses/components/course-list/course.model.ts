import { Lesson } from "../lessons/lesson.model";

export class Course {
    constructor(
      public id: string,
      public title: string,
      public description: string,
      public instructorId: string, // ID nauczyciela prowadzącego kurs
      public price: number,
      public isFree: boolean,
      public studentsEnrolled: string[], // Tablica ID studentów zapisanych na kurs
      public lessons: Lesson[] // Tablica lekcji kursu
    ) {}
  }