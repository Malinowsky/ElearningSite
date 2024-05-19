export class Lesson {
  public id?: string;
  public title?: string;
  public content?: string;
  public duration?: number;
  

  constructor(init?: Partial<Lesson>) {
    Object.assign(this, init);
  }
}