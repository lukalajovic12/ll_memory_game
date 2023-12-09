import { HttpClient } from '@angular/common/http';
import { saveData,WindowSize,updateWindowSize } from '../game-util';
import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';

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
  styleUrls: ['./circle-memory.component.scss']
})
export class CircleMemoryComponent implements OnInit {

  windowSize: WindowSize;

  circles:SVGCircle[] = [];

  lives = 0;
  points = 0;

  numberOfCircles=3;

  gameNumbers:SVGNumber[];



  currentNumber:number;

  time:number;

  showValue:boolean;

  private incressLevel=false;

  constructor(private  http:HttpClient,public _userService: UserService){
  }

  ngOnInit() {
    // Get the initial window size
    this.windowSize=updateWindowSize();
  }

  displayNumber(n:SVGNumber): string {
    return this.showValue || this.currentNumber>n.n  ? n.n+'': '';
  }

  startGame = () => {
    this.time =2000;
    this.currentNumber=1;
    this.numberOfCircles=3;
    this.gameNumbers=[];
    this.circles=[];
    this.points=0;
    this.lives=3;
    this.generateCircles();
  }

  checkNumber(i:number){
    if(!this.showValue && this.gameNumbers[i].n >= this.currentNumber) {
      if(this.gameNumbers[i].n == this.currentNumber){
        if(this.currentNumber==this.numberOfCircles){
          this.points+=1000;
          if(this.incressLevel){
            this.numberOfCircles+=1;
          }
          this.incressLevel=!this.incressLevel;
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
          this.incressLevel=false;
          this.generateCircles();
        }
        else {
          saveData('circle',this.points,this.http,this._userService);
        }
      }
    }
  }

  async generateCircles():Promise<void>{
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

    for(let i=0;i<this.numberOfCircles;i++){
      let xx =this.windowSize.width/this.numberOfCircles*i +50
      let yy = Math.floor(50+Math.random() * (this.windowSize.height-100));
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
