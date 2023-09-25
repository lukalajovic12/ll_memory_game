import { Component } from '@angular/core';
import { saveData } from '../game-util';
import { HttpClient } from '@angular/common/http';
  //0 means not red
  //1 means red
  // 2 means red but already clcked
interface SvgSquare {
  value:number,
  column:number,
  row:number
}

@Component({
  selector: 'app-kvadrati-igra',
  templateUrl: './square-memory.component.html',
  styleUrls: ['./square-memory.component.scss']
})
export class SquareMemoryComponent {

  squares:SvgSquare[] = [];

  lives = 0;
  points = 0;

  numberOfSquares=3;

  svgWidth=500;
  svgHeight=500;

  currentNumber:number;

  time:number;

  showValue:boolean;

  constructor(private  http:HttpClient) { }

  squareColor(square:SvgSquare):string{
    if((square.value==1 && this.showValue) || square.value==2 ){
      return "red";
    }
    else{
      return "lightGray";
    }
  }


  startGame() {
    this.time =3000;
    this.currentNumber=1;
    this.numberOfSquares=3;
    this.squares=[];
    this.points=0;
    this.lives=5;
    this.generateSquares();
  }

  checkSquare(square:SvgSquare){
    if(!this.showValue) {
      if(square.value == 1){
        if(this.currentNumber==this.numberOfSquares){
          square.value=2;
          this.points+=1000;
          this.numberOfSquares+=1;
          this.generateSquares();
        } else {
          this.points+=100;
          this.currentNumber+=1;
          square.value=2;
        }
      } else {
        this.lives-=1;
        if(this.lives>0){
          if(this.numberOfSquares>3){
            this.numberOfSquares-=1;
          }
          this.generateSquares();
        } else {
            saveData('square',this.points,this.http);       
        }
      }
  }
  }

  async generateSquares():Promise<void>{
    this.currentNumber=1;

    this.showValue=true;
    this.time+=100;



    let sq = [];
    for(let i=0;i<(this.numberOfSquares*this.numberOfSquares-this.numberOfSquares);i++){
      sq.push(0);
    }
    for(let i=0;i<this.numberOfSquares;i++){
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

    setTimeout(() => {
      this.showValue=false;
    }, this.time);



  }

}
