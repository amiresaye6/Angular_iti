import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ICourse } from '../icourse';
import { CommonModule } from '@angular/common';
import { CourseCard } from '../course-card/course-card';
import { Courses as CoursesService } from '../../services/courses';
import { Categories, ICategory } from '../../services/categories';
import { DiscountPipe } from '../../pipes/discount-pipe';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, CourseCard, RouterLink],
  templateUrl: './courses.html',
})
export class Courses implements OnInit, OnDestroy {
  categories: ICategory[] = [];
  filteredCourses: ICourse[] = [];
  private subs: Subscription = new Subscription();

  constructor(
    private courseService: CoursesService,
    private catService: Categories,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.subs.add(
      this.catService.getAllCategories().subscribe((data) => {
        this.categories = data;
        this.cdr.detectChanges();
      }),
    );
    this.loadCourses('all');
  }

  loadCourses(catId: string): void {
    const request =
      catId === 'all'
        ? this.courseService.getAllCourses()
        : this.courseService.getCoursesByCategoryID(catId);

    this.subs.add(
      request.subscribe((data) => {
        this.filteredCourses = data;
        this.cdr.detectChanges();
      }),
    );
  }

  filterByCategory(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.loadCourses(value);
  }

  get totalValue(): number {
    const pipe = new DiscountPipe();
    return this.filteredCourses
      .filter((c) => c.booked)
      .reduce((acc, c) => acc + pipe.transform(c.price), 0);
  }

  bookSeat(id: string): void {
    const course = this.filteredCourses.find((c) => c.id === id);
    if (course && course.seats > 0) {
      course.seats--;
      course.booked = true;
      this.cdr.detectChanges();
    }
  }

  removeCourse(id: string): void {
    if (confirm('Are you sure you want to delete this course?')) {
      this.subs.add(
        this.courseService.deleteCourse(id).subscribe(() => {
          this.filteredCourses = this.filteredCourses.filter((c) => c.id !== id);
          alert('Course deleted successfully!');
          this.cdr.detectChanges();
        }),
      );
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
