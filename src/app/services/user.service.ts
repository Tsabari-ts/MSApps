import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private usersDataPath = 'assets/users.json';
  private userData :User[]=[];

  constructor(private httpClient: HttpClient) {
    this.httpClient.get<User[]>(this.usersDataPath).subscribe(
      (data) => {
        this.userData = data;
      }
    );
   }

  GetAllUsers(): Observable<User[]> {
    return of(this.userData);
  }

  GetUserById(userId: number): Observable<User | undefined> {
    return of(this.userData.find((user) => user.id === userId));
  }

  AddNewUser(newUser: any): Observable<boolean> {
    this.userData.push(newUser)
    return of(true);
  }

  UpdateUser(updatedUser: any): Observable<boolean> {
    this.userData.find((user) => user.id === updatedUser.id);
    return of(true);
  }

  DeleteUser(userId: number): Observable<boolean > {
    this.userData = this.userData.filter(user => user.id !== userId);
    return of(true);
  }
}