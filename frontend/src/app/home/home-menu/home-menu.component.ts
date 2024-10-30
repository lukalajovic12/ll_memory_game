import { Component ,Input, Output, EventEmitter } from '@angular/core';
import {UserService} from '../../user.service';
import { Router } from '@angular/router';
import { CIRCLES, SQUARES } from '../../game-util';

@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.scss']
})
export class HomeMenuComponent {

  @Input()
  public homeState: 'register'|'login'|'menu';
  @Output() homeStateChange = new EventEmitter<'register' | 'login' | 'menu'>();



  constructor(protected _userService: UserService,private router: Router) { }



  public toSquare = () => {
    this.router.navigate(['/'+SQUARES]); 
  }

  public toCircle = () => {
    this.router.navigate(['/'+CIRCLES]); 
  }

  public toGeo = () => {
    this.router.navigate(['/geo-quiz']);      
  }

  public toNim = () => {
    this.router.navigate(['/nim']);     
  }


  public toLeaderboard = () =>  {
    this.router.navigate(['/leaderboard']);    
  }

  public toRegister = () => {
    this.homeState='register';
    this.homeStateChange.emit(this.homeState);
  }

  public toLogin = () => {
    this.homeState='login';
    this.homeStateChange.emit(this.homeState);
  }

  public logout = () => {
    this._userService.logout();
  }

}
