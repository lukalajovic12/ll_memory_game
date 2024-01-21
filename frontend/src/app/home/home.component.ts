import { Component, HostListener, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import { Router } from '@angular/router';
import { CIRCLES, SQUARES, updateWindowSize } from '../game-util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  protected games = [SQUARES,CIRCLES];

  private windowSize: number;    

  constructor(protected _userService: UserService,private router: Router) { }

  ngOnInit() {
    this.windowSize=updateWindowSize();
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

  protected sidesWidth():number {
    let width = window.innerWidth;
    return (width-this.windowSize)/2;
  }

}
