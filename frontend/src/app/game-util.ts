

export const DJANGO_URL="http://127.0.0.1:8000/api/memory_game/";
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface MemoryGame {
    id?:number,
    title:string,
    points:number
  }

export function saveData(title:string,gamePoints:number,http:HttpClient):void {
    let score:MemoryGame = {title:title,points:gamePoints};
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
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
    const height = window.innerHeight;

    // Store the window size in your class property

    let svgWidth=0;

    if(width<800){
      svgWidth=width;
    } else {
      svgWidth=800;
    }
    let svgHeight=0;
    if(height<1000){
      svgHeight=height/2;
    } else {
        svgHeight=1000;
    }
    if(svgHeight>svgWidth) {
      svgHeight=svgWidth;
    } else {
      svgWidth=svgHeight;
    }
    return {width:svgWidth,height:svgHeight}
  }
