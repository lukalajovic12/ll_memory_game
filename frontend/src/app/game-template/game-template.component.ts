import { Component, Input } from '@angular/core';
import {  GameDisplayState } from '../game-util';
import {trigger, state, style, animate, transition } from '@angular/animations';
import {UserService} from '../user.service';
import { Router } from '@angular/router';
import { AreaBase } from '../area-base';
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
export class GameTemplateComponent extends AreaBase {

  @Input()  title:string;

  @Input()  lives:number;

  @Input()  points:number;

  @Input() startGame:() => void;

  @Input() startCustomGame:() => void;

  @Input() success:boolean; 

  @Input() gameDisplayState: GameDisplayState;

  constructor(protected _userService: UserService,private router: Router){
    super();
  }

  protected showGame():boolean{
    return this.lives>0;
  }   

}
