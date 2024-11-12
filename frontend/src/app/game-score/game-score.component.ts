import { Component,OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { Score } from '../game-util';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';



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

  private scoreUrl():string {
    if(this.gameType==="all"){
      return environment.BACKEND_URL + "api/user_score/?user_id="+this._userService.user_id;
    } else {
      return environment.BACKEND_URL + "api/user_score/?title="+this.gameType+"&"+"user_id="+this._userService.user_id;
    }
  }

  constructor(private  http:HttpClient,
    public _userService: UserService,
    private route: ActivatedRoute,private router: Router){}  

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
    this.router.navigate(['/']);
  }
  protected toBack():void {
    let url = '/'+this.title;
    this.router.navigate([url]);
  }  



}
