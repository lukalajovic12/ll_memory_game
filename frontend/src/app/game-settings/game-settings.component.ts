import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {UserService} from '../user.service';
import {SettingsService} from '../settings.service';
@Component({
  selector: 'app-game-settings',
  templateUrl: './game-settings.component.html',
  styleUrls: ['./game-settings.component.scss']
})
export class GameSettingsComponent  implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    protected _userService: UserService,
    protected _settingsService:SettingsService) {}
   
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => 
    this._settingsService.getData(params['title']))
  }

  protected plusLife():void {
    this._settingsService.lives+=1;
  }

  protected minusLife():void {
    if(this._settingsService.lives>1){
      this._settingsService.lives-=1;
    }
  }

  protected plusStartLevel():void {
    this._settingsService.startLevel+=1;
  }

  protected minusStartLevel():void {
    if(this._settingsService.startLevel>3){
      this._settingsService.startLevel-=1;
    }
  }

  protected plusMistakes():void {
    this._settingsService.mistakes+=1;
  }

  protected minusMistakes():void {
    if(this._settingsService.mistakes>0){
      this._settingsService.mistakes-=1;
    }
  }

  protected saveSettings():void {
    if(this._userService.isAuthenticated()) {
      this._settingsService.saveSettings();
    }
    this.toBack();
  }

  protected toBack():void {
    let url = '/'+this._settingsService.title;
    this.router.navigate([url]);
  }  

  protected plusStartTime():void {
    this._settingsService.startTime+=100;
  }

  protected minusStartTime():void {
    if(this._settingsService.startTime>1000){
      this._settingsService.startTime-=100;
    }
  }
  
  protected plusTimeIncrease():void {
    this._settingsService.timeIncrease+=100;
  }

  protected minusTimeIncrease():void {
    if(this._settingsService.timeIncrease>0){
      this._settingsService.timeIncrease-=100;
    }
  }  

}
