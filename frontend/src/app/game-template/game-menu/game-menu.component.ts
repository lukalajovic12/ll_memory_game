import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';


export type menuType = 'primary'|'practice'|'compete'
@Component({
  selector: 'app-game-menu',
  templateUrl: './game-menu.component.html',
  styleUrls: ['./game-menu.component.scss']
})
export class GameMenuComponent {




  @Input() startGame:() => void;

  @Input() startCustomGame:() => void;  

  @Input() title:string;


  protected type:menuType = 'primary';

  
  constructor(protected _userService: UserService,private router: Router){

  }

  protected compete = () => {
    this.type='compete';
  }
  protected practice = () => {
    this.type='practice';
  }

  protected back = () => {
    this.type='primary';
  }

  protected toSettings = () => {
    this.router.navigate(['/settings'], { queryParams: { title: this.title } });
  }
  protected toScore = () =>{
    this.router.navigate(['/score'], { queryParams: { title: this.title } });
  }

  protected toLeaderboard = () =>{
    this.router.navigate(['/leaderboard'], { queryParams: { title: this.title } });
  }


  protected toTutorial = () =>{
    this.router.navigate(['/tutorial'], { queryParams: { title: this.title } });
  }

  protected toHome = () => {
    this.router.navigate(['/']);
  }


}
