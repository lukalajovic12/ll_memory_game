import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DJANGO_URL } from '../game-util';
import {UserService} from '../user.service';

export interface Score {
  id:number,
  title:string,
  points:number,
  user_id:string
}

@Component({
  selector: 'app-game-score',
  templateUrl: './game-score.component.html',
  styleUrls: ['./game-score.component.scss']
})
export class GameScoreComponent {

  score: Observable<Score[]>;

  constructor(private  http:HttpClient,public _userService: UserService){}  

  getScore() {
    this.score=this.http.get<Score[]>("http://127.0.0.1:8000/api/user_score/?user_id="+this._userService.user_id);
  }

}
