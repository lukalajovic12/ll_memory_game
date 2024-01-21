import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from '../user.service';
import {UserService} from '../user.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { updateWindowSize } from '../game-util';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {


  protected username="";
  protected password="";

  private windowSize: number;  

  constructor(private http:HttpClient,public _userService: UserService,private router: Router) {
  }

  ngOnInit(): void {
    this.windowSize=updateWindowSize();
  }
  


  register() {
    let user: User= {id:-1,username:this.username, password:this.password};
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };   
    
    // Subscribe to the POST request to trigger it
    this.http.post<User>(environment.BACKEND_URL+"api/users/", user, httpOptions).subscribe(
      (response) => {
        this._userService.login({'username': this.username, 'password': this.password});
        this.router.navigate(['/']);
      },
      (error) => {
        // Handle errors here
        console.error('Error saving game data:', error);
      }
    );
  }

  protected toHome():void {
    this.router.navigate(['/']);
  }  
  
  // HostListener to listen for window resize event
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowSize = updateWindowSize();
  }  

  protected sidesWidth():number {
    let width = window.innerWidth;
    return (width-this.windowSize)/2;
  }  

}
