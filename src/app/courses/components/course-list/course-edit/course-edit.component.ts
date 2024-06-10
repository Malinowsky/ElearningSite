import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Category, CourseService } from '../../../services/course.service';
import { Course } from '../course.model';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthService } from '../../../../auth/auth.service';
import { User } from '../../../../auth/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Chapter } from '../../chapters/chapters.model';
import { Lesson } from '../../lessons/lesson.model';
import { Exam } from '../../exam/exam.model';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseEditComponent implements OnInit {
  course: Course = new Course(); 
  selectedImage: File | null = null;
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef<HTMLInputElement> | undefined;
  imageUrl: string | ArrayBuffer = '';
  uploadProgress: Observable<number | undefined> | null = null;
  fileName: string = 'Nie wybrano pliku';

  difficulties: string[] = [];
  selectedDifficulty: string | null = null;
  languages: string[] = [];
  selectedLanguage: string | null = null;
  categories: Category[] = [];
  subcategories: string[] = [];
  selectedCategory: string | null = null;
  user = new BehaviorSubject<User | null>(null);
  
  newLesson: Lesson = new Lesson();

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private storage: AngularFireStorage,
    private authService: AuthService,
    private firestore: AngularFirestore
  ) {}
  
  getCurrentUser(): Observable<User | null> {
    return this.user.asObservable();
  }
  

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const courseId = params['id'];
      if (courseId) {
        this.courseService.getCourseById(courseId).subscribe(course => {
          this.course = course || new Course(); 
          this.course.tags = this.course.tags || ['']; 
          this.imageUrl = this.course.imageUrl || '';
        });
      } else {
        this.course = new Course();
        this.course.tags = [''];
      }
    });
    this.difficulties = this.courseService.getDifficulties();
    this.languages = this.courseService.getLanguages();
    this.categories = this.courseService.getCategories();

  
    //Pobiera zalogowanego uzytkownika
    this.authService.user.subscribe(user => {
      this.user.next(user);
    });
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  addAnotherTag(): void {
    if (this.course.tags[this.course.tags.length - 1] !== '') {
      this.course.tags.push('');
    }
  }

  editImage(chapter: Chapter): void {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = () => {
        if (fileInput.files && fileInput.files.length > 0) {
            const file = fileInput.files[0];
            chapter.imageUrl = URL.createObjectURL(file);
        }
    };
    fileInput.click();
}

editLessonFile(lesson: Lesson) {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'video/*';
  fileInput.onchange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        lesson.fileUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };
  fileInput.click();
}

  addChapter() {
    this.course.chapters.push(new Chapter({title: '', description: ''}));
  }
  
  confirmAddLesson(chapter: Chapter): void {
    chapter.lessons = chapter.lessons || []; 
    chapter.lessons.push({ ...this.newLesson });
    this.newLesson = new Lesson(); 
    chapter.showLessonForm = false; 
  }

  addExam(chapter: Chapter): void {
    const newExam = new Exam({
      title: 'New Exam',
      description: '',
      duration: 30, // Default duration in minutes
      numberOfQuestions: 10 
    });
    chapter.exams = chapter.exams || []; // Ensure the exams array is initialized
    chapter.exams.push(newExam);
  }

  onLessonFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length) {
      const file: File = target.files[0];
      console.log(file.name);
    }
  }
  

  onCategoryChange(categoryName: string) {
    this.subcategories = this.courseService.getSubcategories(categoryName);
    this.selectedCategory = categoryName;
    this.course.category = [categoryName];  
    if (this.subcategories.length > 0) {
      this.course.subcategory = [this.subcategories[0]]; 
    }
  }

  onDifficultyChange(difficulty: string | null): void {
    if (difficulty){
    this.courseService.setDifficulty(difficulty);
    this.course.difficulty = difficulty;  
    }
  }

  onLanguageChange(language: string | null): void {
    if (language) {
      this.courseService.setLanguage(language);
      this.course.language = [language];
    }
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length) {
      const file: File = target.files[0];
      this.selectedImage = file;
      this.fileName = file.name;

      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      this.selectedImage = null;
      this.fileName = 'Nie wybrano pliku';
      this.imageUrl = '';
    }
  }

  saveChanges(): void {
    if (this.selectedImage) {
      const filePath = `course_images/${Date.now()}_${this.selectedImage.name}`;
      const fileRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, this.selectedImage);

      this.uploadProgress = uploadTask.percentageChanges();

      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.course.imageUrl = url; 
            this.saveOrUpdateCourse();
          });
        })
      ).subscribe();
    } else {
      this.saveOrUpdateCourse(); 
    }
  }
  
  private saveOrUpdateCourse(): void {
    
    const currentUser = this.user.value;
  
    if (currentUser) {
      this.firestore.collection('users', ref => ref.where('email', '==', currentUser.email))
        .get()
        .subscribe(querySnapshot => {
          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const userId = userDoc.id;
            const userData = userDoc.data() as { displayName?: string }; 
            this.course.instructorId = userId;
            this.course.instructorName = userData.displayName || 'default-instructor-name';
  
            const courseData: Course = {
              title: this.course.title,
              subtitle: this.course.subtitle,
              description: this.course.description,
              instructorId: this.course.instructorId,
              instructorName: this.course.instructorName,
              imageUrl: this.course.imageUrl,
              language: this.course.language,
              createdAt: this.course.createdAt || new Date(),
              updatedAt: new Date(),
              isLive: this.course.isLive,
              isFree: this.course.isFree,
              price: this.course.price,
              userRating: this.course.userRating || 0,
              category: this.course.category,
              subcategory: this.course.subcategory || [],
              difficulty: this.course.difficulty,
              hours: this.course.hours,
              tags: this.course.tags || [],
              studentsEnrolled: this.course.studentsEnrolled || [],
              chapters: this.course.chapters || []
            };
  
            if (this.course.id) {
              this.courseService.updateCourse(this.course.id, courseData)
                .then(() => console.log('Course updated successfully:', this.course))
                .catch(error => console.error('Error updating course:', error));
            } else {
              this.courseService.addCourse(courseData)
                .then((docRef) => {
                  this.course.id = docRef.id; 
                  console.log('Course added successfully:', this.course);
                })
                .catch(error => console.error('Error adding course:', error));
            }
          } else {
            console.error('User document not found in Firestore.');
          }
        }, error => {
          console.error('Error fetching user document:', error);
        });
    }
  }
}
