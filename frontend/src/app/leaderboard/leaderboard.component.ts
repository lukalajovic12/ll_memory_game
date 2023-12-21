import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserService} from '../user.service';
import { Score } from '../game-util';


@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {

  score: Observable<Score[]>;
  
  constructor(private  http:HttpClient,public _userService: UserService){}  

  ngOnInit() {
    // Get the initial window size
    this.getLadder();
  }

  getLadder() {
   let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this._userService.token}`
  });   
  headers.set('Authorization', `Bearer ${this._userService.token}`);
   this.score=this.http.get<Score[]>("http://127.0.0.1:8000/api/user_score/", { headers });
  }

}
