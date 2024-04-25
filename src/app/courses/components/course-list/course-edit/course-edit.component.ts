import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CourseService } from '../../../services/course.service';
import { Course } from '../course.model';
import { finalize } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit {
  course: Course = {} as Course;
  selectedImage: File | null = null;
  uploadProgress: number | null = null;
  imageUrl: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const courseId = params['id'];

      this.courseService.getCourseById(courseId).subscribe(course => {
        this.course = course || ({} as Course); 
      });
    });
  }

  saveChanges() {
    if (this.selectedImage) {
      const filePath = `course_images/${Date.now()}_${this.selectedImage.name}`;
      const fileRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, this.selectedImage);

      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.imageUrl = url;
            this.course.imageUrl = url; // Update course with image URL
            this.saveCourse(); // Save course after image URL is obtained
          });
        })
      ).subscribe();
    } else {
      this.saveCourse(); // Save course without uploading image
    }
  }

  private saveCourse() {
    this.courseService.updateCourse(this.course.id, this.course)
      .then(() => {
        console.log('Course updated:', this.course);
      })
      .catch(error => {
        console.error('Error updating course:', error);
      });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedImage = file;
  }
}