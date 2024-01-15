import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  /**
   * An object representing the user for the login form
   */
  protected user: any;
 
  constructor(public _userService: UserService,private router: Router) { }
 
  ngOnInit() {
    this.user = {
      username: '',
      password: ''
    };
  }
 
  protected login() {
    this._userService.login({'username': this.user.username, 'password': this.user.password});
    this.router.navigate(['/']);
  }


}
