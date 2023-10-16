import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-data',
  templateUrl: './game-data.component.html',
  styleUrls: ['./game-data.component.scss']
})
export class GameDataComponent {

  @Input() title:string;

  @Input() lives:number;

  @Input() points:number;

  @Input() startGame:() => void;

  startTheGame(){
    this.startGame();
  }


  constructor(){

  }


}
