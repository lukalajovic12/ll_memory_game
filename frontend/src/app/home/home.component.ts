import { Component } from '@angular/core';
import {UserService} from '../user.service';
import { Router } from '@angular/router';
import { CIRCLES, SQUARES, SQUARES_REVERSE } from '../game-util';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  protected games = [SQUARES,CIRCLES,SQUARES_REVERSE];
  
  constructor(protected _userService: UserService,private router: Router) { }

  protected loginLogout():string {
    return this._userService.isAuthenticated()?'logout':'login';
  }

  protected toGame(game:string){
    this.router.navigate(['/'+game]);
  }


  protected toRegister(){
    this.router.navigate(['/register']);
  }
  protected toLogin(){
    this.router.navigate(['/login']);
  }

  protected logout(){
    this._userService.logout();
  }


}
