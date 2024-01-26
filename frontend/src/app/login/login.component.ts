import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {UserService} from '../user.service';
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

  @Input()
  public homeState: 'register'|'login'|'menu';
  @Output() homeStateChange = new EventEmitter<'register' | 'login' | 'menu'>();

  constructor(public _userService: UserService) { }
 
  ngOnInit() {
    this.user = {
      username: '',
      password: ''
    };
  }
 
  protected async login() {
    let logedin = this._userService.login({id:-1,'username': this.user.username, 'password': this.user.password});
    await logedin;
    if(logedin){
      this.homeState='menu';
      this.homeStateChange.emit('menu');
    }
  }


  
}
