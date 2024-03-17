

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
  public login(user: User): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.username = user.username;
      localStorage.setItem('username', this.username);
      this.http.post(environment.BACKEND_URL + 'api/token/', JSON.stringify(user), this.httpOptions).subscribe(
        data => {
          this.updateData(data['access']);
          resolve(true);
        },
        err => {
          this.errors = err['error'];
          reject(false);
        }
      );
    });
  }


  public register(user: User): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
  
      // Subscribe to the POST request to trigger it
      this.http.post<User>(environment.BACKEND_URL + "api/users/", user, httpOptions).subscribe(
        (data) => {
          console.log("user created", data);
          this.updateData(data['access']);
          resolve(true);
        },
        (error) => {
          // Handle errors here
          console.error('Error saving game data:', error);
          reject(false);
        }
      );
    });
  }

  public async registerAndLogin(user: User): Promise<boolean> {
    let registered = await this.register(user);
  
    if (registered) {
      // Registration successful, proceed with login
      let loggedIn = await this.login(user);
      return loggedIn;
    } else {
      // Registration failed, handle accordingly
      return false;
    }
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
    this.username = null;
    this.user_id = null;
    localStorage.removeItem('token');
  }

  private updateData(token) {
    if(token) {
      try {
        const token_parts = token.split(/\./);
        const token_decoded = JSON.parse(window.atob(token_parts[1]));
        this.token_expires = new Date(token_decoded.exp * 1000);
        this.user_id = token_decoded.user_id;
        this.token=token;
        localStorage.setItem('token', token);
      } catch (error) {
        console.error('Error decoding token:', error);
        // Handle the error appropriately
      }
  } 
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

