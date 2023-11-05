import { Component,OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from '../user.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  DJANGO_URL="http://127.0.0.1:8000/api/users/";
  username="";
  password="";

  constructor(private http:HttpClient) {
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
    this.http.post<User>(this.DJANGO_URL, user, httpOptions).subscribe(
      (response) => {
        // Handle the response from the server (e.g., update your local todos)
        console.log('Game data saved:', response);
      },
      (error) => {
        // Handle errors here
        console.error('Error saving game data:', error);
      }
    );
  }

}
