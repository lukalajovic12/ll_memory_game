import { Component,Input } from '@angular/core';
import {UserService} from '../../user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-game-end',
  templateUrl: './game-end.component.html',
  styleUrls: ['./game-end.component.scss']
})
export class GameEndComponent {

  @Input() points;

  @Input() playAgain:() => void;

  constructor(protected _userService: UserService,private location:Location) { }

  protected toHome(){
    this.location.back();
  }

}
