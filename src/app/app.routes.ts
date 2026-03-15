import { Routes } from '@angular/router';
import { Courses } from './components/courses/courses';
import { CourseDetails } from './components/course-details/course-details';
import { CourseFormComponent } from './components/course-form/course-form';
import { Component } from '@angular/core';

@Component({ selector: 'app-home', template: '<h1 class="p-6 text-2xl">Welcome Home!</h1>' })
export class HomeComponent {}

@Component({ selector: 'app-about', template: '<h1 class="p-6 text-2xl">About Us</h1>' })
export class AboutComponent {}

@Component({ selector: 'app-contact', template: '<h1 class="p-6 text-2xl">Contact Us</h1>' })
export class ContactComponent {}

@Component({
  selector: 'app-not-found',
  template: '<h1 class="p-6 text-2xl text-red-500">404 - Page Not Found</h1>',
})
export class NotFoundComponent {}

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'courses', component: Courses },
  { path: 'course/:id', component: CourseDetails },
  { path: 'insertcourse', component: CourseFormComponent },
  { path: 'editcourse/:id', component: CourseFormComponent },
  { path: '**', component: NotFoundComponent },
];
