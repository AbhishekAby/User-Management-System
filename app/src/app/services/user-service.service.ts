import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  getRequest(url: string): Observable<User[]> {
    return this.http.get<User[]>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `An error occurred: ${error.error.message}`;
        } else {
          // Server-side error
          errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
        }
        // We can also send the error to an analytics service
        console.error(errorMessage);
        // Return an observable with a user-friendly error message
        return throwError('Something went wrong. Please try again later.');
      })
    );
  }
}
