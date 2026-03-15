// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-course-details',
//   imports: [],
//   templateUrl: './course-details.html',
//   styleUrl: './course-details.css',
// })
// export class CourseDetails {}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Courses } from '../../services/courses';
import { ICourse } from '../icourse';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: `./course-details.html`
})
export class CourseDetails implements OnInit {
  course: ICourse | undefined;

  constructor(
    private route: ActivatedRoute,
    private coursesService: Courses
  ) {}

  ngOnInit() {
    // Get the ID from route parameters
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.course = this.coursesService.getCourseByID(id);
  }
}