

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