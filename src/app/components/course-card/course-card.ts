import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ICourse } from '../icourse';
import { CommonModule } from '@angular/common';
import { DiscountPipe } from '../../pipes/discount-pipe';
import { AppDisableAfterClick } from '../../directives/app-disable-after-click';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-course-card',
  imports: [CommonModule, DiscountPipe, AppDisableAfterClick, RouterLink],
  templateUrl: './course-card.html',
})
export class CourseCard {
  @Input({ required: true }) course!: ICourse;
  @Output() onBook = new EventEmitter<string>();
  @Output() onDelete = new EventEmitter<string>();

  handleBook() {
    this.onBook.emit(this.course.id);
  }

  handleDelete() {
    this.onDelete.emit(this.course.id);
  }
}
