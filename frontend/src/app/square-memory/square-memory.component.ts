import { Component, HostListener } from '@angular/core';
import { saveData, updateWindowSize } from '../game-util';
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

  // HostListener to listen for window resize event
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowSize=updateWindowSize();
  }

  protected squareColor(square:SvgSquare):string{
    if((square.value==1 && this.showValue) || square.value==2 ){
      return "red";
    }
    else{
      return "lightGray";
    }
  }


  public startGame = () => {
    this.time =3000;
    this.currentNumber=1;
    this.numberOfSquares=3;
    this.squares=[];
    this.points=0;
    this.lives=3;
    this.generate();
    setTimeout(() => {
      this.showValue=false;
    }, this.time);

  }

  protected checkSquare(square:SvgSquare) {
    if(!this.showValue && square.value != 2) {
      if(square.value == 1){
        if(this.currentNumber==this.paintedSquares()){
          square.value=2;
          this.points+=1000;
          if(this.incressLevel) {
            this.numberOfSquares+=1;
          }
          this.incressLevel=!this.incressLevel;
          this.generatePause();
        } else {
          this.points+=100;
          this.currentNumber+=1;
          square.value=2;
        }
      } else {
        this.lives-=1;
        this.incressLevel=false;
        if(this.lives>0){
          if(this.numberOfSquares>3){
            this.numberOfSquares-=1;
          }
          this.generatePause();
        } else {
            saveData('square',this.points,this.http,this._userService);       
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

    this.showValue=true;
    this.time+=100;
    let sq = [];

    for(let i=0;i<(this.numberOfSquares*this.numberOfSquares-this.paintedSquares());i++){
      sq.push(0);
    }

    for(let i=0;i<this.paintedSquares();i++){
      sq.push(1);
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
