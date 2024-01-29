import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {UserService} from './user.service';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
export interface GameSettings {
  id?:number,
  title:string,
  user:number,
  lives:number,
  startLevel:number,
  mistakes:number,
  settings_id:number,
  startTime:number,
  timeIncrease:number
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public lives = 3;
  public startLevel=3;
  public mistakes =0;
  public startTime = 3000;
  public timeIncrease =100;
  public title="";
  public settings_id=-1;
  constructor(private _userService:UserService,private http:HttpClient) { }

  public saveSettings():void {
    let setting:GameSettings = {title:this.title,
      user:this._userService.user_id,
      mistakes:this.mistakes,
      lives:this.lives,
      startLevel:this.startLevel,
      settings_id:this.settings_id,
      startTime:this.startTime,
      timeIncrease:this.timeIncrease
    };
      

    }

    public async getData(title:string ):Promise<void> {
  
    }

}
