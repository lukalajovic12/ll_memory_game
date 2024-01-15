import { Component,OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from '../user.service';
import {UserService} from '../user.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {


  username="";
  password="";

  constructor(private http:HttpClient,public _userService: UserService,private router: Router) {
  }

  ngOnInit(): void {
  }
  


  register() {
    let user: User= {id:-1,username:this.username, password:this.password};
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };   
    
    // Subscribe to the POST request to trigger it
    this.http.post<User>(environment.BACKEND_URL+"api/users", user, httpOptions).subscribe(
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

}
