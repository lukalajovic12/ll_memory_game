import { Component, HostListener, Input, OnInit } from '@angular/core';
import { updateWindowSize } from '../game-util';
import {trigger, state, style, animate, transition } from '@angular/animations';
import {UserService} from '../user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-game-template',
  templateUrl: './game-template.component.html',
  styleUrls: ['./game-template.component.scss'],
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
export class GameTemplateComponent implements OnInit  {

  @Input() title:string;

  @Input() lives:number;

  @Input() points:number;

  @Input() startGame:() => void;

  @Input() showData;

  protected windowSize: number;

  private windowHeight: number;

  protected buttonHeight():number {
    return this.windowHeight/16;
  }

  protected buttonDivPadding():number {
    return this.windowHeight/32;   
  }

  protected startTheGame(){
    this.startGame();
  }

  protected toSettings(){
    this.router.navigate(['/settings'], { queryParams: { title: this.title } });
  }
  protected toScore(){
    this.router.navigate(['/score'], { queryParams: { title: this.title } });
  }
  protected toHome():void {
    this.router.navigate(['/']);
  }


  protected sidesWidth():number {
    let width = window.innerWidth;
    return (width-this.windowSize)/2;
  }

  constructor(protected _userService: UserService,private router: Router){}

  ngOnInit() {
    this.windowSize=updateWindowSize();
    this.windowHeight = window.innerHeight;
  }

  // HostListener to listen for window resize event
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowSize = updateWindowSize();
    this.windowHeight = window.innerHeight;
  }

  protected showGame():boolean{
    return this.lives>0 && this._userService.isAuthenticated();
  }   

}
