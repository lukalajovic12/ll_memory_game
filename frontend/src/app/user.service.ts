

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
export interface User {
  id: number,
  username: string,
  password: string
}
@Injectable()
export class UserService {

  // http options used for making API calls
  private httpOptions: any;

  // the actual JWT token
  public token: string;

  // the token expiration date
  public token_expires: Date;

  // the username of the logged in user
  public username: string;

  // the user_id of the logged in user
  public user_id: number;

  // error messages received from the login attempt
  public errors: any = [];

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const storedToken = localStorage.getItem('token');  
    if (storedToken) {
      this.token = storedToken;
      this.refreshToken();
    }

    const storedUsername = localStorage.getItem('username');  
    if (storedUsername) {
      this.username = storedUsername;
    }
  }



  // Uses http.post() to get an auth token from djangorestframework-jwt endpoint
  public async login(user:User): Promise<boolean> {
    let logedin = false;
    this.username = user.username;
    localStorage.setItem('username', this.username);
    this.http.post(environment.BACKEND_URL + 'api/token/', JSON.stringify(user), this.httpOptions).subscribe(
      data => {
        logedin = true;
        this.updateData(data['access']);
      },
      err => {
        this.errors = err['error'];
      }
    );
    return logedin;
  }


  public async register(user:User): Promise<boolean> {
    let logedin = false;
    // let user: User= {id:-1,username:this.username, password:this.password};

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    // Subscribe to the POST request to trigger it
    this.http.post<User>(environment.BACKEND_URL + "api/users/", user, httpOptions).subscribe(
      (data) => {
        console.log("user created", data);
        logedin = true;
        this.updateData(data['access']);
      },
      (error) => {
        // Handle errors here
        console.error('Error saving game data:', error);
      }
    );
    return logedin;
  }

  // Refreshes the JWT token, to extend the time the user is logged in
  public refreshToken() {
    this.updateData(this.token);
    this.http.post(environment.BACKEND_URL + 'api/token/refresh/', JSON.stringify({ token: this.token }), this.httpOptions).subscribe(
      data => {
        this.updateData(data['access']);
      },
      err => {
        this.errors = err['error'];
      }
    );
  }

  public logout() {
    this.token = null;
    this.token_expires = null;
   // this.username = null;
    this.user_id = null;
  }

  private updateData(token) {
    this.token = token;
    this.errors = [];
    // decode the token to read the username and expiration timestamp
    localStorage.setItem('token', token);
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp * 1000);
    this.user_id = token_decoded.user_id;
  }

  checkTokenExpiration() {
    const currentDate = new Date();
    if (currentDate >= this.token_expires) {
      this.logout();
    }
  }

  public isAuthenticated(): boolean {
    this.checkTokenExpiration();
    return this.token !== null && this.token !== undefined;
  }

}

