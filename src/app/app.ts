import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav class="bg-indigo-700 p-4 text-white shadow-lg flex gap-6">
      <a
        routerLink="/home"
        routerLinkActive="bg-indigo-900 rounded px-2"
        [routerLinkActiveOptions]="{ exact: true }"
        >Home</a
      >
      <a routerLink="/courses" routerLinkActive="bg-indigo-900 rounded px-2">Courses</a>
      <a routerLink="/about" routerLinkActive="bg-indigo-900 rounded px-2">About</a>
      <a routerLink="/contact" routerLinkActive="bg-indigo-900 rounded px-2">Contact</a>
    </nav>
    <router-outlet></router-outlet>
  `,
})
export class App {}
