export class Exam {
    title?: string;
    description?: string;
    duration?: number;
    numberOfQuestions?: number;
  
    constructor(init?: Partial<Exam>) {
        Object.assign(this, init);
      }
  }
  