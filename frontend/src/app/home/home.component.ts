import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  windowSize: { width: number, height: number };
  svgWidth=1000;

  constructor(public _userService: UserService) { }

  ngOnInit() {
    // Get the initial window size
    this.updateWindowSize();
  }

  private updateWindowSize(): void {
    // Use Renderer2 to get the window size
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Store the window size in your class property
    this.windowSize = { width, height };


    if(this.screenWidthCondition()){
      this.svgWidth=this.windowSize.width;
    } else {
      this.svgWidth=1000;
    }
  }

  protected loginLogout():string {
    return this._userService.isAuthenticated()?'logout':'login';
  }


  screenWidthCondition():boolean {
    return this.windowSize.width<1000;
  }

  leftSideWidth():number {
    if(this.screenWidthCondition()){
      return 0;
    } else {
      return (this.windowSize.width-this.svgWidth)/4;
    }  
  }
  rightSideWidth():number {
    if(this.screenWidthCondition()){
      return 0;
    } else {
      return (this.windowSize.width-this.svgWidth)/4;
    }  
  }

}
