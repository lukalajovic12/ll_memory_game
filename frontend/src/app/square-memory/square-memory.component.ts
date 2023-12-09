import { Component, HostListener, OnInit } from '@angular/core';
import { saveData, WindowSize, updateWindowSize } from '../game-util';
import { HttpClient } from '@angular/common/http';
import {UserService} from '../user.service';
import {trigger, state, style, animate, transition } from '@angular/animations';
import { timer } from 'rxjs';

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
export class SquareMemoryComponent implements OnInit {

  protected windowSize: WindowSize;

  protected squares:SvgSquare[] = [];

  protected lives = 0;
  protected points = 0;

  protected numberOfSquares=3;

  private currentNumber:number;

  private time:number;

  protected showGameCanvas:boolean;

  protected showDataCanvas:boolean;

  protected showValue:boolean;

  private incressLevel=false;


  constructor(private  http:HttpClient,public _userService: UserService) { }

  ngOnInit() {
    this.windowSize=updateWindowSize();
    this.showGameCanvas=true;
  }

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
    this.generateSquares();
  }

  protected sidesWidth():number {
    let width = window.innerWidth;
    return (width-this.windowSize.width)/2;
  }

  protected checkSquare(square:SvgSquare){
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

  private async generateSquares():Promise<void>{
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

    setTimeout(() => {
      this.showValue=false;
    }, this.time);
  }

  private async generatePause():Promise<void>{
    this.showGameCanvas=false;
    timer(500).subscribe(() => {
        this.showDataCanvas=true; 
        timer(1500).subscribe(() => {
            this.showDataCanvas=false; 
            timer(500).subscribe(() => {
              this.showDataCanvas=false;
              this.showGameCanvas=true;
              this.generateSquares();
            });
          });
      });


  }



  protected showGame():boolean{
    return this.lives>0 && this._userService.isAuthenticated();
  }



}
