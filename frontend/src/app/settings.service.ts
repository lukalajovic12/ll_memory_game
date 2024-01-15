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
  settings_id:number
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public lives = 3;
  public startLevel=3;
  public mistakes =0;
  public title="";
  public settings_id=-1;
  constructor(private _userService:UserService,private http:HttpClient) { }

  public saveSettings():void {
    let setting:GameSettings = {title:this.title,
      user:this._userService.user_id,
      mistakes:this.mistakes,
      lives:this.lives,
      startLevel:this.startLevel,
      settings_id:this.settings_id
    };
      
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._userService.token}`
        })
      };   
      
      // Subscribe to the POST request to trigger it
      this.http.post<GameSettings>(environment.BACKEND_URL+"api/settings/", setting, httpOptions).subscribe(
        (response) => {
          // Handle the response from the server (e.g., update your local todos)
          console.log('settings saved:', response);
        },
        (error) => {
          // Handle errors here
          console.error('Error saving settings:', error);
        }
      );
    }

    public async getData(title:string ):Promise<void> {
      this.title=title;
      let url =environment.BACKEND_URL+"api/settings_get/?title="+this.title+"&"+"user_id="+this._userService.user_id;      
      let settingsList: Observable<GameSettings[]>;
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._userService.token}`
      });   
      settingsList=this.http.get<GameSettings[]>(url, { headers });
      settingsList.subscribe(settings => {
        if (settings.length === 0) {
          this.saveSettings();
        } else {
          this.lives = settings[0].lives;
          this.startLevel = settings[0].startLevel;
          this.mistakes = settings[0].mistakes;
          this.settings_id = settings[0].id;
        }
      });
    }

}
