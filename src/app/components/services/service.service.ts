import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private http: HttpClient) {}
  baseUri: string = 'http://localhost:3000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  getTask() {
    return this.http.get(`${this.baseUri}/tasks`);
  }
  getByID(id: any) {
    var url = `${this.baseUri}/tasks/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(this.errorMgmt)
    );
  }
  createTask(data: any) {
    return this.http
      .post(`${this.baseUri}/posttasks`, data)
      .pipe(catchError(this.errorMgmt));
  }
  updateTask(id: any, data: any) {
    var url = `${this.baseUri}/tasks/${id}`;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }
  deleteTask(id: any) {
    let url = `${this.baseUri}/tasks/${id}`;
    return this.http
      .delete(url, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code:${error.status}\nMessage:${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
