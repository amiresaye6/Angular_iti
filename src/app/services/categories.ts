import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Categories {
  private categories: string[] = ['all', 'web-dev', 'design', 'data-science', 'business'];

  getAllCategories(): string[] {
    return this.categories;
  }
}