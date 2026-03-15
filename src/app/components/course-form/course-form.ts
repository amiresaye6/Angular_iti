import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Courses } from '../../services/courses';
import { Categories, ICategory } from '../../services/categories';
import { ICourse } from '../icourse';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './course-form.html',
})
export class CourseFormComponent implements OnInit, OnDestroy {
  course: ICourse = { id: '', title: '', instructor: '', price: 0, seats: 0, image: '', catId: '' };
  categories: ICategory[] = [];
  isEditMode = false;
  private subs: Subscription = new Subscription();

  constructor(
    private coursesService: Courses,
    private catService: Categories,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.subs.add(this.catService.getAllCategories().subscribe((cats) => (this.categories = cats)));

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.subs.add(this.coursesService.getCourseByID(id).subscribe((c) => (this.course = c)));
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.subs.add(
        this.coursesService.updateCourse(this.course.id, this.course).subscribe(() => {
          alert('Course updated successfully!');
          this.router.navigate(['/courses']);
        }),
      );
    } else {
      this.subs.add(
        this.coursesService.addCourse(this.course).subscribe(() => {
          alert('Course inserted successfully!');
          this.router.navigate(['/courses']);
        }),
      );
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
