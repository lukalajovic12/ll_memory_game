import { Component, HostListener, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import { Router } from '@angular/router';
import { CIRCLES, SQUARES, updateWindowWidth } from '../game-util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  private windowSize: number; 

  public homeState: 'register'|'login'|'menu' ='menu';
  
  
  constructor(protected _userService: UserService,private router: Router) { }

  ngOnInit() {
    this.windowSize=updateWindowWidth();
  }

  protected sidesWidth():number {
    let width = window.innerWidth;
    return (width-this.windowSize)/2;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowSize = updateWindowWidth();
  }  

}
