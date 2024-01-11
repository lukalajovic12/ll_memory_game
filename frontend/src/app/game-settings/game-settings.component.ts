import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {UserService} from '../user.service';
import {SettingsService} from '../settings.service';
@Component({
  selector: 'app-game-settings',
  templateUrl: './game-settings.component.html',
  styleUrls: ['./game-settings.component.scss']
})
export class GameSettingsComponent  implements OnInit {


  protected title: string = '';

  protected lives:number;

  protected startLevel:number;

  protected mistakes:number; 

  constructor(private route: ActivatedRoute,
    private router: Router,
    private _userService: UserService,
    private _settingsService:SettingsService) {}
   
  ngOnInit(): void {
    this.title = this.route.snapshot.params['title'];
    this.route.queryParams.subscribe(params => 
      this.title = params['title']
    );
    this._settingsService.setTitle(this.title);
    this._settingsService.getData();

    this.lives=this._settingsService.lives;
    this.startLevel=this._settingsService.startLevel;
    this.mistakes=this._settingsService.mistakes;
}

protected plusLife():void {
  this.lives+=1;
}

protected minusLife():void {
  if(this.lives>1){
    this.lives-=1;
  }
}

protected plusStartLevel():void {
  this.startLevel+=1;
}

protected minusStartLevel():void {
  if(this.startLevel>2){
    this.startLevel-=1;
  }
}

protected plusMistakes():void {
  this.mistakes+=1;
}

protected minusMistakes():void {
  if(this.mistakes>0){
    this.mistakes-=1;
  }
}


protected saveSettings():void{
  this._settingsService.lives=this.lives;
  this._settingsService.startLevel=this.startLevel;
  this._settingsService.saveSettings();
  
 // this.router.navigate(['/circle']);
}


}
