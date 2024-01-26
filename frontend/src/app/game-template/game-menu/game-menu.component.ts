import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { updateWindowSize } from 'src/app/game-util';
@Component({
  selector: 'app-game-menu',
  templateUrl: './game-menu.component.html',
  styleUrls: ['./game-menu.component.scss']
})
export class GameMenuComponent implements OnInit  {

  @Input() startGame:() => void;

  @Input() title:string;

  private windowHeight: number;
  protected windowSize: number;
  
  constructor(protected _userService: UserService,private router: Router){}

  ngOnInit() {
    this.windowSize = updateWindowSize();
    this.windowHeight = window.innerHeight;
  }  

  // HostListener to listen for window resize event
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowSize = updateWindowSize();
    this.windowHeight = window.innerHeight;
  }  

  protected buttonHeight():number {
    return this.windowHeight/16;
  }

  protected buttonDivPadding():number {
    return this.windowHeight/32;   
  }

  protected startTheGame(){
    this.startGame();
  }

  protected toSettings(){
    this.router.navigate(['/settings'], { queryParams: { title: this.title } });
  }
  protected toScore(){
    this.router.navigate(['/score'], { queryParams: { title: this.title } });
  }
  protected toHome():void {
    this.router.navigate(['/']);
  }


}
