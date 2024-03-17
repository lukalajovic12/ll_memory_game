import { Component } from '@angular/core';
import { SQUARES } from '../game-util';
import {trigger, state, style, animate, transition } from '@angular/animations';
import { GameBase } from '../game-base';

type squareValues ='marked'|'markedAndFound'|'unmarked'|'mistake';

interface SvgSquare {
  value:squareValues,
  column:number,
  row:number
}

@Component({
  selector: 'app-square-memory-igra',
  templateUrl: './square-memory.component.html',
  styleUrls: ['./square-memory.component.scss'],
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
export class SquareMemoryComponent extends GameBase {

  protected squares:SvgSquare[] = [];

  protected numberOfSquares=3;

  private currentNumber:number;

  protected override title=SQUARES;

 
  public startGame = () => {
    this.customGame=false;
    this.gameStart();
  }

  public startCustomGame = () => {
    this.customGame=true;
    this.gameStart();
  }  

  private gameStart():void {
    this.settingsStart();
    this.currentNumber=1;
    this.currentMistakes=0;
    this.numberOfSquares=this.startLevel;
    this.squares=[];
    this.generate();
    setTimeout(() => {
      this.showValue=false;
    }, this.time);

  }

  protected async checkSquare(square:SvgSquare) {
    if(square.value != 'markedAndFound' && square.value != 'mistake') {
      this.showValue=false
      if(square.value == 'marked'){
        if(this.currentNumber==this.paintedSquares()){
          square.value = 'markedAndFound';
          await this.sleep(500);
          this.points+=1000;
          if(this.incressLevel) {
            this.numberOfSquares+=1;
          }
          this.incressLevel=!this.incressLevel;
          this.generatePause(true);
        } else {
          this.points+=100;
          this.currentNumber+=1;
          square.value = 'markedAndFound';
        }
      } else if(this.currentMistakes<this.mistakes) {
        square.value='mistake';
        this.currentMistakes+=1;
      } else {
        await this.sleep(500);
        this.lives-=1;
        this.incressLevel=false;
        if(this.lives>0){
          if(this.numberOfSquares>3){
            this.numberOfSquares-=1;
          }    
          this.generatePause(false);
        } else {
          this.saveScore();
         }
      }
  }
  }

  private paintedSquares():number {
    let extraSquares=1;
    if(this.incressLevel){
      extraSquares=2;
    }
    return extraSquares+this.numberOfSquares;
  }

  protected async generate():Promise<void> {
    this.squares =[];
    this.currentNumber=1;
    this.currentMistakes=0;
    this.showValue=true;
    this.time+=this.timeIncrease;
    let sq:squareValues[] = [];

    for(let i=0;i<(this.numberOfSquares*this.numberOfSquares-this.paintedSquares());i++){
      sq.push('unmarked');
    }

    for(let i=0;i<this.paintedSquares();i++){
      sq.push('marked');
    }
    const shuffledArray = sq.sort((a, b) => 0.5 - Math.random());

    let index=0;
    for(let i=0;i<this.numberOfSquares;i++){
      for(let j=0;j<this.numberOfSquares;j++) {
        let k:SvgSquare ={row:i,column:j,value:shuffledArray[index]};
        this.squares.push(k);
        index+=1;
      }
    }

  }

}
