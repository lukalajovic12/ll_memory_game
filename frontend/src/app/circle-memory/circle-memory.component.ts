import { CIRCLES, saveData } from '../game-util';
import { Component } from '@angular/core';
import {trigger, state, style, animate, transition } from '@angular/animations';
import { GameBase } from '../game-base';

interface SVGCircle {
  x:number ,
  y: number,
}
interface SVGLine {
  x1:number ,
  y1: number,
  x2:number,
  y2:number
}

interface SVGNumber {
  x:number ,
  y: number,
  n:number
}

@Component({
  selector: 'app-circle-memory',
  templateUrl: './circle-memory.component.html',
  styleUrls: ['./circle-memory.component.scss'],
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
export class CircleMemoryComponent extends GameBase {

  circles:SVGCircle[] = [];

  protected numberOfCircles:number;

  protected gameNumbers:SVGNumber[];

  protected currentNumber:number;

  protected radius:number;

  protected strokeWidth =3;

  protected override title = CIRCLES;

  protected displayNumber(n:SVGNumber): string {
    return this.showValue || this.currentNumber>n.n  ? n.n+'': '';
  }

  public startGame = () => {
    this.settingsStart(this.title);
    this.time =2000;
    this.currentNumber=1;
    this.numberOfCircles=this.startLevel;
    this.gameNumbers=[];
    this.circles=[];
    this.generate();
    setTimeout(() => {
      this.showValue=false;
    }, this.time);


  }

  protected checkNumber(i:number){
    if(!this.showValue && this.gameNumbers[i].n >= this.currentNumber) {
      if(this.gameNumbers[i].n == this.currentNumber){
        if(this.currentNumber==this.numberOfCircles){
          this.points+=1000;
          if(this.incressLevel){
            this.numberOfCircles+=1;
          }
          this.incressLevel=!this.incressLevel;
          this.generatePause();
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
          this.incressLevel=false;
          this.generatePause();
        }
        else {
          saveData(this.title,this.points,this.http,this._userService,this._settingsService);
        }
      }
    }
  }

  protected async generate():Promise<void> {
    this.currentNumber=1;
    this.gameNumbers=[];
    this.circles=[]
    
    this.showValue=true;
    this.time+=200;
    let sq = [];
    for(let i=1;i<(this.numberOfCircles+1);i++){
      sq.push(i);
    }
    let shuffledNumbers = sq.sort((a, b) => 0.5 - Math.random());
    this.radius = Math.max(this.windowSize/(Math.max(this.numberOfCircles,8))-10,10);
    for(let i=0;i<this.numberOfCircles;i++){
     let xx = i*(this.windowSize/this.numberOfCircles )+5*this.radius/8;     
     let yy = Math.floor(this.radius*2+Math.random() * ((this.windowSize-this.radius)-2*this.radius*2));
      let c:SVGCircle = {x:xx,y:yy}; 
      this.circles.push(c);
      let nu:SVGNumber = {x:xx,y:yy,n:shuffledNumbers[i]}; 
      this.gameNumbers.push(nu);
    }
  }

  protected generateLines():SVGLine[] {
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
