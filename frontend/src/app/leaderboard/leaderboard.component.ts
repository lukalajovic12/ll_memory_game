
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserService} from '../user.service';
import { Leaderboard } from '../game-util';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent  implements OnInit  {

  protected leaderboardList: Observable<Leaderboard[]>;

  protected gameType="all";

  private leaderboardUrl():string {
    if(this.gameType==="all"){
      return environment.BACKEND_URL + "api/leaderboard/"
    } else {
      return environment.BACKEND_URL + "api/leaderboard/?title="+this.gameType;
    }
  }

  constructor(private  http:HttpClient,
    public _userService: UserService,private router: Router){}  

  ngOnInit() {
    if(!this._userService.isAuthenticated()){
      this.toHome();
    }
    this.getLeaderboardList();
  }

  onChange(value:any) {
    this.getLeaderboardList();
}

  private getLeaderboardList() {
   let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this._userService.token}`
  });   
  headers.set('Authorization', `Bearer ${this._userService.token}`);
   this.leaderboardList=this.http.get<Leaderboard[]>(this.leaderboardUrl(), { headers });
  }
 
  protected toHome():void {
    this.router.navigate(['/']);
  }


}
