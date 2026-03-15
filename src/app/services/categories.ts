import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ICategory {
  id: string;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class Categories {
  private apiUrl = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.apiUrl);
  }
}
