import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient) { }

  public login(userInfo: User) {
    const data = {
      username: userInfo.email,
      password: userInfo.password
    }
    return this.http.post('http://localhost:5000/html-mastery/login', data).subscribe( function(resp) {
      console.log("response");
      console.log(resp);
    });
  }

  public logout(userInfo: User) {
    const data = {
      username: userInfo.email,
      password: userInfo.password
    }
    return this.http.post('http://localhost:5000/html-mastery/logout', data).subscribe( function(resp) {
      console.log("response");
      console.log(resp);
    });
  }
  
  public isLoggedIn() {
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }
/*
  public logout() {
    localStorage.removeItem('ACCESS_TOKEN');
  }*/
}
