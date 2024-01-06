import { Component } from '@angular/core';
import {UserService} from '../user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  
  constructor(public _userService: UserService) { }

  protected loginLogout():string {
    return this._userService.isAuthenticated()?'logout':'login';
  }


}
