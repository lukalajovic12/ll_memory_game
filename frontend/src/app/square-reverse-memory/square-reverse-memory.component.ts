import { Component } from '@angular/core';
import { SQUARES_REVERSE, saveData } from '../game-util';
import {trigger, state, style, animate, transition } from '@angular/animations';
import { GameBase } from '../game-base';

  //0 means not red
  //1 means red
  // 2 means red but already clcked
interface SvgSquare {
  value:number,
  column:number,
  row:number
}

@Component({
  selector: 'app-square-reverse-memory',
  templateUrl: './square-reverse-memory.component.html',
  styleUrls: ['./square-reverse-memory.component.scss'],
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
export class SquareReverseMemoryComponent extends GameBase {

  squares:SvgSquare[] = [];

  squaresReverse:SvgSquare[] = [];

  protected numberOfSquares=2;

  protected currentNumber:number;

  protected override title=SQUARES_REVERSE;

  squareColor(square:SvgSquare):string{
    if((square.value==1 && this.showValue) || square.value==2 ){
      return "red";
    }
    else{
      return "lightGray";
    }
  }

  squareReverseColor(square:SvgSquare):string{
    if( square.value==2 ){
      return "green";
    }
    else{
      return "gray";
    }
  }

  startGame = () => {
    this.settingsStart(this.title);
    this.time =3000;
    this.currentNumber=1;
    this.numberOfSquares=this.startLevel;
    this.squares=[];
    this.squaresReverse=[];
    this.generate();
  }

  checkSquare(square:SvgSquare){
    if(!this.showValue && square.value != 2) {
      if(square.value == 1){
        if(this.currentNumber==this.numberOfSquares){
          square.value=2;
          this.points+=1000;
          if(this.incressLevel){
            this.numberOfSquares+=2;
          }
          this.incressLevel=!this.incressLevel;
          this.generatePause();
        } else {
          this.points+=100;
          this.currentNumber+=1;
          square.value=2;
        }
      } else if(square.value != 2) {
        this.lives-=1;
        this.incressLevel=false;
        if(this.lives>0){
          if(this.numberOfSquares>4){
            this.numberOfSquares-=2;
          }
          this.generatePause();
        } else {
            saveData(this.title,this.points,this.http,this._userService,this._settingsService);       
        }
      }
  }
  }

  protected async generate():Promise<void> {
    this.squares =[];
    this.squaresReverse =[];
    this.currentNumber=1;

    this.showValue=true;
    this.time+=100;
    let sq = [];
    for(let i=0;i<(this.numberOfSquares*this.numberOfSquares/2-this.numberOfSquares);i++){
      sq.push(0);
    }
    for(let i=0;i<this.numberOfSquares;i++){
      sq.push(1);
    }
    const shuffledArray = sq.sort((a, b) => 0.5 - Math.random());

    let index=0;
    for(let i=0;i<this.numberOfSquares/2;i++){
      for(let j=0;j<this.numberOfSquares;j++) {
        let k:SvgSquare ={row:i,column:j,value:shuffledArray[index]};
        this.squares.push(k);
        index+=1;
      }
    }

    index=0;
    for(let i=0;i<this.numberOfSquares/2;i++){
      for(let j=0;j<this.numberOfSquares;j++) {
        let k:SvgSquare ={row:this.numberOfSquares-1-i,column:j,value:shuffledArray[index]};
        this.squaresReverse.push(k);
        index+=1;
      }
    }
    setTimeout(() => {
      this.showValue=false;
    }, this.time);

  }

}

