import { Component, Input, Output, EventEmitter } from '@angular/core';
import {UserService} from '../../user.service';
import { Router } from '@angular/router';
import { CIRCLES, SQUARES } from '../../game-util';

@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.scss']
})
export class HomeMenuComponent {

  protected games = [SQUARES,CIRCLES]; 

  @Input()
  public homeState: 'register'|'login'|'menu';
  @Output() homeStateChange = new EventEmitter<'register' | 'login' | 'menu'>();


  constructor(protected _userService: UserService,private router: Router) { }

  protected toGame(game:string){
    this.router.navigate(['/'+game]);
  }


  protected toLeaderboard() {
    this.router.navigate(['/leaderboard']);    
  }

  protected toRegister(){
    this.homeState='register';
    this.homeStateChange.emit(this.homeState);
  }

  protected toLogin(){
    this.homeState='login';
    this.homeStateChange.emit(this.homeState);
  }

  protected logout(){
    this._userService.logout();
  }

}
