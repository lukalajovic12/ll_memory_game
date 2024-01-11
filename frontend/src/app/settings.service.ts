import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {UserService} from './user.service';
import { Observable } from 'rxjs';

export interface GameSettings {
  id?:number,
  title:string,
  user:number,
  lives:number,
  startLevel:number,
  mistakes:number
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public lives = 3;
  public startLevel=3;
  public mistakes =0;
  private title="";

  public setTitle(title:string) {
    this.title=title;
  }


  constructor(private _userService:UserService,private http:HttpClient) { }

  public saveSettings():void {
    let setting:GameSettings = {title:this.title,
      user:this._userService.user_id,
      mistakes:this.mistakes,
      lives:this.lives,
      startLevel:this.startLevel
    };
      
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._userService.token}`
        })
      };   
      
      // Subscribe to the POST request to trigger it
      this.http.post<GameSettings>("http://127.0.0.1:8000/api/settings/", setting, httpOptions).subscribe(
        (response) => {
          // Handle the response from the server (e.g., update your local todos)
          console.log('settings saved:', response);
        },
        (error) => {
          // Handle errors here
          console.error('Error saving game data:', error);
        }
      );
    }

    public getData():void {
      let url ="http://127.0.0.1:8000/api/settings_get/?title="+this.title+"&"+"user_id="+this._userService.user_id;
      let settingsList: Observable<GameSettings[]>;
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._userService.token}`
      });   
      settingsList=this.http.get<GameSettings[]>(url, { headers });
      settingsList.subscribe(settings => {
        if (settings.length === 0) {
          this.lives = 3;
          this.startLevel=3;
          this.mistakes =0;
        } else {
          this.lives = settings[0].lives;
          this.startLevel=settings[0].startLevel;
          this.mistakes =settings[0].mistakes;
        }
      });
    }

}
