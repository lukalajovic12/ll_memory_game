import { Component, HostListener, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import { Router } from '@angular/router';
import { updateWindowWidth,updateWindowHeight } from '../game-util';
import {trigger, state, style, animate, transition } from '@angular/animations';


type stateHome =  'register'|'login'|'menu';
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
export class HomeComponent implements OnInit {


  private windowWidth: number; 

  
  private windowHeight: number; 

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
  
  
  constructor(protected _userService: UserService,private router: Router) { }

  ngOnInit() {
    this.windowWidth = updateWindowWidth();
    this.windowHeight = updateWindowHeight();
  }

  protected sidesWidth():number {
    let width = window.innerWidth;
    return (width-this.windowWidth)/2;
  }

  protected sidesHeight():number {
    let height = window.innerHeight;
    return (height-this.windowHeight)/2;
  }   

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = updateWindowWidth();
    this.windowHeight = updateWindowHeight();
  }  

}
