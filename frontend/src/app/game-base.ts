import { timer } from 'rxjs';
import {UserService} from './user.service';
import { HttpClient } from '@angular/common/http';
import { Directive, HostListener, OnInit } from '@angular/core';
import { saveData, updateWindowWidth,GameDisplayState } from './game-util';
import {SettingsService} from './settings.service';
import { Router } from '@angular/router';

@Directive()
export abstract class GameBase implements OnInit {


  protected gameDisplayState: GameDisplayState;

  protected showValue:boolean;

  protected time = 3000;
  protected startLevel = 0;
  protected lives = 0;
  protected points = 0;
  protected mistakes = 2;
  protected currentMistakes = 0;
  protected timeIncrease = 100;
  protected customGame = false;

  protected windowSize: number;
  protected canvasSize: number;

  private canvasOffset = 35;

  protected incressLevel=false;
  protected abstract title:string;

  protected success:boolean;

  constructor(protected http:HttpClient,
    protected _userService: UserService,
    protected _settingsService:SettingsService,
    private router: Router ){
  }

  ngOnInit() {
    this._settingsService.getData(this.title);
    this.windowSize=updateWindowWidth();
    this.canvasSize=this.windowSize-this.canvasOffset;
    this.gameDisplayState = 'menu';
  }

  protected settingsStart():void {
    if(this.customGame) {
      this.lives=this._settingsService.lives;
      this.startLevel=this._settingsService.startLevel;
      this.mistakes=this._settingsService.mistakes;
      this.time=this._settingsService.startTime;
      this.timeIncrease=this._settingsService.timeIncrease;

    } else {
      this.lives=3;
      this.startLevel=3;
      this.mistakes=1;
      this.time=3000;
      this.timeIncrease=100;
    }
    this.points=0;
    this.gameDisplayState = 'game';
  }

  protected async generatePause(success: boolean): Promise<void> {
    this.success=success;
    this.gameDisplayState = 'empty';
    timer(500).subscribe(() => {
      this.gameDisplayState = 'empty';
      timer(500).subscribe(() => {
        this.gameDisplayState = 'data';
          timer(1500).subscribe(() => {
            this.gameDisplayState = 'empty';
              timer(500).subscribe(() => {
                this.gameDisplayState = 'game';
                this.generate();
                this.showValue=true;
                timer(this.time).subscribe(() => {
                  this.showValue=false;
                });
              });
            });
        });
    });
  }

  protected sleep(ms: number): Promise<void> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

  // HostListener to listen for window resize event
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowSize=updateWindowWidth();
    this.canvasSize=this.windowSize-this.canvasOffset;
  }    

  protected toHome():void {
    this.router.navigate(['/']);
  }  

  protected async saveScore() {
    this.gameDisplayState='empty';
    await this.sleep(500);
    this.gameDisplayState='end';
    timer(500).subscribe(() => {
      if(this._userService.isAuthenticated()){
        saveData(this.title,this.points,this.customGame,this.http,this._userService,this._settingsService);       
      }
    });
  }

  protected abstract generate():Promise<void>

}