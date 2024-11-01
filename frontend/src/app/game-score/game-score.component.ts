import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserService} from '../user.service';
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

  protected score: Observable<Score[]>;

  protected gameType="all";

  private title="all";

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

    if(!this._userService.isAuthenticated()){
      this.toHome();
    }

    this.route.queryParams.subscribe(params => {
      this.gameType=params['title'];
      this.title=params['title'];
      this.getScore();
    });
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
 
  protected toHome():void {
    this.router.navigate(['/']);
  }
  protected toBack():void {
    let url = '/'+this.title;
    this.router.navigate([url]);
  }  

}
