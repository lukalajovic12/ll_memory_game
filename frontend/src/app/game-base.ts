import { timer } from 'rxjs';
import {UserService} from './user.service';
import { HttpClient } from '@angular/common/http';
import { Directive, HostListener, OnInit } from '@angular/core';
import { updateWindowSize } from './game-util';
import {SettingsService} from './settings.service';

@Directive()
export abstract class GameBase implements OnInit {

  protected showGameCanvas:boolean;

  protected showDataCanvas:boolean;

  protected showValue:boolean;

  protected time:number;
  protected startLevel = 0;
  protected lives = 0;
  protected points = 0;
  protected mistakes =0;

  protected windowSize: number;

  protected incressLevel=false;

  constructor(protected http:HttpClient,
    protected _userService: UserService,
    protected _settingsService:SettingsService ){
  }

  ngOnInit() {
    this.windowSize=updateWindowSize();
    this.showGameCanvas=true;
  }

  protected settingsStart():void {
    this.lives=this._settingsService.lives;
    this.startLevel=this._settingsService.startLevel;
    this.mistakes=this._settingsService.mistakes;
    this.points=0;
    
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

  // HostListener to listen for window resize event
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowSize=updateWindowSize();
  }    

  protected abstract generate():Promise<void>

}