import { Component, Input, Output, EventEmitter } from '@angular/core';
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
export class RegistrationComponent {

  @Input()
  public homeState: 'register'|'login'|'menu';
  @Output() homeStateChange = new EventEmitter<'register' | 'login' | 'menu'>();

  protected username="";
  protected password="";
 

  constructor(private http:HttpClient,public _userService: UserService,private router: Router) {
  }



  protected async register():Promise<void> {
    let user: User= {id:-1,username:this.username, password:this.password};
    let registered = this._userService.register(user);
    await registered;
    if(registered){
      this.homeState='menu';
      this.homeStateChange.emit('menu');
    }
  }
}
