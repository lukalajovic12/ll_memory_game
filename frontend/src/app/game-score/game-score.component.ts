import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DJANGO_URL } from '../game-util';

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

  score: Observable<Score[]>;

  constructor(private  http:HttpClient){

  }  

  getScore() {
    this.score=this.http.get<Score[]>(DJANGO_URL);
  }

}
