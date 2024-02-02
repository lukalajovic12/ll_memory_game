import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-pause',
  templateUrl: './game-pause.component.html',
  styleUrls: ['./game-pause.component.scss']
})
export class GamePauseComponent {

  @Input()  lives:number;

  @Input()  points:number;  

  @Input() success:boolean;  
}
