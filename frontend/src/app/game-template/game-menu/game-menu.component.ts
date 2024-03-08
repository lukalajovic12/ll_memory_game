import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { updateWindowWidth } from 'src/app/game-util';
@Component({
  selector: 'app-game-menu',
  templateUrl: './game-menu.component.html',
  styleUrls: ['./game-menu.component.scss']
})
export class GameMenuComponent {

  @Input() startGame:() => void;

  @Input() startCustomGame:() => void;  

  @Input() title:string;

  
  constructor(protected _userService: UserService,private router: Router){}

  protected toSettings = () => {
    this.router.navigate(['/settings'], { queryParams: { title: this.title } });
  }
  protected toScore = () =>{
    this.router.navigate(['/score'], { queryParams: { title: this.title } });
  }

  protected toTutorial = () =>{
    this.router.navigate(['/tutorial'], { queryParams: { title: this.title } });
  }

  protected toHome = () => {
    this.router.navigate(['/']);
  }


}
