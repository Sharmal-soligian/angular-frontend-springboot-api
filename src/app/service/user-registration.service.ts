import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/model/User';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(
    private http: HttpClient
  ) { }

  doRegistration(user: User): Observable<User> {
    return this.http.post<User>("http://localhost:8080/register", user, {
      headers: this.headers,
      responseType: 'text' as 'json'
    });
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>("http://localhost:8080/getAllUsers");
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>("http://localhost:880//findUser/"+email);
  }

  deleteUser(id: number) {
    return this.http.delete("http://localhost:8080/cancel/"+id);
  }
}

