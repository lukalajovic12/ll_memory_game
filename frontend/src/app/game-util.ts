
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {UserService} from './user.service';
import {SettingsService} from './settings.service';

export const CIRCLES = 'circles';
export const SQUARES = 'squares';

export interface User {
  id:number,
  username:string,
}


export interface MemoryGame {
    id?:number,
    title:string,
    user:number
    points:number,
    settings:number,
    customGame:boolean,
    gameDate:string
  }
export interface Score {
  id:number,
  title:string,
  points:number,
  user:number,
  username:string,
  settings_id?:number,
  lives:number,
  mistakes:number,
  startLevel:number,
  startTime:number,
  timeIncrease:number
}

export interface Leaderboard {
  title:string,
  points:number,
  user:number,
  username:string,
  gameDate:string
}

export function saveData(title:string,gamePoints:number,customGame:boolean,
  http:HttpClient,
  _userService: UserService,
  _settingsService:SettingsService):void {

  let gameScore:MemoryGame = {title:title,
    user:_userService.user_id,
    points:gamePoints,
    settings: customGame && _settingsService.settings_id>0? _settingsService.settings_id:null,
    customGame:customGame,
    gameDate:new Date().toISOString()
  };

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${_userService.token}`
    })
  };  
    // Subscribe to the POST request to trigger it
    http.post<MemoryGame>(environment.BACKEND_URL+"api/memory_game/", gameScore, httpOptions).subscribe(
      (response) => {
        // Handle the response from the server (e.g., update your local todos)
        console.log('Game data saved:', response);
      },
      (error) => {
        // Handle errors here
        console.error('Error saving game data:', error);
      }
    );

  }

  export interface WindowSize { width: number, height: number }

  export function updateWindowSizes(): WindowSize {
    // Use Renderer2 to get the window size
    const width = window.innerWidth;
    const height = window.innerHeight-120;
    // Store the window size in your class property
    let maxSize=500;
    let svgWidth=Math.min(maxSize,width);
    let svgHeight=Math.min(maxSize,height);
    svgWidth>svgHeight?svgWidth=svgHeight:svgHeight=svgWidth


    return {width:svgWidth,height:svgHeight}
  }

  export function updateWindowWidth(): number {
    // Use Renderer2 to get the window size
    let sizes=updateWindowSizes();
    return Math.min(sizes.width,sizes.height);
  } 

  export function updateWindowHeight(): number {
    return window.innerHeight;
  } 


  export type GameDisplayState = 'game' | 'menu' | 'data' | 'empty' | 'end';