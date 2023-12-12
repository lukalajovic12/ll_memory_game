import { timer } from 'rxjs';
import {UserService} from './user.service';
import { HttpClient } from '@angular/common/http';
import { Directive, OnInit } from '@angular/core';
import { updateWindowSize, WindowSize } from './game-util';
@Directive()
export abstract class GameBase implements OnInit {

  protected showGameCanvas:boolean;

  protected showDataCanvas:boolean;

  protected showValue:boolean;

  protected time:number;

  protected lives = 0;
  protected points = 0;

  protected windowSize: WindowSize;

  protected incressLevel=false;

  constructor(protected http:HttpClient,protected _userService: UserService){
  }

  ngOnInit() {
    this.windowSize=updateWindowSize();
    this.showGameCanvas=true;
  }

    protected async generatePause(): Promise<void>{
        this.showGameCanvas=false;
        timer(500).subscribe(() => {
          this.showDataCanvas=true; 
            timer(1500).subscribe(() => {
              this.showDataCanvas=false; 
                timer(500).subscribe(() => {
                  this.showDataCanvas=false;
                  this.showGameCanvas=true;
                  this.generate();
                  this.showValue=true;
                  timer(this.time).subscribe(() => {
                    this.showValue=false;
                  });
                });
              });
          });
      }

  protected abstract generate():Promise<void>


}