import { Component, OnInit } from '@angular/core';
import { ICourse } from '../icourse';
import { CommonModule } from '@angular/common';
import { CourseCard } from '../course-card/course-card';
import { Courses as CoursesService } from '../../services/courses';
import { Categories } from '../../services/categories';
import { DiscountPipe } from '../../pipes/discount-pipe';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, CourseCard],
  templateUrl: './courses.html',
})
export class Courses implements OnInit {
  categories: string[] = [];
  filteredCourses: ICourse[] = [];

  constructor(
    private courseService: CoursesService,
    private catService: Categories,
  ) {}

  ngOnInit(): void {
    this.categories = this.catService.getAllCategories();
    this.filteredCourses = this.courseService.getCoursesByCatID('all');
  }

  filterByCategory(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.filteredCourses = this.courseService.getCoursesByCatID(value);
  }

  get totalValue(): number {
    const pipe = new DiscountPipe();
    return this.courseService
      .getCoursesByCatID('all')
      .filter((c) => c.booked)
      .reduce((acc, c) => acc + pipe.transform(c.price), 0);
  }

  bookSeat(id: number): void {
    const course = this.filteredCourses.find((c) => c.id === id);
    if (course && course.seats > 0) {
      course.seats--;
      course.booked = true;
    }
  }
}
