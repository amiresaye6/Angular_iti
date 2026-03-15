import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Courses } from '../../services/courses';
import { ICourse } from '../icourse';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: `./course-details.html`,
})
export class CourseDetails implements OnInit, OnDestroy {
  course: ICourse | undefined;
  private sub: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private coursesService: Courses,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.sub = this.coursesService.getCourseByID(id).subscribe((c) => {
        this.course = c;
        this.cdr.detectChanges();
      });
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
