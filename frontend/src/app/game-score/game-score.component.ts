import { Component,OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { Score } from '../game-util';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-game-score',
  templateUrl: './game-score.component.html',
  styleUrls: ['./game-score.component.scss']
})
export class GameScoreComponent implements OnInit {

  public score: Score[]=[];

  protected gameType:'all'|'circles'|'squares' = "all";

  protected gameDisplay:'chart'|'table' = 'chart';

  private title:'all'|'circles'|'squares'='all';

  constructor(private  http:HttpClient,
    public _userService: UserService,
    private route: ActivatedRoute,private location: Location){}  

  ngOnInit() {
  //  if(!this._userService.isAuthenticated()){
  //    this.toHome();
 //   }
    this.route.queryParams.subscribe(params => {
      this.gameType=params['title'];
      this.title=params['title'];
      this.getScore();
    });
  }

protected onChangeGameType():void {
    this.getScore();
}

protected onChangeGameDisplay():void {

}


  private getScore() {
  // let headers = new HttpHeaders({
  //  'Content-Type': 'application/json',
  //  'Authorization': `Bearer ${this._userService.token}`
  //});   
  //headers.set('Authorization', `Bearer ${this._userService.token}`);
  // const scoreObservable=this.http.get<Score[]>(this.scoreUrl(), { headers });

  // scoreObservable.subscribe((data: Score[]) => {
  //   this.score = data;
  // });

   this.score = [{id:1,points:10,startLevel:3,title:'squares',user:1,username:'playerone',settings_id:1,lives:3,mistakes:1,startTime:2000,timeIncrease:100},
    {id:2,points:15,startLevel:3,title:'squares',user:1,username:'playerone',settings_id:1,lives:3,mistakes:1,startTime:2000,timeIncrease:100},
    {id:3,points:80,startLevel:3,title:'squares',user:1,username:'playerone',settings_id:1,lives:3,mistakes:1,startTime:2000,timeIncrease:100},
    {id:4,points:166,startLevel:3,title:'squares',user:1,username:'playerone',settings_id:1,lives:3,mistakes:1,startTime:2000,timeIncrease:100},
    {id:5,points:17,startLevel:3,title:'squares',user:1,username:'playerone',settings_id:1,lives:3,mistakes:1,startTime:2000,timeIncrease:100},
    {id:6,points:200,startLevel:3,title:'squares',user:1,username:'playerone',settings_id:1,lives:3,mistakes:1,startTime:2000,timeIncrease:100}
   ];
  }

  protected toHome():void {
    this.location.back();
    this.location.back();
  }
  protected toBack():void {
    this.location.back();
  }  
}
