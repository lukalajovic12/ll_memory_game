import {Component, HostListener, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import { Router } from '@angular/router';
import { updateWindowSize } from '../game-util';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /**
   * An object representing the user for the login form
   */
  protected user: any;

  private windowSize: number;  

  constructor(public _userService: UserService,private router: Router) { }
 
  ngOnInit() {
    this.windowSize=updateWindowSize();
    this.user = {
      username: '',
      password: ''
    };
  }
 
  protected login() {
    this._userService.login({'username': this.user.username, 'password': this.user.password});
    this.router.navigate(['/']);
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
