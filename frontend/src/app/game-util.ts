
export const DJANGO_URL_BASIC="http://127.0.0.1:8000/";
export const DJANGO_URL="http://127.0.0.1:8000/api/memory_game/";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {UserService} from './user.service';

export interface User {
  id:number,
  username:string,
}


export interface MemoryGame {
    id?:number,
    title:string,
    user:number
    points:number,
  }
export interface Score {
  id:number,
  title:string,
  points:number,
  user:number
  username:string
}

export function saveData(title:string,gamePoints:number,http:HttpClient,userService: UserService):void {
  let score:MemoryGame = {title:title,
    user:userService.user_id,
    points:gamePoints,
  };
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userService.token}`
      })
    };   
    
    // Subscribe to the POST request to trigger it
    http.post<MemoryGame>(DJANGO_URL, score, httpOptions).subscribe(
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

  export function updateWindowSize(): WindowSize {
    // Use Renderer2 to get the window size
    const width = window.innerWidth;
    const height = window.innerHeight-120;

    // Store the window size in your class property

    let maxSize=1200;
    let svgWidth=0;
    width<maxSize?svgWidth=width:svgWidth=maxSize;
    let svgHeight=0;
    height<maxSize?svgHeight=height:svgHeight=maxSize;
    svgHeight>svgWidth?svgHeight=svgWidth:svgWidth=svgHeight;
    return {width:svgWidth,height:svgHeight}
  }