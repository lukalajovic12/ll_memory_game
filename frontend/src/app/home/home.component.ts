import { Component } from '@angular/core';
import {UserService} from '../user.service';
import { Router } from '@angular/router';
import {trigger, state, style, animate, transition } from '@angular/animations';
import { AreaBase } from '../area-base';


export type stateHome =  'register'|'login'|'menu';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition(':enter, :leave', [
        animate('0.5s ease-in-out')
      ])
    ])
  ]    
})
export class HomeComponent extends AreaBase {

  protected showMenu:boolean =true;
  
  protected showLogin:boolean =false;
  
  protected showRegister:boolean =false;

  private _homeState:stateHome ='menu';

  public get homeState(): stateHome {
    return this._homeState;
  }
  public set homeState(value:stateHome ){
     this._homeState=value;
     this.showMenu=false;
     this.showLogin=false;
     this.showRegister=false;    
     if(this.homeState === 'menu') {
      setTimeout(() => {
        this.showMenu=true;
    }, 500);
    }
    if(this.homeState === 'login') {
      setTimeout(() => {
        this.showLogin=true;
    }, 500);
    }
    if(this.homeState === 'register') {
      setTimeout(() => {
        this.showRegister=true;
    }, 500);
    }      
  }

  
  protected displayMenu():boolean {
    return this.homeState === 'menu' && this.showMenu;
  }

  protected displayLogin():boolean {
    return this.homeState === 'login' && this.showLogin;
  }

  protected displayRegister():boolean {
    return this.homeState === 'register' && this.showRegister;
  }
  
  
  constructor(protected _userService: UserService,private router: Router) {
    super();
   }



}
