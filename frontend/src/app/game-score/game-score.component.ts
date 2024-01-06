import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserService} from '../user.service';
import { Score } from '../game-util';


@Component({
  selector: 'app-game-score',
  templateUrl: './game-score.component.html',
  styleUrls: ['./game-score.component.scss']
})
export class GameScoreComponent implements OnInit {

  protected score: Observable<Score[]>;

  protected gameType="all";


  private scoreUrl():string {

    if(this.gameType==="all"){
      return "http://127.0.0.1:8000/api/user_score/?user_id="+this._userService.user_id;
    } else {
      let url ="http://127.0.0.1:8000/api/user_score/?title="+this.gameType+"&"+"user_id="+this._userService.user_id;
       console.log(url);
       return url;
    }
  }

  constructor(private  http:HttpClient,public _userService: UserService){}  

  ngOnInit() {
    this.getScore();
  }

  onChange(value:any) {
    this.getScore();
}

  private getScore() {
   let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this._userService.token}`
  });   
  headers.set('Authorization', `Bearer ${this._userService.token}`);
   this.score=this.http.get<Score[]>(this.scoreUrl(), { headers });
  }
}
