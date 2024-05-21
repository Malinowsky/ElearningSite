import { Exam } from "../exam/exam.model";
import { Lesson } from "../lessons/lesson.model";

export class Chapter {
  id?: string;
  title?: string;
  description?: string;
  lessons?: Lesson[];
  exams?: Exam[];
  imageUrl?: string;
  showLessonForm?: boolean; // Add this property

  constructor(init?: Partial<Chapter>) {
    Object.assign(this, init);
    this.lessons = this.lessons || [];
    this.exams = this.exams || [];
    this.showLessonForm = false; // Initialize the property
  }
}