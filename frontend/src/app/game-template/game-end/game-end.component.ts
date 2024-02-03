import { Component,Input } from '@angular/core';
import {UserService} from '../../user.service';
import { Router } from '@angular/router';
import { GameDisplayState } from 'src/app/game-util';

@Component({
  selector: 'app-game-end',
  templateUrl: './game-end.component.html',
  styleUrls: ['./game-end.component.scss']
})
export class GameEndComponent {

  @Input() points;

  @Input() playAgain:() => void;

  constructor(protected _userService: UserService,private router: Router) { }

  protected toHome(){
    this.router.navigate(['/']);
  }

}
