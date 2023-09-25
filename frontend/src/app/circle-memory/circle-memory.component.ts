import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveData } from '../game-util';
export interface SVGCircle {
  x:number ,
  y: number,
}

export interface SVGLine {
  x1:number ,
  y1: number,
  x2:number,
  y2:number
}

export interface SVGNumber {
  x:number ,
  y: number,
  n:number
}



@Component({
  selector: 'app-circle-memory',
  templateUrl: './circle-memory.component.html',
  styleUrls: ['./circle-memory.component.scss']
})
export class CircleMemoryComponent {



  circles:SVGCircle[] = [];

  lives = 0;
  points = 0;

  numberOfCircles=3;

  gameNumbers:SVGNumber[];

  svgWidth=500;
  svgHeight=500;

  currentNumber:number;

  time:number;

  showValue:boolean;

  constructor(private  http:HttpClient){

  }

  displayNumber(n:SVGNumber): string {
    return this.showValue || this.currentNumber>n.n  ? n.n+'': '';
  }

  startGame() {
    this.time =3000;
    this.currentNumber=1;
    this.numberOfCircles=3;
    this.gameNumbers=[];
    this.circles=[];
    this.points=0;
    this.lives=5;
    this.generateCircles();
  }

  checkNumber(i:number){
    if(!this.showValue) {
      if(this.gameNumbers[i].n == this.currentNumber){
        if(this.currentNumber==this.numberOfCircles){
          this.points+=1000;
          this.numberOfCircles+=1;
          this.generateCircles();
        } else {
          this.points+=100;
          this.currentNumber+=1;
        }
      } else {
        this.lives-=1;
        if(this.lives>0) {
          if(this.numberOfCircles>3){
            this.numberOfCircles-=1;
          }
          this.generateCircles();
        }
        else {
          saveData('circle',this.points,this.http);
        }
      }
    }
  }

  async generateCircles():Promise<void>{
    this.currentNumber=1;
    this.gameNumbers=[];
    this.circles=[]
    
    this.showValue=true;
    this.time+=100;
    let sq = [];
    for(let i=1;i<(this.numberOfCircles+1);i++){
      sq.push(i);
    }
    let shuffledNumbers = sq.sort((a, b) => 0.5 - Math.random());

    for(let i=0;i<this.numberOfCircles;i++){
      let xx =this.svgWidth/this.numberOfCircles*i +50
      let yy = Math.floor(50+Math.random() * (this.svgHeight-100));
      let c:SVGCircle = {x:xx,y:yy}; 
      this.circles.push(c);
      let nu:SVGNumber = {x:xx,y:yy,n:shuffledNumbers[i]}; 
      this.gameNumbers.push(nu);
    }

    setTimeout(() => {
      this.showValue=false;
    }, this.time);



  }

  generateLines():SVGLine[] {
    let lines: SVGLine[] = [];
    if(this.circles.length>1){
      for(let i=0;i<this.circles.length-1;i++){
        let l:SVGLine={x1:this.circles[i].x,y1:this.circles[i].y,x2:this.circles[i+1].x,y2:this.circles[i+1].y};
        lines.push(l);
      }
    }
    return lines;
  }



}
