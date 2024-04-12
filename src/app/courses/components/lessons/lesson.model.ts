export class Lesson {
    constructor(
      public id: string,
      public title: string,
      public content: string,
      public duration: number // Czas trwania lekcji w minutach
    ) {}
  }