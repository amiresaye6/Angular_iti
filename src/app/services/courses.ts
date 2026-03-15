import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICourse } from '../components/icourse';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class Courses {
  private apiUrl = `${environment.apiUrl}/courses`;

  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<ICourse[]> {
    return this.http.get<ICourse[]>(this.apiUrl);
  }

  getCoursesByCategoryID(catID: string): Observable<ICourse[]> {
    return this.http.get<ICourse[]>(`${this.apiUrl}?catId=${catID}`);
  }

  getCourseByID(courseID: string): Observable<ICourse> {
    return this.http.get<ICourse>(`${this.apiUrl}/${courseID}`);
  }

  addCourse(course: ICourse): Observable<ICourse> {
    return this.http.post<ICourse>(this.apiUrl, course);
  }

  updateCourse(courseID: string, course: ICourse): Observable<ICourse> {
    return this.http.put<ICourse>(`${this.apiUrl}/${courseID}`, course);
  }

  deleteCourse(courseID: string): Observable<ICourse> {
    return this.http.delete<ICourse>(`${this.apiUrl}/${courseID}`);
  }
}
