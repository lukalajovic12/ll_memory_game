import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Score {
  id:number,
  title:string,
  points:number
}

@Component({
  selector: 'app-game-score',
  templateUrl: './game-score.component.html',
  styleUrls: ['./game-score.component.scss']
})
export class GameScoreComponent {

  private DJANGO_URL="http://127.0.0.1:8000/api/memory_game/";

  score: Observable<Score[]>;

  constructor(private  http:HttpClient){

  }  

  getScore() {
    this.score=this.http.get<Score[]>(this.DJANGO_URL);
  }

}
