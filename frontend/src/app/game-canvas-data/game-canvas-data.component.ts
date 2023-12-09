import { Component, Input } from '@angular/core';
import { WindowSize, updateWindowSize } from '../game-util';
import { trigger, state, style, transition, animate } from '@angular/animations';
@Component({
  selector: 'app-game-canvas-data',
  templateUrl: './game-canvas-data.component.html',
  styleUrls: ['./game-canvas-data.component.scss'],
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

export class GameCanvasDataComponent {

  @Input() 
  lives:number;

  @Input() 
  points:number;

  @Input() 
  show:boolean;

  windowSize: WindowSize;

  ngOnInit() {
    // Get the initial window size
    this.windowSize=updateWindowSize();
  }

}
